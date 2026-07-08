<script>
	import { openReservation } from '$lib/reservation.svelte.js';
	import { reveal } from '$lib/actions.js';

	let { feature, variant = 'a' } = $props();
</script>

<section id={feature.id} class="section feature feature-{variant}" use:reveal>
	<div class="feature-text">
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
