function printme() {
	if (!$('printinfo')) {
		var d = new Element('div');
		d.id = 'printinfo';
		d.setStyle('height', 0);
		d.setHTML('<div id="printinfowrap"><a href="#" onclick="return printme();" id="printableClose"><span>CLOSE</span></a><h2>Printable Version</h2><div id="printableHelp"><h3>Printing Instructions</h3><p>For best results when printing this page, please enable the printing of background images in your browser.</p><div id="printableOptions"></div></div><a href="#" onclick="window.print(); return printme();" id="printableNow"><span>Print Now</span></a><a href="#" onclick="return printme();" id="printableReturn"><span>Return to Website</span></a></div>');
		d.injectTop(document.body);
	}
	if ($('printinfo').getStyle('height').toInt()>0) {
		// Change to Screen View
		$$('#header','#subheader','#footer','#copyright','#printmelink','.noprint').each(function(d) {
			d.setStyle('display', 'block');
		});
		$('main').removeClass('onprintable');
		$('printableHeader').setStyle('display', 'none');
		$(document.body).fireEvent('printableOff');
		$('printinfo').effect('height', { duration: 600, transition: Fx.Transitions.Cubic.easeOut }).start(0);
	} else {
		// Change to Printable View
		$$('#header','#subheader','#footer','#copyright','#printmelink','.noprint').each(function(d) {
			d.setStyle('display', 'none');
		});
		$('main').addClass('onprintable');
		$('printableHeader').setStyle('display', 'block');
		$(document.body).fireEvent('printableOn');
		$('printinfo').effect('height', { duration: 600, transition: Fx.Transitions.Cubic.easeOut }).start(200);
	}
	return false;
}