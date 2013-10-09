//Original Function

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
		$$('.printabletab').setStyle('display','none');
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

//Kyle's Function that should only be used on accessory-styled pages
function printmeAccessories() {
	if (!$('printinfo')) {
		var d = new Element('div');
		d.id = 'printinfo';
		d.setStyle('height', 0);
		d.setHTML('<div id="printinfowrap"><a href="#" onclick="return printme();" id="printableClose"><span>CLOSE</span></a><h2>Printable Version</h2><div id="printableHelp"><h3>Printing Instructions</h3><p>For best results when printing this page, please enable the printing of background images in your browser.</p><div id="printableOptions"></div></div><a href="#" onclick="window.print(); return printme();" id="printableNow"><span>Print Now</span></a><a href="#" onclick="return printme();" id="printableReturn"><span>Return to Website</span></a></div>');
		d.injectTop(document.body);
	}
	if ($('printinfo').getStyle('height').toInt()>0) {
		// Change to Screen View
		//$(document.body).setStyle('backgroundColor', '#ddd');
		$$('#header','#subheader','#footer','#copyright','#printmelink','.noprint').each(function(d) {
			d.setStyle('display', 'block');
		});
	
		
		
		$('main').removeClass('onprintable');
		$('printableHeader').setStyle('display', 'none');
		$(document.body).fireEvent('printableOff');
		$('printinfo').effect('height', { duration: 600, transition: Fx.Transitions.Cubic.easeOut }).start(0);
	} else {
		// Change to Printable View
		//$(document.body).setStyle('backgroundColor', 'white');
		var printurl = getParameterByName("print");
		if(printurl == "t"){
			$$('#header','#subheader','#footer','#copyright','#printmelink','.noprint').each(function(d) {
				d.setStyle('display', 'none');
			});
			$('main').addClass('onprintable');
			$('printableHeader').setStyle('display', 'block');
			$(document.body).fireEvent('printableOn');
			$('printinfo').effect('height', { duration: 600, transition: Fx.Transitions.Cubic.easeOut }).start(200);
		}
			
	}
	return false;
}

function getParameterByName( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var tabs = {
	init: function() {
		var blah = window.print;
		
		window.print = function(){
			tabs.toPrint();
			blah();
		}
		
		tabs.tabon = 0;
		tabs.tabs = $$('#tabbedarea #tabs a');
		tabs.tabcontent = $$('#tabbedarea .tabcontent');

		//Auto-select tab based on URL hash
		var lh = location.hash;
		switch(lh)
		{
		case "#Tab-Summary":
			tabs.tabon = 0;
		  	break;
		case "#Tab-Features":
			tabs.tabon = 1;
		  	break;
		case "#Tab-Accessories":
			tabs.tabon = 2;
		  	break;
		case "#Tab-Specifications":
			tabs.tabon = 3;
		 	break;
		}		
		
		tabs.printtab = {};
		tabs.tabs.each(function(t, i) {
			if (i==tabs.tabon) t.addClass('tabon');
			else t.removeClass('tabon');
			t.addEvent('click', tabs.change.bindWithEvent(t, i));
		});
		tabs.tabcontent.each(function(tc, i) {
			if (i==tabs.tabon) tc.setStyle('display', 'block');
			else tc.setStyle('display', 'none');
		});
		
		$(document.body).addEvent('printableOn', tabs.toPrint);
		
		$(document.body).addEvent('printableOff', tabs.toScreen);
		

	},
	change: function(ev, j) {
		ev.stop();
		if (tabs.tabon!=j) {
			tabs.tabon = j;
			tabs.tabcontent.each(function(tc, i) {
				if (i==tabs.tabon) tc.setStyle('display', 'block');
				else tc.setStyle('display', 'none');
			});
			tabs.tabs.each(function(t, i) {
				if (i==tabs.tabon) t.addClass('tabon');
				else t.removeClass('tabon');
			});
		}
	},
	toPrint: function() {
	    //Fires off after print now is hit creating duplicates	
		$$('.printabletab').setStyle('display', 'none');
		// Printable View -- expand all tabs
		tabs.tabcontent.each(function(tc, i) {
			// expand all tabs
			tc.setStyle('display', 'block');
			// add dummy active tabs above each tabcontent section
			tabs.printtab[i] = new Element('img', {
				'src': '/products/images/pt/' + tabs.tabs[i].id + '.png',
				'class': 'printabletab'
			});
			
			tabs.printtab[i].injectBefore(tc);
		});
	    
		// hide web tabs
		$('tabs').setStyle('display', 'none');
		// add checkboxes to allow selection of tabs to print (default all)
		var po = '<strong>Uncheck tabs you do not want to print</strong><br/>';
		var checked = '';
		var printchecks = '';
		/*printchecks = $$('.chkprint');
		if (typeof variable === 'undefined') {
            printchecks = new array();
        }*/
		tabs.tabs.each(function(t, i) {
		    /*if(printchecks[i].checked){
		        alert(printchecks[i]);
	        }*/
			po += '<label><input class="printchecks" class="chkprint" type="checkbox" value="'+t.id+'" checked="'+checked+'" onclick="tabs.printHide(this,'+i+')"> ' + t.id.replace(/tab/, '') + '</label> &nbsp; ';
		});
		$('printableOptions').setHTML(po + '<br/>'); // bad, shouldn't replace entire section
	},
	toScreen: function() {
		// Screen View (normal) -- collapsed tabs
		// collapse appropriate tabs
		tabs.tabcontent.each(function(tc, i) {
			if (i==tabs.tabon) tc.setStyle('display', 'block');
			else tc.setStyle('display', 'none');
			tabs.printtab[i].remove();
		});
		$('tabs').setStyle('display', 'block');
	},
	printHide: function(ck, i) {
		if (ck.checked) {
			tabs.tabcontent[i].setStyle('display', 'block');
			tabs.printtab[i].setStyle('display', 'block');
		} else {
			tabs.tabcontent[i].setStyle('display', 'none');
			tabs.printtab[i].setStyle('display', 'none');
		}
	}
};

//This is needed on non-accessory pages for their tabs.
if(window.addEvent)
{
	window.addEvent('domready', tabs.init);
}