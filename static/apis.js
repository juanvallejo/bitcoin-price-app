var apis = {
	exchanges:[
		{
			_done:false,
			action:'buy',
			buy:'https://coinbase.com/api/v1/prices/buy/',
			data:{},
			name:'coinbase',
			sell:'https://coinbase.com/api/v1/prices/sell/',
			socket:false,
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
			buy:'/apis/mtgox',
			data:{},
			name:'mtgox',
			sell:null,
			socket:false,
			get:function(fn) {
				var self = this;
				$.ajax({
					dataType:'json',
					contentType:'application/json',
					type:'GET',
					url:this[this.action],
					success:function(data) {
						if(data.result != 'success') return console.log('ERROR: Error returned from the Mt. Gox API');
						data = data.data;
						var res = {
							buy:{
								subtotal:{
									amount:data.buy.display_short.split('$')[1]
								}
							},
							sell:{
								subtotal:{
									amount:data.sell.display_short.split('$')[1]
								}
							}
						};
						self.data = res;
						fn.call(self,res);
					},
					error:function(e) {
						console.log(e.error());
					}
				});	
			}
		}
	]
};