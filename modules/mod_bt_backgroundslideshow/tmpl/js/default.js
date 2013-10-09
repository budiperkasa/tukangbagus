var activeContainer = 1;
var currentContainer = 1;
var interval = 0;
var caption = '';
var animating = false;
var seekReady = false;
var player = new Array();
$B =jQuery.noConflict();
$B(window).load(function() {
//$B(document).ready(function() {
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];	
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);						
	$B(bsData.wrapperElement).each(function() {
		$B(this).append($B('#html-control').html());
		$B('#html-control').remove();
		$B('#cp-bg-navigation').show();
		return false;
	});
	
	if(bsData.slideshowSize=="window"){	
		$B('#cp-bg-slide').css('position','fixed');		
	}
	else{
		$B('#cp-bg-slide').css('position','absolute');
		$B(window).bind('load', function() {
			resizeBackground(activeContainer);
		});
	}
	if(bsData.slideshowSize =="window" && bsData.wrapperElement =="body"){	
		$B('#cp-bg-bar').css('position','fixed');
	}
	else{
		$B('#cp-bg-bar').css('position',bsData.navPosition);
	}
	
	$B('#cp-caption-inner').css('position',bsData.navPosition);
	if(bsData.slideshowSize=="wrapper"){
		$B(bsData.wrapperElement).css('position', 'relative');
	}
	
	
	caption = $B('#cp-caption').html();
	$B('#cp-caption').html('');			
	$B("#cp-bg-slide").append('<div class="loading"></div>');
	resizeBackground();
	// load thumbnail image
	if(bsData.navType=='nav-thumb'){
		$B.each(bsData.photos,function(){
			var img = new Image(); 
			img.src =this.image.replace('/original/','/thumbnail/').replace('/slideshow/','/thumbnail/');
		})
	}else if(bsData.navType=='nav-btn'){
		var img = new Image();
		var pathway = bsData.url + '/modules/mod_bt_backgroundslideshow/tmpl/images/';
		img.src = pathway + 'play.png';
		img.src = pathway + 'pause.png';
		img.src = pathway + 'next.png';
		img.src = pathway + 'back.png';
	}
			
			// load main image
			var total = bsData.photos.length;
			var u = 0;
			$B.each(bsData.photos,function(){
				var img = new Image();
				$B(img).load(function (){
					bsData.photos[u].height = img.height;
					bsData.photos[u].width = img.width;
					++u;
					if (u == total) {
						$B("#cp-bg-slide").find('.loading').fadeOut('fast',function(){$B(this).remove()});
						initSlideShow();
					}
				}).error(function () {
					//$B(bsData.wrapperElement).find('.loading').html('Error: loading');
				}).attr('src',this.image);
			})	
			
			
});
function initSlideShow(){
			$B(window).bind('resize', function() {
				resizeBackground(activeContainer);
			});
			$B(bsData.wrapperElement).css('background', 'none');			
			// Backwards navigation
			$B("#cp-back").click(function() {
				stopAnimation($B('#cp-pause').is(':visible'));
				navigate("back");				
			var showhidevideo =parseInt($B('#cp-bg-bar .progress-button').attr('class').replace('progress-button',''));			
				if(showhidevideo == 0){						
						$B(".fr-video").unbind('mouseenter').unbind('mouseleave');
						if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
							pauseVideo(currentContainer);
						}
					}
				else{							
						if ($B('#cp-video'+ activeContainer).is(':hidden') ) {							
							stopAnimation(false);							
							var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');								
							if(autoplay == 1){							
								setTimeout('replayVideo(activeContainer)',1200);
							}
							if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
								pauseVideo(currentContainer);
							}
								
						}
						else{					
							$B(".fr-video").unbind('mouseenter').unbind('mouseleave');		
							 $B("#progress-background").show();
							 if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
								pauseVideo(currentContainer);
								}
							 stopAnimation(true);
						}
					}
				$B('#cp-video'+activeContainer).click(function(){					
					showvideo(activeContainer);	
					var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
						if(autoplay == 1){
							replayVideo(activeContainer);
					}
				});
			
			});
			// Forward navigation
			$B("#cp-next").click(function() {				
				stopAnimation($B('#cp-pause').is(':visible'));
				navigate("next");
				var showhidevideo =parseInt($B('#cp-bg-bar .progress-button').attr('class').replace('progress-button',''));			
				if(showhidevideo ==0){	
					$B(".fr-video").unbind('mouseenter').unbind('mouseleave');
						if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
						pauseVideo(currentContainer);
					}
					}
				else{						
						if ($B('#cp-video'+ activeContainer).is(':hidden') ) {							 
							stopAnimation(false);
							$B('#cp-play').show();
							$B('#cp-pause').hide();														
							var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
							if(autoplay == 1){								
								setTimeout('replayVideo(activeContainer)',1200);
							}
							if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
							pauseVideo(currentContainer);
							}
							
						}
						else{
							$B(".fr-video").unbind('mouseenter').unbind('mouseleave');		
							$B("#progress-background").show();
							$B('#cp-play').hide();
							$B('#cp-pause').show();
							if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
								pauseVideo(currentContainer);
							}
							stopAnimation(true);
						}
						
					}
				$B('#cp-video'+activeContainer).click(function(){					
					showvideo(activeContainer);	
					var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
						if(autoplay == 1){
							replayVideo(activeContainer);
						}
				});
			});
			$B("#cp-pause").click(function() {
				stopAnimation(false);
				$B('#cp-pause').hide();
				$B('#cp-play').show();
			});
			$B("#cp-play").click(function() {
				stopAnimation(true);
				$B("#progress-background").show();	
				$B('#cp-play').hide();
				$B('#cp-pause').show();
			});					
			var first = true;
			var navigate = function(direction) {			
				currentContainer = activeContainer;				
				if (!first) {
				if (direction == "next") {				
					if (activeContainer == bsData.photos.length) {
						activeContainer = 1;
					} else if (activeContainer <= bsData.photos.length) {
						activeContainer += 1;
					}
				} else {
					if (activeContainer == 1) {
						activeContainer = bsData.photos.length;
					} else if (activeContainer <= bsData.photos.length) {
						activeContainer -= 1;
					}
				}				
				}				
				showImage(currentContainer, activeContainer);				
				$B('#cp-video'+activeContainer).click(function(){				
						var shvideo = $B("#slideimgs").attr('rel');
						if(shvideo == 1){							
							$B("#slideimg"+activeContainer+" img").remove();						
						}										
						showvideo(activeContainer);	
						var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
						if(autoplay == 1){						
							setTimeout('replayVideo(activeContainer)',bsData.effectTime);
						}
					});	
					if ($B('#cp-video'+ activeContainer).is(':hidden') ) {
						stopAnimation(false);
							$B('#cp-play').show();
							$B('#cp-pause').hide();	
							$B("#progress-background").hide();
						var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
						if(autoplay == 1){	
						 setTimeout('replayVideo(activeContainer)',bsData.effectTime);
						}						
						if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
							pauseVideo(currentContainer);
						}
					}
				else{
						if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
							pauseVideo(currentContainer);
						}
					}
				
			};			

			var showImage = function(currentContainer, activeContainer) {				
				var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');
				if (!first) {
					var shvideo = $B("#slideimgs").attr('rel');				
					var effecslide = $B("#slideimg" + currentContainer).attr('rel');
					var ssSize = getSlideShowSize();
					var slidewidth = ssSize.width;
					var slideheight= ssSize.height;
					if(effecslide!=''){					
					switch(effecslide){
						case'top':
							if(activeContainer > currentContainer){
							$B("#slideimg" + activeContainer).css({top: '-'+slideheight+'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,top:slidewidth+'px'},1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,top: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});	
							}
							else{							
							$B("#slideimg" + activeContainer).css({top: slideheight+'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,top:'-'+slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,top: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});							
							}
																	
							break;
						case'bottom':
							if(activeContainer > currentContainer){
							$B("#slideimg" + activeContainer).css({top: slideheight+'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,top:'-'+slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,top: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});
							}
							else{
								$B("#slideimg" + activeContainer).css({top: '-'+slideheight+'px'});
								$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,top:slidewidth+'px'},1000);
								$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,top: '0px'}, 1000,function(){												
									if(shvideo ==0){																			
											hidevideo(currentContainer);							
									}
									$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
								});	
							}
							break;
						case'left':	
							if(activeContainer > currentContainer){							
							$B("#slideimg" + activeContainer).css({left:'-'+slidewidth+'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,left:slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,left: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});	
							}
							else{							
							$B("#slideimg" + activeContainer).css({left: slidewidth + 'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,left:'-'+slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,left: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});							
							}
							
							break;
						case'right':
							if(activeContainer > currentContainer){
							$B("#slideimg" + activeContainer).css({left: slidewidth + 'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,left:'-'+slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,left: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});
							}
							else{
							$B("#slideimg" + activeContainer).css({left:'-'+slidewidth+'px'});
							$B("#slideimg" + currentContainer).stop(true).animate( {opacity: 1,left:slidewidth+'px'}, 1000);
							$B("#slideimg" + activeContainer).show().stop(true).animate( {opacity: 1,left: '0px'}, 1000,function(){												
								if(shvideo ==0){																			
										hidevideo(currentContainer);							
								}
								$B('.slideimg[id!="slideimg' + activeContainer+'"]').hide();
							});	
							}
							break;
						default:
							break;
					}
					
					}
					else{
						if(shvideo ==0){	
						$B("#slideimg" + activeContainer + ' .fr-video').hide();
						}
						$B("#slideimg" + currentContainer).fadeOut(bsData.effectTime);
						$B("#slideimg" + activeContainer).fadeIn(bsData.effectTime);
					}						
				} else {					
					activeContainer = currentContainer;
					$B("#slideimg" + activeContainer).show();
					first = false;
				}
				$B("#ytplayer").hide();
				$B(".play-rel").hide();
				$B(".seekbarscroll").hide();
				$B(".mute-btn").hide();
				var shvideo = $B("#slideimgs").attr('rel');
				var itemhover = bsData.wrapperElement;;
				if(shvideo == 1){							
				if ($B('#cp-video'+ activeContainer).is(':hidden') ) {					
							stopAnimation(false);							
							showyoubarvideo(activeContainer);
							$B('#cp-play').show();
							$B('#cp-pause').hide();
							$B("#progress-background").hide();
							$B('#cp-bg-navigation').addClass('spaceimage');							
							$B('.progress-button').addClass('spacebarimage');							
							bindhover();	
					}
					else{					
					var youid = $B("#player"+activeContainer).attr("rel");
					if(youid){
						stopAnimation(false);	
						$B('#cp-video'+ activeContainer).hide();
						$B('#cp-bg-navigation').addClass('spaceimage');
						$B('.progress-button').addClass('spacebarimage');	
						showyoubarvideo(activeContainer);										
						clickvideo(activeContainer);
						bindhover();
					}
					else{
						$B(".fr-video").unbind('mouseenter').unbind('mouseleave');						
						$B(''+itemhover+'').unbind('mouseenter').unbind('mouseleave');
						$B('body').unbind('mouseenter').unbind('mouseleave');
						$B('.progress-button').removeClass('spacebarimage');
						$B('#cp-bg-navigation').removeClass('spaceimage');						
						$B('#cp-play').hide();
						$B('#cp-pause').show();	
					}
					}
				}else{
					$B(''+itemhover+'').unbind('mouseenter').unbind('mouseleave');
					$B('body').unbind('mouseenter').unbind('mouseleave');
					$B('#cp-bg-navigation').removeClass('spaceimage');	
					$B('.progress-button').removeClass('spacebarimage');
					$B('#cp-video'+ activeContainer).show();
					$B('#cp-play').hide();
					$B('#cp-pause').show();	
					$B("#progress-background").show();
				}
				resizeBackground(activeContainer); 
				changeCaption(activeContainer-1);
			};			

			var stopAnimation = function(reset) {			
				progressBarReset();
				clearInterval(interval);
				if (reset) {
					progressBar();
					interval = setInterval(function() {
						navigate("next");
						progressBar();
					}, bsData.slideshowSpeed);
				}
			};
			// We should statically set the first image
			
			navigate("next");

			if (bsData.photos.length > 1) {
				if (bsData.autoPlay) {
					if ($B('#cp-video'+ activeContainer).is(':hidden') ) {
						$B("#slideimg"+activeContainer+" img").hide();
						stopAnimation(false);
					}else{
					stopAnimation(true);
					}
					$B('#cp-pause').show();
					$B('#cp-play').hide();
				} else {
					$B('#cp-pause').hide();
					$B('#cp-play').show();
				}
				$B('#cp-bg-bar').show();
			} 
			
			// control navigation
			if(bsData.navType=='nav-thumb'){
				var widthThumb = $B('#thumbimgs .thumbimg').outerWidth(true);
				var heightThumb = $B('#thumbimgs .thumbimg').outerHeight(true);
				var length = $B('#thumbimgs .thumbimg').length;
				$B('#thumbimgs').width(widthThumb*bsData.thumbNumber);
				$B('#thumbimgs-inner').width(widthThumb*length);
				$B('#thumbimgs').height(heightThumb);
				$B('.nav-btn').css('marginTop',(heightThumb-$B('.nav-btn').height())/2);
				$B("#nav-back").click(function() {				
						if(animating) return;
						animating= true;
						if(parseInt($B('#thumbimgs-inner').css('left')) < 0 ){
							$B('#thumbimgs-inner').stop();
							if(parseInt($B('#thumbimgs-inner').css('left'))+widthThumb <=0){
								$B('#thumbimgs-inner').animate({left: '+='+widthThumb},function(){animating= false;});
							}else{
								$B('#thumbimgs-inner').animate({left: 0},function(){animating= false;});
							}
						}
						else{
							$B('#thumbimgs-inner').animate({left: -1* widthThumb*(length-bsData.thumbNumber)},function(){animating= false;});
						}
						
				});
				$B("#nav-next").click(function() {					
						if(animating) return;
						animating= true;
						if(Math.abs(parseInt($B('#thumbimgs-inner').css('left'))) < widthThumb*(length-bsData.thumbNumber) ){
							$B('#thumbimgs-inner').stop();
							if(Math.abs(parseInt($B('#thumbimgs-inner').css('left'))) < widthThumb*(length-bsData.thumbNumber)){
								$B('#thumbimgs-inner').animate({left: '-='+widthThumb},function(){animating= false;});
							}else{
								$B('#thumbimgs-inner').animate({left: -1* widthThumb*(length-bsData.thumbNumber)},function(){animating= false;});
							}
						}else{
							$B('#thumbimgs-inner').animate({left: 0},function(){animating= false;});
						}
						
				});
				$B('#thumbimgs .thumbimg').click(function(){				
					if(!$B(this).hasClass('active')){						
							stopAnimation(!bsData.stopAuto);							
							currentContainer = activeContainer;
							activeContainer = parseInt($B(this).attr('id').replace('thumbimg',''));							
							showImage(currentContainer,activeContainer );						
					}	
					var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');
					var showhidevideo = $B("#slideimgs").attr('rel');				
					if(showhidevideo == 0){						
						if (!$B('#cp-video'+ activeContainer).is(':hidden') ) {							
							$B("#progress-background").show();	
							stopAnimation(true);
							if ($B('#cp-video'+ currentContainer).is(':hidden')) {					
								pauseVideo(currentContainer);
							}							
						}						
						$B(".fr-video").unbind('mouseenter').unbind('mouseleave');						
					}
					else{				
						if ($B('#cp-video'+ activeContainer).is(':hidden') ) {							
							$B('#cp-bg-navigation').addClass('spaceimage');	
							bindhover();
							showyoubarvideo(activeContainer);
							$B("#progress-background").hide();
							var	autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');
							if(autoplay == 1){								
								setTimeout('replayVideo(activeContainer)',1200);
							}							
							if ($B('#cp-video'+ currentContainer).is(':hidden') ) {							
								pauseVideo(currentContainer);
							}
							stopAnimation(false);							
						}
						else{
							stopAnimation(true);
							if ($B('#cp-video'+ currentContainer).is(':hidden') ) {
								pauseVideo(currentContainer);
							}
							$B("#cp-bg-bar").animate({opacity: "1",bottom :'0px'}, 20);
							$B(".fr-video").unbind('mouseenter').unbind('mouseleave');						
							$B('#cp-bg-navigation').removeClass('spaceimage');							
							$B("#progress-background").show();							
														
						}
					}						
					
					$B('#cp-video'+activeContainer).click(function(){						
						showvideo(activeContainer);												
						if(autoplay == 1){
							replayVideo(activeContainer);
						}
					});						
				});				
			}			
		var showvideo =(function(activeContainer){					
					$B("#slideimg" + activeContainer + ' .fr-video').show();
					showyoubarvideo(activeContainer);
					$B("#progress-background").hide();							
					$B('#cp-video'+ activeContainer).hide();
					$B('#cp-play').show();
					$B('#cp-pause').hide();
					$B('#cp-bg-navigation').addClass('spaceimage');	
					$B('.progress-button').addClass('spacebarimage');	
					stopAnimation(false);					
					clickvideo(activeContainer);					
					   //onYouTubePlayerAPIReady();
										
			});
		var hidevideo = (function(activeContainer){				
				$B("#slideimg" + activeContainer + ' .fr-video').hide();
				 stopAnimation(true);	
			});					
		controlPosition();
}

function onYouTubePlayerAPIReady() {
	$B('.fr-video').each(function(){
		$player = $B('.player', this);
		var ytid = $player.attr('rel');	
		var id = $player.attr('id').replace('player','');		
		player[id] = new YT.Player('player'+ id, {		
			height: '100%',
			width: '100%',
			videoId: ytid,
			playerVars: {
				'controls': 0,
				'autoplay': 0,
				'hd': 1,
				'modestbranding':1,
				'showinfo':0
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange		
			}		
		});			
	});	
}

var clickvideo = (function(activeContainer){
			$B('#play-pause-btn'+activeContainer).click(function() {					
						playPause(activeContainer);
					});
					$B('#seekbar'+activeContainer).click(function(e) {					
						if(!seekReady) return;
						else {
							var navposition = bsData.navPosition;
							if(navposition =="absolute"){
							var itemhover = bsData.wrapperElement;					
							wSize = $B(''+itemhover+'').width();
							}
							else{
							wSize = $B(window).width();
							}
							var localX = (e.pageX - $B(this).offset().left) - 17;							
							if(localX >  (wSize-95)) localX =  (wSize-95);						
							var percent = localX /  (wSize-95);
							seekToPercent(percent);
						}
					});
					$B('#mute-btn'+activeContainer).click(function() {					
						 toggleSound();
					});	
					var	autohidebar = $B("#ytplayer").attr('rel');
					var heightthumb = (bsData.thumbHeight +40);					
					if(autohidebar ==1){					
						$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
						setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :"-'+heightthumb+'px"}, 800);', 5000);
					}
					else{
						$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
					}
					bindhover();
});
var i = null;
var bindhover = (function(){	
	$B('.fr-video').bind({
		mouseenter: function() {		
			clearTimeout(i);
			$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
			// i = setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "0.4",bottom :"-100px"}, 1400);', 3500);
		},		
		mouseleave:function(){
			var heightthumb = (bsData.thumbHeight +40);	
				clearTimeout(i);
				i = setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :"-'+heightthumb+'px"}, 1000);', 500);
	   }
	  });	
	  $B("#cp-bg-bar").bind({
	  mouseenter :function() {
				clearTimeout(i);
			$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
		}
		});

});
var showyoubarvideo =(function(activeContainer){
	$B("#play-pause-btn"+activeContainer).show();	
	$B("#seekbar"+activeContainer).show();	
	$B("#mute-btn"+activeContainer).show();
	$B("#ytplayer").show();
	//$B("#ytplayer").css({'margin-bottom':'40px'});
	var	autohidebar = $B("#ytplayer").attr('rel');
	var navposition = bsData.navPosition;
	var itemhover = bsData.wrapperElement;
	var heightthumb = (bsData.thumbHeight +40);
	$B(''+itemhover+'').css({'overflow':'hidden'});
	if(autohidebar == 1){
	if(navposition == 'absolute'){	
			if(itemhover!= ""){
				$B(''+itemhover+'').bind({
				mouseenter: function() {		
					clearTimeout(i);					
					$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
					// i = setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "0.4",bottom :"-100px"}, 1400);', 3500);
				},
				mousemove:function(p){
					clearTimeout(i);
					$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);					 
				},
				mouseleave:function(){		
					clearTimeout(i);
					i = setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :"-'+heightthumb+'px"}, 1000);', 500);
			   }
				
			});
			}
		}
		else{
			$B('body').bind({
				mouseenter: function() {		
					clearTimeout(i);
					$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
					// i = setTimeout('$B("#cp-bg-bar").stop(true).animate({opacity: "0.4",bottom :"-100px"}, 1400);', 3500);
				},
				mousemove:function(p){
					clearTimeout(i);
					$B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'0px'}, 800);
					 
				},
				mouseleave:function(){
					var heightthumb = (bsData.thumbHeight +40);
						clearTimeout(i);						
					 $B("#cp-bg-bar").stop(true).animate({opacity: "1",bottom :'-'+heightthumb+'px'}, 1000);
			   }
				
			});
		}
	}
});

function onPlayerReady(event) {
	var autoplay = 0;	
	var	volume = $B("#mute-btn"+activeContainer).attr('rel');
	var	quality = $B("#seekbar"+activeContainer).attr('rel');		
        event.target.setVolume(volume);
		event.target.setPlaybackQuality(quality);
	if(autoplay == 0){
		event.target.stopVideo();
	}
	else{
		event.target.playVideo();
	}
	if ($B('#cp-video'+ activeContainer).is(':hidden') ) {				 
		 var autoplay = $B("#play-pause-btn"+activeContainer).attr('rel');							
			if(autoplay == 1){					
					replayVideo(activeContainer);
			}
	}
 } 
 var done = false;
function onPlayerStateChange(event) { 
     switch(event.data){
	   case -1: // unstarted
			return;
		case 0: // ended
			resetPlayer();
			$B("#progress-background").show();			
			//stopAnimation(true);
			$B('#cp-next').click();
			$B('#nav-next').click();			
			return;
		case 1: // playing			
			seekReady = true;
			$B('#play-pause-btn'+activeContainer).css('background-position', '0px -40px');
			playheadInterval = setInterval(updatePlayhead, 10);			
			return;
		case 2: // paused
			$B('#play-pause-btn'+activeContainer).css('background-position', '0px 0px');
				//clearInterval(playheadInterval);
			return;
		case 3: // buffering
			$B('#play-pause-btn'+activeContainer).css('background-position', '0px 0px');
			return;
		case 5: // video cued
			resetPlayer();
			ready = true;
			return;
	}
 }
 
var updatePlayhead = function(){
	if(typeof (player[activeContainer])!= "undefined"){
		if(typeof(player[activeContainer].getCurrentTime())== 'function') {
			clearInterval(playheadInterval);
			return;
		}
		var navposition = bsData.navPosition;
		if(navposition =="absolute"){
			var itemhover = bsData.wrapperElement;					
			wSize = $B(''+itemhover+'').width();
		}else{
		wSize = $B(window).width();
		}
		var percentage = player[activeContainer ].getCurrentTime() / player[activeContainer].getDuration();
		$B('#seekbar'+activeContainer).css('background-position', Math.round(percentage * (wSize-95)) + 'px 0px');
		}
}

 var resetPlayer = function() {
	clearInterval(playheadInterval);
	$B('#play-pause-btn'+activeContainer).css('background-position', '0px 0px');
	$B('#seekbar'+activeContainer).css('background-position', '0px 0px');	
}

var seekToPercent = function(percent) {
	var time = percent * player[activeContainer].getDuration();
	player[activeContainer].seekTo(time, true);
}

var toggleSound = function() {
	if(player[activeContainer].isMuted()) {
		player[activeContainer].unMute();
		$B('#mute-btn'+activeContainer).css('background-position', '0px 0px');
	} else {
		player[activeContainer].mute();
		$B('#mute-btn'+activeContainer).css('background-position', '0px -40px');
	}
}

function pauseVideo(activeContainer) {
  if(typeof (player[activeContainer])!= "undefined"){
	if(typeof(player[activeContainer].pauseVideo())!= 'function'){
		player[activeContainer].pauseVideo();
	}
 }
} 

function replayVideo(activeContainer) {
 if(typeof (player[activeContainer])!= "undefined"){
	if(typeof(player[activeContainer].playVideo()) != 'function'){
        player[activeContainer].playVideo();
	}		
  }		
 }
 
function stopVideo() {
        player[activeContainer].stopVideo();
  }	
  
var playPause = function(activeContainer) {
	var index = activeContainer  ;
	if(typeof(player[index].getPlayerState()) != 'function'){
		player[index].playVideo();
	}
	switch(player[index].getPlayerState() ) {
			case -1: // unstarted
			case 0: // ended
			case 2: // paused
			case 5: // cued
				player[index].playVideo();
				return;
			case 1: // playing
				player[index].pauseVideo();
				return;
			default:
				return;
		}
}
function changeCaption(index) {
	// change caption
	var photoObj = bsData.photos[index];
	$B('#cp-caption').fadeOut(function() {
		
		if(!photoObj.desc && !photoObj.title){
			$B("#cp-caption").html('');
			return;
		}
		$B("#cp-caption").html(caption);
		if ($B("#cp-caption .cp-link").length && photoObj.link != '') {
			$B("#cp-caption .cp-link").html(photoObj.title);
			$B("#cp-caption .cp-link").attr('href', photoObj.link);
			$B("#cp-caption .cp-link").attr('target', photoObj.target);
		} else {
			$B("#cp-caption .cp-title").html(photoObj.title);
		}
		if(photoObj.desc){
			$B("#cp-caption .cp-desc").html(photoObj.desc);
		}else{
			$B("#cp-caption .cp-desc").remove();
		}
		
		$B("#cp-caption").fadeIn(bsData.effectTime);
	});
	
	// change navigation
	if(bsData.navType=='nav-thumb'){
		index++;
		//var oldIndex = $B('#thumbimgs .active').attr('id') + '';
		//oldIndex = parseInt(oldIndex.replace('thumbimg',''));
		$B('#thumbimgs .thumbimg').removeClass('active');
		$B('#thumbimg'+index).addClass('active');
		var width= $B('#thumbimgs .active').outerWidth(true);
		var left = $B('#thumbimgs .active').position().left +  $B('#thumbimgs .active').outerWidth(true);
		var step = Math.round(($B('#thumbimgs .active').position().left+$B('#thumbimgs-inner').position().left)/width);
		if(step>=bsData.thumbNumber){
			move = width * (step- bsData.thumbNumber+1);
			$B('#thumbimgs-inner').animate({left: '-='+move});
		}
		if(step<0){
			move = -1 * width * step ;
			$B('#thumbimgs-inner').animate({left: '+='+move});
		}
	}
}

/** * CHANGE IMAGE SIZE ** */
function resizeBackground(index) {
	var el = "#slideimg" + index + ' img';
	$B('#cp-bg-slide').css({ 'width' : 'auto', 'height' : 'auto' });
	var ssSize = getSlideShowSize();
	wSize = ssSize.width + 'px';
	wHeight = ssSize.height + 'px';
	var hAlign = false;
	var vAlign = true;
	var img = bsData.photos[index-1];
	if($B(el).length){
		switch(bsData.resizeImage){
			case 'fitwidth':
				$B("#slideimgs img").css({ 'width' : wSize, 'height' : 'auto' });
				break;
			case 'fitheight':
				$B("#slideimgs img").css({ 'width' : 'auto', 'height' : wHeight });
				hAlign = true;
				vAlign = false;
				break;
			case 'stretch':
				$B("#slideimgs img").css({ 'width' : wSize, 'height' : wHeight });
				vAlign = false;
				break;
			case 'auto':
				if (ssSize.width * parseInt(img.height)	/ parseInt(img.width) < ssSize.height) {
					$B(el).css({'width' : 'auto', 'height' : wHeight });
					hAlign = true;
					vAlign = false;
				}else{
					$B(el).css({ 'width' : wSize, 'height' : 'auto' });
				}
				break;
			default:
				hAlign=true;
		}
	}

	if(bsData.slideshowSize!="window" && bsData.navPosition =='absolute'){
	var shvideo = $B("#slideimgs").attr('rel');
		if(shvideo == 1){		
			$B('#cp-bg-bar').css({'bottom':'0px'});
		}else{
			$B('#cp-bg-bar').css({'top':ssSize.height - $B('#cp-bg-bar').height()});			
		}
	} 
	
	$B('#cp-bg-slide').css({ 'width' : wSize, 'height' : wHeight });
	controlPosition();
	$B(el).css('position','absolute');
	if(hAlign){
		switch(bsData.hAlign){
			case 'l':
				$B(el).css('left',0);
				break;
			case 'r':
				$B(el).css({'left':'auto','right':0});
				break;
			case 'c':
				$B(el).css('left',((ssSize.width-$B(el).width())/2));
				break;
		}
	}else{
		$B(el).css('left',0);
	}
	if(vAlign){
		switch(bsData.vAlign){
			case 't':
				$B(el).css('top',0);
				break;
			case 'b':
				$B(el).css({'top':'auto','bottom':0});
				break;
			case 'm':
				$B(el).css('top',((ssSize.height-$B(el).height())/2));
				break;
		}
	}else{
		$B("#slideimg" + index).css('top',0);
	}	
}
function progressBar() {
	
	var ssSize = bsData.navPosition =='fixed'? {width:$B(window).width(),height:$B(window).height()}: getSlideShowSize();
	$B('#progress-bar,progress-background').width(ssSize.width+'px');
	$B('#progress-bar').stop()
			.animate({ left : -ssSize.width }, 0)
			.animate({ left : 0 }, bsData.slideshowSpeed);
}
function progressBarReset() {
	var ssSize = bsData.navPosition =='fixed'? {width:$B(window).width(),height:$B(window).height()}: getSlideShowSize();
	$B('#progress-bar').stop().css('left', -ssSize.width);
}
function preloadImage(photos) {
	//var img = new Image();
	//img.src = bsData.url + '/modules/mod_bt_backgroundslideshow/tmpl/images/loading.gif';
}
function controlPosition(ssSize){
	// control button 
	var ssSize = bsData.navPosition =='fixed'? {width:$B(window).width(),height:$B(window).height()}: getSlideShowSize();
	var el = '';
	if(bsData.navType=='nav-btn'){
		el = '.progress-button';
	}
	else if(bsData.navType=='nav-thumb'){
		el = '#cp-bg-navigation';
	}else{
		return;
	}
	if(bsData.navAlign == 'left'){
		$B(el).css('left','0');
	}
	else if(bsData.navAlign == 'right'){
		$B(el).css('right','0');
		
	}else if(bsData.navAlign == 'center'){
		$B(el).css('left',(ssSize.width - $B(el).width())/2);
	}
}
function getSlideShowSize(){
	switch(bsData.slideshowSize){
		case 'document':
			return {width:$B(document).width(),height:$B(document).height()};
		case 'wrapper':
			return {width:$B(bsData.wrapperElement).innerWidth(),height:$B(bsData.wrapperElement).innerHeight()};
		case 'specific':
			return {width:bsData.slideshowWidth,height:bsData.slideshowHeight};
		default:
			return {width:$B(window).width(),height:$B(window).height()};
	}
};
