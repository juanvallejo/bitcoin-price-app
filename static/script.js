var apis = {
	exchanges:[
		{
			_done:false,
			action:'buy',
			buy:'https://coinbase.com/api/v1/prices/buy/',
			data:{},
			name:'coinbase',
			sell:'https://coinbase.com/api/v1/prices/sell/',
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
		}
	]
};

window.addEventListener('load',function() {
	var ticker = 10000;
	var title = document.title;
	var buyPrice = document.getElementById('buy-price'),
	sellPrice = document.getElementById('sell-price'),
	bitPrice = document.getElementById('bit-price');

	update();

	function update() {
		apis.exchanges.forEach(function(item,index) {
			item.get(function(data) {
				buyPrice.innerHTML = '$'+data.buy.subtotal.amount;
				sellPrice.innerHTML = '$'+data.sell.subtotal.amount;
				bitPrice.innerHTML = '$'+(Math.round(1/data.sell.subtotal.amount*100000)/100000)
				document.title = buyPrice.innerHTML+' - '+title;
			});
			if(index == apis.exchanges.length-1) setTimeout(update,ticker);
		});
	}
});