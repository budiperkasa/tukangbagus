
jQuery.noConflict();
if (typeof( BTT ) == 'undefined'){
	var BTT = jQuery;
}
BTT(document).ready(function() {
	for(var iOption = 0; iOption<BTTOptArr.length; iOption++){
	
		if(BTTOptArr[iOption].LAYOUT == "accordion"){
			tabTotal = BTT(BTTOptArr[iOption].ID_TAB + " .tab-button").length;
			heightTabButton = BTT(BTTOptArr[iOption].ID_TAB +" .tab-button").outerHeight();
			BTT(BTTOptArr[iOption].ID_TAB+ " .tab-button:first").addClass("on");
			BTT(BTTOptArr[iOption].ID_TAB+ " .on").next().show();
			if( BTTOptArr[iOption].HEIGHT != 'auto'){
					BTT(BTTOptArr[iOption].ID_TAB+ " .tab-content").height(BTTOptArr[iOption].HEIGHT  - 20);
					//BTT(BTTOptArr[iOption].ID_TAB + " .bt-tabs").height((jQuery(".tab-button").length)*36 + Number(BTTOptArr[iOption].HEIGHT));
					//BTT(BTTOptArr[iOption].ID_TAB).height((BTT( BTTOptArr[iOption].ID_TAB + " .tab-button").length)*36 + Number(BTTOptArr[iOption].HEIGHT));
			}else{
				BTT( BTTOptArr[iOption].ID_TAB +" .tab-content").css("height","auto");
				//BTT(BTTOptArr[iOption].ID_TAB+ " .bt-tabs").height((BTT(BTTOptArr[iOption].ID_TAB+ " .tab-button").length)*36 + BTT(BTTOptArr[iOption].ID_TAB+ " .on").next().outerHeight() );
				//BTT(BTTOptArr[iOption].ID_TAB).height((BTT( BTTOptArr[iOption].ID_TAB + " .tab-button").length)*36 + BTT(BTTOptArr[iOption].ID_TAB+ " .on").next().outerHeight());
			}
			if(BTTOptArr[iOption].EVENT == "click"){
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-button").click({Option: BTTOptArr[iOption]},function(e){					
					BTT(e.data.Option.ID_TAB +' .tab-button').removeClass('on');
					BTT(e.data.Option.ID_TAB + ' .tab-content').slideUp(e.data.Option.DURATION);
					if(BTT(this).next().is(':hidden') == true) {
						//ADD THE ON CLASS TO THE BUTTON
						BTT(this).addClass('on');
						if(e.data.Option.HEIGHT == 'auto'){
							//BTT(e.data.Option.ID_TAB + " .bt-tabs").height((BTT(e.data.Option.ID_TAB +" .tab-button").length)*36 + BTT(e.data.Option.ID_TAB+ " .on").next().outerHeight() );
							//BTT(e.data.Option.ID_TAB).height((BTT(e.data.Option.ID_TAB+ " .tab-button").length)*36 + BTT(e.data.Option.ID_TAB+ " .on").next().outerHeight());
						}
						//OPEN THE SLIDE
						BTT(this).next().slideDown(e.data.Option.DURATION);
					}
				});
				
			}else if((BTTOptArr[iOption].EVENT == "hover")){
				var timer;
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-button").bind('mouseenter',{Option:BTTOptArr[iOption] },
						function(e){
							var el = this;
							//alert(e.data.Option.ID_TAB);
							timer= setTimeout(function(){
								BTT(e.data.Option.ID_TAB +' .tab-button').removeClass('on');
								BTT(e.data.Option.ID_TAB + ' .tab-content').slideUp(e.data.Option.DURATION);	
								if(BTT(el).next().is(':hidden') == true) {
									//ADD THE ON CLASS TO THE BUTTON
									BTT(el).addClass('on');
									//OPEN THE SLIDE
									BTT(el).next().slideDown(e.data.Option.DURATION);
								}
							},400);
						}
				);
				BTT(BTTOptArr[iOption].ID_TAB+ " .tab-button").bind('mouseleave',function(){
							clearTimeout(timer);
						}
				);
				
			}
		}
	}
});

