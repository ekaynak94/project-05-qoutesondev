<?php
/**
 * Template part for displaying page content in archive-quotes.php.
 *
 * @package QOD_Starter_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	

	<section class='archive-lists'>
        <header class="entry-header">
            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
        </header><!-- .entry-header -->
        <div class='archive-posts'>
            <h2>Archive Authors</h2>
            <?php
                $posts=get_posts(array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1 ));
            ?>
            <ul>
                <?php foreach ( $posts as $post ) : setup_postdata( $post ); ?>
                    <li>
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </li>
                <?php endforeach; wp_reset_postdata(); ?>
            </ul>
        </div>
        <div class='archive-catagories'>
            <h2>Catagories</h2>
            <ul>
                <?php wp_list_categories(array(
                    'taxonomy'            => 'category',
                    'title_li'            => '',
                )
                );?>
            </ul>
        </div>
        <div class='archive-tags'>
            <h2>Tags</h2>
            <?php
                $tags=get_tags(array( 'orderby' => 'title',
                'order' => 'ASC'));
            ?>
            <ul>
                <?php foreach ( $tags as $tag ) : setup_postdata( $tag ); ?>
                    <li>
                        <a href="<?php echo  get_tag_link( $tag->term_id ); ?>"><?php echo $tag->slug; ?></a>
                    </li>
                <?php endforeach; wp_reset_postdata(); ?>
            </ul>
        </div>
    </section>
</article><!-- #post-## -->
