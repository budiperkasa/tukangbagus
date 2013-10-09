<?php
/*
Template Name: Edit Resume Template
*/
?>
<?php
	### Prevent Caching
	nocache_headers();
	
	appthemes_auth_redirect_login();
	
	if (!current_user_can('can_submit_resume')) :
		nocache_headers();
        wp_redirect(home_url());
        exit();
	endif;
	
	if (isset($_REQUEST['edit'])) $editing = true; else $editing = false;
	
	$message = '';
	
	global $post, $job_details, $posted;
    
	$posted = array();
	$errors = new WP_Error();
	
	### Edit?
	
	$resume_id = 0;
	
	if (isset($_GET['edit'])) $resume_id = (int) $_GET['edit'];
	
	if ($resume_id>0) :
		
		// Get job details
		$resume_details = get_post($resume_id);
			
		if (!isset($_POST['save_resume'])) :
			// Set post data
			$posted['resume_birthday'] = get_post_meta($resume_id, '_resume_birthday', true);
                        $posted['resume_age'] = get_post_meta($resume_id, '_resume_age', true);
			$posted['resume_height'] = get_post_meta($resume_id, '_resume_height', true);
                        $posted['resume_weight'] = get_post_meta($resume_id, '_resume_weight', true);
			$posted['resume_stat'] = get_post_meta($resume_id, '_resume_birthday', true);
			$posted['resume_nopassport'] = get_post_meta($resume_id, '_resume_nopassport', true);
			$posted['resume_timepassport'] = get_post_meta($resume_id, '_resume_timepassport', true);
			$posted['resume_exitpassport'] = get_post_meta($resume_id, '_resume_exitpassport', true);
			$posted['resume_placepassport'] = get_post_meta($resume_id, '_resume_placepassport', true);
			$posted['resume_noktp'] = get_post_meta($resume_id, '_resume_noktp', true);
			$posted['resume_child'] = get_post_meta($resume_id, '_resume_child', true);
			$posted['resume_saudara'] = get_post_meta($resume_id, '_resume_saudara', true);
			$posted['resume_urutan'] = get_post_meta($resume_id, '_resume_urutan', true);
			$posted['resume_agama'] = get_post_meta($resume_id, '_resume_agama', true);
			$posted['resume_pendidikan'] = get_post_meta($resume_id, '_resume_pendidikan', true);
			$posted['nama_bapak'] = get_post_meta($resume_id, '_nama_bapak', true);
			$posted['pekerjaan_bapak'] = get_post_meta($resume_id, '_pekerjaan_bapak', true);
			$posted['nama_ibu'] = get_post_meta($resume_id, '_nama_ibu', true);
			$posted['pekerjaan_ibu'] = get_post_meta($resume_id, '_pekerjaan_ibu', true);
			$posted['umur_bapak'] = get_post_meta($resume_id, '_umur_bapak', true);
			$posted['umur_ibu'] = get_post_meta($resume_id, '_umur_ibu', true);
			$posted['emergency_name'] = get_post_meta($resume_id, '_emergency_name', true);
			$posted['emergency_address'] = get_post_meta($resume_id, '_emergency_address', true);
			$posted['emergency_tel'] = get_post_meta($resume_id, '_emergency_tel', true);
			// New Set Forms
			$posted['resume_name'] = $resume_details->post_title;
			$posted['summary'] = $resume_details->post_content;
			$posted['skills'] = get_post_meta($resume_id, '_skills', true);
			$posted['desired_salary'] = get_post_meta($resume_id, '_desired_salary', true);
			$posted['desired_position'] = get_post_meta($resume_id, '_desired_position', true);
			
			$posted['mobile'] = get_post_meta($resume_id, '_mobile', true);
			$posted['tel'] = get_post_meta($resume_id, '_tel', true);
			$posted['email_address'] = get_post_meta($resume_id, '_email_address', true);
			
			$posted['education'] = get_post_meta($resume_id, '_education', true);
			$posted['experience'] = get_post_meta($resume_id, '_experience', true);
			
			$terms = wp_get_post_terms($resume_id, 'resume_category');
			$terms_array = array();
			foreach ($terms as $t) $terms_array[] = $t->term_id;
			if (isset($terms_array[0])) $posted['resume_cat'] = $terms_array[0];
			
			$terms = wp_get_post_terms($resume_id, 'resume_specialities');
			$terms_array = array();
			foreach ($terms as $t) $terms_array[] = $t->name;
			$posted['specialities'] = implode(', ', $terms_array);
			
			$terms = wp_get_post_terms($resume_id, 'resume_groups');
			$terms_array = array();
			foreach ($terms as $t) $terms_array[] = $t->name;
			$posted['groups'] = implode(', ', $terms_array);
			
			$terms = wp_get_post_terms($resume_id, 'resume_languages');
			$terms_array = array();
			foreach ($terms as $t) $terms_array[] = $t->name;
			$posted['languages'] = implode(', ', $terms_array);
			
			$terms = wp_get_post_terms($resume_id, 'resume_job_type');
			if ($terms) : 
				$terms = current($terms);
				$posted['desired_position'] = $terms->slug;
			else :
				$posted['desired_position'] = '';
			endif;
			
			$posted['jr_geo_latitude'] = get_post_meta($resume_id, '_jr_geo_latitude', true);
			$posted['jr_geo_longitude'] = get_post_meta($resume_id, '_jr_geo_longitude', true);
			$posted['jr_address'] = get_post_meta($resume_id, 'geo_address', true);
			
		endif;
	
		// Permission?
		$current_user = wp_get_current_user();

		if ($current_user->ID == $resume_details->post_author) :
		
			// We have permission to edit this!
		
		else : redirect_myjobs(); endif;
	
	endif;
	
	### Process Forms
	
	$result = jr_process_submit_resume_form( $resume_id );
		
	$errors = $result['errors'];
	$posted = $result['posted'];
?>

	<div class="section">
	
		<div class="section_content">
		
			<h1><?php if ($editing) _e('Edit Biodata', 'appthemes'); else _e('Tambah Biodata', 'appthemes'); ?></h1>

			<?php do_action( 'appthemes_notices' ); ?>

			<?php jr_submit_resume_form( $resume_id ); ?>

		</div><!-- end section_content -->

	</div><!-- end section -->

	<div class="clear"></div>

</div><!-- end main content -->

<?php if (get_option('jr_show_sidebar')!=='no') get_sidebar('resume'); ?>
