<div class="home4">
	<div class="row">                  
    
            	<?php if ($this->countModules('home4-sidebar-1')) : ?>
            <div class="home4-sidebar-1 span<?php echo $this->countModules('home4-sidebar-2')?6:12; ?>">
                <jdoc:include type="modules" name="home4-sidebar-1" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home4-sidebar-1 -->
        <?php if ($this->countModules('home4-sidebar-2')) : ?>
            <div class="home4-sidebar-2 span<?php echo $this->countModules('home4-sidebar-1')?6:12; ?>">
                <jdoc:include type="modules" name="home4-sidebar-2" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home4-sidebar-2 -->       
             
    
	</div>
</div>