#!/bin/env node

var fs = require('fs'),app = require('http').createServer(function(req,res) {
	var path = req.url == '/' ? '/index.html' : req.url;
	try {
		fs.readFile(__dirname+path,function(err,data) {
			if(err) {
				res.writeHead(500);
				res.end('404: The page you are looking for cannot be displayed.');
			} else {
				var types = {
					'css':'text/css',
					'html':'text/html',
					'js':'application/javascript',
					'json':'application/json',
					'text':'text/plain'
				};
				var type = 'text/plain';
				var ext = path.split('.');
				ext = ext[ext.length-1];
				if(types[ext]) type = types[ext];
				res.writeHead(200,{'Content-Type':type});
				res.end(data);
			}
		});
	} catch(e) {
		console.log('An error occurred while parsing the file \''+req.url+'\'');
	}
}).listen(process.env.OPENSHIFT_NODEJS_PORT || 8000);