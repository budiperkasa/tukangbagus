<?php
/**
 * @package 	mod_bt_tabs - BT Tabs Module
 * @version		2.0
 * @created		Nov 2012
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

?>
<div class="<?php echo $moduleclass_sfx?>" style="display:block; width: <?php if($width == 'auto'){echo "100%";}else{echo $width."px";} ?>; height:auto;" id="bttabs<?php echo $module->id;?>">

	<?php if($tabsObject== null ){
				if( $layout=="style1"){?>
			<div  class="bt-tabs" style="width: <?php if($width=='auto'){echo"100%";}else{echo $width;} ?>; height:<?php echo $height;?>">
				<div class="tab-buttons">
					<ul class="tab-container">
						<li></li>
					</ul>
				</div>
				<div class="tab-items">
					<span style="color:red; font-weight:bold;">No content!</span>
				</div>
			</div>
	<?php 		}
		}else{
		include $tempPath;
		
	}?>
</div>
<script type="text/javascript">
if(typeof(BTTOptArr)=='undefined'){
	var BTTOptArr= new Array();
}
BTTOptArr.push({
		LAYOUT		:"<?php echo $layout?>",
		EFFECT 		:"<?php echo $effect;?>",
		DURATION	:<?php echo $duration;?>,
		EVENT		:"<?php echo $event; ?>",
		POSITION	:"<?php echo $titlePosition;?>",
		ID_TAB 		:"#bttabs<?php echo $module->id; ?>",
		HEIGHT		:"<?php echo $height;?>",
		TYPE_SLIDE	:"<?php echo $typeSlide;?>",
		WIDTH_TAB	:"<?php echo $titleWidth;?>",
		EFFECT_TITLE:"<?php echo $effectTitle;?>",
		VELOCITY	:"<?php echo (1/$velocity);?>",
		INTERVAL	:"<?php echo $interval;?>"
});


</script>
