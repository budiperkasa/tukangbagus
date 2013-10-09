<?php
/**
 * @package 	bt_portfolio - BT Portfolio Component
 * @version		1.2.6
 * @created		Dec 2011
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;
JTable::addIncludePath(JPATH_ADMINISTRATOR.'/components/com_bt_portfolio/tables');

/**
 * Build the route for the BT_Portfolio component
 *
 * @param	array	An array of URL arguments
 *
 * @return	array	The URL arguments to use to assemble the subsequent URL.
 */
function Bt_portfolioBuildRoute(&$query){
	$segments = array();

	// get a menu item based on Itemid or currently active
	$app	= JFactory::getApplication();
	$menu	= $app->getMenu();
	$catid = 0;
	if (empty($query['Itemid'])) {
		$menuItem = $menu->getActive();
	} else {
		$menuItem = $menu->getItem($query['Itemid']);
	}



	$mView	= (empty($menuItem->query['view'])) ? null : $menuItem->query['view'];
	$mcatid_rel	= (empty($menuItem->query['catid_rel'])) ? null : $menuItem->query['catid_rel'];
	$mId	= (empty($menuItem->query['id'])) ? null : $menuItem->query['id'];
	unset($query['view']);
	
	// are we dealing with a portfolio that is attached to a menu item?
	if (isset($view) && ($mView == $view) and (isset($query['id'])) and ($mId == intval($query['id']))) {
		unset($query['view']);
		unset($query['catid_rel']);
		unset($query['id']);
		unset($query['catid']);
		return $segments;
	}
	if(isset($query['catid_rel'])){
		$arr = explode(':', $query['catid_rel'], 2);
		$catid = $arr[0];
		if(count($arr) ==2){
			$segments[]=$arr[1];
		}
		else{
			$table = JTable::getInstance('Category', 'Bt_portfolioTable');
			$table->load($arr[0]);
			$segments[]=$table->alias;
		}
		unset($query['catid_rel']);
	}
	if(isset($query['catid'])){
		$arr = explode(':', $query['catid'], 2);
		$catid = $arr[0];
		if(count($arr) ==2){
			$segments[]=$arr[1];
		}
		else{
			$table = JTable::getInstance('Category', 'Bt_portfolioTable');
			$table->load($arr[0]);
			$segments[]=$table->alias;
		}
		unset($query['catid']);
	}
	if(isset($query['id'])){
		$arr = explode(':', $query['id'], 2);
		if(count($arr) ==2){
			$segments[]=$arr[1];
		}
		else{
			$table = JTable::getInstance('Portfolio', 'Bt_portfolioTable');
			$table->load($arr[0]);
			$segments[]=$table->alias;
		}
		unset($query['id']);
	}
	if(isset($query['task'])){
		$segments[]=$query['task'];
		$segments[] = '';
		unset($query['task']);
	}

	if(isset($query['src'])){
		$segments[]=$query['src'];
		unset($query['src']);
	}


	//if(isset($menuItem->component) && $menuItem->component !='com_bt_portfolio'){

	if(isset($query['catid'])){
		$catid = $query['catid'];
	}
	if(isset($query['catid_rel'])){
		$catid = $query['catid_rel'];
	}
	if(!isset($query['Itemid'])){
		$itemID  = BTFindItemID($catid);
		if($itemID){
			$menuItem = $menu->getItem($itemID);
			$query['Itemid'] = $itemID;
		}
	}
	
	//}else{
	//	if(isset($menuItem->home) &&  $menuItem->home == 1){
	//		$query['Itemid'] = $menuItem->id;
	//	}
	//}

	return $segments; 
}
/**
 * Parse the segments of a URL.
 *
 * @param	array	The segments of the URL to parse.
 *
 * @return	array	The URL attributes to be used by the application.
 */

function Bt_portfolioParseRoute($segments)
{
	$vars = array();
	//Get the active menu item.
	$app	= JFactory::getApplication();
	$menu	= $app->getMenu();
	$item	= $menu->getActive();

	$params = JComponentHelper::getParams('com_bt_portfolio');

	// Count route segments
	$count = count($segments);
	foreach($segments as & $segment)
	{
		$segment = str_replace(':', '-', $segment);
	}
	if($segments[0]=='comment.comment'){
		$vars['task'] = $segments[0] ;
		return $vars;
	}
	if($segments[0]=='portfolio.viewimage'){
		$vars['task'] =$segments[0] ;
		$vars['src'] =$segments[1] ;
		return $vars;
	}
	switch($count){
		case 1:
			$table = JTable::getInstance('Category', 'Bt_portfolioTable');
			$table->load(array('alias'=>$segments[0]));
			if($table->id){
				$vars['catid'] = $table->id;
				$vars['view'] ='portfolios';
			}
			else{
				$table = JTable::getInstance('Portfolio', 'Bt_portfolioTable');
				$table->load(array('alias'=>$segments[0]));
				$vars['id'] = $table->id;
				$vars['view'] ='portfolio';
			}
			break;
		case 3:
			$vars['task'] =$segments[2] ;
		case 2:

			$table = JTable::getInstance('Portfolio', 'Bt_portfolioTable');
			$table->load(array('alias'=>$segments[1]));
			if($table->id){
				$vars['id'] = $table->id;
				$table = JTable::getInstance('Category', 'Bt_portfolioTable');
				$table->load(array('alias'=>$segments[0]));
				$vars['catid_rel'] = $table->id;
				$vars['view'] ='portfolio';
			}else{
				$table = JTable::getInstance('Category', 'Bt_portfolioTable');
				$table->load(array('alias'=>$segments[1]));
				$vars['catid'] = $table->id;
				$vars['view'] ='portfolios';
			}
			break;

			break;
	}
	return $vars;
}
if(!function_exists('BTFindItemID')){
	function BTFindItemID ($catid) {
		$db = JFactory::getDbo();
		$user = JFactory::getUser();
		$groups = implode(',', $user->getAuthorisedViewLevels());
		$query = "select id from #__menu where link like '%index.php?option=com_bt_portfolio&view=portfolios&catid=".$catid."%' and published = 1 and access in(".$groups.") order by lft limit 1";
		$db->setQuery($query);

		$itemId = $db->loadResult();

		if(!$itemId && $catid){
			$query = 'select parent_id from #__bt_portfolio_categories where id = '.$catid;
			$db->setQuery($query);
			$catid = intval($db->loadResult());
			$itemId = BTFindItemID ($catid);
		}

		return $itemId;
	}
}