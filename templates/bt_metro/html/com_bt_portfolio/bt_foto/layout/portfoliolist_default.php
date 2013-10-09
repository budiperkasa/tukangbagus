<?php
/**
 * @package 	bt_portfolio - BT Portfolio Component
 * @version		1.2.6
 * @created		Feb 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */
// no direct access
defined('_JEXEC') or die;
$document= & JFactory::getDocument();
$title = $this->category->title? $this->category->title : $document->getTitle();
$document->addScript(COM_BT_PORTFOLIO_THEME_URL.'js/jquery.quicksand.js');
$document->addScript(COM_BT_PORTFOLIO_THEME_URL.'js/foto.js');
$activeID = JRequest::getInt("catid");
$all = true;
foreach ($this->listCategories as $category){
	if($category->id == $activeID){
		$all = false;
	}
}
?>
<div class="btp">
	<div class="btp-header">
	<!-- Show navigation categories -->
	<?php if($this->params->get('show_cat_navigation')){ ?>
	<div class="btp-categories">
		<!--<a data-value="all" <?php if ($all) echo 'class="active"';	?>	href="#">
				<span><?php echo JText::_('JALL') ?></span>
		</a>-->
		<?php 
		$j=0;
		foreach ($this->listCategories as $category) {
			$j++;
		?>
			<a class="<?php if($j==1){ echo 'first-category';} else {echo 'category'.$j;}?>" data-value="p<?php
			echo str_replace(',',',p',Bt_portfolioModelPortfolios::callBackAllChild($category->id)); 		
			?>" <?php if ($category->id == $activeID) echo 'class="active"';	?>	href="#">
				<span><?php echo $category->title ?></span>
			</a>
		<?php
		}
		?>
	</div>
	<?php } ?>
	</div>
	
	<?php if($this->params->get('show_titlecat',1)): ?>
		<h1 class="btp-title">
			<?php echo $title ?>
		</h1>
	<?php endif; ?>
	<?php if($this->params->get('show_descat')): ?>
		<div class="btp-catdesc">
			<?php echo $this->category->description; ?>
		</div>
	<?php endif; ?>
	
	<!-- Show list portfolios -->
	<?php if($this->params->get('show_portcat',1)): ?>
	
	<div class="btp-list" style="display:none">
		<?php
		$i=0;
		$total = count($this->items);
		foreach ($this->items as $item) {
			$i++;
			$img_url = Bt_portfolioHelper::getPathImage($item->id,'thumb',$item->image,$item->category_id);
			$img_frame = COM_BT_PORTFOLIO_THEME_URL . 'images/image-frame.png';
			$link = JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&id=' . $item->id.':'.$item->alias.'&catid_rel=' . $item->category_id.':'.$item->category_alias);
		?>
		<div data-id="pid<?php echo $item->id; ?>" class="btp-item p<?php echo $item->category_id?> <?php if($i==1) echo 'item-first'; else if ($i == $total) echo  'item-last';?>" <?php if ($item->category_id != $activeID && !$all) echo 'style="display:none"';	?>>
				<a class="image-link" href="<?php echo $link ?>">
					<span class="title-hover"><span><?php echo $item->title; ?></span></span>
					<img class="image-default" style="width:<?php echo $this->params->get('thumb_width',336) ?>px;" src="<?php echo $img_url ?>">
					<div class="iframe-hover"><div class="iframe-hover-inner">
						<div class="item-category"><?php echo $item->category_title;?></div>
                    <div class="iframe-hover-inner2"></div></div></div>

				</a>
		</div>
		<?php
		}
		?>
	</div>
	<!-- Show pagination -->
	<?php if ($this->pagination->get('pages.total') > 1) : ?>
			<div class="pagination">
				<!--  <p class="counter"><?php  echo $this->pagination->getPagesCounter(); ?></p> -->
				<?php echo $this->pagination->getPagesLinks(); ?>
			</div>
	<?php endif; ?>
	<?php endif; ?>
</div>

