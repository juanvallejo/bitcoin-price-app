var apis = {
	exchanges:[
		{
			_done:false,
			action:'buy',
			buy:'https://coinbase.com/api/v1/prices/buy/',
			data:{},
			name:'coinbase',
			sell:'https://coinbase.com/api/v1/prices/sell/',
			socket:null,
			get:function(fn) {
				var self = this;
				$.ajax({
					dataType:'jsonp',
					contentType:'application/json',
					type:'GET',
					url:this[this.action],
					success:function(data) {
						if(!self._done) {
							self._done = true;
							self.data[self.action] = data;
							self.action = self.action == 'buy' ? 'sell' : 'buy';
							self.get(fn);
						} else {
							self._done = false;
							self.data[self.action] = data;
							fn.call(self,self.data);
						}
					},
					error:function() {}
				});
			}
		},
		{
			_done:false,
			action:'buy',
			buy:'https://coinbase.com/api/v1/prices/buy/',
			data:{},
			name:'mtgox',
			sell:'https://coinbase.com/api/v1/prices/sell/',
			socket:true,
			get:function(fn) {
				var self = this;
				try {
					self.socket = io.connect('https://socketio.mtgox.com:443/mtgox');
				} catch(e) {
					return console.log("Error connecting to the mtgox socket");
				}
			}
		}
	]
};