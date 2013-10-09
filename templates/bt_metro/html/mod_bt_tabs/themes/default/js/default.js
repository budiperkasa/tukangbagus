
jQuery.noConflict();
if (typeof( BTT ) == 'undefined'){
	var BTT = jQuery;
}
//defined global variable 
var BTTVariable = {
	 hoverTimeout 	: 0,
	 widthTabButton : new Array(),
	 next 			: new Array(),
	 prev 			: new Array(),
	 spaceRight 	: new Array(),
	 spaceLeft 		: new Array(),
	 clickLeft 		: new Array(),
	 clickRight 	: new Array(),
	 heightTab 		: new Array(),
	 widthTab 		: new Array(),
	 spaceTop 		: new Array(),
	 spaceBottom 	: new Array(),
	 clickUp 		: new Array(),
	 clickDown 		: new Array(),
	 up 			: new Array(),
	 down 			: new Array(),
	 lengthTabs 	: new Array(),
	 height 		: new Array(),
	 width 			: new Array()
};

BTT(document).ready(function() {
	
	for(var iOption = 0; iOption<BTTOptArr.length; iOption++){
		if(BTTOptArr[iOption].LAYOUT == "default"){
	/*	create start value for all variable */
			var widthTabButtonElement = new Array();
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .tab-container li").each(function(index){
					widthTabButtonElement[index]= BTT(this).outerWidth();			
				});
			// for top and bottom position of title bar	
			BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB]= widthTabButtonElement; 
			
			BTTVariable.next[BTTOptArr[iOption].ID_TAB] = -1;
			
			BTTVariable.prev[BTTOptArr[iOption].ID_TAB] = -1;
			
			BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.spaceLeft[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.clickLeft[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.clickRight[BTTOptArr[iOption].ID_TAB] = 0;
			
			// for left and right position of title bar
			BTTVariable.up[BTTOptArr[iOption].ID_TAB] = -1;
			
			BTTVariable.down[BTTOptArr[iOption].ID_TAB] = -1;
			
			BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.spaceBottom[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.clickUp[BTTOptArr[iOption].ID_TAB] = 0;
			
			BTTVariable.clickDown[BTTOptArr[iOption].ID_TAB] = 0;
			
	
		/**
		 * Set position for tab title
		 */
			switch (BTTOptArr[iOption].POSITION){
			case "top":
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("width","100%");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("height","42px");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("position","relative");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("position","absolute");		
				if(BTTOptArr[iOption].HEIGHT == 'auto'){
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").css('width','auto');//height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight());
				}else{
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(Number(BTTOptArr[iOption].HEIGHT)-BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul").height());
				}
				//BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").height(Number(BTTOptArr[iOption].HEIGHT)-BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul").height() - 30);

				//set width for tab item
				if(BTTOptArr[iOption].EFFECT == 'slide' && BTTOptArr[iOption].TYPE_SLIDE == 'horizontal' ){
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").width(BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").width()-20);
				}else{
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").css('width','100%');
				}
				
				break;
			case "bottom":
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("position","relative");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("position","absolute");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("height","42px");
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("width","100%");
				BTT(BTTOptArr[iOption].ID_TAB+" .tab-container").addClass("btt_tab_btn_bottom");
				if(BTTOptArr[iOption].HEIGHT == 'auto'){
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").css('width','auto');//height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight());
				}else{
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(Number(BTTOptArr[iOption].HEIGHT)-BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul").height());
				}
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").height(Number(BTTOptArr[iOption].HEIGHT)-BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul").height()-30);
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").width(BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").width()-20);
					
			  break;
			case "left":
				// set height for all element in module
				if(BTTOptArr[iOption].HEIGHT == "auto"){
					// if height ul button > height tab item
					if((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 43 +1)> BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight()){
						//BTT(BTTOptArr[iOption].ID_TAB).height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 43 +1));
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 43 -1));
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42));
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div.active").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42)-30);
					}else{
						//BTT(BTTOptArr[iOption].ID_TAB).height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight());
						heightTabButtons = 0;
						BTT(BTTOptArr[iOption].ID_TAB + ' .tab-container > li').each(function(){
							heightTabButtons += BTT(this).outerHeight(true);
						});
						if(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight(true)+ 30 > heightTabButtons){
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight(true)+ 30);
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight()+30);		 	
						}else{
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").height(heightTabButtons);
						}
					}
				}else{
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(BTTOptArr[iOption].HEIGHT);
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").height(Number(BTTOptArr[iOption].HEIGHT)-30);
				}
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("float","none");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("border-bottom","1px solid #d1d1d1");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").css("float","left").css("height","100%");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-container").css("height",(BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42));
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").css("float","left");
				
				// set width for tab-items by percent
				var widthForItems =  1 - BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").width()/BTT( BTTOptArr[iOption].ID_TAB+" .bt-tabs").width();
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").css( 'width' , (100*widthForItems -1.5) + '%' );
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").css('width' , (100*(1-widthForItems)+1.5) + '%');
				
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").width(BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").width()-20);
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li.active").css("border-right","none");		
				break;
			case "right":
				if(BTTOptArr[iOption].HEIGHT != 'auto'){
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(BTTOptArr[iOption].HEIGHT);
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").height(Number(BTTOptArr[iOption].HEIGHT)-30);
				}else{
					if((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 43 +1)> BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight()){
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 43 -1));
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42));
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div.active").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42)-30);
					}else{
						//BTT(BTTOptArr[iOption].ID_TAB).height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight());
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight()+30);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div  > div.active").outerHeight()+30);
					}
		
				}
				//BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").width();
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("border-left","1px solid #d1d1d1");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("border-right","none");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("float","none");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").css("border-bottom","1px solid #d1d1d1");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").css("float","right").css("height","100%");
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-container").css("height",(BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li").length * 42));
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").css("float","right");
				
				// set width for tab-items by percent
				var widthForItems =  1 - BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").width()/BTT( BTTOptArr[iOption].ID_TAB+" .bt-tabs").width();
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").css( 'width' , (100*widthForItems -1) + '%' );
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons").css('width' , (100*(1-widthForItems)+1) + '%');
				//BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").width( BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs").width()-BTT(BTTOptArr[iOption].ID_TAB+" .tab-buttons").width());
				
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").width(BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").width()-20);
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-buttons ul li.active").css("border-left","none");
				break;
			}
			
			//creat array contain width of tab item.
			var widthTabElement = new Array();
			BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
				widthTabElement[index]= BTT(this).outerWidth();			
			});
			BTTVariable.widthTab[BTTOptArr[iOption].ID_TAB]=widthTabElement;
			
		//creat array contain height of tab item.
			var heightTabElement = new Array();
			BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
				heightTabElement[index]= BTT(this).outerHeight();			
			});
			BTTVariable.heightTab[BTTOptArr[iOption].ID_TAB]=heightTabElement; 
			
			//re get it when window resize
			BTT(window).resize({Option:BTTOptArr[iOption]},function(e){
				
				//reset width of tab item if Dimensional sliding is horizontal
				if(e.data.Option.EFFECT == 'slide' ||  e.data.Option.EFFECT == 'fade'){
					BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div").width(BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items").width()-20);
					
					
					if((e.data.Option.POSITION == 'left' || e.data.Option.POSITION == 'right')&& e.data.Option.HEIGHT == 'auto')
					{
						var  heightOfTitleBar = 0;
						BTT(e.data.Option.ID_TAB + ' .tab-buttons ul li').each(function(){
							heightOfTitleBar += BTT(this).outerHeight(true);
						});
						if(heightOfTitleBar < BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div.active").outerHeight()){
							BTT(e.data.Option.ID_TAB+" .bt-tabs ").height(BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div.active").outerHeight());
						}else{
							BTT(e.data.Option.ID_TAB+" .bt-tabs ").height(heightOfTitleBar);
							//BTT(e.data.Option.ID_TAB+" .bt-tabs .bt-buttons").height(heightOfTitleBar);
							//BTT(e.data.Option.ID_TAB+" .bt-tabs .bt-buttons ul").height(heightOfTitleBar);
							BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div.active").height( heightOfTitleBar);
						}
						BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items").height(BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div.active").height());
					}
					
					
					index = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").index();
					if(e.data.Option.TYPE_SLIDE == 'horizontal'){
						//reset position of content tab if effect is slide and Dimensional sliding is horizontal
						index = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").index();
						var move = 0;
						for( i = 0;i< index; i++){						
							move = move + BTTVariable.widthTab[e.data.Option.ID_TAB][i];
						}
						BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
						BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({left:-move},0);
					}else if(e.data.Option.EFFECT == 'slide' && e.data.Option.TYPE_SLIDE == 'vertical' ){
						var move = 0;
						for( i = 0;i< index; i++){						
							move = move + BTTVariable.heightTab[e.data.Option.ID_TAB][i];
						}
						BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
						BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({top:-move},0);
					}
				}
				// for map of width
				BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
					widthTabElement[index]= BTT(this).outerWidth();			
				});
				BTTVariable.widthTab[e.data.Option.ID_TAB]=widthTabElement;
				
				//for map of height
				BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
					heightTabElement[index]= BTT(this).outerHeight();			
				});
				BTTVariable.heightTab[e.data.Option.ID_TAB]=heightTabElement;
				
				
				
			});
			
		
		
		//show first tab
			BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div.active").show();
			
			if(BTTOptArr[iOption].TYPE_SLIDE=="horizontal"){
				widthWrapTab = 0;
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
					widthWrapTab =widthWrapTab + BTT(this).outerWidth();			
				});		
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div").width(widthWrapTab);
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div").height(200)//BTT(BTTOptArr[iOption].ID_TAB+ " .tab-items").height());
				
				//reset it when window resize 
				BTT(window).resize({Option:BTTOptArr[iOption]},function(e){
					BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div > div").each(function(index){
						widthWrapTab =widthWrapTab + BTT(this).outerWidth();			
					});		
					BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div").width(widthWrapTab);
					BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-items > div").height(BTT(e.data.Option.ID_TAB+ " .tab-items > div > div.active").height());
				});
				BTT( BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-items > div > div").css("float","left");
			}
		/**
		 * Setup event
		 */
			/*-----------------------CLICK-----------------------------------------*/
			if(BTTOptArr[iOption].EVENT=="click"){
				BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .tab-container >li").click({Option:BTTOptArr[iOption]},function(e){
					//if effect is FADE
					if(e.data.Option.EFFECT=="fade"){
						BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div").css("position","absolute");
						if(BTT(this).hasClass("active")==false){
							BTT( e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .tab-container >li.active").removeClass("active");
							BTT(this).addClass("active");
							index = BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .tab-container >li.active").index();
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div").stop(true, true);					
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").fadeOut(BTTOptArr.DURATION,function(){
								BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div  > div.active").removeClass("active");
								BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items> div > div").get(index)).addClass("active");
								BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").fadeIn(e.data.Option.DURATION);	
							});		

							newHeight = BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items> div > div").get(index)).outerHeight();
							if(e.data.Option.HEIGHT=="auto"){
								BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items").height(newHeight);
							}
							if(e.data.Option.POSITION =="left"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-right","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-right","none");
								
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight(true);
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}else if(e.data.Option.POSITION=="right"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-left","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-left","none");
								
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight();
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs ").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
								
							}
						}
				// IF effect is SLIDE
					}else{
						if(BTT(this).hasClass("active")==false){
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").removeClass("active");
							BTT(this).addClass("active");
							index = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").index();
							//reset position for wrap tabItem and tabItem
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").css("position","absolute");
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div >div ").css("position","static");
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div >div ").css("display","block");
							
							var move = 0;
							if(e.data.Option.TYPE_SLIDE == "vertical"){
								for( i = 0;i< index; i++){						
									move = move + BTTVariable.heightTab[e.data.Option.ID_TAB][i];
								}
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({top:-move},e.data.Option.DURATION);
							}else{			
								for( i = 0;i< index; i++){						
									move = move + BTTVariable.widthTab[e.data.Option.ID_TAB][i];
								}
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({left:-move},e.data.Option.DURATION);
							}
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").removeClass("active");					
							BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div").get(index)).addClass("active");
							newHeight = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items> div > div.active").outerHeight(true);
							if(e.data.Option.HEIGHT == "auto"){
								BTT(e.data.Option.ID_TAB + " .bt-tabs > div.tab-items").height(BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div.active").outerHeight());
							}					
							if(e.data.Option.POSITION =="left"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-right","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-right","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight(true);
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}else if(e.data.Option.POSITION=="right"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-left","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-left","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight();
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
								
							}
						}
					}
				});
			}else{	/*-----------------------HOVER-----------------------------------------*/
				BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-buttons .tab-container >li").bind("mouseenter",{Option: BTTOptArr[iOption]},function(e){
					if(e.data.Option.EFFECT=="fade"){
						BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div").css("position","absolute");
						BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items").height(BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div.active").innerHeight());
						if(BTT(this).hasClass("active")==false){
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container >li.active").removeClass("active");
							BTT(this).addClass("active");
							index = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container >li.active").index();
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div ").stop(true, true);
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").fadeOut(e.data.Option.DURATION,function(){
								BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div  > div.active").removeClass("active");
								BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items> div > div").get(index)).addClass("active");
								BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").fadeIn(e.data.Option.DURATION);	
							});				
							newHeight = BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items> div > div").get(index)).outerHeight();
							if(e.data.Option.HEIGHT == "auto"){
								BTT(e.data.Option.ID_TAB + " .bt-tabs > div.tab-items").height(newHeight);
							}
							if(e.data.Option.POSITION =="left"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-right","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-right","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight(true);
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}else if(e.data.Option.POSITION=="right"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-left","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-left","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight();
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}
						}
					}else{//========== For SLIDE effect===============
						if(BTT(this).hasClass("active")==false){
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").removeClass("active");
							BTT(this).addClass("active");
							index = BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .tab-container > li.active").index();
							//reset position for wrap tabItem and tabItem
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").css("position","absolute");
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div >div ").css("position","static");
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div >div ").css("display","block");
							
							var move = 0;
							if(e.data.Option.TYPE_SLIDE == "vertical"){
								for( i = 0;i< index; i++){						
									move = move + BTTVariable.heightTab[e.data.Option.ID_TAB][i];
								}
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({top:-move},e.data.Option.DURATION);
							}else{			
								for( i = 0;i< index; i++){						
									move = move + BTTVariable.widthTab[e.data.Option.ID_TAB][i];
								}
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").stop();
								BTT( e.data.Option.ID_TAB + " .bt-tabs .tab-items > div ").animate({left:-move},e.data.Option.DURATION);						
							}
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div.active").removeClass("active");					
							BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-items > div > div").get(index)).addClass("active");	
							newHeight = BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div.active").innerHeight();
							if(e.data.Option.HEIGHT == "auto"){
								BTT(e.data.Option.ID_TAB + " .bt-tabs > div.tab-items").height(BTT(e.data.Option.ID_TAB+" .bt-tabs > div.tab-items > div > div.active").innerHeight());
							}					
							if(e.data.Option.POSITION =="left"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-right","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-right","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight(true);
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}else if(e.data.Option.POSITION=="right"){						
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li").css("border-left","1px solid #d1d1d1");
								BTT(e.data.Option.ID_TAB+" .tab-buttons ul li.active").css("border-left","none");
								var heightOfUl = 0;
								BTT(e.data.Option.ID_TAB+ " .tab-buttons ul li").each(function(){
									heightOfUl += BTT(this).outerHeight();
								});
								if(e.data.Option.HEIGHT=="auto"){
									if(heightOfUl < newHeight){
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(newHeight);
									}else{
										BTT(e.data.Option.ID_TAB+" .bt-tabs").height(heightOfUl);
									}
								}
							}
						}
					}
				});
			}
			
/*===================================	END SETTING FOR SELECT TAB	======================================*/			
			
			
			
		/**
		 *  create and set width for next-pre button tab
		 *  
		 */
			
			switch (BTTOptArr[iOption].POSITION){
				case "top":
					//check to set width for button container
					var widthTabContainer = 0;		
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").each(function(){
						widthTabContainer = widthTabContainer + BTT(this).outerWidth();
					})
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ").append('<div class="next-left"></div><div class="next-right"></div>');
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").hide();
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").hide();
					
					if(widthTabContainer  > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").width()){
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").width(widthTabContainer);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").show();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").show();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-top","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-left","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-top","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-right","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("left","20px");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
						// find tab button at the end right of tab_container
						
						for(i=0; i< BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB].length; i++){
							if( BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] <= BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
								BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] +=BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB][i];
								if(BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
									BTTVariable.next[BTTOptArr[iOption].ID_TAB] = i;
									break;
								}else if(BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] == BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
									if(i+1<BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB].length)
									{	
										BTTVariable.next[BTTOptArr[iOption].ID_TAB] = i+1; 
										BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] += BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB][i+1];
										break;
									}
								}
							}
						}
						BTT(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-buttons ul.tab-container li").get(BTTVariable.next[BTTOptArr[iOption].ID_TAB])).addClass("window");
						
					}	
						// NEXT LEFT BUTTON CLICK						
						if(BTTOptArr[iOption].EFFECT_TITLE == "click"){
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind(
								"click",
								{Option	:BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
									if(left<=20){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").removeClass("next-right-inactive");
												if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 1){	
													//bien do khoang cach giua left và right 
													midLR = 0;
													if(BTTVariable.next[e.data.Option.ID_TAB]< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length -1){
														BTTVariable.next[e.data.Option.ID_TAB] = BTTVariable.next[e.data.Option.ID_TAB] -1;
													}
													for(i= BTTVariable.next[e.data.Option.ID_TAB]; i >= 0; i--){
														if( midLR <= width_tab_buttons ){
															midLR +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
															if(midLR > width_tab_buttons -40){
																BTTVariable.prev[e.data.Option.ID_TAB] = i;
																BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																}	
																break;
															}else if(midLR == width_tab_buttons -40){
																if(i-1 >= 0)
																{	
																	BTTVariable.prev[e.data.Option.ID_TAB] = i-1; 
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																	for(j = 0; j <= BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																		BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																	}
																	break;
																}else{
																	return false;
																}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB] - 20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													//prev = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickRight[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													BTTVariable.prev[e.data.Option.ID_TAB] = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB]-20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);	
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
												}
											}
									}
							});
							
							// NEXT RIGHT BUTTON CLICK
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind(
								"click",
								{Option	:BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
										if((width_ul + left)> width_tab_buttons && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 0){
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons-BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											if(BTTVariable.next[e.data.Option.ID_TAB] +1 < BTTVariable.widthTabButton[e.data.Option.ID_TAB].length){
												BTTVariable.next[e.data.Option.ID_TAB] += 1;					
												BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											}
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").removeClass("next-left-inactive");
											
										}else if((width_ul + left)> width_tab_buttons-20 && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 1){
											midLR = 0;
											for(i=BTTVariable.prev[e.data.Option.ID_TAB] +1 ; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length ; i++){
												if( midLR <= BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
													midLR += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
													if(midLR > (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														BTTVariable.next[e.data.Option.ID_TAB] = i;
														BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
														}
													}else if(midLR == (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														if(i<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
														{
															BTTVariable.next[e.data.Option.ID_TAB] = i+1;
															BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
															for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
															}
														}
													}
												}
											}
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons- BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											BTTVariable.next[e.data.Option.ID_TAB] +=1;
											BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											BTTVariable.clickLeft[e.data.Option.ID_TAB] = 0;
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
										}
							});
						}else if(BTTOptArr[iOption].EFFECT_TITLE == "hover"){
							//FOR NEXT LEFT BUTTON
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
									if(left<=20){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").removeClass("next-right-inactive");
												if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 1){	
													//bien do khoang cach giua left và right 
													midLR = 0;
													if(BTTVariable.next[e.data.Option.ID_TAB]< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length -1){
														BTTVariable.next[e.data.Option.ID_TAB] = BTTVariable.next[e.data.Option.ID_TAB] -1;
													}
													for(i= BTTVariable.next[e.data.Option.ID_TAB]; i >= 0; i--){
														if( midLR <= width_tab_buttons ){
															midLR +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
															if(midLR > width_tab_buttons -40){
																BTTVariable.prev[e.data.Option.ID_TAB] = i;
																BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																}	
																break;
															}else if(midLR == width_tab_buttons -40){
																if(i-1 >= 0)
																{	
																	BTTVariable.prev[e.data.Option.ID_TAB] = i-1; 
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																	for(j = 0; j <= BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																		BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																	}
																	break;
																}else{
																	return false;
																}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB] - 20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													//prev = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickRight[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													BTTVariable.prev[e.data.Option.ID_TAB] = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB]-20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);	
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
							
							//FOR NEXT RIGHT BUTTON
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
										if((width_ul + left)> width_tab_buttons && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 0){
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons-BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											if(BTTVariable.next[e.data.Option.ID_TAB] +1 < BTTVariable.widthTabButton[e.data.Option.ID_TAB].length){
												BTTVariable.next[e.data.Option.ID_TAB] += 1;					
												BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											}
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").removeClass("next-left-inactive");
											
										}else if((width_ul + left)> width_tab_buttons-20 && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 1){
											midLR = 0;
											for(i=BTTVariable.prev[e.data.Option.ID_TAB] +1 ; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length ; i++){
												if( midLR <= BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
													midLR += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
													if(midLR > (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														BTTVariable.next[e.data.Option.ID_TAB] = i;
														BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
														}
													}else if(midLR == (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														if(i<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
														{
															BTTVariable.next[e.data.Option.ID_TAB] = i+1;
															BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
															for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
															}
														}
													}
												}
											}
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons- BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											BTTVariable.next[e.data.Option.ID_TAB] +=1;
											BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											BTTVariable.clickLeft[e.data.Option.ID_TAB] = 0;
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
										}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
						}
					
					break;
				case "bottom":
					//check to set width for button container
					var widthTabContainer = 0;		
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").each(function(){
						widthTabContainer = widthTabContainer + BTT(this).outerWidth();
					})
					
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ").append('<div class="next-left"></div> <div class="next-right"></div>');
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").hide();
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").hide();
					
					if(widthTabContainer > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").width()){
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").width(widthTabContainer);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").show();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").show();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-bottom","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-left","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-bottom","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-right","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("left","20px");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
						// find tab button at the end right of tab_container
						for(i=0; i< BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB].length; i++){
							if( BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] <= BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
								BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] +=BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB][i];
								if(BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
									BTTVariable.next[BTTOptArr[iOption].ID_TAB] = i;
									break;
								}else if(BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] == BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
									if(i+1<BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB].length)
									{	
										BTTVariable.next[BTTOptArr[iOption].ID_TAB] = i+1; 
										BTTVariable.spaceRight[BTTOptArr[iOption].ID_TAB] += BTTVariable.widthTabButton[BTTOptArr[iOption].ID_TAB][i+1];
										break;
									}
								}
							}
						}
						BTT(BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs .tab-buttons ul.tab-container li").get(BTTVariable.next[BTTOptArr[iOption].ID_TAB])).addClass("window");
					}
						
						// NEXT LEFT BUTTON CLICK						
						if(BTTOptArr[iOption].EFFECT_TITLE == "click"){
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind(
								"click",
								{Option	:BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
									if(left<=20){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").removeClass("next-right-inactive");
												if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 1){	
													//bien do khoang cach giua left và right 
													midLR = 0;
													if(BTTVariable.next[e.data.Option.ID_TAB]< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length -1){
														BTTVariable.next[e.data.Option.ID_TAB] = BTTVariable.next[e.data.Option.ID_TAB] -1;
													}
													for(i= BTTVariable.next[e.data.Option.ID_TAB]; i >= 0; i--){
														if( midLR <= width_tab_buttons ){
															midLR +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
															if(midLR > width_tab_buttons -40){
																BTTVariable.prev[e.data.Option.ID_TAB] = i;
																BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																}	
																break;
															}else if(midLR == width_tab_buttons -40){
																if(i-1 >= 0)
																{	
																	BTTVariable.prev[e.data.Option.ID_TAB] = i-1; 
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																	for(j = 0; j <= BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																		BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																	}
																	break;
																}else{
																	return false;
																}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB] - 20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													//prev = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickRight[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													BTTVariable.prev[e.data.Option.ID_TAB] = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB]-20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);	
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
												}
											}
									}
							});
							
							// NEXT RIGHT BUTTON CLICK
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind(
								"click",
								{Option	: BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
										if((width_ul + left)> width_tab_buttons && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 0){
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons-BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											if(BTTVariable.next[e.data.Option.ID_TAB] +1 < BTTVariable.widthTabButton[e.data.Option.ID_TAB].length){
												BTTVariable.next[e.data.Option.ID_TAB] += 1;					
												BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											}
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").removeClass("next-left-inactive");
											
										}else if((width_ul + left)> width_tab_buttons-20 && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 1){
											midLR = 0;
											for(i=BTTVariable.prev[e.data.Option.ID_TAB] +1 ; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length ; i++){
												if( midLR <= BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
													midLR += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
													if(midLR > (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														BTTVariable.next[e.data.Option.ID_TAB] = i;
														BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
														}
													}else if(midLR == (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														if(i<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
														{
															BTTVariable.next[e.data.Option.ID_TAB] = i+1;
															BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
															for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
															}
														}
													}
												}
											}
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons- BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											BTTVariable.next[e.data.Option.ID_TAB] +=1;
											BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											BTTVariable.clickLeft[e.data.Option.ID_TAB] = 0;
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
										}
							});
						/* FOR HOVER EVENT */
						}else if(BTTOptArr[iOption].EFFECT_TITLE == "hover"){
							//FOR NEXT LEFT BUTTON
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
									if(left<=20){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").removeClass("next-right-inactive");
												if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 1){	
													//bien do khoang cach giua left và right 
													midLR = 0;
													if(BTTVariable.next[e.data.Option.ID_TAB]< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length -1){
														BTTVariable.next[e.data.Option.ID_TAB] = BTTVariable.next[e.data.Option.ID_TAB] -1;
													}
													for(i= BTTVariable.next[e.data.Option.ID_TAB]; i >= 0; i--){
														if( midLR <= width_tab_buttons ){
															midLR +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
															if(midLR > width_tab_buttons -40){
																BTTVariable.prev[e.data.Option.ID_TAB] = i;
																BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																}	
																break;
															}else if(midLR == width_tab_buttons -40){
																if(i-1 >= 0)
																{	
																	BTTVariable.prev[e.data.Option.ID_TAB] = i-1; 
																	BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
																	for(j = 0; j <= BTTVariable.prev[e.data.Option.ID_TAB]; j++){
																		BTTVariable.spaceLeft[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
																	}
																	break;
																}else{
																	return false;
																}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB] - 20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													//prev = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickRight[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickRight[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.prev[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: 20},BTTVariable.widthTabButton[e.data.Option.ID_TAB][0]*e.data.Option.VELOCITY);
													BTTVariable.prev[e.data.Option.ID_TAB] = -1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: -(BTTVariable.spaceLeft[e.data.Option.ID_TAB]-20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);	
													BTTVariable.prev[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceLeft[e.data.Option.ID_TAB] -= BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.prev[e.data.Option.ID_TAB]];
													BTTVariable.clickLeft[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-left").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
							
							//FOR NEXT RIGHT BUTTON
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
									width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
									width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
										if((width_ul + left)> width_tab_buttons && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 0){
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons-BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											if(BTTVariable.next[e.data.Option.ID_TAB] +1 < BTTVariable.widthTabButton[e.data.Option.ID_TAB].length){
												BTTVariable.next[e.data.Option.ID_TAB] += 1;					
												BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											}
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").removeClass("next-left-inactive");
											
										}else if((width_ul + left)> width_tab_buttons-20 && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 1){
											midLR = 0;
											for(i=BTTVariable.prev[e.data.Option.ID_TAB] +1 ; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length ; i++){
												if( midLR <= BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
													midLR += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
													if(midLR > (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														BTTVariable.next[e.data.Option.ID_TAB] = i;
														BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
														}
													}else if(midLR == (BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40)){
														if(i<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
														{
															BTTVariable.next[e.data.Option.ID_TAB] = i+1;
															BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
															for(j = 0; j <= BTTVariable.next[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][j];
															}
														}
													}
												}
											}
											BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({left: (width_tab_buttons- BTTVariable.spaceRight[e.data.Option.ID_TAB] -20)},BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]]*e.data.Option.VELOCITY);
											if(width_ul - BTTVariable.spaceRight[e.data.Option.ID_TAB] ==  0 ){
												BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").addClass("next-right-inactive");
											}
											BTTVariable.next[e.data.Option.ID_TAB] +=1;
											BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][BTTVariable.next[e.data.Option.ID_TAB]];	
											BTTVariable.clickLeft[e.data.Option.ID_TAB] = 0;
											BTTVariable.clickRight[e.data.Option.ID_TAB] = 1;
										}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-right").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
						}
					break;
				case "left":
					BTTVariable.height[BTTOptArr[iOption].ID_TAB] = 0;
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").each(function(){
						BTTVariable.height[BTTOptArr[iOption].ID_TAB] = BTTVariable.height[BTTOptArr[iOption].ID_TAB] + BTT(this).outerHeight();
					})
					if(BTTOptArr[iOption].HEIGHT !="auto" && BTTVariable.height[BTTOptArr[iOption].ID_TAB] > Number(BTTOptArr[iOption].HEIGHT)){		
						BTTVariable.width[BTTOptArr[iOption].ID_TAB] = BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").outerWidth();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("position","relative");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("position","absolute");									
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").append('<div class="next-up"></div><div class="next-down"></div>');				
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]-1);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").css("border-top","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").css("border-left","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]-1);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("border-left","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("top",BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight()-25);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("top",25);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
						
						BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB] = BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").length;
						for(i=0; i< BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB] ; i++){
							if( BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] < BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight() ){
								BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] += 43;
								if(BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight()-25){
									BTTVariable.down[BTTOptArr[iOption].ID_TAB] = i;
								}else if(BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] == BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight() -25){
									if(i+1<BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB])
									{	
										BTTVariable.down[BTTOptArr[iOption].ID_TAB] = i+1; 
										BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] += 43;
									}
								}
							}
						}
						if(BTTOptArr[iOption].EFFECT_TITLE == "click"){
							// bind function for click next up button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("click",{Option : BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									if(topPosition<25){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").removeClass("next-down-inactive");
												if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 1){	
												midTB = 0;
												for(i= BTTVariable.down[e.data.Option.ID_TAB] -1; i >= 0; i--){
													if( midTB < height_tab_buttons ){
														midTB +=43;
														if(midTB > height_tab_buttons){
															BTTVariable.up[e.data.Option.ID_TAB] = i;
															BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
															for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
															}
														}else if(midTB == height_tab_buttons){
															if(i-1 >= 0)
															{	
																BTTVariable.up[e.data.Option.ID_TAB] = i-1; 
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
																}
															}else{
																return false;
															}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB] - 25)},250);
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickDown[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB]-25)},250);
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								}
							);
							// bind function for click next down button							
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("click",{Option	: BTTOptArr[iOption]},
							  function(e){
								BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
								topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;		
								height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
								height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
								
								if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 0){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: (height_tab_buttons- BTTVariable.spaceTop[e.data.Option.ID_TAB] -25)},250);
									BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
									if(BTTVariable.down[e.data.Option.ID_TAB] < BTTVariable.lengthTabs[e.data.Option.ID_TAB]){
										BTTVariable.down[e.data.Option.ID_TAB] += 1;		
										BTTVariable.spaceTop[e.data.Option.ID_TAB] +=43;	
									}
									BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
									if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
									}
								}else if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 1){
									midTB = 0;
									for(i=BTTVariable.up[e.data.Option.ID_TAB] ; i< BTTVariable.lengthTabs[e.data.Option.ID_TAB] ; i++){
										if( midTB <  height_tab_buttons ){
											midTB += 43;
											if(midTB > height_tab_buttons-25){
												BTTVariable.down[e.data.Option.ID_TAB] = i;
												BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
												for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
													BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
												}
											}else if(midTB == height_tab_buttons -25){
												if(i+1<BTTVariable.lengthTabs[e.data.Option.ID_TAB])
												{
													BTTVariable.down[e.data.Option.ID_TAB] = i+1;
													BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
													for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
														BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
													}
												}
											}
										}
									}
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: height_tab_buttons - BTTVariable.spaceTop[e.data.Option.ID_TAB]-25},250);
									BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
									if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
									}
									BTTVariable.down[e.data.Option.ID_TAB] +=1;
									BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
									BTTVariable.clickUp[e.data.Option.ID_TAB] = 0;
									BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
								}
							  }
							);
							// FOR HOVER EVENT
						}else{
							// bind function for hover next up button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									if(topPosition<25){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").removeClass("next-down-inactive");
												if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 1){	
												midTB = 0;
												for(i= BTTVariable.down[e.data.Option.ID_TAB] -1; i >= 0; i--){
													if( midTB < height_tab_buttons ){
														midTB +=43;
														if(midTB > height_tab_buttons){
															BTTVariable.up[e.data.Option.ID_TAB] = i;
															BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
															for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
															}
														}else if(midTB == height_tab_buttons){
															if(i-1 >= 0)
															{	
																BTTVariable.up[e.data.Option.ID_TAB] = i-1; 
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
																}
															}else{
																return false;
															}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB] - 25)},250);
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickDown[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB]-25)},250);
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
							
							// bind function for hover next down button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("mouseenter",{Option: BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;		
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									
									if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 0){
										BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: (height_tab_buttons- BTTVariable.spaceTop[e.data.Option.ID_TAB] -25)},250);
										BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
										if(BTTVariable.down[e.data.Option.ID_TAB] < BTTVariable.lengthTabs[e.data.Option.ID_TAB]){
											BTTVariable.down[e.data.Option.ID_TAB] += 1;		
											BTTVariable.spaceTop[e.data.Option.ID_TAB] +=43;	
										}
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
										if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
										}
									}else if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 1){
										midTB = 0;
										for(i=BTTVariable.up[e.data.Option.ID_TAB] ; i< BTTVariable.lengthTabs[e.data.Option.ID_TAB] ; i++){
											if( midTB <  height_tab_buttons ){
												midTB += 43;
												if(midTB > height_tab_buttons-25){
													BTTVariable.down[e.data.Option.ID_TAB] = i;
													BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
													for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
														BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
													}
												}else if(midTB == height_tab_buttons -25){
													if(i+1<BTTVariable.lengthTabs[e.data.Option.ID_TAB])
													{
														BTTVariable.down[e.data.Option.ID_TAB] = i+1;
														BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
														}
													}
												}
											}
										}
										BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: height_tab_buttons - BTTVariable.spaceTop[e.data.Option.ID_TAB]-25},250);
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
										if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
										}
										BTTVariable.down[e.data.Option.ID_TAB] +=1;
										BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
										BTTVariable.clickUp[e.data.Option.ID_TAB] = 0;
										BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
									}
								},e.data.Option.INTERVAL);
								
							});
							
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
						}
					}
					break;
				case "right":
					BTTVariable.height[BTTOptArr[iOption].ID_TAB] = 0;
					BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").each(function(){
						BTTVariable.height[BTTOptArr[iOption].ID_TAB] = BTTVariable.height[BTTOptArr[iOption].ID_TAB] + BTT(this).outerHeight();
					})
					if(BTTOptArr[iOption].HEIGHT !="auto" && BTTVariable.height[BTTOptArr[iOption].ID_TAB] > Number(BTTOptArr[iOption].HEIGHT)){	
						BTTVariable.width[BTTOptArr[iOption].ID_TAB] = BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").outerWidth();
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").css("position","relative");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("position","absolute");												
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").append('<div class="next-up"></div><div class="next-down"></div>');
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("width",BTTVariable.width[BTTOptArr[iOption].ID_TAB]);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("border-bottom","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").css("border-top","none");
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").css("top",BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight()-25);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("top",25);
						BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
						
						BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB] = BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").length;
						for(i=0; i< BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB] ; i++){
							if( BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] < BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight() ){
								BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] += 43;
								if(BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] > BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight()-25){
									BTTVariable.down[BTTOptArr[iOption].ID_TAB] = i;
								}else if(BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] == BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons").outerHeight() -25){
									if(i+1<BTTVariable.lengthTabs[BTTOptArr[iOption].ID_TAB])
									{	
										BTTVariable.down[BTTOptArr[iOption].ID_TAB] = i+1; 
										BTTVariable.spaceTop[BTTOptArr[iOption].ID_TAB] += 43;
									}
								}
							}
						}
						if(BTTOptArr[iOption].EFFECT_TITLE == "click"){
							// bind function for click next up button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("click",{Option : BTTOptArr[iOption]},
								function(e){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									if(topPosition<25){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").removeClass("next-down-inactive");
												if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 1){	
												midTB = 0;
												for(i= BTTVariable.down[e.data.Option.ID_TAB] -1; i >= 0; i--){
													if( midTB < height_tab_buttons ){
														midTB +=43;
														if(midTB > height_tab_buttons){
															BTTVariable.up[e.data.Option.ID_TAB] = i;
															BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
															for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
															}
														}else if(midTB == height_tab_buttons){
															if(i-1 >= 0)
															{	
																BTTVariable.up[e.data.Option.ID_TAB] = i-1; 
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
																}
															}else{
																return false;
															}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB] - 25)},250);
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickDown[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB]-25)},250);
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								}
							);
							// bind function for click next down button							
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("click",{Option	: BTTOptArr[iOption]},
							  function(e){
								BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
								topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;		
								height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
								height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
								
								if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 0){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: (height_tab_buttons- BTTVariable.spaceTop[e.data.Option.ID_TAB] -25)},250);
									BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
									if(BTTVariable.down[e.data.Option.ID_TAB] < BTTVariable.lengthTabs[e.data.Option.ID_TAB]){
										BTTVariable.down[e.data.Option.ID_TAB] += 1;		
										BTTVariable.spaceTop[e.data.Option.ID_TAB] +=43;	
									}
									BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
									if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
									}
								}else if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 1){
									midTB = 0;
									for(i=BTTVariable.up[e.data.Option.ID_TAB] ; i< BTTVariable.lengthTabs[e.data.Option.ID_TAB] ; i++){
										if( midTB <  height_tab_buttons ){
											midTB += 43;
											if(midTB > height_tab_buttons-25){
												BTTVariable.down[e.data.Option.ID_TAB] = i;
												BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
												for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
													BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
												}
											}else if(midTB == height_tab_buttons -25){
												if(i+1<BTTVariable.lengthTabs[e.data.Option.ID_TAB])
												{
													BTTVariable.down[e.data.Option.ID_TAB] = i+1;
													BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
													for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
														BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
													}
												}
											}
										}
									}
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: height_tab_buttons - BTTVariable.spaceTop[e.data.Option.ID_TAB]-25},250);
									BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
									if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
									}
									BTTVariable.down[e.data.Option.ID_TAB] +=1;
									BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
									BTTVariable.clickUp[e.data.Option.ID_TAB] = 0;
									BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
								}
							  }
							);
							// FOR HOVER EVENT
						}else{
							// bind function for hover next up button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("mouseenter",{Option:BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									if(topPosition<25){
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").removeClass("next-down-inactive");
												if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 1){	
												midTB = 0;
												for(i= BTTVariable.down[e.data.Option.ID_TAB] -1; i >= 0; i--){
													if( midTB < height_tab_buttons ){
														midTB +=43;
														if(midTB > height_tab_buttons){
															BTTVariable.up[e.data.Option.ID_TAB] = i;
															BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
															for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
															}
														}else if(midTB == height_tab_buttons){
															if(i-1 >= 0)
															{	
																BTTVariable.up[e.data.Option.ID_TAB] = i-1; 
																BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
																for(j = 0; j < BTTVariable.up[e.data.Option.ID_TAB]; j++){
																	BTTVariable.spaceBottom[e.data.Option.ID_TAB] += 43;
																}
															}else{
																return false;
															}
														}
													}
												}					
												BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB] - 25)},250);
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
													BTTVariable.clickDown[e.data.Option.ID_TAB] = 0;
												}
											}else if(BTTVariable.clickDown[e.data.Option.ID_TAB] == 0){
												if(BTTVariable.up[e.data.Option.ID_TAB] <= 0 ){
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: 25},250);
													BTTVariable.up[e.data.Option.ID_TAB] = 0;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] = 0;
													BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").addClass("next-up-inactive");
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}else{
													BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: -(BTTVariable.spaceBottom[e.data.Option.ID_TAB]-25)},250);
													BTTVariable.up[e.data.Option.ID_TAB] -= 1;
													BTTVariable.spaceBottom[e.data.Option.ID_TAB] -= 43;
													BTTVariable.clickUp[e.data.Option.ID_TAB] = 1;
												}
											}
									}
								},e.data.Option.INTERVAL);
							});
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-up").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
							
							// bind function for hover next down button
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("mouseenter",{Option: BTTOptArr[iOption]},function(e){
								BTTVariable.hoverTimeout = setInterval(function(){
									BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").stop();
									topPosition = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().top;		
									height_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerHeight();
									height_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerHeight();
									
									if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 0){
										BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: (height_tab_buttons- BTTVariable.spaceTop[e.data.Option.ID_TAB] -25)},250);
										BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
										if(BTTVariable.down[e.data.Option.ID_TAB] < BTTVariable.lengthTabs[e.data.Option.ID_TAB]){
											BTTVariable.down[e.data.Option.ID_TAB] += 1;		
											BTTVariable.spaceTop[e.data.Option.ID_TAB] +=43;	
										}
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
										if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
										}
									}else if((height_ul + topPosition)> (height_tab_buttons -25) && BTTVariable.clickUp[e.data.Option.ID_TAB] == 1){
										midTB = 0;
										for(i=BTTVariable.up[e.data.Option.ID_TAB] ; i< BTTVariable.lengthTabs[e.data.Option.ID_TAB] ; i++){
											if( midTB <  height_tab_buttons ){
												midTB += 43;
												if(midTB > height_tab_buttons-25){
													BTTVariable.down[e.data.Option.ID_TAB] = i;
													BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
													for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
														BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
													}
												}else if(midTB == height_tab_buttons -25){
													if(i+1<BTTVariable.lengthTabs[e.data.Option.ID_TAB])
													{
														BTTVariable.down[e.data.Option.ID_TAB] = i+1;
														BTTVariable.spaceTop[e.data.Option.ID_TAB] = 0;
														for(j = 0; j <= BTTVariable.down[e.data.Option.ID_TAB]; j++){
															BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
														}
													}
												}
											}
										}
										BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").animate({top: height_tab_buttons - BTTVariable.spaceTop[e.data.Option.ID_TAB]-25},250);
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-up").removeClass("next-up-inactive");
										if(height_ul - BTTVariable.spaceTop[e.data.Option.ID_TAB] <= -25   ){
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-down").addClass("next-down-inactive");
										}
										BTTVariable.down[e.data.Option.ID_TAB] +=1;
										BTTVariable.spaceTop[e.data.Option.ID_TAB] += 43;
										BTTVariable.clickUp[e.data.Option.ID_TAB] = 0;
										BTTVariable.clickDown[e.data.Option.ID_TAB] = 1;
									}
								},e.data.Option.INTERVAL);
								
							});
							
							BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-buttons .next-down").bind("mouseleave",function(){
								clearInterval(BTTVariable.hoverTimeout);
							});
						}
					}
					break;		
			}
			BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items").height(BTT(BTTOptArr[iOption].ID_TAB+" .bt-tabs .tab-items > div > div.active").outerHeight());
			
/*============================== SETTING WHEN RESIZE WINDOW=================================================*/
			
			if(BTTOptArr[iOption].POSITION == 'top' || BTTOptArr[iOption].POSITION == 'bottom'){
				// re setting mapping move title bar button
				BTT(window).resize({Option	:BTTOptArr[iOption]},function(e){
					var widthTabContainer = 0;		
					BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ul.tab-container li").each(function(){
						widthTabContainer = widthTabContainer + BTT(this).outerWidth();
					}) 
						
						
						if(widthTabContainer  > BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ").width()){
							if(BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").is(":hidden")){
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").width(widthTabContainer);
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").show();
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").show();
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-top","none");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").css("border-left","none");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-top","none");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").css("border-right","none");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("left","20px");
								BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").addClass("next-left-inactive");
								
								// find tab button at the end right of tab_container
								for(i=0; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length; i++){
									if( BTTVariable.spaceRight[e.data.Option.ID_TAB] <= BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth() ){
										BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
										if(BTTVariable.spaceRight[e.data.Option.ID_TAB] > BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
											BTTVariable.next[e.data.Option.ID_TAB] = i;
											break;
										}else if(BTTVariable.spaceRight[e.data.Option.ID_TAB] == BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons").outerWidth()-40){
											if(i+1<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
											{	
												BTTVariable.next[e.data.Option.ID_TAB] = i+1; 
												BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i+1];
												break;
											}
										}
									}
								}
								BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons ul.tab-container li").get(BTTVariable.next[e.data.Option.ID_TAB])).addClass("window");
							}else{
								// re mapping title bar
								left = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").position().left;
								width_ul = BTT(e.data.Option.ID_TAB + " .tab-buttons .tab-container").outerWidth();
								width_tab_buttons = BTT(e.data.Option.ID_TAB + " .tab-buttons").outerWidth();
									if((width_ul + left)> width_tab_buttons-20 && BTTVariable.clickLeft[e.data.Option.ID_TAB] == 0){
										if(left<0){
											BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-left").removeClass("next-left-inactive");
										}
										BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons .next-right").removeClass("next-right-inactive");
										var spaceStart = width_tab_buttons - left;
										BTTVariable.spaceRight[e.data.Option.ID_TAB] = 0;
										for(i=0; i< BTTVariable.widthTabButton[e.data.Option.ID_TAB].length; i++){
											if( BTTVariable.spaceRight[e.data.Option.ID_TAB] <= spaceStart ){
												BTTVariable.spaceRight[e.data.Option.ID_TAB] +=BTTVariable.widthTabButton[e.data.Option.ID_TAB][i];
												if(BTTVariable.spaceRight[e.data.Option.ID_TAB] > spaceStart - 40){
													BTTVariable.next[e.data.Option.ID_TAB] = i;
													break;
												}else if(BTTVariable.spaceRight[e.data.Option.ID_TAB] == spaceStart - 40){
													if(i+1<BTTVariable.widthTabButton[e.data.Option.ID_TAB].length)
													{	
														BTTVariable.next[e.data.Option.ID_TAB] = i+1; 
														BTTVariable.spaceRight[e.data.Option.ID_TAB] += BTTVariable.widthTabButton[e.data.Option.ID_TAB][i+1];
														break;
													}
												}
											}
										}
										BTT(BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons ul.tab-container li").get(BTTVariable.next[e.data.Option.ID_TAB])).addClass("window");
									}
							}
						}else {
							// hide move title bar button 
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .next-right").hide();
							BTT(e.data.Option.ID_TAB + " .bt-tabs .tab-buttons .next-left").hide();
							BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css("left","0");
							BTT(e.data.Option.ID_TAB+" .bt-tabs .tab-buttons ul.tab-container").css('width','100%');
						}
				});
			}
			// END SETTING FOR RESIZE WINDOW
	  	}		
	}
});

