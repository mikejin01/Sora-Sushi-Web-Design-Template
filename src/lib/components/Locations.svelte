<script>
	import Carousel from './Carousel.svelte';
	import { LOCATIONS } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="locations" class="section locations" use:reveal>
	<div class="section-head">
		<span class="eyebrow">Our World</span>
		<h2>Featured Locations</h2>
	</div>
	<Carousel label="locations">
		{#each LOCATIONS as loc}
			<article class="loc-card">
				<div class="loc-img"><img src={loc.src} alt={loc.name} /></div>
				<div class="loc-meta">
					<h3>{loc.name}</h3>
					<div class="loc-city">{loc.city}</div>
				</div>
			</article>
		{/each}
	</Carousel>
</section>
