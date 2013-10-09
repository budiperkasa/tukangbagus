<?php


function jr_submit_resume_form( $resume_id = 0 ) {
	
	global $post, $posted;
	
	jr_geolocation_scripts();

	?>
	<form action="<?php 
		if ($resume_id>0) echo add_query_arg('edit', $resume_id, get_permalink( $post->ID )); 
		else echo get_permalink( $post->ID ); 
	?>" method="post" enctype="multipart/form-data" id="submit_form" class="submit_form main_form">
		
		<p><?php _e('Masukkan rincian resume Anda di bawah ini. Setelah tersimpan Anda akan dapat melihat biodata Anda.', 'appthemes'); ?></p>
		
		<fieldset>
			<legend><?php _e('Biodata Anda', 'appthemes'); ?></legend>
			
			<p><label for="resume_name"><?php _e('Nama', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_name" id="resume_name" class="text" placeholder="<?php _e('Contoh: Sri Wahyuni', 'appthemes'); ?>" value="<?php if (isset($posted['resume_name'])) echo $posted['resume_name']; ?>" /></p>
		        <p><label for="resume_birthday"><?php _e('Tanggal Lahir', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_birthday" id="resume_birthday" class="text" placeholder="<?php _e('Contoh: 29 Maret 1986', 'appthemes'); ?>" value="<?php if (isset($posted['resume_birthday'])) echo $posted['resume_birthday']; ?>" /></p>
		        <p><label for="resume_age"><?php _e('Umur', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_age" id="resume_age" class="text" placeholder="<?php _e('Contoh: 28 tahun', 'appthemes'); ?>" value="<?php if (isset($posted['resume_age'])) echo $posted['resume_age']; ?>" /></p>
		        <p><label for="resume_height"><?php _e('Tinggi Badan', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_height" id="resume_height" class="text" placeholder="<?php _e('Contoh: 168 Cm', 'appthemes'); ?>" value="<?php if (isset($posted['resume_height'])) echo $posted['resume_height']; ?>" /></p>
		        <p><label for="resume_weight"><?php _e('Berat Badan', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_weight" id="resume_weight" class="text" placeholder="<?php _e('Contoh: 58 Kg', 'appthemes'); ?>" value="<?php if (isset($posted['resume_weight'])) echo $posted['resume_weight']; ?>" /></p>
		        <p><label for="resume_stat"><?php _e('Status', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_stat" id="resume_stat" class="text" placeholder="<?php _e('Contoh: Menikah', 'appthemes'); ?>" value="<?php if (isset($posted['resume_stat'])) echo $posted['resume_stat']; ?>" /></p>
			
			<p><label for="summary"><?php _e('Riwayat Hidup', 'appthemes'); ?> <span title="required">*</span></label> <textarea rows="5" cols="30" name="summary" id="summary" placeholder="<?php _e('Tuliskan riwayat hidup anda di kolom ini.', 'appthemes'); ?>" class="short" style="height:100px;"><?php if (isset($posted['summary'])) echo $posted['summary']; ?></textarea></p>
			
			
			
			<p class="optional"><label for="your-photo"><?php _e('Foto Biodata (.jpg, .gif or .png)', 'appthemes'); ?></label> <input type="file" class="text" name="your-photo" id="your-photo" /></p>
  
			
			
		</fieldset>	
<fieldset>
			<legend><?php _e('Kelengkapan Dokumen', 'appthemes'); ?></legend>
			<p><label for="resume_nopassport"><?php _e('Nomor Passport', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_nopassport" id="resume_nopassport" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_nopassport'])) echo $posted['resume_nopassport']; ?>" /></p>
			
			<p><label for="resume_timepassport"><?php _e('Masa Berlaku Passport', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_timepassport" id="resume_timepassport" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_timepassport'])) echo $posted['resume_timepassport']; ?>" /></p>
			<p><label for="resume_exitpassport"><?php _e('Tanggal Pengeluaran Passport/KTP', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_exitpassport" id="resume_exitpassport" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_exitpassport'])) echo $posted['resume_exitpassport']; ?>" /></p>
			<p><label for="resume_placepassport"><?php _e('Tempat Pengeluaran Passport/KTP', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_placepassport" id="resume_placepassport" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_placepassport'])) echo $posted['resume_placepassport']; ?>" /></p>
			<p><label for="resume_noktp"><?php _e('Nomor KTP', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_noktp" id="resume_noktp" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_noktp'])) echo $posted['resume_noktp']; ?>" /></p>
			<p><label for="resume_child"><?php _e('Anak', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_child" id="resume_child" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_child'])) echo $posted['resume_child']; ?>" /></p>
			<p><label for="resume_saudara"><?php _e('Saudara', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_saudara" id="resume_saudara" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_saudara'])) echo $posted['resume_saudara']; ?>" /></p>
			<p><label for="resume_urutan"><?php _e('Urutan', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_urutan" id="resume_urutan" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_urutan'])) echo $posted['resume_urutan']; ?>" /></p>
			<p><label for="resume_agama"><?php _e('Agama', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_agama" id="resume_agama" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_agama'])) echo $posted['resume_agama']; ?>" /></p>
			<p><label for="resume_pendidikan"><?php _e('Pendidikan', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="resume_pendidikan" id="resume_pendidikan" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['resume_pendidikan'])) echo $posted['resume_pendidikan']; ?>" /></p>
			
</fieldset>

<fieldset>
			<legend><?php _e('Keluarga', 'appthemes'); ?></legend>
						<p><label for="nama_bapak"><?php _e('Nama Bapak', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="nama_bapak" id="nama_bapak" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['nama_bapak'])) echo $posted['nama_bapak']; ?>" /></p>
						<p><label for="pekerjaan_bapak"><?php _e('Pekerjaan Bapak', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="pekerjaan_bapak" id="pekerjaan_bapak" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['pekerjaan_bapak'])) echo $posted['pekerjaan_bapak']; ?>" /></p>
						<p><label for="umur_bapak"><?php _e('Umur Bapak', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="umur_bapak" id="umur_bapak" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['umur_bapak'])) echo $posted['umur_bapak']; ?>" /></p>
						
						<p><label for="nama_ibu"><?php _e('Nama Ibu', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="nama_ibu" id="nama_ibu" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['nama_ibu'])) echo $posted['nama_ibu']; ?>" /></p>
						<p><label for="pekerjaan_ibu"><?php _e('pekerjaan Ibu', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="pekerjaan_ibu" id="pekerjaan_ibu" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['pekerjaan_ibu'])) echo $posted['pekerjaan_ibu']; ?>" /></p>
						<p><label for="umur_ibu"><?php _e('Umur Ibu', 'appthemes'); ?> <span title="required">*</span></label> <input type="text" class="text" name="umur_ibu" id="umur_ibu" class="text" placeholder="<?php _e('', 'appthemes'); ?>" value="<?php if (isset($posted['umur_ibu'])) echo $posted['umur_ibu']; ?>" /></p>
						
</fieldset>



		<fieldset>
			<legend><?php _e('Detail Kontak', 'appthemes'); ?></legend>
			
			<p><?php _e('Lengkapi detail kontak Anda agar pemberi kerja bisa mnghubungi jika mereka tertarik dengan biodata Anda', 'appthemes'); ?></p>
			
			<p class="optional"><label for="email_address"><?php _e('Email Address', 'appthemes'); ?></label> <input type="text" class="text" name="email_address" value="<?php if (isset($posted['email_address'])) echo $posted['email_address']; ?>" id="email_address" placeholder="<?php _e('you@yourdomain.com', 'appthemes'); ?>" /></p>
			<p class="optional"><label for="tel"><?php _e('Telephone', 'appthemes'); ?></label> <input type="text" class="text" name="tel" value="<?php if (isset($posted['tel'])) echo $posted['tel']; ?>" id="tel" placeholder="<?php _e('', 'appthemes'); ?>" /></p>
			<p class="optional"><label for="mobile"><?php _e('Nomor Handphone', 'appthemes'); ?></label> <input type="text" class="text" name="mobile" value="<?php if (isset($posted['mobile'])) echo $posted['mobile']; ?>" id="mobile" placeholder="<?php _e('Mobile number', 'appthemes'); ?>" /></p>
			<p><?php _e('Bila terjadi darurat kontak yang di hubungi / Nama ahli waris', 'appthemes'); ?></p>
			<p class="optional"><label for="emergency_name"><?php _e('Nama Ahli Waris', 'appthemes'); ?></label> <input type="text" class="text" name="emergency_name" value="<?php if (isset($posted['emergency_name'])) echo $posted['emergency_name']; ?>" id="emergency_name" placeholder="<?php _e('', 'appthemes'); ?>" /></p>
			<p class="optional"><label for="emergency_address"><?php _e('Alamat', 'appthemes'); ?></label> <input type="text" class="text" name="emergency_address" value="<?php if (isset($posted['emergency_address'])) echo $posted['emergency_address']; ?>" id="emergency_address" placeholder="<?php _e('', 'appthemes'); ?>" /></p>
			<p class="optional"><label for="emergency_tel"><?php _e('Nomor Handphone', 'appthemes'); ?></label> <input type="text" class="text" name="emergency_tel" value="<?php if (isset($posted['emergency_tel'])) echo $posted['emergency_tel']; ?>" id="emergency_tel" placeholder="<?php _e('', 'appthemes'); ?>" /></p>
			
		</fieldset>	
		
		<fieldset>
			<legend><?php _e('Lokasi Anda', 'appthemes'); ?></legend>								
			<p><?php _e('Dengan melengkapi lokasi Anda, akan membantu pemberi kerja menemukan Anda.', 'appthemes'); ?></p>	
			<div id="geolocation_box">
			
				<p><label><input id="geolocation-load" type="button" class="button geolocationadd" value="<?php _e('Find Address/Location', 'appthemes'); ?>" /></label> <input type="text" class="text" name="jr_address" id="geolocation-address" value="<?php if (isset($posted['jr_address'])) echo $posted['jr_address']; ?>" /><input type="hidden" class="text" name="jr_geo_latitude" id="geolocation-latitude" value="<?php if (isset($posted['jr_geo_latitude'])) echo $posted['jr_geo_latitude']; ?>" /><input type="hidden" class="text" name="jr_geo_longitude" id="geolocation-longitude" value="<?php if (isset($posted['jr_geo_longitude'])) echo $posted['jr_geo_longitude']; ?>" /></p>
	
				<div id="map_wrap" style="border:solid 2px #ddd;"><div id="geolocation-map" style="width:100%;height:300px;"></div></div>
			
			</div>
			
		</fieldset>	

<fieldset>
			<legend><?php _e('Pekerjaan', 'appthemes'); ?></legend>
			<p class="optional"><label for="resume_cat"><?php _e('Kategori Pekerjaan', 'appthemes'); ?></label> <?php
				$sel = 0;
				if (isset($posted['resume_cat']) && $posted['resume_cat']>0) $sel = $posted['resume_cat']; 
				global $featured_job_cat_id;
				$args = array(
				    'orderby'            => 'name', 
				    'order'              => 'ASC',
				    'name'               => 'resume_cat',
				    'hierarchical'       => 1, 
				    'echo'				 => 0,
				    'class'              => 'resume_cat',
				    'selected'			 => $sel,
				    'taxonomy'			 => 'resume_category',
				    'hide_empty'		 => false
				);
				$dropdown = wp_dropdown_categories( $args );
				$dropdown = str_replace('class=\'resume_cat\' >','class=\'resume_cat\' ><option value="">'.__('Pilih Kategori&hellip;', 'appthemes').'</option>',$dropdown);
				echo $dropdown;
			?></p>
			
			<p class="optional"><label for="desired_salary"><?php _e('Gaji yang diinginkan<br/>(hanya nilai numerik atau angka desimal)', 'appthemes'); ?></label> <input type="text" class="tags text" name="desired_salary" id="desired_salary" placeholder="<?php _e('Contoh: 5000000', 'appthemes'); ?>" value="<?php if (isset($posted['desired_salary'])) echo $posted['desired_salary']; ?>" /></p>
			
			<p class="optional"><label for="desired_position"><?php _e('Posisi yang diinginkan', 'appthemes'); ?></label> <select name="desired_position" id="desired_position">
				<option value=""><?php _e('Semua', 'appthemes'); ?></option>
				<?php
				$job_types = get_terms( 'resume_job_type', array( 'hide_empty' => '0' ) );
				if ($job_types && sizeof($job_types) > 0) {
					foreach ($job_types as $type) {
						?>
						<option <?php if (isset($posted['desired_position']) && $posted['desired_position']==$type->slug) echo 'selected="selected"'; ?> value="<?php echo $type->slug; ?>"><?php echo $type->name; ?></option>
						<?php
					}
				}
				?>
			</select></p>	
</fieldset>
		<fieldset>
			<legend><?php _e('Pengalaman Kerja', 'appthemes'); ?></legend>
			<p><?php _e('Detil pengalaman kerja Anda, termasuk rincian tentang majikan dan peran tugas dan tanggung jawab.', 'appthemes'); ?></p>
			<p><textarea rows="5" cols="30" name="experience" id="experience" class="mceEditor"><?php if (isset($posted['experience'])) echo $posted['experience']; ?></textarea></p>
		</fieldset>	
		
		<fieldset>
			<legend><?php _e('Keahlian &amp; Spesialisasi', 'appthemes'); ?></legend>

			<p class="optional"><label for="skills"><?php _e('Keahlian <small>(satu per baris)</small>', 'appthemes'); ?></label> <textarea rows="1" cols="30" name="skills" id="skills" class="short grow" placeholder="<?php _e('Contoh: merawat anak (selama 5 tahun)', 'appthemes'); ?>"><?php if (isset($posted['skills'])) echo $posted['skills']; ?></textarea></p>
			
			<p class="optional"><label for="specialities"><?php _e('Bidang yang paling dikuasai <small>contoh: memasak, mengasuh anak</small>', 'appthemes'); ?></label> <input type="text" class="tags text tag-input-commas" data-separator="," name="specialities" id="specialities" placeholder="<?php _e('Contoh: memasak, mengasuh anak', 'appthemes'); ?>" value="<?php if (isset($posted['specialities'])) echo $posted['specialities']; ?>" /></p>
			
			
			
			<p class="optional" id="languages_wrap"><label for="languages"><?php _e('Bahasa Yang Dikuasai <small>Contoh: Indonesia, Sunda</small>', 'appthemes'); ?></label> <input type="text" class="text text tag-input-commas" data-separator="," name="languages" value="<?php if (isset($posted['languages'])) echo $posted['languages']; ?>" id="languages" placeholder="<?php _e('Contoh: Indonesia, Sunda', 'appthemes'); ?>" /></p>
			
		</fieldset>
		
		<p><input type="submit" class="submit" name="save_resume" value="<?php _e('Save &rarr;', 'appthemes'); ?>" /></p>
			
		<div class="clear"></div>
			
	</form>
	<script type="text/javascript">
		
		jQuery(function(){
		
			/* Auto Complete */
			var availableTags = [
				<?php
					$terms_array = array();
					$terms = get_terms( 'resume_languages', 'hide_empty=0' );
					if ($terms) foreach ($terms as $term) {
						$terms_array[] = '"'.$term->name.'"';
					}
					echo implode(',', $terms_array);
				?>
			];
			function split( val ) {
				return val.split( /,\s*/ );
			}
			function extractLast( term ) {
				return split( term ).pop();
			}
			jQuery("#languages_wrap input").live( "keydown", function( event ) {
				if ( (event.keyCode === jQuery.ui.keyCode.TAB || event.keyCode === jQuery.ui.keyCode.COMMA) &&
						jQuery( this ).data( "autocomplete" ).menu.active ) {
					event.preventDefault();
				}
			}).autocomplete({
			    minLength: 0,
				source: function( request, response ) {
					// delegate back to autocomplete, but extract the last term
					response( jQuery.ui.autocomplete.filter(
						availableTags, extractLast( request.term ) ) );
				},
			    focus: function() {
			    	jQuery('input.ui-autocomplete-input').val('');
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {

					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					//this.value = terms.join( ", " );
					this.value = terms.join( "" );
					
					jQuery(this).blur();
					jQuery(this).focus();
					
					return false;
				}
			});
		
		});
	</script>
	<?php
	if (get_option('jr_html_allowed') == 'yes')
	    jr_tinymce();
	?>
	<?php
}