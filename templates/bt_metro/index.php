<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.protostar
 *
 * @copyright   Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
include 'header_var.php'; 
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link type="text/css" href="templates/<?php echo $this->template; ?>/less/bt_metro.less" rel="stylesheet/less" />
    <?php $doc->addScript('templates/'.$this->template.'/js/less-1.3.0.min.js'); ?>
	<?php $doc->addScript('templates/'.$this->template.'/js/hammer.js'); ?>
	<jdoc:include type="head" />
	<?php
	// Use of Google Font
	if ($this->params->get('googleFont')){
	$googleFont = explode(':', $this->params->get('googleFontName'));
	?>
		<link href='http://fonts.googleapis.com/css?family=<?php echo $this->params->get('googleFontName');?>' rel='stylesheet' type='text/css' />
		<style type="text/css">
			h1,h2,h3,h4,h5,h6,.btl-user,.site-title, div.itemHeader span.itemDateCreated, div.itemHeader h2.itemTitle, span.itemHits, div.itemCategory, div.itemTagsBlock, div.itemAuthorBlock .itemAuthorName, div.itemCommentsForm h3, div.itemCommentsForm #comment-form label, div.itemCommentsForm form input#submitCommentButton, div.itemAuthorLatest h3, div.itemRelated h3, .list-itemComments h3.itemCommentsCounter, .my-pagination li, div.catItemHeader h3.catItemTitle, div.catItemHeader span.catItemDateCreated, div.itemListCategory h2, div.catDescription, div.userBlock h2, div.userBlock div.userDescription, div.userAdditionalInfo, div.userItemHeader h3.userItemTitle, div.userItemHeader span.userItemDateCreated, div.tagItemHeader h2.tagItemTitle, div.tagItemHeader span.tagItemDateCreated, h2.latestItemTitle, span.latestItemDateCreated, div.latestItemsCategory h2, div.latestItemsCategoryDescription, div.latestItemsUser h2, div.latestItemsUserDescription, .bg-item-header-img .published, h2.contentTitle, h2.item-title, .itemContentHeader .published, h2.itemContentTitle, .nav-pills li ul.nav-child li a, .page-heading-title, .bg-infor-item, div.itemCommentsForm p.itemCommentsFormNotes, div.itemComments ul.itemCommentsList li span.commentAuthorName{
				font-family: '<?php echo str_replace('+', ' ', $googleFont[0]);?>', sans-serif;
			}
		</style>
	<?php 
	}?>
	<?php
	// Template color
	if ($this->params->get('templateColor')){ ?>
	<style type="text/css">
		a{
			color: <?php echo $this->params->get('templateColor');?>;
		}
	</style>
	<?php
	}
	?>
	<!--[if lt IE 9]>
		<script src="<?php echo $this->baseurl ?>/media/jui/js/html5.js"></script>
	<![endif]-->
	<?php $doc->addScript('templates/'.$this->template.'/js/easing.1.3.min.jquery.js'); ?>
	<?php $doc->addScript('templates/'.$this->template.'/js/home.js'); ?>
<style>
	body,html{
		overflow-x:hidden;
	}
	#home-container{
		overflow:hidden;
		position:relative;
		visibility:hidden;
	}
	#home-scroll > div{
		min-height:400px;
		padding:0;
		margin:0;
	}
	#imgLoading{
		position:fixed;
		top:50%;
		left:50%;
		z-index:999;
	}
</style>
<script type="text/javascript">					
    jQuery(document).ready(function(){							
		jQuery('.custom_mail').css('height',jQuery('.swap-mail').innerHeight(true));
		jQuery('.custom_mail').hover(
			function(){									
				jQuery('.show-contact').animate({
					'top'	: 0,										
				},400);									
			},
			function(){									
				jQuery('.show-contact').animate({
					'top'	: '100%'										
				},400);									
		});		

		if(jQuery(window).width() <= 767 && jQuery('.navigation > .menu > ul > li').hasClass('active')){																
			jQuery('.navigation #pagenav li:first-child').css('display','block');														
		}
						
		jQuery('#btl-panel-profile').hover(
			function(){
				jQuery(this).children('.btl-profile-getting').fadeOut();
				jQuery(this).children('#btl-content-profile ').fadeIn();
			},
			function(){
				jQuery(this).children('#btl-content-profile ').fadeOut();
				jQuery(this).children('.btl-profile-getting').fadeIn();
				
			}
		)
	});
</script>   
</head>

<body class="site <?php echo $option . " view-" . $view . " layout-" . $layout . " task-" . $task . " itemid-" . $itemid . " ";?> <?php if ($this->params->get('fluidContainer')) { echo "fluid"; } ?>">
	<!-- Body -->
	<div class="body">
		<div class="container<?php if ($this->params->get('fluidContainer')) { echo "-fluid"; } ?>">
			<!-- Header -->
			<div class="header">
				<div class="header-inner row">
					<div class="span3 logo" href="<?php echo $this->baseurl; ?>">
						<a href="index.php"><?php echo $logo;?></a> <?php if ($this->params->get('sitedescription')) { echo '<div class="site-description">'. htmlspecialchars($this->params->get('sitedescription')) .'</div>'; } ?>
                       
					</div>
                     <?php if ($this->countModules('slogan')): ?>
                         <div class="span3 slogan">
                             <jdoc:include type="modules" name="slogan" style="xhtml" />
                         </div>
                     <?php endif; ?>

					<?php if ($this->countModules('topnav')): ?>
					<div class="navigation span6">
						
						<div id="pagenav">
							<jdoc:include type="modules" name="pagenav" style="none" />
						</div>
					</div>
					<?php endif; ?>
					<div class="clearfix"></div>
				</div>
			</div>
            
          <?php if ($menu->getActive() != $menu->getDefault($lang->getTag()) ) : ?>  
            <div class="page-heading">
            	<div class="page-heading-inner">
					<div class="page-heading-title">
						<?php
							$active_menu = JFactory::getApplication()->getMenu()->getActive();
							if ($active_menu != '') :
								echo $active_menu->title;
						?>	
						<?php else : ?>
							<?php echo $doc->getTitle(); ?>
						<?php endif; ?>
					</div><!-- page-heading-title -->
					<?php if ($this->countModules('path-way')): ?>
                    <div class="path-way">
                        <jdoc:include type="modules" name="path-way" style="xhtml" />
                    </div><!-- path-way -->
                    <?php endif; ?>
					<div style="clear:both"></div>     
					   
            	</div>
            </div>
			<?php endif; ?>    
			<!-- page-heading -->			
			<!-- Load blocks -->      
			<div class="main">
				<?php if ($menu->getActive() == $menu->getDefault($lang->getTag()) ) : ?>
				<img id="imgLoading" src="<?php echo $this->baseurl ?>/templates/bt_metro/images/loader.gif" /> 
				<div id="home-container" ondragstart="return false;">
					<div id="home-scroll">
					<?php include 'blocks/home1.php'; ?>                    
					<?php include 'blocks/home2.php'; ?>
					<?php include 'blocks/home3.php'; ?>     
					<?php include 'blocks/home4.php'; ?>  					
					<?php include 'blocks/home5.php'; ?>
                                        <?php include 'blocks/home6.php'; ?>
					</div>
				</div>
				<?php else: ?>
				<div class="block-content row">			
					<div id="content" class="<?php echo $span; ?>">
						<jdoc:include type="component" />
					</div>
					
					<?php if ($this->countModules('sidebar-right') || $this->countModules('sidebar-left')):  ?>
					<?php if($option == "com_bt_portfolio" && $app->input->getCmd('id',0) == 0) : ?>
					<?php else:?>
					
					<?php if ($this->countModules('sidebar-left')): ?>
					<!-- Begin Sidebar left-->
					<div id="sidebar1" class="span3">
						<div class="sidebar-nav">
							<jdoc:include type="modules" name="sidebar-left" style="xhtml" />
						</div>
					</div>
					<!-- End Sidebar -->
					<?php endif; ?>
					
					<?php if ($this->countModules('sidebar-right')): ?>
					<!-- Begin Sidebar right-->
					<div id="sidebar3" class="span3">
						<div class="sidebar-nav">
							<jdoc:include type="modules" name="sidebar-right" style="xhtml" />
							<div class="clrDiv"></div>
						</div>
					</div>
					<?php endif; ?>
					<!-- End Sidebar -->
					
					<?php endif; ?>
					<?php endif; ?>
						
				</div>
				<?php endif; ?>
			</div>
		</div>
        
		<!-- Footer -->
		<div class="footer">
			<div class="container<?php if ($this->params->get('fluidContainer')) { echo "-fluid"; } ?>">
				<jdoc:include type="modules" name="footer" style="none" />
			</div>
		</div>
       <?php if ($menu->getActive() == $menu->getDefault($lang->getTag()) ) : ?> 
       <div class="sidebar-footer">
       		<div class="container">
            	<!-- botton  -->
                <div class="sidebar-left"></div>
                <div class="sidebar-right"></div>
                <!--  -->
            	<div class="sidebar">
                	<div class="active-sidebar"></div>
                </div>
            </div>
       </div>
	   <?php endif; ?>
		<jdoc:include type="modules" name="debug" style="none" />

	</div>
	
</body>
</html>
