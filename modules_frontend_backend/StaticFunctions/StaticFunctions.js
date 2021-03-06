
function evalUnixTimeFromDate(date, applyGMTTimeOffset=true){
	const gmtOffsInMins = date.getTimezoneOffset(); // getTimezoneOffset() -> IN MINUTES!!!
	const gmtTimeOffset = applyGMTTimeOffset ? gmtOffsInMins * 60 : 0;
	var secondsSinceEpoch = Math.round(date.getTime() / 1000)- gmtTimeOffset;
	return secondsSinceEpoch;
}
function evalCurrentUnixTime(){
	var d = new Date();
	return evalUnixTimeFromDate(d);
}

// stdTimezoneOffsetMINUTS (daySavingTime cancelled out) IN MINUTES
Date.prototype.stdTimezoneOffsetMINUTS = function(){
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffsetMINUTS();
}
// daySavingTime difference to normal timeZoneOffset IN MINUTES:
Date.prototype.daySavingTimeDiffToTimeZoneOffsetMINUTS = function () {
    return this.getTimezoneOffset() - this.stdTimezoneOffsetMINUTS();
}

const StaticFunctions = {
	isNullOrEmptyObject: function(obj){
		return !obj || this.isEmptyObject(obj);
	},
	isEmptyObject: function(obj){
		return Object.entries(obj).length === 0 && obj.constructor === Object;
	},
	// timestring assumed to be in the format: '07:27:21 PM'
	timeStringToSeconds: function(timeString, applyTimeZoneOffset = true){
		let date = new Date('January 01, 2019 ' + timeString);
//		console.log('timeStringToSeconds: date: ', date, '	timeString: ', timeString);
		return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds() + (applyTimeZoneOffset ? -date.getTimezoneOffset() * 60 : 0);
	},
	replaceAll: function(targetStr, toRepl, rplcmnt){
		return targetStr.split(toRepl).join(rplcmnt);
	},
	ensureLeadingSlash: function(s){
		return s.length === 0 || s.charAt(0) === '/'
				? s
				: '/' + s;
	},
	ensurePaddingSlash: function(s){
		return s.charAt(s.length - 1) === '/'
					? s
					: s + '/';
	},
	eraseLeadingSlash: function(s){
		return s.length === 0 || s.charAt(0) != '/'
				? s
				: s.substr(1);
	},
	erasePaddingSlash: function(s){
		return s.length === 0 || s.charAt(s.length - 1) != '/'
				? s
				: s.substr(0, s.length-1);
	},

	fileExists: function(absPath, callback){
		fs.access(absPath, fs.constants.F_OK, (err) => {
		  	if (err) {
		    	console.error(`${file} does not exist (err.code: ${err.code})!`);
		  	} else {
		    	console.log(`${file} exists, and it is writable`);
		  	}
			callback(err);
		});
	},
	fileExistsAndIsReadable: function(absPath, callback){
		fs.access(absPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
		  	if (err) {
		    	console.error(`${file} does not exist or is not readable (err.code: ${err.code})`);
		  	} else {
		    	console.log(`${file} exists and it is readable`);
		  	}
			callback(err);
		});
	},
	arraysEqual: function(a0, a1){
		if (a0 === a1){return true;}
		if (a0 === null || a0 === undefined || a1 === null || a1 === undefined){return false;}
		if (a0.length !== a1.length){return false;}

		// 1. zip both arrays -> 2. check if every pair of elements are equal:
		return a0.map((v,i)=>[v, a1[i]]).every(v=>v[0] === v[1]);
	},

	readTextFile: function(file){
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    let txt = ''
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status === 0)
	            {
	                txt = rawFile.responseText;
	            }
	        }
	    }
	    rawFile.send(null);
	    return txt;
	},
	evalUnixTimeFromDate,
	evalCurrentUnixTime,

	getRelUrlPath: function(url){
		let lio = url.lastIndexOf('/');
		return lio > -1 ? url.substring(lio) : url;
	},

	padZeros: function(num, size=2) {
		var s = "000000000" + num;
		return s.substr(s.length-size);
	},
	datTimeSecondsToFormattedTimeStr: function(dayTimeSeconds){
		return '' + this.evalHours(dayTimeSeconds)
				 	 + ':' + this.evalMins(dayTimeSeconds)
				 	 + ':' + this.evalMins(dayTimeSeconds);
	},
	evalHours: function(unixtime){
		return Math.floor(unixtime / (60*60));
	},
	evalMins: function(unixtime){
		return Math.floor((unixtime % (60*60)) / 60);
	},
	evalSecs: function(unixtime){
		return Math.floor((unixtime % (60*60)) % 60);
	},
	daySecondsToPrettyString: function(daysecs){
		const hours = this.evalHours(daysecs);
		const mins 	= this.evalMins(daysecs);
		const secs 	= this.evalSecs(daysecs);

		let s = hours + ':' + mins + ':' + secs;
		return s;
	},
	timeToString: function(x){
		const h = this.evalHours(x);
		const m = this.evalMins(x);
		const s = this.evalSecs(x);
		return `${h}:${m}:${s}`;
	},
	valToInteger: function(x){
	 	if(!x)
	 		x = 0;
	 	x = parseInt(x);
	 	if(isNaN(x))
	 		x = 0;
	 	return x;
	},

	generateJSONobjFromMap(map, dataTag){
		let JSONdata = JSON.stringify([...map]);

		let JSONobj = {};
		JSONobj[dataTag] = JSONdata;

		return JSONobj;
	},
	parseJSONfyiedMapToDataObj(JSONobj, dataTag){
		return JSON.parse(JSONobj)[dataTag];
	},
	generateMapFromJSONfyiedObj(JSONobj, dataTag){
		console.log('generateMapFromJSONfyiedObj: JSONobj: ', JSONobj, '	dataTag: ', dataTag);

		let bareData = JSON.parse( JSONobj[dataTag] );

		return new Map( bareData );
	}

};

module.exports = StaticFunctions;
