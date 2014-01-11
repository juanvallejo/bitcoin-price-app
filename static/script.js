window.addEventListener('load',function() {
	var ticker = 10000;
	var title = document.title;
	var buyPrice = document.getElementsByClassName('buy-price'),
	sellPrice = document.getElementsByClassName('sell-price'),
	bitPrice = document.getElementsByClassName('bit-price');

	update();

	function update() {
		apis.exchanges.forEach(function(item,index) {
			item.get(function(data) {
				buyPrice.item(index).innerHTML = '$'+data.buy.subtotal.amount;
				sellPrice.item(index).innerHTML = '$'+data.sell.subtotal.amount;
				bitPrice.item(index).innerHTML = !item.socket ? '$'+(Math.round(1/data.sell.subtotal.amount*100000)/100000) : data.avg.subtotal.amount;
				document.title = buyPrice.item(0).innerHTML+' - '+title;
			});
			if(index == apis.exchanges.length-1) setTimeout(update,ticker);
		});
	}
});