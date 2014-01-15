#!/bin/env node

var fs = require('fs'),app = require('http').createServer(function(req,res) {
	var path = req.url == '/' ? '/index.html' : req.url;
	try {
		fs.readFile(__dirname+path,function(err,data) {
			if(err) {
				var callback = '';
				if(callback = path.match(/(\/apis\/mtgox)/gi)) {
					var http = require('http');
					var packet = '';
					http.get('http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast',function(data) {
						data.on('data',function(chunk) {
							packet += chunk;
						});
						data.on('end',function() {
							res.writeHead(200);
							res.end(packet);
						});
					});
				} else if(path.match(/\/login(\/)?$/gi)) {
					fs.readFile(__dirname+'/static/login.html',function(err,data) {
						if(err) {
							res.writeHead(500);
							return res.end('500: The app has encountered an error, please try again later.');
						}
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(data);
					});
				} else {
					res.writeHead(404);
					fs.readFile(__dirname+'/static/404.html',function(err,data) {
						if(err) {
							return res.end('404: The page you are looking for cannot be found.');
						}
						res.writeHead(404,{'Content-Type':'text/html'});
						res.end(data);
					});
				}
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
}).listen(process.env.OPENSHIFT_NODEJS_PORT || 8000,process.env.OPENSHIFT_NODEJS_IP || 'localhost');