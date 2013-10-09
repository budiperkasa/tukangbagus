var hobartmenu = {
	init: function() {
		hobartmenu.currentdrop = -1;
		hobartmenu.droppers = $$('#navProducts','#navService','#navWTB');
		hobartmenu.dropnavs = new Array();
		hobartmenu.droppers.each(function(d, i) {
			hobartmenu.dropnavs[i] = $(d.getProperty('rel'));
			d.addEvent('mouseover', hobartmenu.turnon.pass(i));
			d.addEvent('mouseout', hobartmenu.setturnoff);
			hobartmenu.dropnavs[i].addEvent('mouseover', hobartmenu.turnon.pass(i));
			hobartmenu.dropnavs[i].addEvent('mouseout', hobartmenu.setturnoff);
		});
		$$('#navELearning','#navWeldTalk').each(function(d) {
			d.addEvent('mouseover', hobartmenu.turnoff);
		});
	},
	setturnoff: function() {
		hobartmenu.timer = hobartmenu.turnoff.delay(500);
	},
	turnoff: function() {
		if (hobartmenu.currentdrop!=-1) {
			hobartmenu.droppers[hobartmenu.currentdrop].removeClass('hovon');
			hobartmenu.dropnavs.each(function(d) {
				d.setStyle('display','none');
			});
			hobartmenu.currentdrop = -1;
		}
	},
	turnon: function(i) {
		hobartmenu.timer = $clear(hobartmenu.timer);
		if (i!=hobartmenu.currentdrop) {
			if (hobartmenu.currentdrop!=-1) hobartmenu.droppers[hobartmenu.currentdrop].removeClass('hovon');
			hobartmenu.dropnavs.each(function(d,j) {
				if (j==i) d.setStyle('display','block');
				else d.setStyle('display','none');
			});
			hobartmenu.droppers[i].addClass('hovon');
			hobartmenu.currentdrop = i;
		}
	}
}
window.addEvent('domready', hobartmenu.init);

function showPopUp(url, width, height, scroll) {
	if (scroll=='true') window.open(url, 'HobartPopup', 'width='+width+',height='+height+',scrollbars=yes');
	else window.open(url, 'HobartPopup', 'width='+width+',height='+height);
	return false;
}
	
