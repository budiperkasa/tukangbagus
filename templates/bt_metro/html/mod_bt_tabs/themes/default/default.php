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
$firstTab = true;
$firstItem = true;

?>
<div  class="bt-tabs" style="width: <?php if($width == 'auto'){echo "100%";}else{echo $width."px";} ?>; <?php if($height == "auto"){echo 'height:auto;';}else{?> height:<?php echo $height;?>px;<?php }?>">
<?php if($titlePosition !="bottom"){?>
	<!-- TAB BUTTONS BLOCK -->
	<div class="tab-buttons">		
		<ul class="tab-container">
		<?php 
		$k=0;
		if($titleWidth != 'auto'){ $titleWidth .= 'px';}  
		foreach ($tabsObject as $tab){
			$k++;
			if($tab->tabType == "K2 Categories" && $tab->tabGroup == 1 ){
				$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue);
				foreach ($articleInK2Category as $articleK2){?>
					<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?> icon<?php echo $k; ?>"><span class="bt-li"><?php echo $articleK2->title;?></span></li>
		<?php }
 			}elseif($tab->tabType == "Position" && $tab->tabGroup == 1){			
				$tabGroup = BTTagsHelper::loadModuleInPosition($tab->tabValue);
				foreach($tabGroup as $tabElement){?>
					<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?> icon<?php echo $k; ?>"><span class="bt-li"><?php echo $tabElement->title;?></span></li>		
		<?php }
			 }elseif($tab->tabType == "Categories" && $tab->tabGroup == 1){
			 	$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);			 	
			 	foreach($articleInCategory as $aticle){?>
			 		<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?> icon<?php echo $k; ?>"><span class="bt-li"><?php echo $aticle->title;?></span></li>
			<?php }
		}else{?>
			<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?> icon<?php echo $k; ?>"><span class="bt-li"><?php echo $tab->tabTitle;?></span></li>
	<?php }
		}
		?>
		</ul>
	</div><?php if($titlePosition=="top"){?> <div class="clear"></div><?php } ?><!-- END BLOCK -->
	
	<!-- TAB ITEMS BLOCK -->
	<div class="tab-items">
		<div>
		<?php foreach ($tabsObject as $tab){			
			if($tab->tabType  == "Categories" && $tab->tabGroup == 1 ){
				$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);
				foreach($articleInCategory as $aticle){
					$atricle_params = new JRegistry() ;
					$atricle_params->loadString($aticle->attribs);
					$show_title_article = $atricle_params->get('show_title');
					if($show_title_article ==''){
						$global_config_article = JComponentHelper::getParams('com_content');
						$show_title_article = $global_config_article->get('show_title');
					}
					?>
					<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
						<?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>
						<div><?php  echo $aticle->introtext; ?></div>
					</div>
				<?php }?>
			<?php }elseif($tab->tabType  == "K2 Categories" && $tab->tabGroup == 1 ){
				$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue);
				foreach ($articleInK2Category as $articleK2){?>
					<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
						<?php  if(json_decode($articleK2->params)->catItemTitle=='1'){?><h3 class="btTab-article-title"><?php echo $articleK2->title;?> </h3><?php }?>
						<div><?php echo $articleK2->introtext; ?></div>
					</div>
				<?php }?>
			<?php }elseif($tab->tabType  == "Position" && $tab->tabGroup == 1){	
				$tabGroup = BTTagsHelper::loadModuleInPosition($tab->tabValue);
				foreach($tabGroup as $tabElement){?>
				<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
					<?php if($tabElement->showtitle=='1'){?>
						<h3 class="btTab-article-title"><?php echo $tabElement->title; ?></h3>
					<?php }?>
					<div><?php 	echo $tabElement->render;	?></div>			 
			 	</div>			
			<?php }?>
			<?php }else{?>
				<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
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
					$aticle = BTTagsHelper::loadArticle($tab->tabValue);
					//$atricle_params = new JParameter($aticle->attribs) ;
					$atricle_params = new JRegistry() ;
					$atricle_params->loadString($aticle->attribs);
					$show_title_article = $atricle_params->get('show_title');
					if($show_title_article ==''){
						$global_config_article = JComponentHelper::getParams('com_content');
						$show_title_article = $global_config_article->get('show_title');
					}
					?>			
						<?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>		
						<div><?php echo $aticle->introtext;?></div>			
					  <?php break;
					case "K2 Article":
						$k2Article =  BTTagsHelper::loadK2Article($tab->tabValue);?>
						<?php if($k2Article[4]=='1'){?><h3 class="btTab-article-title"><?php echo $k2Article[0];?></h3><?php }?>
						<div><?php echo $k2Article[1]; ?></div>
					  <?php break;
					case "K2 Categories":						
						$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue); 
						foreach ($articleInK2Category as $articleK2){
						//	var_dump($articleK2);
						 $paramsItem = new stdClass();
						 $paramsItem =json_decode($articleK2->params);
        				 $articleK2->catItemTitle = $paramsItem->catItemTitle;
						?>
							<?php if($articleK2->catItemTitle =='1'){?><h3 class="btTab-article-title"><?php echo $articleK2->title;?> </h3><?php }?>
							<div> <?php echo $articleK2->introtext; ?></div>	
						<?php }
					  break;
				  	case "Categories":
						$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);
						foreach($articleInCategory as $aticle){
							//$atricle_params = new JParameter($aticle->attribs) ;
							$atricle_params = new JRegistry() ;
							$atricle_params->loadString($aticle->attribs);
								$show_title_article = $atricle_params->get('show_title');
								if($show_title_article ==''){
									$global_config_article = JComponentHelper::getParams('com_content');
									$show_title_article = $global_config_article->get('show_title');
								}		
					?>
						 <?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>
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
		<div class="clear"></div>
		</div>
	</div><!-- END BLOCK -->
	
	<?php }else{?><!-- FOR ANOTHER POSITION -->
	<!-- TAB ITEMS BLOCK -->
	<div class="tab-items">
		<div>
		<?php foreach ($tabsObject as $tab){			
			if($tab->tabType  == "Categories" && $tab->tabGroup == 1 ){
				$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);
				foreach($articleInCategory as $aticle){
					//$atricle_params = new JParameter($aticle->attribs) ;
					$atricle_params = new JRegistry() ;
					$atricle_params->loadString($aticle->attribs);
					$show_title_article = $atricle_params->get('show_title');
					if($show_title_article ==''){
						$global_config_article = JComponentHelper::getParams('com_content');
						$show_title_article = $global_config_article->get('show_title');
					}
					?>
					<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
						<?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>
						<div><?php  echo $aticle->introtext; ?></div>
					</div>
				<?php }?>
			<?php }elseif($tab->tabType  == "K2 Categories" && $tab->tabGroup == 1 ){
				$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue);
				foreach ($articleInK2Category as $articleK2){?>
					<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
						<?php if($articleK2->catItemTitle =='1'){?><h3 class="btTab-article-title"><?php echo $articleK2->title;?> </h3><?php }?>
						<div><?php echo $articleK2->introtext; ?></div>
					</div>
				<?php }?>
			<?php }elseif($tab->tabType  == "Position" && $tab->tabGroup == 1){	
				$tabGroup = BTTagsHelper::loadModuleInPosition($tab->tabValue);
				foreach($tabGroup as $tabElement){?>
				<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
					<?php if($tabElement->showtitle=='1'){?>
						<h3 class="btTab-article-title"><?php echo $tabElement->title; ?></h3>
					<?php }?>
					<div><?php 	echo $tabElement->render;	?></div>			 
			 	</div>			
			<?php }?>
			<?php }else{?>
				<div class="tab-items-inner <?php if($firstItem==true){echo "active"; $firstItem= false;}?>">
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
					$aticle = BTTagsHelper::loadArticle($tab->tabValue);
					//$atricle_params = new JParameter($aticle->attribs) ;
					$atricle_params = new JRegistry() ;
					$atricle_params->loadString($aticle->attribs);
					$show_title_article = $atricle_params->get('show_title');
					if($show_title_article ==''){
						$global_config_article = JComponentHelper::getParams('com_content');
						$show_title_article = $global_config_article->get('show_title');
					}
					?>			
						<?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>		
						<div><?php echo $aticle->introtext;?></div>			
					  <?php break;
					case "K2 Article":
						$k2Article =  BTTagsHelper::loadK2Article($tab->tabValue);?>
						<?php if($k2Article[4]=='1'){?><h3 class="btTab-article-title"><?php echo $k2Article[0];?></h3><?php }?>
						<div><?php echo $k2Article[1]; ?></div>
					  <?php break;
					case "K2 Categories":						
						$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue); 
						foreach ($articleInK2Category as $articleK2){
						//	var_dump($articleK2);
						 $paramsItem = new stdClass();
						 $paramsItem =json_decode($articleK2->params);
        				 $articleK2->catItemTitle = $paramsItem->catItemTitle;
						?>
							<?php if($articleK2->catItemTitle =='1'){?><h3 class="btTab-article-title"><?php echo $articleK2->title;?> </h3><?php }?>
							<div> <?php echo $articleK2->introtext; ?></div>	
						<?php }
					  break;
				  	case "Categories":
						$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);
						foreach($articleInCategory as $aticle){
								//$atricle_params = new JParameter($aticle->attribs) ;
								$atricle_params = new JRegistry() ;
								$atricle_params->loadString($aticle->attribs);
								$show_title_article = $atricle_params->get('show_title');
								if($show_title_article ==''){
									$global_config_article = JComponentHelper::getParams('com_content');
									$show_title_article = $global_config_article->get('show_title');
								}		
					?>
						 <?php if($show_title_article== '1'){?><h3 class="btTab-article-title"><?php echo $aticle->title ;?></h3><?php }?>
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
		<div class="clear"></div>
		</div>
	</div><!-- END BLOCK -->
<!-- TAB BUTTONS BLOCK -->
	<div class="tab-buttons">		
		<ul class="tab-container">
		<?php foreach ($tabsObject as $tab){
			
			if($tab->tabType == "K2 Categories" && $tab->tabGroup == 1 ){
				$articleInK2Category =BTTagsHelper::loadK2Categories($tab->tabValue);
				foreach ($articleInK2Category as $articleK2){?>
					<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?>"><?php echo $articleK2->title;?></li>
		<?php }
 			}elseif($tab->tabType == "Position" && $tab->tabGroup == 1){			
				$tabGroup = BTTagsHelper::loadModuleInPosition($tab->tabValue);
				
				foreach($tabGroup as $tabElement){?>
					<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?>"><?php echo $tabElement->title;?></li>		
		<?php }
			 }elseif($tab->tabType == "Categories" && $tab->tabGroup == 1){
			 	$articleInCategory =BTTagsHelper::loadCategories($tab->tabValue);			 	
			 	foreach($articleInCategory as $aticle){?>
			 		<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?>"><?php echo $aticle->title;?></li>
			<?php }
		}else{?>
			<li style="width:<?php echo $titleWidth; ?>;" class="<?php if($firstTab==true){echo "active "; $firstTab=false;}?>"><?php echo $tab->tabTitle;?></li>
	<?php }
		}
		?>
		</ul>
	</div><?php if($titlePosition=="top"){?> <div class="clear"></div><?php } ?><!-- END BLOCK -->
	<?php }?>
</div>