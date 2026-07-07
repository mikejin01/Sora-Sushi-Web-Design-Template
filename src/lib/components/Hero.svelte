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

	<div class="hero-illus" aria-hidden="true">
		<svg class="illus m crane" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
			<path d="M20 70c8-2 14-8 20-16 4-6 10-12 18-14 6-1 12 0 16 4" />
			<path d="M74 44c4-2 8-1 10 2M58 30c-4 2-6 6-6 10M40 54l-6 20M52 52l2 22" />
			<circle cx="76" cy="42" r="1.4" fill="currentColor" />
			<path d="M78 41l8-3-6 5" />
		</svg>
		<svg class="illus m sprig" viewBox="0 0 60 100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
			<path d="M30 96V16M30 60c-14-4-20-16-20-30M30 48c14-2 20-14 20-28M30 34c-10-2-15-10-16-22M30 26c10 0 16-8 17-18" />
		</svg>
		<svg class="illus m wave-h" viewBox="0 0 1200 60" fill="none" stroke="currentColor" stroke-width="2" preserveAspectRatio="none">
			<path d="M0 40q30-30 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0" />
			<path d="M0 55q30-30 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0" opacity=".5" />
		</svg>
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
