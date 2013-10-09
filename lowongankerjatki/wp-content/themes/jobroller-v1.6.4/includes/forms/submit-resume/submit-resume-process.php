<?php


function jr_process_submit_resume_form( $resume_id = 0 ) {
	
	global $post, $posted;
	
	$errors = new WP_Error();
	if (isset($_POST['save_resume']) && $_POST['save_resume']) :
	
		// Get (and clean) data
		$fields = array(
			'resume_name',
			'resume_birthday',
			'resume_age',
			'resume_height',
			'resume_weight',
			'resume_stat',
			'resume_nopassport',
			'resume_timepassport',
			'resume_exitpassport',
			'resume_placepassport',
			'resume_noktp',
			'resume_child',
			'resume_saudara',
			'resume_urutan',
			'resume_agama',
			'resume_pendidikan',
			'nama_bapak',
			'pekerjaan_bapak',
			'nama_ibu',
			'pekerjaan_ibu',
			'umur_bapak',
			'umur_ibu',
			'emergency_name',
			'emergency_address',
			'emergency_tel',
			'summary',
			'skills',
			'specialities',
			'groups',
			'languages',
			'desired_salary',
			'desired_position',
			'resume_cat',
			'mobile',
			'tel',
			'email_address',
			'education',
			'experience',
			'jr_geo_latitude',
			'jr_geo_longitude',
			'jr_address'
		);

		$posted = stripslashes_deep( wp_array_slice_assoc( $_POST, $fields ) );

		$sanitizer = ( get_option('jr_html_allowed')=='no' ) ? 'strip_tags' : 'wp_kses_post';

		foreach ( $posted as $key => &$value ) {
			if ( in_array( $key, array( 'summary', 'education', 'experience' ) ) ) {
				$value = $sanitizer( $value );
			} else {
				$value = strip_tags( $value );
			}
		}

		// Check required fields
		$required = array(
		'resume_birthday' => __('Tanggal Lahir', 'appthemes'),
		'resume_age' => __('Umur', 'appthemes'),
		'resume_height' => __('Tinggi Badan', 'appthemes'),
		'resume_weight' => __('Berat Badan', 'appthemes'),
		'resume_stat' => __('Status', 'appthemes'),
		'resume_nopassport' => __('Nomor Passport', 'appthemes'),
		'resume_timepassport' => __('Masa Berlaku Passport', 'appthemes'),
		'resume_exitpassport' => __('Tanggal Pengeluaran Passport/KTP', 'appthemes'),
		'resume_placepassport' => __('Tempat Pengeluaran Passport/KTP', 'appthemes'),
		'resume_noktp' => __('Nomor KTP', 'appthemes'),
		'resume_child' => __('Anak', 'appthemes'),
		'resume_saudara' => __('Saudara', 'appthemes'),
		'resume_urutan' => __('Urutan', 'appthemes'),
		'resume_agama' => __('Agama', 'appthemes'),
		'resume_pendidikan' => __('Pendidikan', 'appthemes'),
		'nama_bapak' => __('Nama Bapak', 'appthemes'),
		'pekerjaan_bapak' => __('Pekerjaan Bapak', 'appthemes'),
		'nama_ibu' => __('Nama Ibu', 'appthemes'),
		'umur_bapak' => __('Umur Bapak', 'appthemes'),
		'umur_ibu' => __('Umur Ibu', 'appthemes'),
                'resume_name' => __('Kolom Nama', 'appthemes'),
		'summary' => __('Riwayat Hidup', 'appthemes'),
		'jr_geo_latitude' => __('Lokasi', 'appthemes'),
		'jr_geo_longitude' => __('Lokasi', 'appthemes')
		);
		
		foreach ($required as $field=>$name) {
			if (empty($posted[$field])) {
				$errors->add('submit_error', __('<strong>ERROR</strong>: &ldquo;', 'appthemes').$name.__('&rdquo; merupakan salah satu kolom yang harus diisi.', 'appthemes'));
			}
		}
		
		if ($errors && sizeof($errors)>0 && $errors->get_error_code()) {} else {
			
			if(isset($_FILES['your-photo']) && !empty($_FILES['your-photo']['name'])) {
				
				$posted['your-photo-name'] = $_FILES['your-photo']['name'];
				
				// Check valid extension
				$allowed = array(
					'png',
					'gif',
					'jpg',
					'jpeg'
				);
				
				$extension = strtolower(pathinfo($_FILES['your-photo']['name'], PATHINFO_EXTENSION));
				
				if (!in_array($extension, $allowed)) {
					$errors->add('submit_error', __('<strong>ERROR</strong>: Only jpg, gif, and png images are allowed.', 'appthemes'));
				} else {
						
					/** WordPress Administration File API */
					include_once(ABSPATH . 'wp-admin/includes/file.php');					
					/** WordPress Media Administration API */
					include_once(ABSPATH . 'wp-admin/includes/media.php');
		
					function resume_photo_upload_dir( $pathdata ) {
						$subdir = '/resume_photos'.$pathdata['subdir'];
					 	$pathdata['path'] = str_replace($pathdata['subdir'], $subdir, $pathdata['path']);
					 	$pathdata['url'] = str_replace($pathdata['subdir'], $subdir, $pathdata['url']);
						$pathdata['subdir'] = str_replace($pathdata['subdir'], $subdir, $pathdata['subdir']);
						return $pathdata;
					}
					
					add_filter('upload_dir', 'resume_photo_upload_dir');
					
					$time = current_time('mysql');
					$overrides = array('test_form'=>false);
					
					$file = wp_handle_upload($_FILES['your-photo'], $overrides, $time);
					
					remove_filter('upload_dir', 'resume_photo_upload_dir');
					
					if ( !isset($file['error']) ) {					
						$posted['your-photo'] = $file['url'];
						$posted['your-photo-type'] = $file['type'];
						$posted['your-photo-file'] = $file['file'];
					} 
					else {
						$errors->add('submit_error', __('<strong>ERROR</strong>: ', 'appthemes').$file['error'].'');
					}
						
				}		
			}	
		}
		
		if ($errors && sizeof($errors)>0 && $errors->get_error_code()) {} else {
			
			// No errors? Create the resume post
			global $wpdb;
			
			if ( $resume_id > 0 ) :
				
				$data = array(
					'ID' => $resume_id,
					'post_content' => $wpdb->escape($posted['summary']),
					'post_title' => $wpdb->escape($posted['resume_name'])
				);	

				wp_update_post( $data );
				
			else :
			
				$data = array(
					'post_content' => $wpdb->escape($posted['summary'])
					, 'post_title' => $wpdb->escape($posted['resume_name'])
					, 'post_status' => 'private'
					, 'post_author' => get_current_user_id()
					, 'post_type' => 'resume'
					, 'post_name' => get_current_user_id().uniqid(rand(10,1000), false)
				);		
				
				$resume_id = wp_insert_post($data);	
				
				if ($resume_id==0 || is_wp_error($resume_id)) wp_die( __('Error: Unable to create entry.', 'appthemes') );
			
			endif;	
			
			### Add meta data
			
update_post_meta($resume_id, '_skills', $posted['skills']);
update_post_meta($resume_id, '_desired_salary', $posted['desired_salary']);

update_post_meta($resume_id, '_mobile', $posted['mobile']);
update_post_meta($resume_id, '_tel', $posted['tel']);
update_post_meta($resume_id, '_email_address', $posted['email_address']);

update_post_meta($resume_id, '_education', $posted['education']);
update_post_meta($resume_id, '_experience', $posted['experience']);
update_post_meta($resume_id, '_resume_birthday', $posted['resume_birthday']);
update_post_meta($resume_id, '_resume_age', $posted['resume_age']);
update_post_meta($resume_id, '_resume_height', $posted['resume_height']);
update_post_meta($resume_id, '_resume_weight', $posted['resume_weight']);
update_post_meta($resume_id, '_resume_stat', $posted['resume_stat']);
update_post_meta($resume_id, '_resume_nopassport', $posted['resume_nopassport']);
update_post_meta($resume_id, '_resume_timepassport', $posted['resume_timepassport']);
update_post_meta($resume_id, '_resume_exitpassport', $posted['resume_exitpassport']);
update_post_meta($resume_id, '_resume_placepassport', $posted['resume_placepassport']);
update_post_meta($resume_id, '_resume_noktp', $posted['resume_noktp']);
update_post_meta($resume_id, '_resume_child', $posted['resume_child']);
update_post_meta($resume_id, '_resume_saudara', $posted['resume_saudara']);
update_post_meta($resume_id, '_resume_urutan', $posted['resume_urutan']);
update_post_meta($resume_id, '_resume_agama', $posted['resume_agama']);
update_post_meta($resume_id, '_resume_pendidikan', $posted['resume_pendidikan']);
update_post_meta($resume_id, '_nama_bapak', $posted['nama_bapak']);
update_post_meta($resume_id, '_pekerjaan_bapak', $posted['pekerjaan_bapak']);
update_post_meta($resume_id, '_nama_ibu', $posted['nama_ibu']);
update_post_meta($resume_id, '_pekerjaan_ibu', $posted['pekerjaan_ibu']);
update_post_meta($resume_id, '_umur_bapak', $posted['umur_bapak']);
update_post_meta($resume_id, '_umur_ibu', $posted['umur_ibu']);
update_post_meta($resume_id, '_emergency_name', $posted['emergency_name']);
update_post_meta($resume_id, '_emergency_address', $posted['emergency_address']);
update_post_meta($resume_id, '_emergency_tel', $posted['emergency_tel']);
			
			## Desired position
			
			$post_into_types[] = get_term_by( 'slug', sanitize_title($posted['desired_position']), 'resume_job_type')->slug;
		
			if (sizeof($post_into_types)>0) wp_set_object_terms($resume_id, $post_into_types, 'resume_job_type');
			
			### Category
			
				$post_into_cats = array();
		
				if ($posted['resume_cat']>0) $post_into_cats[] = get_term_by( 'id', $posted['resume_cat'], 'resume_category')->slug;
		
				if (sizeof($post_into_cats)>0) wp_set_object_terms($resume_id, $post_into_cats, 'resume_category');
			
			### Tags
			
				if ($posted['specialities']) :
					
					$thetags = explode(',', $posted['specialities']);
					$thetags = array_map('trim', $thetags);
					
					if (sizeof($thetags)>0) wp_set_object_terms($resume_id, $thetags, 'resume_specialities');
					
				endif;
				
				if ($posted['groups']) :
					
					$thetags = explode(',', $posted['groups']);
					$thetags = array_map('trim', $thetags);
					
					if (sizeof($thetags)>0) wp_set_object_terms($resume_id, $thetags, 'resume_groups');
					
				endif;
				
				if ($posted['languages']) :
					
					$thetags = explode(',', $posted['languages']);
					$thetags = array_map('trim', $thetags);
					
					if (sizeof($thetags)>0) wp_set_object_terms($resume_id, $thetags, 'resume_languages');
					
				endif;
				
			### GEO
	
		if (!empty($posted['jr_address'])) :
		
			$latitude = jr_clean_coordinate($posted['jr_geo_latitude']);
			$longitude = jr_clean_coordinate($posted['jr_geo_longitude']);
			
			update_post_meta($resume_id, '_jr_geo_latitude', $posted['jr_geo_latitude']);
			update_post_meta($resume_id, '_jr_geo_longitude', $posted['jr_geo_longitude']);
			
			if ($latitude && $longitude) :
				$address = jr_reverse_geocode($latitude, $longitude);

				update_post_meta($resume_id, 'geo_address', $address['address']);
				update_post_meta($resume_id, 'geo_country', $address['country']);
				update_post_meta($resume_id, 'geo_short_address', $address['short_address']);
				update_post_meta($resume_id, 'geo_short_address_country', $address['short_address_country']);

			endif;

		endif;	
				
			## Load APIs and Link to photo
			
				include_once(ABSPATH . 'wp-admin/includes/file.php');			
				include_once(ABSPATH . 'wp-admin/includes/image.php');			
				include_once(ABSPATH . 'wp-admin/includes/media.php');
		
				$name_parts = pathinfo($posted['your-photo-name']);
				$name = trim( substr( $name, 0, -(1 + strlen($name_parts['extension'])) ) );
				
				$url = $posted['your-photo'];
				$type = $posted['your-photo-type'];
				$file = $posted['your-photo-file'];
				$title = $posted['your-photo-name'];
				$content = '';
				
				if ($file) :
				
					// use image exif/iptc data for title and caption defaults if possible
					if ( $image_meta = @wp_read_image_metadata($file) ) {
						if ( trim($image_meta['title']) )
							$title = $image_meta['title'];
						if ( trim($image_meta['caption']) )
							$content = $image_meta['caption'];
					}
			
					// Construct the attachment array
					$attachment = array_merge( array(
						'post_mime_type' => $type,
						'guid' => $url,
						'post_parent' => $resume_id,
						'post_title' => $title,
						'post_content' => $content,
					), array() );
			
					// Save the data
					$id = wp_insert_attachment($attachment, $file, $resume_id);
					if ( !is_wp_error($id) ) {
						wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $file ) );
					}
					
					update_post_meta( $resume_id, '_thumbnail_id', $id );
				
				endif;
				
				// Redirect to Resume
				$url = get_permalink( $resume_id );
				if (!$url) $url = get_permalink(get_option('jr_user_profile_page_id'));
				wp_redirect($url);
    			exit();

		}	
		
	endif;
	
	$submit_form_results = array(
		'errors' => $errors,
		'posted' => $posted
	);
	
	return $submit_form_results;

}