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
<div  class="bt-tabs" style="width: auto; height:auto;">
	<?php foreach ($tabsObject as $tab){ 
		if($tab->tabType == "K2 Categories" && $tab->tabGroup == 1 ){
				$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue);
				foreach ($articleInK2Category as $articleK2){?>
					<div class="tab-button"><?php echo $articleK2->title;?></div>
					<div class="tab-content">
						<h3 class="btTab-article-title"><?php echo $articleK2->title; ?> </h3>
						<div><?php echo $articleK2->introtext; ?></div>
					</div>
		<?php }
 			}elseif($tab->tabType == "Position" && $tab->tabGroup == 1){			
				$tabGroup = BTTagsHelper::loadModuleInPosition($tab->tabValue);
				foreach($tabGroup as $tabElement){?>
					<div class="tab-button"><?php echo $tabElement->title;?></div>
					<div class="tab-content">
						<h3 class="btTab-article-title"><?php echo $tabElement->title; ?></h3>
						<div><?php 	echo $tabElement->render;	?></div>	
					</div>		
		<?php }
			 }elseif($tab->tabType == "Categories" && $tab->tabGroup == 1){
			 	$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);			 	
			 	foreach($articleInCategory as $aticle){?>
			 		<div class="tab-button"><?php echo $aticle->title;?></div>
			 		<div class="tab-content">
			 			<h3 class="btTab-article-title"><?php echo $aticle->title; ?></h3>
						<div><?php  echo $aticle->introtext; ?></div>
			 		</div>
			<?php }
		}else{?>
			<div class="tab-button" ><?php echo $tab->tabTitle;?></div>
			<div class="tab-content">
				<?php switch ($tab->tabType){
					case "Module":
						$moduleInfo= BTTagsHelper::loadModule($tab->tabValue);?>
						<h3 class="btTab-article-title"><?php echo $moduleInfo->title; ?></h3>
						<div><?php echo $moduleInfo->render; ?></div>
					  <?php break;
					case "Position":				
						echo(BTTagsHelper::loadPosition($tab->tabValue));
					  break;
					case "Article":	
					$aticle = BTTagsHelper::loadArticle($tab->tabValue);?>			
						<h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3>	
						<div><?php echo $aticle->introtext;?></div>			
					  <?php break;
					case "K2 Article":
						$k2Article =  BTTagsHelper::loadK2Article($tab->tabValue);?>
						<h3 class="btTab-article-title"><?php echo $k2Article[0];?></h3>
						<div><?php echo $k2Article[1]; ?></div>
					  <?php break;
					case "K2 Categories":						
						$articleInK2Category = BTTagsHelper::loadK2Categories($tab->tabValue);
						foreach ($articleInK2Category as $articleK2){?>
							<h3 class="btTab-article-title"><?php echo $articleK2->title;?> </h3>
							<div> <?php echo $articleK2->introtext; ?></div>	
						<?php }
					  break;
				  	case "Categories":
						$articleInCategory = BTTagsHelper::loadCategories($tab->tabValue);
						foreach($articleInCategory as $aticle){?>					
						  <h3 class="btTab-article-title"><?php echo $aticle->title;?></h3>
						  <div><?php echo $aticle->introtext;?></div> 
						<?php }
				  	  break;
					case "Custom Text":
						echo $tab->tabValue;
					  break;
					default:				
				}?>
			</div>
	<?php }
	 } ?>
</div>