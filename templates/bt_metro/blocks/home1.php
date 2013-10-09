<?php 
// Adjusting content width
if ($this->countModules('home1-sidebar-1') && $this->countModules('home1-sidebar-2')){
	$span_sidebar1 = "span6";
	$span_sidebar2 = "span6";

}else{
	$span_sidebar1 = "span12";
	$span_sidebar2 = "span12";
	$span_sidebar3 = "span12";
}
if($this->countModules('home1-sidebar-4') && $this->countModules('home1-sidebar-5') && $this->countModules('home1-sidebar-3')){
		$span_sidebar3 = "span3";
                $span_sidebar4 = "span3";
		$span_sidebar5 = "span6";
	}elseif($this->countModules('home1-sidebar-4') && $this->countModules('home1-sidebar-5') || $this->countModules('home1-sidebar-3')){
                $span_sidebar3 = "span3";
		$span_sidebar4 = "span3";
                $span_sidebar5 = "span3";
	}else{
		$span_sidebar5 = "span12";
	}
?>
<div class="home1">
	<div class="row">
		<div class="home1-top">
			<?php if ($this->countModules('home1-sidebar-1')): ?>
			<!-- Begin Sidebar -->
			<div class="home1-sidebar-1 <?php echo $span_sidebar1;?>">
				<div class="sidebar-nav">
					<jdoc:include type="modules" name="home1-sidebar-1" style="xhtml" />
				</div>
			</div>
			<!-- End Sidebar -->
			<?php endif; ?>
			
			<?php if ($this->countModules('home1-sidebar-2')): ?>
			<!-- Begin Sidebar -->
			<div class="home1-sidebar-2 <?php echo $span_sidebar2; ?>">
				<!-- Begin Content -->
				<jdoc:include type="modules" name="home1-sidebar-2" style="xhtml" />
				<!-- End Content -->
			</div>
			<?php endif; ?>
			
			
			<div class="clrDiv" style="clear:both;"></div>
		</div>
		<div class="home1-bottom">
                       <?php if ($this->countModules('home1-sidebar-3')): ?>
			<!-- Begin Sidebar -->
			<div class="home1-sidebar-3 <?php echo $span_sidebar3; ?>">
				<jdoc:include type="modules" name="home1-sidebar-3" style="xhtml" />
			</div>
			<!-- End Sidebar -->
			<?php endif; ?>
			<?php if ($this->countModules('home1-sidebar-4')): ?>
			<!-- Begin Sidebar -->
			<div class="home1-sidebar-4 <?php echo $span_sidebar4; ?>">
				<div class="sidebar-nav">
					<jdoc:include type="modules" name="home1-sidebar-4" style="xhtml" />
				</div>
			</div>
			<!-- End Sidebar -->
			<?php endif; ?>
			
			<?php if ($this->countModules('home1-sidebar-5')): ?>
			<div class="home1-sidebar-5 <?php echo $span_sidebar5; ?>">
				<!-- Begin Content -->
				<jdoc:include type="modules" name="home1-sidebar-5" style="xhtml" />
				<!-- End Content -->
			</div>
			<?php endif; ?>
			<div class="clrDiv" style="clear:both;"></div>
		</div>     
	</div>
</div>