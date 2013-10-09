(function($){
	$(window).ready(function(){
		el = $('#home-scroll');
		el.css({'position':'absolute','top':0,'left':0});
		$('#imgLoading').hide();
		$('#home-container').css('visibility','visible');
		var width = el.parent().outerWidth();
		var size = el.children().size();
		el.width(width* size);
		el.children().css({'float':'left','width':width});
		var active = 0;
		var hash = document.location.hash.substring(1);
		if(hash){
			active = el.find('.'+hash).index();
			el.css('left',-1*active*width);
		}
		var timeout = 0;
		$(window).resize(function(){
			clearTimeout(timeout)
		timeout = setTimeout(function(){
			width = el.parent().outerWidth();
			el.width(width* size);
			el.children().css({'float':'left','width':width});
			el.parent().animate({height:el.children(':eq('+active+')').outerHeight()},500,'easeOutExpo');
			el.css('left',-1*active*width);
			
			width_sidebar = $('.sidebar-footer .container .sidebar').css({'position':'relative','cursor':'text'}).width()/size;		
			$('.active-sidebar').css({'width':width_sidebar,'left':width_sidebar*active});
		},200)
		})
		el.parent().height(el.children(':eq('+active+')').outerHeight());
		// process nav

		if(hash){
			$('#pagenav li').removeClass('active');
			$('#pagenav li.'+hash).addClass('active');
		}
		$('#pagenav li a').click(function(e){
			var hash = this.hash.substring(1);
			document.location.hash=hash;
			if(el.length){
				active = el.find('.'+hash).index();
				slideAnimate(true);
				
			}
			e.preventDefault();
			return false;
		});
		if(el.length){
			$('.sidebar').click(function(ev){
				var distance = ev.clientX - jQuery('.sidebar').offset().left;
				active = Math.ceil(distance/width_sidebar)-1;
				$('.active-sidebar').stop().animate({'left':width_sidebar*active},300,'easeOutExpo',function(){barLeft =$('.active-sidebar').position().left;});
				slideAnimate(false);
			})
			$('.sidebar-left').css('cursor','pointer').click(function(){
				swipe('left');
			});
			$('.sidebar-right').css('cursor','pointer').click(function(){
				swipe('right');
			});
			var width_sidebar = $('.sidebar-footer .container .sidebar').css('position','relative').width()/size;					
			$('.active-sidebar').css({'width':width_sidebar,'position':'absolute','cursor':'pointer','left':width_sidebar*active});
			var barHammer = new Hammer($('.active-sidebar').get(0),{prevent_default:true});
			var barLeft =$('.active-sidebar').position().left;

			barHammer.ondrag = function(ev){
				var move = null;
				if(ev.direction == 'left' && barLeft - ev.distance >= 0){
					move = barLeft - ev.distance;
				
				}
				if(ev.direction == 'right' && barLeft + ev.distance <= width_sidebar*(size-1)){
					move = barLeft + ev.distance;
				}	
				if(move!=null){
					$('.active-sidebar').css('left',move);
					var newActive = Math.round(move/width_sidebar);
					if(newActive != active){
						active = newActive;
						slideAnimate(false);
					}
				}
			}
			barHammer.ondragend = function(ev){
				barLeft =$('.active-sidebar').position().left;
				$('.active-sidebar').stop().animate({'left':width_sidebar*active},300,'easeOutExpo',function(){barLeft =$('.active-sidebar').position().left;});
			}
		}
		function swipe(direction){
			if(direction == 'right'){
				active --;
			}
			else{
				active ++;
			}
			if(active < 0 ){
				active = 0;
				el.animate({'left':'+=250'},300,'easeOutExpo',function(){
					el.animate({'left':0},500);
				});
				return;
			}
			if(active >= size){ 
				active = size-1;
				el.animate({'left':'-=250'},300,'easeOutExpo',function(){
					el.animate({'left':-1*active*width},500);
				});
				return;
			}
			slideAnimate(true);
		}
		function slideAnimate(animateBar){
			$('#pagenav li.active').removeClass('active');
			$('#pagenav li.'+el.children(':eq('+active+')').attr('class')).addClass('active');
			document.location.hash='#home'+(active+1);
			el.animate({'left':-1*width*active},500,'easeOutExpo',function(){
				el.height(el.children(':eq('+active+')').outerHeight());
				el.parent().height(el.children(':eq('+active+')').outerHeight());
			});
			if(animateBar){
				$('.active-sidebar').stop().animate({'left':width_sidebar*active},300,'easeOutExpo',function(){barLeft =$('.active-sidebar').position().left;});
			}
		}
		

	});	
})(jQuery)