<?php global $smof_data; ?>
<?php if($smof_data['header_number'] || $smof_data['header_email']): ?>
	<div class="header-info">
		<?php echo $smof_data['header_number']; ?>
		<?php if($smof_data['header_number'] && $smof_data['header_email']): ?>
		<?php if($smof_data['header_position'] == 'Top'): ?>
			<span class="sep">|</span><?php else: ?><br />
		<?php endif; ?>
		<?php endif; ?>
		<a href="mailto:<?php echo $smof_data['header_email']; ?>">
			<?php echo $smof_data['header_email']; ?>
		</a>
		<ul class="social">
			<li>
				<a href="https://www.facebook.com/InfiniteSmilesGa" target="_blank">
					<i class="fa fa-facebook-official" aria-hidden="true"></i>
				</a>
			</li>
			<li>
				<div class="fb-like" data-href="http://infinitesmilesga.com" data-layout="button_count" data-action="recommend" data-size="small" data-show-faces="false" data-share="true"></div>
			</li>
		</ul>
	</div>
<?php endif; ?>
