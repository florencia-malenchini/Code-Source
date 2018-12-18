function swmenu(id, el, gotop) {
	if (gotop) {
		document.getElementById(id).setAttribute('class', 'mm-menu mm-menuopen');
	} else if (el instanceof HTMLUListElement) {
		if (el.getAttribute('class') == 'mm-menu') {
			el.setAttribute('class', 'mm-menu mm-menuopen');
		} else if (el.getAttribute('class') == 'mm-menu mm-menuopen' || el.getAttribute('class') == 'mm-menu mm-menuopen mm-subview' ) {
			var li_el = document.querySelectorAll('li.mm-subview, li.mm-subviewopen');

			el.setAttribute('class', 'mm-menu');

			for (var i = 0; i < li_el.length; i++)
				li_el[i].setAttribute('class', '');
		} else if (el.getAttribute('class') == 'mm-submenu') {
			var elementos = document.getElementById(id);
			
			elementos = elementos.getElementsByTagName('li');

			for (var i = 0; i < elementos.length; i++) {
				if (elementos[0].getAttribute('class') == 'mm-back') {
					//nothing
				} else {						   
					elementos[0].setAttribute('class', 'mm-subviewopen');
				}

				if (el.parentNode == elementos[i]) {
					el.parentNode.setAttribute('class', '');
					elementos[i-1].setAttribute('class', 'mm-subviewopen');
				}
			}
		}
	} else if (el instanceof HTMLLIElement && (el.getAttribute('class') != 'mm-back' || el.getAttribute('class') == null)) {
		var elementos = document.getElementById(id);

		elementos = elementos.getElementsByTagName('li');

		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i].getAttribute('class') == 'mm-subviewopen') {
				elementos[i].setAttribute('class', 'mm-subview');
			} else if (el == elementos[i]) {
				el.setAttribute('class', 'mm-subviewopen');
			}

			el.setAttribute('class', 'mm-subviewopen');
		}

		document.getElementById(id).setAttribute('class', 'mm-menu mm-menuopen mm-subview');
	} else if (el.getAttribute('class') == 'mm-back') {
		var elementos = document.getElementById(id);

		elementos = elementos.getElementsByTagName('li');

		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i].getAttribute('class') == 'mm-back') {
				//nothing
			} else if (elementos[i].getAttribute('class') == 'mm-subviewopen') {
				elementos[i].setAttribute('class', 'mm-subview');
			}

			if (el.parentNode.parentNode == elementos[i]) {
				el.parentNode.parentNode.setAttribute('class', '');
			}
		}

		el.parentNode.parentNode.parentNode.parentNode.setAttribute('class', 'mm-subviewopen');
	}
}