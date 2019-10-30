#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 29 21:54:05 2019

@author: hippo
"""

import os

src_dir_paths = []
files_to_link = [] # tuples: (abs_src_path, abs_tar_path)


def mkdir(dir):
    try:
        os.mkdir(dir)
    except FileExistsError as e:
        print(e)

def linkfile(src, tar):
    try:
        os.link(src, tar)
    except Exception as e:
        print(e)
    
def linkEntries():
    mkdir(tar_base_path)
    for dir in src_dir_paths:
        mkdir(dir)
    
    for (src, tar) in files_to_link:
        linkfile(src, tar)
    
def filterTempEntries(entries):
    fltr = lambda f: not f.endswith('~')
    return list( filter(fltr, entries) )

def join(base, rel):
    base = base[:-1] if base[-1] == '/' else base
    rel  = rel[1:]   if rel[0]   == '/' else rel
    return base + '/' + rel
    

def evalAbsTarPath(src_abs_path, src_base_path, tar_base_path):
    src_rel_path = src_abs_path[len(src_base_path):]
    return join(tar_base_path, src_rel_path)

def evalEntries(src_base_path, tar_base_path):
    for root, dirs, files in os.walk(src_base_path):
        
        dirs = filterTempEntries(dirs)
        files = filterTempEntries(files)
       
        for dir in dirs:
            src_path = os.path.join(root, dir)
            tar_path = evalAbsTarPath(src_path, src_base_path, tar_base_path)
            src_dir_paths.append( tar_path )

        for file in files:
            src_path = os.path.join(root, file)
            tar_path = evalAbsTarPath(src_path, src_base_path, tar_base_path)
            print('tar_base_path: ', tar_base_path)
            print('tar_path: ', tar_path)
            files_to_link.append( (src_path, tar_path) )

    
src_base_path = '/home/hippo/workspace_bluefish/d1mini/raspberry/modules_frontend_backend'
tar_base_path = '/home/hippo/workspace_bluefish/kubu/modules_frontend_backend'

evalEntries(src_base_path, tar_base_path)

linkEntries()
