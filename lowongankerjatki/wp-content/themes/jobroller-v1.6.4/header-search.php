<?php global $app_abbr, $header_search; $header_search = true; ?>

<?php if (get_option('jr_show_searchbar')!=='no' && ( !isset($_GET['submit']) || ( isset($_GET['submit']) && $_GET['submit']!=='true' ) ) && ( !isset($_GET['myjobs']) || ( isset($_GET['myjobs']) && $_GET['myjobs']!=='true' ) ) ) : ?>

	<form action="<?php bloginfo('url'); ?>/" method="get" id="searchform">

		<div class="search-wrap">

			<div>
				<input type="text" id="search" title="" name="s" class="text" placeholder="<?php _e('All Jobs','appthemes'); ?>" value="<?php if (isset($_GET['s'])) echo get_search_query(); ?>" />
				
				<label for="search"><button type="submit" title="<?php _e('Go','appthemes'); ?>" class="submit"><?php _e('Go','appthemes'); ?></button></label>

			</div>



		</div><!-- end search-wrap -->

	</form>

<?php endif; ?>
