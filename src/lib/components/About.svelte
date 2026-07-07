<script>
	import { ABOUT } from '$lib/content.js';
	import { openReservation } from '$lib/reservation.svelte.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="about" class="section about" use:reveal>
	<div class="about-inner">
		<span class="eyebrow">{ABOUT.eyebrow}</span>
		<p class="about-body">{ABOUT.body}</p>
		<button class="btn btn-primary" onclick={openReservation}>Make a Reservation</button>
	</div>
</section>
