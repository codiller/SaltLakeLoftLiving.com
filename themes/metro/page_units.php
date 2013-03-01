<?php

/*
	Template name: Page Units
*/

remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'pr_custom_loop' );
function pr_custom_loop() {
		$args = array(
		'category' => 'units',
		'orderby' => 'title',
		'order' => 'asc',
	);
	$my = new WP_Query( $args );
	while ( $my->have_posts() ): $my->the_post(); ?>
		<div class="post-single">
			<div class="featured-image"><?php echo the_post_thumbnail( 'units' ); ?></div>
			<div class="post-text">
				<div class="read-more button"><a href="<?php echo the_permalink(); ?>">Learn more...</a></div>
				<h2 class="entry-title"><a href="<?php echo the_permalink(); ?>"><?php echo the_title(); ?></a></h2>
			</div>
		</div>
	<?php endwhile;
}

genesis();

?>