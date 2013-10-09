<?php
/**
 * Theme functions file
 *
 * DO NOT MODIFY THIS FILE. Make a child theme instead: http://codex.wordpress.org/Child_Themes
 *
 * @package JobRoller
 * @author AppThemes
 */

// Define vars and globals
global $app_version, $app_form_results, $featured_job_cat_id, $jr_log, $app_abbr;

// current version
$app_theme = 'LokerTKI';
$app_abbr = 'jr';
$app_version = '1.6.4';

$featured_job_cat_id = get_option('jr_featured_category_id');

// Define rss feed urls
$app_rss_feed = '';
$app_twitter_rss_feed = '';
$app_forum_rss_feed = '';

// Framework
require( dirname(__FILE__) . '/framework/load.php' );
require( dirname(__FILE__) . '/framework/includes/wrapping.php' );

scb_register_table( 'app_pop_daily', $app_abbr . '_counter_daily' );
scb_register_table( 'app_pop_total', $app_abbr . '_counter_total' );

require( dirname(__FILE__) . '/framework/includes/stats.php' );

// Theme-specific files
require( dirname(__FILE__) . '/includes/theme-functions.php' );
