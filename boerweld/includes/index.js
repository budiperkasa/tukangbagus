var totalAds = 0; 		//Total number of banner ads on page
var adHeight = 232; 		//width of banner ad image
var finalPosition = 0;	//will be the final position: top; value for #carousel
var currentSlide = 1; 	//current slide visible
var play = true; 		//is slider playing true|false
var intervalID; 		//setInterval ID
if(ie7) adHeight = 235;
var animating = false;

$j = jQuery.noConflict();
$j(document).ready(function(){
	//Set totalads variable to total number of LIs. Calculate and set final position variable
	
	totalAds = $j("#carousel li").length;
	finalPosition = (totalAds-1) * adHeight;
		
	title = $j("#carousel li:first-child img").attr("alt");
	$j("#ad-title").text(title);
	
	//Move previous
	$j("#prev_btn").click(function(){
		if(animating == false)
		{
			adSlide("previous");
			adSlideToggle(true);
		}
		return false;
	});
	
	
	//Pause toggle
	$j("#pause_btn").click(function(){
		adSlideToggle(play);
		return false;
	});
	
	
	//Move next
	$j("#next_btn").click(function(){
		if(animating == false)
		{
			adSlide("next");
			adSlideToggle(true);
		}
		return false;
	});
	
	
	//Start playing slider via setInterval
	initializeSlide();
	
	//Onclick for tabs. Shows specific tab
	$j("#widgnav a").click(function(){
		displayTab($j(this).attr("href"));
		return false;
	});
	
	$j("#widgnav li:first-child a").click();	
});


function displayTab(tab)
{
	//Hides all panels
	$j(".panel").css("display","none");

	//Fades in panel where ID = href of anchor's tab
	var panel = tab.replace("load-", "");

	$j(panel).fadeIn(150, function(){
		//Adds cleartype back into IE's text. This is a bug in IE/Windows when applying opacity to text.
		if(this.style.removeAttribute) this.style.removeAttribute("filter"); //http://blog.bmn.name/2008/03/jquery-fadeinfadeout-ie-cleartype-glitch/
	});

	//Removes .selected class from previously selected item
	$j("#widgnav .selected").removeClass("selected");

	//Adds .selected class to parent LI
	$j("a[href="+tab+"]").parent().addClass("selected");	
}

function initializeSlide()
{
	intervalID = window.setInterval(function(){
		adSlide("next");
	}, 5500); //5500 is number of milliseconds
}

function adSlide(direction)
{
	var currentPosition = parseInt($j("#carousel").css("top"));
		
	if(direction == "next")
	{
		//Is position of slider equal to the last item in the slider
		if(Math.abs(currentPosition) >= finalPosition)
		{
			positionto = 0;
			currentSlide = 1;
		} else {
			positionto = currentPosition-adHeight;
			currentSlide++;
		}	
	} 
	
	if(direction == "previous")
	{
		//Is position of the slider equal to the first item in the slider
		if(Math.abs(currentPosition) == 0)
		{
			positionto = -(totalAds-1) * adHeight;
			currentSlide = totalAds;
		} else {
			positionto = currentPosition+adHeight;
			currentSlide--;
		}
	}
	
	//$j("#carousel").animate({"top": positionto}, 400);
	
	animating = true;	
	$j("#carousel").animate({"top": positionto}, 400, function() {
		animating = false;
		title = $j("#carousel li:nth-child("+currentSlide+") img").attr("alt");
		$j("#ad-title").text(title);
	});	
}

function adSlideToggle(playslider)
{	
	if(playslider == true)
	{
		//Slider is currently auto playing. This stops it.
		$j("#pause_btn img").attr("src","images/home/template/next-btn.jpg");
		window.clearInterval(intervalID);
		play = false;
	} else {
		//Slder is currently paused. This plays it
		$j("#pause_btn img").attr("src","images/home/template/pause-btn.jpg");
		adSlide("next")
		initializeSlide();
		play = true;
	}
}