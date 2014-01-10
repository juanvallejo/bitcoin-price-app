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
				bitPrice.innerHTML = '$'+(Math.round(1/data.sell.subtotal.amount*100000)/100000);
				document.title = buyPrice.innerHTML+' - '+title;
			});
			if(index == apis.exchanges.length-1) setTimeout(update,ticker);
		});
	}
});