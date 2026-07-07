<script>
	import { HOURS, LOCATION } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="contact" class="section infobar" use:reveal>
	<div class="infobar-inner">
		<div class="info-col">
			<h3>Hours of Operation</h3>
			<p>
				{#each HOURS as line, i}
					{line}{#if i < HOURS.length - 1}<br />{/if}
				{/each}
			</p>
		</div>
		<div class="info-col">
			<h3>Location</h3>
			<p>{LOCATION.address[0]}<br />{LOCATION.address[1]}</p>
			<p><a href="#locations" class="inline">Get Directions</a></p>
			<p>Tel: <a href={`tel:${LOCATION.phone.replace(/\./g, '')}`} class="inline">{LOCATION.phone}</a></p>
		</div>
		<div class="info-col">
			<h3>Get in Touch</h3>
			<div class="info-actions">
				<a href="#" class="btn btn-ghost">Careers</a>
				<a href="#" class="btn btn-ghost">Press Inquiries</a>
			</div>
		</div>
	</div>
</section>
