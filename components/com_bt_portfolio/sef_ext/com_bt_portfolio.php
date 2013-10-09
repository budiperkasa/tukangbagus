<?php
/**
 * @package 	bt_portfolio - BT Portfolio Component
 * @version		2.0.0
 * @created		Dec 2011
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined( '_JEXEC' ) or die( 'Direct Access to this location is not allowed.' );
global $sh_LANG;
$sefConfig = & Sh404sefFactory::getConfig();
$shLangName = '';
$shLangIso = '';
$title = array();
$shItemidString = '';
$dosef = shInitializePlugin($lang, $shLangName, $shLangIso, $option);
if ($dosef == false) return;
if(isset($option)){
	shRemoveFromGETVarsList('option');
}
shRemoveFromGETVarsList('lang');
if (!empty($limit)) 
shRemoveFromGETVarsList('limit');
if (isset($limitstart)) 
  shRemoveFromGETVarsList('limitstart');
 if(isset($catid)){
	shRemoveFromGETVarsList('catid');
  }
 if(isset($view)){
	$title[]=$view; 
 shRemoveFromGETVarsList('view');
 }
 else{
 $view ="";
 }
 if(isset($catid_rel)){
 shRemoveFromGETVarsList('catid_rel');
 }
  if(isset($id)){ 
 shRemoveFromGETVarsList('id');
 } 

switch($view){
 case 'portfolios' :
 case 'featured' :
	 if(!empty($catid)){		
		$database = JFactory::getDbo();
		 $q = "SELECT id,parent_id, title FROM #__bt_portfolio_categories where id ='$catid' and published = 1";	
		  $database->setQuery($q);   
	  if (shTranslateUrl($option, $shLangName))               
			$result = $database->loadObject( );
		  else $result = $database->loadObject( false);
		if (!empty($result))  {	
			if($result->parent_id ==0){
			$title[] = $result->title;
			$title[] = '/';
			}
			else{
				$root_id = $result->parent_id;
				$temp = array();
				while($root_id!=""){
				$string ="SELECT * FROM #__bt_portfolio_categories where id ='$root_id'";
				$database->setQuery($string);  
				$rs = $database->loadObject( );
				if (!empty($rs))  {					
					$temp[$rs->id] = $rs->title;					
				}
				else{
					$title[] = "";
				}
				$arr= array_reverse($temp);				
				@$root_id = $rs->parent_id;			
				}
				$title[]= implode($arr,'/');	
				$title[] = $result->title;
			}
		  }
		  else {
			$title[] = $catid;
			$title[] = ':';
		  }
	}	
	break;
case'portfolio':  
    if (!empty($catid_rel) and !empty($id) ) {
      shRemoveFromGETVarsList('id');
      $database = JFactory::getDbo();	  
      $query  = "SELECT id, title from #__bt_portfolios where catids LIKE '%$catid_rel%' and id='$id' and published = 1";       
      $database->setQuery( $query );
      if (shTranslateUrl($option, $shLangName))
      $result = $database->loadObject();
      else $result = $database->loadObject( false);
      if (!empty($result))  {			
			$temp = array();
				while($catid_rel!=""){
				$string ="SELECT * FROM #__bt_portfolio_categories where id ='$catid_rel'";
				$database->setQuery($string);  
				$rs = $database->loadObject( );
				if (!empty($rs))  {					
					$temp[$rs->id] = $rs->title;					
				}
				else{
					$title[] = "";
				}
				$arr= array_reverse($temp);				
				@$catid_rel = $rs->parent_id;			
				}
				$title[]= implode($arr,'/');	  
				$title[] = $result->title ;       
      }	else {
        $title[] = $id;
      }
    }
else{
	 $query  = "SELECT id, title from #__bt_portfolios where id='$id' and published = 1";       
     $database->setQuery( $query );
	 $result = $database->loadObject();
	 if (!empty($result))  {
		$title[] = $result->title ;  
		}
	else{
	$title[]=$id;
	}		
}	
case '':
	$task = isset($task) ? $task : null;
	if($task){
		$title[] = $task;
		shRemoveFromGETVarsList('task');
	}
	break;
default:
    $dosef = false;
    break;

}
 $Itemid = isset($Itemid) ? $Itemid : null;
 if(isset($Itemid)){
 shRemoveFromGETVarsList('Itemid');
}

if ($dosef){
   $string = shFinalizePlugin( $string, $title, $shAppendString, $shItemidString, 
      (isset($limit) ? @$limit : null), (isset($limitstart) ? @$limitstart : null), 
     (isset($shLangName) ? @$shLangName : null));
}  
?>
