<script>
	import { HERO, BRAND } from '$lib/content.js';
	import { openReservation } from '$lib/reservation.svelte.js';

	// The real hero video (downloaded from the live site) fades in over the
	// poster image once it can play — graceful fallback if it ever 404s.
	let videoReady = $state(false);
</script>

<section id="hero" class="hero">
	<div class="hero-media">
		<img class="hero-fallback" src={HERO.poster} alt="{BRAND} dining room" />
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			class="hero-video"
			class:ready={videoReady}
			autoplay
			muted
			loop
			playsinline
			oncanplay={() => (videoReady = true)}
		>
			<source src={HERO.video} type="video/mp4" />
		</video>
	</div>

	<div class="hero-inner">
		<div class="hero-text">
			<p class="eyebrow">{HERO.eyebrow}</p>
			<h1 class="hero-title">Lower East Side,<br /><span class="hand">Japanese-Styled</span></h1>
			<p class="hero-welcome">{HERO.welcome}</p>
			<div class="hero-cta">
				<button class="btn btn-primary" onclick={openReservation}>Make a Reservation</button>
				<a href="#menu" class="btn btn-ghost">View Menu</a>
			</div>
		</div>
	</div>

	<a href="#gallery" class="scroll-chev" aria-label="Scroll down">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6" /></svg>
	</a>
</section>
