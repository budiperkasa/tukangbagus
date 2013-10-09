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
// No direct access
defined('_JEXEC') or die;

class Bt_portfolioViewPortfolio extends BTView
{
	protected $state;
	protected $item;

	function display($tpl = null)
	{
		$app = JFactory::getApplication();
		$user = &JFactory::getUser();
		$params = $app->getParams();
		$model = $this->getModel();
		$uri = JFactory::getURI();
		$lang = &JFactory::getLanguage();

		$model->hit();
		
		// Get some data from the models
		$state = $this->get('State');
		$item = $this->get('Item');
		
		$registry = new JRegistry();
		$registry->loadString($item->params);
		$params->merge($registry);
	
		$images = array();
		$images = $this->get("Images");
		
		$category = JTable::getInstance('Category', 'Bt_portfolioTable');
		$catids = explode(',', $item->catids);
		$catid_rel = JRequest::getInt('catid_rel');
		$mainCategoryID = 0;
		if (in_array($catid_rel, $catids) && $catid_rel !=0)
		{
			$mainCategoryID = $catid_rel;

		}
		else
		{
			foreach ($catids as $catid)
			{
				if ($catid)
				{
					$mainCategoryID = $catid;
					break;
				}
			}
		}
		$category->load($mainCategoryID);

		$modelComment = &JModelLegacy::getInstance('Comment', 'Bt_portfolioModel', array('ignore_request' => true));
		$formComment = $modelComment->getForm();
		$limitstart = (int) JRequest::getVar("limitstart", 0);
		$orderDir = $params->get("comment_displayorder", 'desc');
		$commentList = $modelComment->getListComment($item->id, $params->get('number_comments', 0), $limitstart, $orderDir);

		$pageComment = new JPagination($modelComment->getCommentTotal($item->id), $limitstart, $params->get('number_comments', 0));

		$groups = $user->getAuthorisedViewLevels();
		if (!in_array($item->access, $groups))
		{
			return JError::raiseError(403, JText::_('JERROR_ALERTNOAUTHOR'));
		}
		$comment = array();
		$comment['data'] = $commentList;
		$comment['nav'] = $pageComment;
		$comment['form'] = $formComment;

		// Content plugin 
		$item->full_description = JHTML::_('content.prepare', $item->full_description);
		
		$this->assignRef('params', $params);
		$this->assignRef('item', $item);
		$this->assignRef('uri', $uri);
		$this->assignRef('lang', $lang);
		$this->assignRef('images', $images);
		$this->assignRef('user', $user);
		$this->assignRef('comment', $comment);
		$this->assignRef('category', $category);
		$theme = $params->get('theme', 'default');
		$this->_addPath('template', JPATH_COMPONENT . '/themes/default/layout');
		$this->_addPath('template', JPATH_COMPONENT . '/themes/' . $theme . '/layout');
		$this->_addPath('template', JPATH_SITE . '/templates/' . $app->getTemplate() . '/html/com_bt_portfolio/default/layout');
		$this->_addPath('template', JPATH_SITE . '/templates/' . $app->getTemplate() . '/html/com_bt_portfolio/'. $theme . '/layout');
		
		


		$this->_prepareDocument();
		parent::display($tpl);
	}
	/**
	 * Prepares the document
	 */
	protected function _prepareDocument()
	{
		$app		= JFactory::getApplication();
		$menus		= $app->getMenu();
		$pathway	= $app->getPathway();
		$title 		= null;

		$menu = $menus->getActive();
		
		$id = (int) @$menu->query['id'];
			
		$title = $this->params->get('page_title', '');

		if ($menu && ($menu->query['option'] != 'com_portfolios' || $menu->query['view'] != 'portfolio' || $this->item->id != $id))
		{
			if($this->item->id != $id){
				if($this->category->id){
					$pathwayNames = $pathway->getPathwayNames();
					if(count($pathwayNames) == 0 ||trim(strtolower($this->category->title)) != trim(strtolower($pathwayNames[count($pathwayNames)-1]))){
						$pathway->addItem($this->category->title, JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $this->category->id.':'.$this->category->alias));
					}
				}
				$pathway->addItem($this->item->title,'');
			}
		}
		
		if (empty($title)) {
			$title = $this->item->title;
		}
		
		if (empty($title)) {
			$title = $app->getCfg('sitename');
		}
		elseif ($app->getCfg('sitename_pagetitles', 0) == 1) {
			$title = JText::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		}
		elseif ($app->getCfg('sitename_pagetitles', 0) == 2) {
			$title = JText::sprintf('JPAGETITLE', $title, $app->getCfg('sitename'));
		}

		$this->document->setTitle($title);
		
		
		// META DATA
		if ($this->params->get('metadesc'))
		{
			$this->document->setDescription($this->params->get('metadesc'));
		}
		elseif (!$this->params->get('metadesc') && $this->params->get('menu-meta_description'))
		{
			$this->document->setDescription($this->params->get('menu-meta_description'));
		}

		if ($this->params->get('metakey'))
		{
			$this->document->setMetadata('keywords', $this->params->get('metakey'));
		}
		elseif (!$this->params->get('metakey') && $this->params->get('menu-meta_keywords'))
		{
			$this->document->setMetadata('keywords', $this->params->get('menu-meta_keywords'));
		}
		
		if ($this->params->get('robots'))
		{
			$this->document->setMetadata('robots', $this->params->get('robots'));
		}
		elseif (!$this->params->get('robots') && $this->params->get('robots'))
		{
			$this->document->setMetadata('robots', $this->params->get('robots'));
		}
		
		if ($this->params->get('rights'))
		{
			$this->document->setMetaData('rights', $this->params->get('rights'));
		}
		
		if ($app->getCfg('MetaAuthor') == '1' && $this->params->get('author'))
		{
			$this->document->setMetaData('author', $this->params->get('author'));
		}
		
		if(JRequest::getVar('layout')!='print'){
			$this->document->setMetaData('robots', 'noindex, nofollow');
			$this->setLayout("portfoliodetail");
		}
	}

}
?>