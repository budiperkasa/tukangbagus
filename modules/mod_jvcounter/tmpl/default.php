<?php
/**
 # Module		JV Counter
 # @version		3.0.1
 # ------------------------------------------------------------------------
 # author    Open Source Code Solutions Co
 # copyright Copyright Â© 2008-2012 joomlavi.com. All Rights Reserved.
 # @license - http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL or later.
 # Websites: http://www.joomlavi.com
 # Technical Support:  http://www.joomlavi.com/my-tickets.html
-------------------------------------------------------------------------*/
// No direct access to this file
defined( '_JEXEC' ) or die( 'Restricted access' );

$moduleStyle = $params->get('themes','style1');

$document = JFactory::getDocument();
$document->addStyleSheet('modules/mod_jvcounter/assets/styles/'.$moduleStyle.'/default.css');
?>

<div class="jvcounter_contain jvcounter_<?php echo $moduleStyle;?>">
    <?php if($headertext = $params->get('headertext')){?>
        <div class="jvcounter_rows jvcounter_headertext">
        	<span class="title_header"></span>
            <?php
                echo $headertext;
            ?>
        </div>
    <?php }?>
    
    <div class="digitstype"><?php echo $totalImage;?></div>   
</div>