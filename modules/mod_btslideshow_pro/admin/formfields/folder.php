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

class JFormFieldFolder extends JFormField {

    protected $type = 'folder';

    public function getInput() {
        $tree = array();
        $objFolder = new stdClass();
        $objFolder->name = 'images';
        $objFolder->text = 'images';
        $objFolder->value = JPATH_ROOT. '/' . 'images';
        $tree[] = $objFolder;
        $this->getTree('images', 0, JPATH_ROOT, $tree);

        // Initialize JavaScript field attributes.
        $class = $this->element['class'] ? (string) $this->element['class'] : '';
        $attr = '';
        $attr .= $this->element['onchange'] ? ' onchange="' . (string) $this->element['onchange'] . '"' : '';
        $attr .= ' class="inputbox ' . $class . '"';

        //var_dump($tree);
        if ($tree && count($tree) > 0) {
            return JHTML::_('select.genericlist', $tree, $this->name, trim($attr), 'value', 'text', $this->value, $this->id);
        }
        return null;
    }

    public function getTree($folder, $depth, $path, &$tree) {

        $folder = $path . '/' . $folder;
        $subFolders = JFolder::folders($folder);
        foreach ($subFolders as $subFolder) {
            $objFolder = new stdClass();
            $objFolder->name = $subFolder;
            $objFolder->text = str_repeat('---', $depth + 1) . ' ' . $subFolder;
            $objFolder->value = $folder . '/' . $subFolder;
            $tree[] = $objFolder;
            $this->getTree($subFolder, $depth + 1, $folder, $tree);
        }
    }

}

?>
