var MongoClient = require('mongodb').MongoClient;

//var url = "mongodb://localhost:27017/arduino";


class MongoBD{
	constructor(url, callback){
		let that = this;
		MongoClient.connect(url, (err, database)=>{
			if(err){
				console.log('could not connect to MongoDB - url: ', url);
				if(!!callback)
					callback(err);
			}
			
			that.db = database;
			
			if(!!callback)
				callback();
		});
	}
//----------------------------------------------------------------------
closeDatabase(){
	if(this.db){
		console.log('closing database');
		this.db.close();
	}
}
//----------------------------------------------------------------------
getDatabase(database){
	return this.db.db(database);
}
//----------------------------------------------------------------------
find(callback, query, projection, collection, database){
	let dbo = this.getDatabase(database);
	dbo.collection(collection).find(query, projection).toArray(callback);
}
findOne(callback, query, projection, collection, database){
	this.find((err, result)=>{
		if(err){
			callback(err);
			return;
		}
		callback(null, !!result && result.length > 0 ? result[0] : null);
	}, query, projection, collection, database);
}
//--------------------------
checkIfDocumentExists(documentName, collection, database, callback){
	this.findOne((err, result)=>{
		if(err){
			callback(err);
			return;
		}
		callback(null, result !== null);
	}, {name: documentName}, {_id: 0}, collection, database);
}
checkIfDocumentExistsOtherwiseCreate(documentName, createFunction, collection, database, callback){
	this.checkIfDocumentExists(documentName, collection, database, (err, exists)=>{
		if(err){
			callback(err);
		}else if( !exists ){
			createFunction();
		}else{
			callback();
		}
	});
}
ensureDocumentExistsBeforeQuery(arduino, createFunc, actualQueryFunc, collection, database, callback){
	const onExistsOrNewlyCreated = (err)=>{
		if(err){
			if( !!callback )
				callback(err);
			return;
		}
		actualQueryFunc();
	};
	const onCreateIfNotExistent = ()=>{
		createFunc((err)=>{
			onExistsOrNewlyCreated(err);
		});
	}
	this.checkIfDocumentExistsOtherwiseCreate(arduino, onCreateIfNotExistent, collection, database, onExistsOrNewlyCreated);
}
	//--------------------------
	getValue(tag, arduino, collection, database, callback){
		let projection = {_id: 0};
		projection[tag] = 1;
		this.findOne(callback, {name: arduino}, projection, collection, database);
	}
	setValue(value, tag, arduino, collection, database, callback){
		let valObj = {}
		valObj[tag] = value;
		
		let dbo = this.getDatabase(database);
		dbo.collection(collection).updateOne({name: arduino},{
			$set: valObj
		}, callback);
	}
	//--------------------------
	addToArray(value, arrayTag, query, collection, database, callback){
		let valueObj = {}
		valueObj[arrayTag] = value;
		
		let dbo = this.getDatabase(database);
		dbo.collection(collection).updateOne(query,{
			$addToSet: valueObj
		}, callback);
	}
	setArray(array, arrayTag, query, collection, database, callback){
		let valueObj = {}
		valueObj[arrayTag] = array;
		
		let dbo = this.getDatabase(database);
		dbo.collection(collection).updateOne(query,{
			$set: valueObj
		}, callback);
	}
	removeFromArray(value, arrayTag, query, collection, database, callback){
		let toDelObj = {};
		toDelObj[arrayTag] = value;
		
		let dbo = this.getDatabase(database);
		dbo.collection(collection).updateOne(query,{
			$pull: toDelObj
		}, callback);
	}
	clearArray(arrayTag, query, collection, database, callback){
		this.setArray([], arrayTag, query, collection, database, callback);
	/*	let valueObj = {}
		valueObj[arrayTag] = [];
		
		let dbo = this.getDatabase(database);
		dbo.collection(collection).updateOne(query,{
			$set: valueObj
		}, callback);*/
	}
};

module.exports = MongoBD;


