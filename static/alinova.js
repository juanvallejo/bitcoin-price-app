/*
** Alinova API. Include before other scripts.
*/

//define static vars
var NAVBAR = 'navbar';

//define methods
function include(path,fn) {
	var vars = {
		'navbar':function(fn) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET','static/navbar.html',true);
			xhr.send(null);
			xhr.addEventListener('readystatechange',function() {
				if(this.readyState == 4 && this.status == 200) {
					document.getElementById(NAVBAR).innerHTML = this.responseText;
				}
			});
		}
	};
	if(vars[path]) {
		if(typeof vars[path] == 'function') vars[path].call(this,fn);
	}
}

window.addEventListener('load',function() {
	if(document.getElementById(NAVBAR)) include('navbar');
});