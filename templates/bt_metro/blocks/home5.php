<div class="home5">
	<div class="row">
    
                        <script type="text/javascript">					
                        jQuery(document).ready(function(){							
							jQuery('.custom_mail').css('height',jQuery('.swap-mail').innerHeight(true));
							jQuery('.custom_mail').hover(function(){									
									jQuery('.show-contact').animate({
										'top'	: 0,										
									},400);									
								},function(){									
									jQuery('.show-contact').animate({
										'top'	: '100%'										
									},400);									
								});															
							});
                        </script>      
                       <?php if ($this->countModules('home5-sidebar-1')) : ?>
            <div class="home5-sidebar-1 span<?php echo $this->countModules('home5-sidebar-2')?3:12; ?>">
                <jdoc:include type="modules" name="home5-sidebar-1" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home5-sidebar-1 -->
        <?php if ($this->countModules('home5-sidebar-2')) : ?>
            <div class="home5-sidebar-2 span<?php echo $this->countModules('home5-sidebar-1')?6:12; ?>">
                <jdoc:include type="modules" name="home5-sidebar-2" style="xhtml" />	
            </div>
        <?php endif; ?>
         <?php if ($this->countModules('home5-sidebar-3')) : ?>
            <div class="home5-sidebar-3 span<?php echo $this->countModules('home5-sidebar-2')?3:12; ?>">
                <jdoc:include type="modules" name="home5-sidebar-3" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home5-sidebar-3 -->
    </div>
</div>