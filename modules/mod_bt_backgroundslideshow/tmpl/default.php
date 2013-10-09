<?php
/**
 * @package 	mod_bt_backgroundslideshow - BT BackgroundSlideShow
 * @version		1.1
 * @created		Dec 2011
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2011 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

$document = JFactory::getDocument();
$js =  "var bsData = { slideshowSpeed:". $slideshowSpeed . ",";
$js .= "effectTime:" . $effectTime . ",";
$js .= "autoPlay:" . $autoPlay . ",";
$js .= "stopAuto:" . $stopAuto . ",";
$js .= "slideshowSize:'" . $slideshowSize . "',";
$js .= "slideshowHeight:" . $slideshowHeight . ",";
$js .= "slideshowWidth:" . $slideshowWidth . ",";
$js .= "resizeImage:'" . $resizeImage . "',";
$js .= "wrapperElement:'" . $wrapperElement . "',";
$js .= "youid:'" . JURI::base(true) . "',";
$js .= "navType : '". $navType . "',";
$js .= "navPosition : '". $navPosition . "',";
$js .= "navAlign:'" . $navAlign . "',";
$js .= "thumbNumber: ". $thumbNumber . ",";
$js .= "thumbHeight: ". $thumbHeight . ",";
$js .= "vAlign: '". $vAlign . "',";
$js .= "hAlign: '". $hAlign . "',";
$js .= "photos:[";
if ($numberOfPhotos > 0)
{
	foreach ($photos as $key => $photo)
	{			
		@$js .= "{\"image\" : \"" . $folder . $photo->file . "\",";
		@$js .= "\"link\" : \"" . $photo->link . "\",";			
		@$js .= "\"title\" : \"" . str_replace(array('"',"\n"),array('\"',' '),$photo->title) . "\",";
		@$js .= "\"target\" : \"" . $photo->target . "\",";
		@$js .= "\"desc\" : \"" . str_replace(array('"',"\n"),array('\"',' '),$photo->desc) . "\"";
		$js .= "}";
		if ($key != (count($photos) - 1))
			$js .= ",";
	}
}
$js .= "]};\n";
$js .= "preloadImage(bsData.photos);\n";
$document->addScriptDeclaration($js);
if($styleSheet) $document->addStyleDeclaration($styleSheet);
?>
<div id="html-control">
	<div id="cp-bg-slide">
		<div id="slideimgs"  rel="<?php echo $shvideo?>">	
			<?php if ($numberOfPhotos > 0):?>
			
				<?php foreach ($photos as $key => $photo): ?>
				<div id="slideimg<?php echo $key+1; ?>" class="slideimg" rel="<?php echo $slidedirection; ?>">					
						<img class="imgslide" src="<?php echo $folder.$photo->file;?>" alt="<?php echo $photo->title ?>" />						
						<?php if(isset($photo->youid) && strlen($photo->youid)!=0){	?>							
							<a id="cp-video<?php echo $key+1;?>" rel="<?php echo $photo->youid?>"  href="javascript:void(0)" class="cp-video-btn" style="position: absolute;width:50px;height:50px;left:50%;top:50%;"></a>
							<div <?php if(!$shvideo) echo 'style="display: none"';?> class="fr-video">																		
								<div class="player" id="player<?php echo ($key+1)?>" rel="<?php echo  $photo->youid?>"></div>
							</div>
						<?php					
					}					
					?>					
				</div>
				<?php endforeach;?>
			<?php endif;?>
			<?php if($gridOverlay):?>
				<div class="bgd-over-image"></div>
			<?php endif;?>
		</div>
	</div>
	<?php if($caption):?>
	<div id="cp-caption">
		<div id="cp-caption-inner">
			<?php if($showTitle):?>
				<h3 class="cp-title">
					<?php if($showLink):?>
					<a class="cp-link" href="#"></a>
					<?php endif;?>
				</h3>
			<?php endif;?>
			<?php if($showDesc):?>
				<div class="cp-desc-block"><p class="cp-desc"></p></div>
			<?php endif;?>
		</div>
	</div>
	<?php endif;?>
	<div id="cp-bg-bar">
		<?php if ($navType == "nav-btn"):?>
			<div class="progress-button <?php echo $shvideo?>">
				<?php if ($params->get('nex-back-button', 1)):?>
					<a id="cp-back" href="javascript:void(0)" class="cp-slide-btn"></a>
				<?php endif;?>
				<?php if ($params->get('playpause-button', 1)):?>
					<a id="cp-play" href="javascript:void(0)" class="cp-slide-btn"></a>
					<a id="cp-pause" href="javascript:void(0)" class="cp-slide-btn"></a>
				<?php endif;?>
				<a <?php if (!$params->get('nex-back-button', 1)) echo 'style="display:none"'?> id="cp-next" href="javascript:void(0)" class="cp-slide-btn"></a>
			</div>
		<?php endif;?>
		
		<?php if ($params->get('progress-bar', 1)):?>
			<div id="progress-background">
				<div id="progress-bar"></div>
			</div>
		<?php endif;?>
			<?php foreach ($photos as $key => $photo): ?>
			<?php if(isset($photo->youid) && strlen($photo->youid)!=0){	?>				
				<div id="ytplayer" rel="<?php echo $keepcontrolvideo ?>">
					<div id="play-pause-btn<?php echo $key+1; ?>" class="play-rel" rel="<?php echo $photo->autoplay ;?>"> 
					</div>
					<div id="seekbar<?php echo $key+1; ?>" class="seekbarscroll" rel="<?php echo $photo->quality;?>">
					</div>
					<div id="mute-btn<?php echo $key+1; ?>" class="mute-btn" rel="<?php echo trim($photo->volume);?>">
					</div>
				</div>				
			<?php }?>
			<?php endforeach;?>
		
		<?php if ($navType=="nav-thumb"):?>
		<div id="cp-bg-navigation">
			<?php if ($numberOfPhotos > $thumbNumber):?>
				<a id="nav-back" href="javascript:void(0)" class="nav-btn"></a>
			<?php endif;?>
			<?php if ($numberOfPhotos > 0):?>
				<div id="thumbimgs">
					<div id="thumbimgs-inner">
						<?php foreach ($photos as $key => $photo): ?>
						<div id="thumbimg<?php echo $key+1; ?>" class="thumbimg <?php echo $shvideo?>">
							<div class="thumbimages">
							<img style="width:<?php echo $thumbWidth; ?>px;height:<?php echo $thumbHeight; ?>px" src="<?php echo $thumbnailLink.$photo->file;?>" alt="<?php echo $photo->title; ?>" />
							<?php if(isset($photo->youid) && $photo->youid!=""){
								?>							
								<a id="cp-video" href="javascript:void(0)" class="cp-video-btn16" style="position: absolute;width: 16px;height: 16px;left:<?php echo(int)($thumbWidth/2-8);?>px;top:<?php echo(int)($thumbHeight/2-8);?>px;"></a>								
								<?php }?>
							</div>
						</div>
						<?php endforeach;?>
					</div>
				</div>				
			<?php endif;?>
			<?php if ($numberOfPhotos > $thumbNumber):?>
				<a id="nav-next" href="javascript:void(0)" class="nav-btn"></a>
			<?php endif;?>
		</div>
		<?php endif;?>
	</div>
</div>