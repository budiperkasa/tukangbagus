var imageswapper = {
init: function() {
	imageswapper.linklist = new $$('tr.prodimgrow a.helmet');
	imageswapper.imagelist = new Array('770746','770757','770766','770747','770756','770758','770755','770754','770751','770752','770767','770753','770765');
	imageswapper.namelist = new Array(
		'Black – <strong>#770746</strong>',
		'Heat Check – <strong>#770757</strong>',
		'Mystic – <strong>#770766</strong>',
		'Graphic Camo – <strong>#770747</strong>',
		
		'Black – <strong>#770756</strong>',
		'Patriot III – <strong>#770758</strong>',
		'Combustion – <strong>#770755</strong>',
		'Agent Orange – <strong>#770754</strong>',
		'Bonehead II – <strong>#770751</strong>',
		'Camo – <strong>#770752</strong>',
		'Gear Head – <strong>#770767</strong>',
		
		'Black – <strong>#770753</strong>',
		'Decomposition - <strong>#770765</strong>'
	);

	imageswapper.imageon = 0;
	imageswapper.swapping = false;
	imageswapper.usingB = false;
	imageswapper.preloader = new Element('img');
	imageswapper.preloader.addEvent('load', imageswapper.imageloaded);
	var d = new Element('img');
	d.src = 'images/px.html';
	d.id = 'bigphotoB';
	d.setOpacity(0);
	d.injectInside('bigphotowrap');
	imageswapper.fxA = $('bigphoto').effect('opacity', { wait: false });
	imageswapper.fxB = $('bigphotoB').effect('opacity', { wait: false });
},
imageswap: function(to) {
	if (to>=0 && !imageswapper.swapping && imageswapper.imageon!=to) {
		imageswapper.swapping = true;
		imageswapper.imageon = to;
		if (imageswapper.usingB) {
			imageswapper.fxB.start(0);
		} else {
			imageswapper.fxA.start(0);
		}
		imageswapper.preloader.src = 'photos/' + imageswapper.imagelist[to] + '.jpg';
	}
	return false;
},
imageloaded: function() {
	if (imageswapper.preloader.src.contains('px.html')) return false;

	imageswapper.swapping = false;
	imageswapper.linklist.each(function(l, i) {
		if (i==imageswapper.imageon) {
			l.addClass('helmeton');
		} else {
			l.removeClass('helmeton');
		}
	});
	$('helmetname').setHTML(imageswapper.namelist[imageswapper.imageon]);
	if (imageswapper.usingB) {
		$('bigphoto').src = imageswapper.preloader.src;
		imageswapper.fxA.start(1);
		imageswapper.usingB = false;
	} else {
		$('bigphotoB').src = imageswapper.preloader.src;
		imageswapper.fxB.start(1);
		imageswapper.usingB = true;
	}
	imageswapper.preloader.src = 'images/px.html';
},
imagechg: function(d) {
	var newi = imageswapper.imageon+d;
	if (newi<0) newi = imageswapper.imagelist.length-1;
	else if (newi>=imageswapper.imagelist.length) newi = 0;
	return imageswapper.imageswap(newi);
}
}
window.addEvent('domready', imageswapper.init);