<?php
/**
 * @package 	formfields
 * @version	1.1
 * @created	Aug 2011
 * @author	BowThemes
 * @email	support@bowthems.com
 * @website	http://bowthemes.com
 * @support     Forum - http://bowthemes.com/forum/
 * @copyright   Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license     http://bowthemes.com/terms-and-conditions.html
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

class JFormFieldWarning extends JFormField {

    protected $type = 'warning';

    protected function getInput() {
        //JHTML::_('behavior.mootools');
        $ajaxFile = JPATH_ROOT . '/modules/mod_btslideshow_pro/ajax.php';
        $saveDir = JPATH_ROOT . '/modules/mod_btslideshow_pro/images';
        $html = '
            <div id="bt-warning">
                <ul>
            ';
        @chmod($ajaxFile, 0755);
//        if(substr(decoct(fileperms($ajaxFile)),3) != '0755'){
//
//            $html.='<li>File <b>ajax.php</b> of module should be at mod <i>0755</i>.</li>';
//        }
        if (!is_writable($saveDir)) {
            $html.='<li>Folder <b>images</b> of module can not be written. Check chmod, please.</li>';
        } else {
            $moduleID = $this->form->getValue('id');
            if ($moduleID == '')
                $moduleID = 0;
            $saveDir.='/' . $moduleID;
            if (JFolder::exists($saveDir) && !is_writable($saveDir)) {
                $html.='<li>Folder <b>images/' . $moduleID . '</b> of module can not be written. Check chmod, please.</li>';
            } else {
                if (JFolder::exists($saveDir . '/manager') && !is_writable($saveDir . '/manager')) {
                    $html.='<li>Folder <b>images/manager</b> of module can not be written. Check chmod, please.</li>';
                }
                if (JFolder::exists($saveDir . '/original') && !is_writable($saveDir . '/original')) {
                    $html.='<li>Folder <b>images/original</b> of module can not be written. Check chmod, please.</li>';
                }
                if (JFolder::exists($saveDir .  '/slideshow') && !is_writable($saveDir . '/slideshow')) {
                    $html.='<li>Folder <b>images/slideshow</b> of module can not be written. Check chmod, please.</li>';
                }
                if (JFolder::exists($saveDir . '/thumbnail') && !is_writable($saveDir . '/thumbnail')) {
                    $html.='<li>Folder <b>images/thumbnail</b> of module can not be written. Check chmod, please.</li>';
                }
            }
        }
        if (!extension_loaded('gd')) {
            $html.='<li>This module need <b>GD Extension</b> to be installed in your host.</li>';
        }
        if (!extension_loaded('SimpleXML')) {
            $html.='<li>This module need <b>Simple XML Extension</b> to be installed in your host.</li>';
        }
        $html.='
            </ul>
            </div>
            <script type="text/javascript">
                var btWarning = jQuery.noConflict();
                btWarning(document).ready(function(){
                    if(btWarning("#bt-warning ul li").length == 0){
                        btWarning("#bt-warning").parent().hide();
                    }
                });
            </script>
            ';
        return $html;
   
    }

}

?>