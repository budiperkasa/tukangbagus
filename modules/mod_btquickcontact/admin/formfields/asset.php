<?php
/**
 * @package 	BT Quick Contact
 * @version		1.1
 * @created		Aug 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support     Forum - http://bowthemes.com/forum/
 * @copyright   Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

class JFormFieldAsset extends JFormField {

    protected $type = 'Asset';

    protected function getInput() {
	
        JHTML::_('behavior.framework');
        $checkJqueryLoaded = false;
        $document = &JFactory::getDocument();
        $header = $document->getHeadData();
        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/jquery')) {
                $checkJqueryLoaded = true;
            }
        }

        //Add js
        if (!$checkJqueryLoaded)
            $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/jquery.min.js');
		if(!version_compare(JVERSION, '3.0', 'ge')){		
			$document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/chosen.jquery.min.js');
			 $document->addStyleSheet(JURI::root() . 'modules/mod_btquickcontact/admin/css/chosen.css');
		}
        $document->addScript(JURI::root() . $this->element['path'] . 'js/bt.js');
        
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/btquickcontact.js');
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/btbase64.min.js');
        //Add css         
        $document->addStyleSheet(JURI::root() . "modules/mod_btquickcontact/admin/css/btquickcontact.css");
        $document->addStyleSheet(JURI::root() . $this->element['path'] . 'css/bt.css');
       
        return null;
    }

}

?>