<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of controller
 *
 * @author Windy
 */
defined('_JEXEC') or die ;

jimport('joomla.application.component.controller');

if (version_compare(JVERSION, '3.0', 'ge'))
{
    class BtPortfolioController extends JControllerLegacy
    {
        public function display($cachable = false, $urlparams = array())
        {
            parent::display($cachable, $urlparams);
        }

    }

}
else if (version_compare(JVERSION, '2.5', 'ge'))
{
    class BtPortfolioController extends JController
    {
        public function display($cachable = false, $urlparams = false)
        {
            parent::display($cachable, $urlparams);
        }

    }

}
else
{
    class BtPortfolioController extends JController
    {
        public function display($cachable = false)
        {
            parent::display($cachable);
        }

    }

}

?>
