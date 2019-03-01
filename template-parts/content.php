<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

?>
<?php
$source=get_post_meta(get_the_ID(),'_qod_quote_source',TRUE);
$source_url=get_post_meta(get_the_ID(),'_qod_quote_source_url',TRUE);
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php the_excerpt(); ?>
	</div><!-- .entry-content -->

	<div class="entry-info">
		<h2 class='quote-author'>&mdash;<?php the_title();?></h2>
		<?php if($source && $source_url):?>
		    <span class='quote-source'>
				, 
				<a href=<?php echo $source_url?>>
					<?php echo $source?>
				</a>
			</span>
		<?php elseif($source):?>
			<span class='quote-source'>
				, <?php echo $source?>
			</span>
		<?php endif;?>

	</div>
</article><!-- #post-## -->