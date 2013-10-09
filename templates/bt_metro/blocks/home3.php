   <div class="home3">
	<div class="row">                                                    
                             
    	<?php if ($this->countModules('home3-sidebar-1')) : ?>
            <div class="home5-sidebar-1 span<?php echo $this->countModules('home3-sidebar-2')?3:12; ?>">
                <jdoc:include type="modules" name="home3-sidebar-1" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home5-sidebar-1 -->
        <?php if ($this->countModules('home3-sidebar-2')) : ?>
            <div class="home5-sidebar-2 span<?php echo $this->countModules('home3-sidebar-1')?6:12; ?>">
                <jdoc:include type="modules" name="home3-sidebar-2" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home5-sidebar-2 -->
        <?php if ($this->countModules('home3-sidebar-3')) : ?>
            <div class="home5-sidebar-3 span<?php echo $this->countModules('home3-sidebar-2')?3:12; ?>">
                <jdoc:include type="modules" name="home3-sidebar-3" style="xhtml" />	
            </div>
        <?php endif; ?>
        <!-- End home5-sidebar-2 -->
	</div>
</div>