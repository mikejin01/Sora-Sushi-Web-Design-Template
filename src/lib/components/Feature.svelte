<script>
	import { openReservation } from '$lib/reservation.svelte.js';
	import { reveal } from '$lib/actions.js';

	let { feature, variant = 'a' } = $props();
</script>

<section id={feature.id} class="section feature feature-{variant}" use:reveal>
	<div class="feature-text">
		<svg
			class="illus feature-corner {variant === 'a' ? 'tl' : 'br'}"
			viewBox="0 0 52 52"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
		>
			<path d="M4 26C4 14 14 4 26 4M4 26v14M4 26h14" />
		</svg>
		<span class="eyebrow">{feature.eyebrow}</span>
		<h2>{feature.title}</h2>
		<p>{feature.body}</p>
		{#if feature.reserve}
			<button class="btn" onclick={openReservation}>{feature.cta}</button>
		{:else}
			<a href={feature.ctaHref} class="btn">{feature.cta}</a>
		{/if}
	</div>
	<div class="feature-photo"><img src={feature.img} alt={feature.alt} /></div>
</section>
