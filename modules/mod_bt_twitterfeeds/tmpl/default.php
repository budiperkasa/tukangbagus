<?php
/**
 * @package 	mod_bt_twitterfeeds - BT Twitterfeeds Module
 * @version		1.0
 * @created		Oct 2011

 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
?>

<div  class="bt-twitter<?php echo $moduleclass_sfx ?>" >
<script src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: <?php echo $params->get('number_of_tweets') ?>,
  interval: 30000,
  width: <?php echo trim($params->get('width')) == 'auto'? "'auto'":$params->get('width') ?>,
  height: <?php echo $params->get('height') ?>,
  theme: {
    shell: {
      background: '<?php echo trim($params->get('shell_background_color'))==""? "transparent":trim($params->get('shell_background_color')) ?>',
      color: '<?php echo $params->get('shell_text_color') ?>'
    },
    tweets: {
      background: '<?php echo trim($params->get('tweet_background_color'))==""? "transparent":trim($params->get('tweet_background_color')) ?>',
      color: '<?php echo $params->get('tweet_text_color') ?>',
      links: '<?php echo $params->get('link_color') ?>'
    }
  },
  features: {
    scrollbar: <?php echo $params->get('scrollbar') ?>,
    loop: false,
    live: <?php echo $params->get('poll_new') ?>,
    hashtags: <?php echo $params->get('show_hastag') ?>,
    timestamp: <?php echo $params->get('show_timestamp') ?>,
    avatars: <?php echo $params->get('show_avatar') ?>,
    behavior: 'all'
  }
}).render().setUser('<?php echo $params->get('username') ?>').start();
</script>
</div>