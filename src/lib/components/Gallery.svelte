<script>
	import Carousel from './Carousel.svelte';
	import { GALLERY, BRAND } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="gallery" class="section gallery" use:reveal>
	<div class="section-head">
		<span class="eyebrow">From the Pass</span>
		<h2>The Gallery</h2>
	</div>
	<Carousel label="gallery images">
		{#each GALLERY as item}
			{#if item.branded}
				<figure class="gallery-item branded">
					<div class="brand-tile">
						<div class="bt-mark">{BRAND}</div>
						<div class="bt-sub">— NYC —</div>
					</div>
				</figure>
			{:else}
				<figure class="gallery-item"><img src={item.src} alt={item.alt} /></figure>
			{/if}
		{/each}
	</Carousel>
</section>
