<?php

/** Remove the post info function */
remove_action( 'genesis_before_post_content', 'genesis_post_info' );

/** Remove the post meta function */
remove_action( 'genesis_after_post_content', 'genesis_post_meta' );

genesis();

?>