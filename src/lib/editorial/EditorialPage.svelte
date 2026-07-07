<script>
	// EDITORIAL THEME — generic upscale-restaurant template ("Sora Sushi").
	// Page structure mirrors a classic venue homepage (hero video → social
	// gallery → about → features → locations → newsletter → awards → info),
	// styled with an Apple-inspired system-font / pill-button treatment.
	// Placeholder media lives in static/assets/.
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import SoraLogo from './SoraLogo.svelte';
	import { openReservation } from '$lib/reservation.svelte.js';

	const A = `${base}/assets`;

	/* ---------- headroom-style navbar ---------- */
	let navHidden = $state(false);
	let navSolid = $state(false);
	let lastY = 0;
	function onScroll() {
		const y = window.scrollY;
		navSolid = y > 40;
		navHidden = y > 120 && y > lastY;
		lastY = y;
	}

	/* ---------- auto media carousel (marquee) ---------- */
	// Live order: img, IG video, img, IG video, img, IG video (6 slides)
	const mediaCards = [
		{ type: 'img', src: `${A}/images/platter.jpg`, alt: 'sushi' },
		{ type: 'video', src: `${A}/videos/social-sushi-roll.mp4`, href: '#gallery' },
		{ type: 'img', src: `${A}/images/hamachi-crudo.jpg`, alt: 'hamachi crudo' },
		{ type: 'video', src: `${A}/videos/social-hamachi.mp4`, href: '#gallery' },
		{ type: 'img', src: `${A}/images/bar-set.jpg`, alt: 'sando and cocktail' },
		{ type: 'video', src: `${A}/videos/social-dining-room.mp4`, href: '#gallery' }
	];
	let trackEl = $state(null);
	let marqueeX = 0;
	let marqueePlaying = $state(true);
	let pausedVideos = $state({});
	let raf;
	function marqueeLoop() {
		if (trackEl && marqueePlaying) {
			marqueeX -= 0.6; // ~36px/s, matches the live crawl
			const half = trackEl.scrollWidth / 2;
			if (-marqueeX >= half) marqueeX += half;
			trackEl.style.transform = `translate3d(${marqueeX}px,0,0)`;
		}
		raf = requestAnimationFrame(marqueeLoop);
	}
	function marqueeStep(dir) {
		if (!trackEl) return;
		const card = trackEl.querySelector('.card');
		const step = (card ? card.offsetWidth : 400) + 20;
		marqueeX += dir * step;
		const half = trackEl.scrollWidth / 2;
		if (-marqueeX >= half) marqueeX += half;
		if (marqueeX > 0) marqueeX -= half;
		trackEl.style.transition = 'transform .45s ease-in-out';
		trackEl.style.transform = `translate3d(${marqueeX}px,0,0)`;
		setTimeout(() => trackEl && (trackEl.style.transition = 'none'), 460);
	}
	function toggleCardVideo(i, e) {
		const vid = e.currentTarget.parentElement.querySelector('video');
		if (!vid) return;
		if (vid.paused) {
			vid.play();
			pausedVideos = { ...pausedVideos, [i]: false };
		} else {
			vid.pause();
			pausedVideos = { ...pausedVideos, [i]: true };
		}
	}

	/* ---------- featured locations (flickity-style) ---------- */
	const venues = [
		{ name: 'The Lantern Room', city: 'New York', src: `${A}/images/venue-lantern.jpg` },
		{ name: 'Sora Uptown', city: 'New York', src: `${A}/images/venue-uptown.jpg` },
		{ name: 'Kumo', city: 'New York', src: `${A}/images/venue-downtown.jpg` },
		{ name: 'Ginkgo Lounge', city: 'Miami', src: `${A}/images/venue-lounge.jpg` },
		{ name: 'Izakaya West', city: 'Los Angeles', src: `${A}/images/venue-rooftop.jpg` }
	];
	const N = venues.length;
	let sliderIdx = $state(0);
	let sliderAnim = $state(true);
	let sliderPaused = $state(false);
	let sliderEl = $state(null);
	let sliderTimer;
	function cellStep() {
		const cell = sliderEl?.querySelector('.carousel-cell');
		return cell ? cell.offsetWidth : 315;
	}
	let sliderX = $state(0);
	function goTo(i, animate = true) {
		sliderAnim = animate;
		sliderIdx = i;
		sliderX = -i * cellStep();
	}
	function next() {
		if (sliderIdx >= N) {
			// snap back from clone set, then advance
			goTo(sliderIdx - N, false);
			requestAnimationFrame(() => requestAnimationFrame(() => goTo(sliderIdx + 1)));
			return;
		}
		goTo(sliderIdx + 1);
	}
	function prev() {
		if (sliderIdx <= 0) {
			goTo(sliderIdx + N, false);
			requestAnimationFrame(() => requestAnimationFrame(() => goTo(sliderIdx - 1)));
			return;
		}
		goTo(sliderIdx - 1);
	}
	function startAutoplay() {
		clearInterval(sliderTimer);
		sliderTimer = setInterval(() => !sliderPaused && next(), 4000); // autoPlay: 4000 on live
	}

	/* ---------- newsletter ---------- */
	let email = $state('');
	let subscribed = $state(false);
	function subscribe(e) {
		e.preventDefault();
		if (email.trim()) subscribed = true;
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reduced) raf = requestAnimationFrame(marqueeLoop);
		else marqueePlaying = false;
		startAutoplay();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			clearInterval(sliderTimer);
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<div class="sora">
	<!-- ============================== NAVBAR ============================== -->
	<nav class="navbar" class:hidden={navHidden} class:solid={navSolid}>
		<div class="navbar-inner">
			<div class="navbar-brand">
				<a href="{base}/" rel="home" aria-label="Sora Sushi"><SoraLogo /></a>
			</div>
			<nav class="navbar-nav">
				<a class="nav-link" href="#page-body">Delivery &amp; Pickup</a>
				<a class="nav-link" href="#menu">Menu</a>
				<a class="nav-link" href="#gallery">Gallery</a>
				<div class="nav-dropdown">
					<button class="nav-link dropdown-toggle" type="button">Special Events</button>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#events">Special Events</a>
						<a class="dropdown-item" href="#events">360 Tour</a>
					</div>
				</div>
				<a class="nav-link" href="#contact">Contact</a>
				<div class="navbar-cta">
					<button class="btn btn-outline-light btn-sm" onclick={openReservation}>Reservations</button>
				</div>
			</nav>
			<button class="menu-toggle" aria-label="Menu" onclick={openReservation}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="1" y1="5" x2="23" y2="5"/><line x1="1" y1="12" x2="23" y2="12"/><line x1="1" y1="19" x2="23" y2="19"/></svg>
			</button>
		</div>
	</nav>

	<main class="site-content" id="content">
		<!-- ============================== HERO ============================== -->
		<div class="page-header">
			<section class="page-section padding-lg ninety-percent-height">
				<div class="page-section__background">
					<div class="page-section__overlay" style="opacity: 0.25"></div>
					<video src="{A}/videos/hero.mp4" autoplay loop muted playsinline></video>
				</div>
				<div class="container container--md">
					<h1 class="sr-only">Sora Sushi — Modern Japanese Restaurant, New York</h1>
					<div class="content-blocks text-center">
						<div class="content-blocks__block">
							<h2 class="h1">Lower East Side, Japanese-Styled</h2>
						</div>
						<div class="content-blocks__block">
							<p class="hero-sub">Welcome to Sora Sushi</p>
						</div>
						<div class="content-blocks__block">
							<div class="content-block__links hero-links">
								<button class="btn btn-light" onclick={openReservation}>Make a Reservation</button>
								<a class="btn btn-outline-light" href="#menu">View Menu</a>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll-arrow-container">
					<a href="#page-body" class="scroll-arrow" aria-label="Scroll">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 9l8 7 8-7"/></svg>
					</a>
				</div>
			</section>
		</div>

		<div id="page-body">
			<!-- ============================== MEDIA CAROUSEL ============================== -->
			<section class="page-section padding-sm" id="gallery">
				<div class="container container--fluid">
					<div class="auto-media-carousel" role="region" aria-roledescription="carousel" aria-label="Media Carousel">
						<button class="carousel-btn prev" aria-label="Previous Slide" onclick={() => marqueeStep(1)}>
							<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" /></svg>
						</button>
						<button class="carousel-btn next" aria-label="Next Slide" onclick={() => marqueeStep(-1)}>
							<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" transform="translate(100, 100) rotate(180)" /></svg>
						</button>
						<button
							class="carousel-btn play-pause"
							class:playing={marqueePlaying}
							class:paused={!marqueePlaying}
							aria-label={marqueePlaying ? 'Pause Carousel' : 'Play Carousel'}
							onclick={() => (marqueePlaying = !marqueePlaying)}><span></span></button>
						<div class="carousel-track" bind:this={trackEl}>
							{#each [...mediaCards, ...mediaCards] as card, i}
								<div class="card" class:content-hover={card.type === 'video'}>
									{#if card.type === 'video'}
										<a href={card.href} aria-label="View on Instagram" class="ig-link" onclick={(e) => e.preventDefault()}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>
										</a>
										<div class="media-container">
											<video src={card.src} autoplay loop muted playsinline></video>
											<button
												class="video-toggle"
												class:playing={!pausedVideos[i]}
												class:paused={pausedVideos[i]}
												aria-label={pausedVideos[i] ? 'Play video' : 'Pause video'}
												onclick={(e) => toggleCardVideo(i, e)}></button>
										</div>
									{:else}
										<div class="media-container"><img src={card.src} alt={card.alt} /></div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== ABOUT ============================== -->
			<section class="page-section padding-md" id="menu">
				<div class="container container--md">
					<div class="content-blocks text-center">
						<div class="content-blocks__block">
							<h2 class="h4 font-weight-light">JAPANESE MODERN CLASSICS WITH A NEW YORK POINT OF VIEW</h2>
						</div>
						<div class="content-blocks__block">
							<div class="content-block__text">
								<p>
									Sora Sushi is a modern Japanese restaurant built on a simple belief&mdash;that tradition and
									invention belong at the same table. Our chefs translate centuries of technique into
									a menu made for sharing: robata and yakitori from the open flame, temaki cut to
									order, seasonal sashimi, and premium cuts like snow-aged wagyu. Ingredients travel
									from local greenmarkets and Japan&rsquo;s finest purveyors alike, while the bar pours a
									curated list of sakes, Japanese whiskies, and original cocktails. The room hums with
									the energy of the city&mdash;intimate enough for two, generous enough for a celebration,
									and the perfect setting for any occasion.
								</p>
							</div>
						</div>
						<div class="content-blocks__block">
							<div class="content-block__links">
								<button class="btn btn-outline-light my-2" onclick={openReservation}>Make a Reservation</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== FEATURE: SUSHI & SASHIMI SETS ============================== -->
			<section class="page-section padding-sm">
				<div class="container container--lg">
					<div class="feature">
						<div class="feature-panel">
							<span class="feature-eyebrow">On the Menu</span>
							<h2 class="feature-title">Sushi &amp; Sashimi Sets</h2>
							<p class="feature-body">
								Dive into an elevated sushi experience served tableside and enjoy the chef&rsquo;s
								selection of the freshest fish sourced from the best purveyors worldwide,
								including Japan&rsquo;s famous Toyosu Market.
							</p>
							<a class="btn btn-outline-light feature-btn" href="#gallery">View Menu</a>
						</div>
						<div class="feature-media">
							<img src="{A}/images/sushi.jpg" alt="sushi" />
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== FEATURE: PRIVATE EVENTS ============================== -->
			<section class="page-section padding-sm" id="events">
				<div class="container container--lg">
					<div class="feature feature--reverse">
						<div class="feature-panel">
							<span class="feature-eyebrow">Gatherings</span>
							<h2 class="feature-title">Private Events</h2>
							<p class="feature-body">
								Host your private event in the refined ambiance of Sora Sushi, where
								contemporary design meets bespoke dining and unforgettable service.
							</p>
							<button class="btn btn-outline-light feature-btn" onclick={openReservation}>Book Now</button>
						</div>
						<div class="feature-media">
							<img src="{A}/images/dining-room.jpg" alt="Sora Sushi dining room and bar" />
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== FEATURED BRANDED LOCATIONS ============================== -->
			<section class="page-section padding-sm" id="locations">
				<div class="container container--lg">
					<div class="content-blocks text-center">
						<div class="content-blocks__block"><h2 class="h3 font-weight-light">Featured Locations</h2></div>
						<div class="content-blocks__block">
							<div class="featured-slider-wrapper" role="region" aria-label="Featured content slider">
								<div class="featured-slider" bind:this={sliderEl}>
									<div
										class="slider-track"
										style="transform: translate3d({sliderX}px,0,0); transition: {sliderAnim ? 'transform .6s ease' : 'none'}">
										{#each [...venues, ...venues] as v}
											<div class="carousel-cell">
												<a href="#locations" aria-label="{v.name}, {v.city}" onclick={(e) => e.preventDefault()}>
													<div class="carousel-media"><img src={v.src} alt={v.name} /></div>
													<div class="carousel-content">
														<h2 class="h5"><strong>{v.name}</strong></h2>
														<h6 class="text-muted">{v.city}</h6>
													</div>
												</a>
											</div>
										{/each}
									</div>
									<button class="flickity-btn previous" aria-label="Previous" onclick={prev}>
										<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" /></svg>
									</button>
									<button class="flickity-btn next" aria-label="Next" onclick={next}>
										<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50 L 70,10 L 60,0 Z" transform="translate(100, 100) rotate(180)" /></svg>
									</button>
								</div>
								<button
									class="featured-slider-pause"
									aria-label={sliderPaused ? 'Play slider' : 'Pause slider'}
									onclick={() => (sliderPaused = !sliderPaused)}>
									{#if sliderPaused}
										<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
									{:else}
										<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== MAILING LIST ============================== -->
			<section class="page-section page-section--alt padding-md" id="newsletter">
				<div class="container container--md">
					<div class="content-blocks text-center">
						<div class="content-blocks__block"><span class="section-eyebrow">Stay in Touch</span></div>
						<div class="content-blocks__block"><h2 class="section-title">Join our Mailing List</h2></div>
						<div class="content-blocks__block">
							<div class="mailchimp-form">
								{#if subscribed}
									<p class="subscribed-msg">Thank you — you're on the list.</p>
								{:else}
									<form onsubmit={subscribe}>
										<input type="email" bind:value={email} placeholder="Email address" required aria-label="Email address" />
										<button class="btn btn-outline-light subscribe-btn">Subscribe</button>
									</form>
								{/if}
							</div>
						</div>
						<div class="content-blocks__block">
							<div class="content-block__text consent">
								<p>
									By signing up, I agree to Sora Sushi&rsquo;s <a href="#newsletter">Terms of Use</a> and
									<a href="#newsletter">Privacy Policy</a>.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== AWARDS ============================== -->
			<section class="page-section padding-md">
				<div class="container container--lg">
					<div class="content-blocks text-center">
						<div class="content-blocks__block"><span class="section-eyebrow">Accolades</span></div>
						<div class="content-blocks__block"><h2 class="section-title">Award of Excellence Winner</h2></div>
						<div class="content-blocks__block">
							<div class="award-badges" role="list">
								{#each ['2023', '2024', '2025', '2026'] as year}
									<div class="award-badge" role="listitem">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true">
											<path d="M7 3h10c0 5-1.6 8.5-5 8.5S7 8 7 3Z" />
											<path d="M12 11.5V19M8.5 20.5h7" />
										</svg>
										<span class="award-year">{year}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="content-blocks__block">
							<div class="content-block__text">
								<p class="award-copy">
									Honored with the Award of Excellence since 2023 for one of the city&rsquo;s
									finest sake and wine programs.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- ============================== HOURS / LOCATION / CTAS ============================== -->
			<section class="page-section padding-sm" id="contact">
				<div class="container container--md">
					<div class="info-row">
						<div class="info-col">
							<div class="content-blocks text-left">
								<div class="content-blocks__block"><h2 class="h4 font-weight-light">Hours of Operation</h2></div>
								<div class="content-blocks__block">
									<div class="content-block__text">
										<p>Tuesday – Thursday 6PM-11PM<br />Friday – Saturday 6PM-12AM<br />Sunday 6PM-11PM</p>
									</div>
								</div>
							</div>
						</div>
						<div class="info-col">
							<div class="content-blocks text-left">
								<div class="content-blocks__block"><h2 class="h4 font-weight-light">Location</h2></div>
								<div class="content-blocks__block">
									<div class="content-block__text">
										<p>
											88 Bowery<br />New York, NY 10013<br />
											<a href="#contact" onclick={(e) => e.preventDefault()}>Get Directions</a><br />
											Tel: <a href="tel:212-555-0199">212.555.0199</a>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="info-col">
							<div class="content-blocks text-left">
								<div class="content-blocks__block">
									<div class="content-block__links info-links">
										<a class="btn btn-outline-light" href="#contact" onclick={(e) => e.preventDefault()}>Careers</a>
										<a class="btn btn-outline-light" href="#contact" onclick={(e) => e.preventDefault()}>Press Inquiries</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>

	<!-- ============================== FOOTER ============================== -->
	<footer class="site-footer">
		<div class="container container--lg">
			<div class="footer-row">
				<div class="f-col-logo">
					<div class="site-footer__logo"><a href="{base}/" rel="home"><SoraLogo /></a></div>
					<p class="footer-tagline">Modern Japanese kitchen &amp; sake bar.</p>
					<p class="footer-address">88 Bowery, New York, NY 10013<br />212.555.0199</p>
				</div>
				<div class="f-col-menu">
					<span class="footer-label">Visit</span>
					<ul>
						<li><button onclick={openReservation}>Reservations</button></li>
						<li><a href="#events">Private Events</a></li>
						<li><a href="#page-body">Delivery &amp; Pickup</a></li>
						<li><a href="#newsletter">Gift Cards</a></li>
					</ul>
				</div>
				<div class="f-col-menu">
					<span class="footer-label">Company</span>
					<ul>
						<li><a href="#contact">Careers</a></li>
						<li><a href="#contact">Press Inquiries</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</div>
				<div class="f-col-social">
					<span class="footer-label">Follow</span>
					<div class="site-footer__social">
						<a href="#contact" aria-label="Instagram" onclick={(e) => e.preventDefault()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><g fill="currentColor"><circle cx="12.145" cy="3.892" r="0.96" /><path d="M8,12c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S10.206,12,8,12z M8,6C6.897,6,6,6.897,6,8 s0.897,2,2,2s2-0.897,2-2S9.103,6,8,6z" /><path d="M12,16H4c-2.056,0-4-1.944-4-4V4c0-2.056,1.944-4,4-4h8c2.056,0,4,1.944,4,4v8C16,14.056,14.056,16,12,16z M4,2C3.065,2,2,3.065,2,4v8c0,0.953,1.047,2,2,2h8c0.935,0,2-1.065,2-2V4c0-0.935-1.065-2-2-2H4z" /></g></svg>
						</a>
						<a href="#contact" aria-label="Facebook" onclick={(e) => e.preventDefault()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="currentColor" d="M15.3,0H0.7C0.3,0,0,0.3,0,0.7v14.7C0,15.7,0.3,16,0.7,16H8v-5H6V8h2V6c0-2.1,1.2-3,3-3 c0.9,0,1.8,0,2,0v3h-1c-0.6,0-1,0.4-1,1v1h2.6L13,11h-2v5h4.3c0.4,0,0.7-0.3,0.7-0.7V0.7C16,0.3,15.7,0,15.3,0z" /></svg>
						</a>
						<a href="#newsletter" aria-label="Newsletter sign up">
							<svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M23.6.4a1.4 1.4 0 0 0-1.47-.32L1.03 8.02a1.39 1.39 0 0 0-.1 2.57l8.9 4.06 4.06 8.9a1.38 1.38 0 0 0 1.27.82h.06a1.38 1.38 0 0 0 1.24-.92L23.92 1.87A1.4 1.4 0 0 0 23.6.4zM10.35 13.65 3.29 10.4 19.7 4.3zm3.25 7.06L10.35 13.65 19.7 4.3z" /></svg>
						</a>
					</div>
				</div>
			</div>
			<div class="footer-legal">
				<p class="copyright">© 2026 Sora Sushi. All Rights Reserved.</p>
				<ul class="footer-links">
					<li><a href="#contact">Privacy</a></li>
					<li><a href="#contact">Terms</a></li>
					<li><a href="#contact">Accessibility</a></li>
					<li><a href="#contact">Your Privacy Choices</a></li>
				</ul>
			</div>
		</div>
	</footer>
</div>

<style>
	/* =====================================================================
	   Values transcribed from sake-no-hana.bundle.css (live venue skin).
	   --u replicates the live html font-size: 14px → 16px (≥992) → 18px (≥1600),
	   so rem-based dimensions track the live breakpoints exactly.
	   ===================================================================== */
	.sora {
		--u: 14px;
		--dark: #242526;
		--darker: #1e1d1c;
		--accent: #943122;
		--gold: #a79d64;
		--light: #f1efec;
		/* Apple-style system stack — renders SF Pro on Mac/iOS, Segoe/Roboto elsewhere */
		--btn-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		--body-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		--heading-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		--inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

		background: var(--dark);
		color: #fff;
		font-family: var(--body-font);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.65em;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	@media (min-width: 992px) {
		.sora { --u: 16px; }
	}
	@media (min-width: 1600px) {
		.sora { --u: 18px; }
	}

	.sora :where(p) { margin: 0 0 1rem; font-size: 16px; line-height: 1.65em; }
	.sr-only {
		position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
		overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
	}

	/* ---------- headings (Apple-style: semibold, tight tracking) ----------
	   text-transform/letter-spacing reset guards against the shared theme
	   tokens in app.css (h1,h2,h3 { text-transform:var(--h-transform) … }). */
	.sora h1, .sora h2, .sora h6 {
		margin: 0 0 0.5rem; color: #fff; line-height: 1.2;
		text-transform: none; letter-spacing: normal;
	}
	.h1, .h3, .h4, .h5 { font-family: var(--heading-font); }
	.h1 {
		font-size: clamp(34px, calc(var(--u) * 2.6), 48px); font-weight: 600;
		letter-spacing: -0.015em; line-height: 1.08;
	}
	.h3 { font-size: 28px; line-height: 1.25; font-weight: 600; letter-spacing: -0.01em; }
	.h4 {
		font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase;
		font-weight: 600; line-height: 1.5; color: rgba(255, 255, 255, 0.85);
	}
	.h5 { font-size: calc(var(--u) * 1.15); font-weight: 600; letter-spacing: -0.005em; }
	.sora h6 { font-size: calc(var(--u) * 0.9); font-family: var(--body-font); font-weight: 400; }
	.text-muted { color: #86868b !important; }
	.hero-sub {
		font-size: clamp(17px, calc(var(--u) * 1.2), 22px); font-weight: 400;
		color: rgba(255, 255, 255, 0.92); margin: 0 0 0.5rem; line-height: 1.4;
	}
	.hero-links { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 1.4rem; }

	/* ---------- buttons (Apple-style pills: thin border, sentence case) ---------- */
	.sora .btn {
		display: inline-block;
		font-family: var(--btn-font);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.3;
		letter-spacing: normal;
		text-transform: none;
		text-align: center;
		color: #fff;
		padding: 10px 22px;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 980px;
		cursor: pointer;
		white-space: nowrap;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
	}
	.sora .btn-light { color: #1d1d1f; background-color: var(--light); border-color: var(--light); }
	.sora .btn-light:hover { background-color: #ffffff; border-color: #ffffff; }
	.sora .btn-outline-light { color: var(--light); border-color: rgba(241, 239, 236, 0.75); background: transparent; }
	.sora .btn-outline-light:hover { color: #1d1d1f; background-color: var(--light); border-color: var(--light); }
	.sora .btn-block { display: block; width: 100%; }
	.sora .btn-sm { padding: 7px 16px; font-size: 13px; line-height: 1.3; }
	.my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
	.info-links { display: flex; flex-wrap: wrap; gap: 12px; }

	/* ---------- layout primitives ---------- */
	.container { width: 100%; padding: 0 1rem; margin: 0 auto; position: relative; z-index: 2; }
	.container--md { max-width: calc(var(--u) * 65); }
	.container--lg { max-width: calc(var(--u) * 90); }
	.container--fluid { max-width: none; padding: 0; }

	.page-section { position: relative; overflow: hidden; background: var(--dark); color: #fff; }
	.padding-none { padding: 0; }
	.padding-sm { padding: calc(var(--u) * 3) 0; }
	.padding-md { padding: calc(var(--u) * 7) 0; }
	.padding-lg { padding: calc(var(--u) * 5) 0; }
	@media (min-width: 992px) {
		.padding-lg { padding: calc(var(--u) * 10) 0; }
	}
	.ninety-percent-height { display: flex; flex-direction: column; justify-content: center; min-height: 92vh; }

	.content-blocks__block { margin: 0 0 1rem; }
	.content-blocks__block:first-of-type { margin-top: 0; }
	.content-blocks__block:last-of-type { margin-bottom: 0; }
	.text-center { text-align: center; }
	.text-left { text-align: left; }
	.content-block__text a { color: #fff; opacity: 0.6; text-decoration: none; }
	.content-block__text a:hover { text-decoration: underline; }
	.content-block__image { max-width: 100%; height: auto; display: inline-block; }

	/* ---------- navbar ---------- */
	.navbar {
		position: fixed; top: 0; left: 0; width: 100%; z-index: 8000;
		height: calc(var(--u) * 4);
		padding: 8px 1rem;
		display: flex; align-items: center;
		transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
		background: transparent;
	}
	.navbar.solid { background: rgba(36, 37, 38, 0.96); }
	.navbar.hidden { transform: translateY(-110%); }
	.navbar-inner {
		width: 100%; display: flex; align-items: center; justify-content: space-between;
		padding: 0 1rem;
	}
	.navbar-brand { color: #fff; margin-right: 1rem; }
	.navbar-brand a { color: inherit; display: inline-block; }
	.navbar-brand :global(svg) { max-width: 150px; width: 100%; height: auto; display: block; }
	@media (max-width: 767.98px) {
		.navbar-brand :global(svg) { max-width: 120px; }
	}
	.navbar-nav { display: flex; align-items: center; gap: clamp(1.2rem, 1.8vw, 2.2rem); }
	.nav-link {
		display: block;
		padding: 0.5rem 0;
		color: rgba(255, 255, 255, 0.9);
		font-family: var(--body-font);
		font-size: 14px;
		font-weight: 400;
		text-decoration: none;
		background: none; border: none; cursor: pointer;
		transition: color 0.2s ease;
	}
	.nav-link:hover { color: #fff; }
	.navbar-cta { margin-left: 0.25rem; align-self: center; }
	.navbar-cta .btn { color: #fff !important; border: 1px solid rgba(255, 255, 255, 0.8) !important; }
	.navbar-cta .btn:hover { background: rgba(255, 255, 255, 0.12); border-color: #fff !important; }
	.nav-dropdown { position: relative; }
	.dropdown-toggle::after {
		content: ''; display: inline-block; margin-left: 0.35em; vertical-align: 0.18em;
		border-top: 0.3em solid; border-right: 0.3em solid transparent; border-left: 0.3em solid transparent;
	}
	.dropdown-menu {
		position: absolute; top: 100%; left: 0; min-width: 10rem; padding: 0.5rem 0;
		background: var(--dark); display: none; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		border-radius: 14px; overflow: hidden;
	}
	.nav-dropdown:hover .dropdown-menu, .nav-dropdown:focus-within .dropdown-menu { display: block; }
	.dropdown-item {
		display: block; padding: 0.4rem 1.2rem; color: #fff; font-size: 15px;
		font-weight: 300; text-decoration: none; white-space: nowrap;
	}
	.dropdown-item:hover { color: hsla(0, 0%, 100%, 0.6); }
	.menu-toggle { display: none; color: #fff; background: none; border: none; cursor: pointer; }
	@media (max-width: 991.98px) {
		.navbar-nav { display: none; }
		.menu-toggle { display: block; }
	}

	/* ---------- hero ---------- */
	.page-section__background {
		position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
	}
	.page-section__background video {
		position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
	}
	.page-section__overlay {
		position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;
		background-image: linear-gradient(to top, #1d2020 0%, rgba(0, 0, 0, 0) 100%);
		background-color: #000; pointer-events: none;
	}
	.page-section__overlay::before, .page-section__overlay::after {
		content: ''; width: 35%; height: 100%; position: absolute; top: 0; opacity: 0.35;
		background-image: linear-gradient(to right, #1d2020 0%, rgba(29, 32, 32, 0) 100%);
	}
	.page-section__overlay::before { left: 0; }
	.page-section__overlay::after { right: 0; transform: rotate(180deg); }
	.page-header .content-blocks { padding: 1rem; }
	@media (min-width: 992px) {
		.page-header .content-blocks { padding: 1.5rem; }
	}
	.scroll-arrow-container {
		position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%); z-index: 3;
	}
	.scroll-arrow { color: #fff; display: block; animation: sora-bob 2.4s ease-in-out infinite; }
	.scroll-arrow svg { width: 34px; height: 20px; }
	@keyframes sora-bob {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(8px); }
	}
	@media (prefers-reduced-motion: reduce) {
		.scroll-arrow { animation: none; }
	}

	/* ---------- auto media carousel ---------- */
	.auto-media-carousel {
		margin: 0 auto; padding: 50px 0; max-width: 100%; overflow: hidden;
		position: relative;
	}
	.carousel-track {
		display: flex; gap: 20px; padding: 0 20px 0 0; will-change: transform; transition: none;
		overflow: visible; scroll-snap-type: none; cursor: default;
	}
	.auto-media-carousel .card {
		display: flex; flex-direction: column; align-items: flex-end; position: relative;
		flex: 0 0 auto;
		width: 25vw; height: 600px; border: 0; color: #fff; background: #c6c6c6;
		border-radius: 18px; overflow: hidden; padding: 20px;
		transition: all 0.35s ease-in-out;
	}
	@media (max-width: 1199.98px) { .auto-media-carousel .card { width: 35vw; height: 600px; } }
	@media (max-width: 991.98px) { .auto-media-carousel .card { width: 40vw; height: 500px; } }
	@media (max-width: 767.98px) { .auto-media-carousel .card { width: 55vw; height: 450px; } }
	.auto-media-carousel .card:hover { transform: translateY(-10px); }
	.auto-media-carousel .card .ig-link { position: relative; z-index: 10; color: #fff; }
	.auto-media-carousel .card .ig-link svg {
		width: 45px; height: 45px; fill: #fff;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.4));
	}
	.media-container { width: 100%; height: 100%; position: absolute; inset: 0; margin: auto; }
	.media-container img, .media-container video {
		object-fit: cover; width: 100%; height: 100%; transition: all 0.35s ease-in-out;
	}
	.auto-media-carousel .card:hover .media-container img,
	.auto-media-carousel .card:hover .media-container video { width: 102%; height: 102%; }

	.carousel-btn {
		position: absolute; top: 8px; border: none; border-radius: 32px; cursor: pointer;
		z-index: 100; width: 32px; height: 32px; background: transparent; opacity: 0.5;
		transition: opacity 0.35s ease-in-out; color: #fff; padding: 6px;
		transform: none; backdrop-filter: none; -webkit-backdrop-filter: none;
	}
	.carousel-btn svg { fill: #fff; width: 100%; height: 100%; display: block; }
	.carousel-btn:hover { opacity: 1; background: transparent; }
	.carousel-btn.prev { right: 9rem; left: auto; }
	.carousel-btn.next { right: 6rem; left: auto; }
	.play-pause {
		background: transparent; border: 2px solid #fff; border-radius: 30px; padding: 5px;
		position: absolute; top: 8px; right: 2rem; width: 30px; height: 30px; opacity: 0.8;
	}
	.play-pause.playing::before, .play-pause.playing::after {
		content: ''; position: absolute; background: #fff; top: 0; bottom: 0; margin: auto;
		width: 2px; height: 12px;
	}
	.play-pause.playing::before { left: 9px; }
	.play-pause.playing::after { right: 9px; }
	.play-pause.paused::before {
		content: ''; position: absolute; left: 10px; top: 6px;
		border-left: 9px solid #fff; border-top: 6px solid transparent; border-bottom: 6px solid transparent;
		width: 0; height: 0; background: none;
	}
	.video-toggle {
		position: absolute; bottom: 1rem; right: 1rem; z-index: 100; width: 32px; height: 32px;
		border: 2px solid #fff; border-radius: 50%; background: rgba(0, 0, 0, 0.4); cursor: pointer;
		transition: all 0.2s ease;
	}
	.video-toggle.playing::before, .video-toggle.playing::after {
		content: ''; position: absolute; background: #fff; top: 8px; bottom: 8px; width: 3px;
	}
	.video-toggle.playing::before { left: 10px; }
	.video-toggle.playing::after { right: 10px; }
	.video-toggle.paused::before {
		content: ''; position: absolute; left: 11px; top: 8px;
		border-left: 10px solid #fff; border-top: 6px solid transparent; border-bottom: 6px solid transparent;
	}

	/* ---------- feature rows (red accent panel + photo, equal height) ----------
	   max-width/padding resets guard against app.css's shared `.feature` rule. */
	.feature {
		display: grid; grid-template-columns: 1fr; max-width: none; padding: 0; margin: 0; gap: 0;
		border-radius: 24px; overflow: hidden;
	}
	@media (min-width: 992px) {
		.feature { grid-template-columns: 1fr 1fr; min-height: 520px; }
		.feature--reverse .feature-panel { order: 2; }
		.feature--reverse .feature-media { order: 1; }
	}
	.feature-panel {
		background: var(--accent); color: #fff;
		display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
		padding: clamp(2.5rem, 5vw, 4.5rem);
	}
	.feature-eyebrow {
		font-family: var(--heading-font); font-weight: 600;
		font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
		color: rgba(241, 239, 236, 0.72); margin-bottom: 0.9rem;
	}
	.feature-title {
		font-family: var(--heading-font); font-weight: 600;
		font-size: clamp(26px, 2vw, 34px); line-height: 1.15; letter-spacing: -0.01em;
		margin: 0 0 1rem;
	}
	.feature-body {
		font-size: 16px; line-height: 1.75; max-width: 46ch;
		color: rgba(255, 255, 255, 0.92); margin: 0 0 1.8rem;
	}
	.feature-btn { align-self: flex-start; padding: 12px 32px; }
	.feature-media { overflow: hidden; min-height: 320px; }
	.feature-media img {
		width: 100%; height: 100%; object-fit: cover; display: block;
		transition: transform 1.2s ease;
	}
	.feature:hover .feature-media img { transform: scale(1.04); }

	/* ---------- featured branded locations ---------- */
	.featured-slider-wrapper { position: relative; }
	.featured-slider { overflow: hidden; position: relative; }
	.slider-track { display: flex; will-change: transform; }
	.carousel-cell { flex: 0 0 auto; text-align: left; }
	.carousel-cell a { text-decoration: none; color: #fff; display: block; }
	.carousel-media {
		width: 300px; height: 0; padding-bottom: 110%; margin-right: 15px;
		position: relative; overflow: hidden; border-radius: 18px;
	}
	@media (max-width: 991.98px) { .carousel-media { width: 230px; } }
	@media (max-width: 767.98px) { .carousel-media { width: 160px; } }
	.carousel-media img {
		width: 100%; height: 100%; position: absolute; top: 50%; left: 50%;
		transform: translate(-50%, -50%) scale(1); object-fit: cover;
		transition: all 0.35s ease-in-out;
	}
	.carousel-cell a:hover .carousel-media img { transform: translate(-50%, -50%) scale(1.03); }
	.carousel-content { width: 95%; max-width: 285px; white-space: normal; padding-top: 0.5rem; }
	@media (max-width: 991.98px) { .carousel-content { max-width: 220px; } }
	.carousel-content .h5 { margin: 1rem 0 0; }
	.carousel-content h6 { margin: 0; }
	.flickity-btn {
		position: absolute; top: 44%; transform: translateY(-50%); width: 44px; height: 44px;
		background: none; border: none; color: #fff; cursor: pointer; z-index: 5; padding: 10px;
	}
	.flickity-btn svg { fill: #fff; width: 100%; height: 100%; display: block; }
	.flickity-btn.previous { left: 0; }
	.flickity-btn.next { right: 0; }
	.featured-slider-pause {
		display: flex; position: absolute; bottom: 16px; right: 16px; z-index: 10;
		width: 36px; height: 36px; border-radius: 50%; border: none;
		background: rgba(0, 0, 0, 0.6); color: #fff; cursor: pointer;
		align-items: center; justify-content: center; transition: background 0.2s ease-in-out;
	}
	.featured-slider-pause:hover { background: rgba(0, 0, 0, 0.9); }

	/* ---------- section eyebrow / title (mailing list + awards) ---------- */
	.page-section--alt { background: var(--darker); }
	.section-eyebrow {
		display: inline-block; font-family: var(--heading-font); font-weight: 600;
		font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
		color: var(--gold); margin-bottom: 0.35rem;
	}
	.section-title {
		font-family: var(--heading-font); font-weight: 600;
		font-size: clamp(24px, 1.9vw, 32px); line-height: 1.2; margin: 0 0 1.5rem;
		text-transform: none; letter-spacing: -0.01em;
	}

	/* ---------- mailing list ---------- */
	.mailchimp-form { color: #fff; max-width: 34rem; margin: 0 auto; }
	.mailchimp-form form { display: flex; align-items: stretch; gap: 12px; }
	.mailchimp-form input {
		flex: 1; width: 100%; outline: none;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 980px;
		font-size: 15px; font-weight: 400; color: #fff;
		font-family: var(--body-font); padding: 10px 20px;
		transition: border-color 0.2s ease, background 0.2s ease;
	}
	.mailchimp-form input:focus { border-color: var(--gold); background: rgba(255, 255, 255, 0.09); }
	.mailchimp-form input::placeholder { color: rgba(255, 255, 255, 0.55); }
	.subscribe-btn { flex: none; padding: 10px 26px; }
	.subscribed-msg { font-size: calc(var(--u) * 1.3); font-weight: 300; padding: 0.75rem; margin: 0; }
	.consent { margin-top: 1.4rem; }
	.consent p { font-size: 12.5px; color: rgba(255, 255, 255, 0.55); }
	.consent a { color: rgba(255, 255, 255, 0.75); }
	@media (max-width: 575.98px) {
		.mailchimp-form form { flex-direction: column; align-items: stretch; }
	}

	/* ---------- awards ---------- */
	.award-badges {
		display: flex; justify-content: center; flex-wrap: wrap;
		gap: clamp(1rem, 2.5vw, 2rem); margin: 0.6rem 0 1.8rem;
	}
	.award-badge {
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		gap: 0.5rem; width: 104px; padding: 1.15rem 0 0.9rem;
		border: 1px solid rgba(167, 157, 100, 0.45); border-radius: 16px; color: var(--gold);
	}
	.award-badge svg { width: 26px; height: 26px; }
	.award-year {
		font-family: var(--heading-font); font-weight: 600; font-size: 17px;
		letter-spacing: 0.5px; color: #fff;
	}
	.award-copy { color: rgba(255, 255, 255, 0.75); max-width: 52ch; margin: 0 auto; }

	/* ---------- hours / location / ctas ---------- */
	.info-row { display: flex; flex-wrap: wrap; }
	.info-col { flex: 0 0 100%; max-width: 100%; margin-bottom: 1.5rem; }
	.info-col p { color: #fff; font-size: 16px; line-height: 1.65em; }
	@media (min-width: 992px) {
		.info-col { flex: 0 0 33.3333%; max-width: 33.3333%; }
	}

	/* ---------- venue footer ---------- */
	.site-footer {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: calc(var(--u) * 4.5) 0 calc(var(--u) * 3.5);
		background-color: var(--dark);
		color: #fff;
		font-family: var(--body-font);
	}
	.footer-row {
		display: grid; grid-template-columns: 1fr; gap: 2.25rem;
		text-align: center; justify-items: center;
	}
	@media (min-width: 768px) {
		.footer-row {
			grid-template-columns: 1.6fr 1fr 1fr 0.9fr; gap: 2rem;
			text-align: left; justify-items: start;
		}
	}
	.site-footer__logo { max-width: 200px; color: #fff; }
	.site-footer__logo :global(svg) { width: 100%; height: auto; display: block; }
	.footer-address {
		margin: 0.6rem 0 0; font-size: 13px; line-height: 1.9;
		color: rgba(255, 255, 255, 0.55);
	}
	.footer-label {
		display: block; font-family: var(--heading-font); font-weight: 600;
		font-size: 11.5px; letter-spacing: 1.5px; text-transform: uppercase;
		color: var(--gold); margin-bottom: 1rem;
	}
	.f-col-menu ul { list-style: none; margin: 0; padding: 0; }
	.f-col-menu li { line-height: 2.3; }
	.f-col-menu a, .f-col-menu button {
		font-size: 14px; color: rgba(255, 255, 255, 0.78); font-weight: 400; text-decoration: none;
		background: none; border: none; padding: 0; cursor: pointer; font-family: inherit;
		transition: color 0.2s ease;
	}
	.f-col-menu a:hover, .f-col-menu button:hover { color: #fff; }
	.site-footer__social { display: flex; gap: 0.75rem; justify-content: center; }
	@media (min-width: 768px) {
		.site-footer__social { justify-content: flex-start; }
	}
	.site-footer__social a {
		display: flex; align-items: center; justify-content: center;
		width: 38px; height: 38px; border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.25); color: #fff;
		transition: border-color 0.2s ease, background 0.2s ease;
	}
	.site-footer__social a:hover { border-color: #fff; background: rgba(255, 255, 255, 0.08); }

	/* ---------- footer legal row ---------- */
	.footer-tagline {
		margin: 1.3rem 0 0; font-size: 14px; line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
	}
	.footer-legal {
		margin-top: calc(var(--u) * 3.5); padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		display: flex; flex-direction: column; gap: 0.75rem;
		align-items: center; text-align: center;
	}
	@media (min-width: 992px) {
		.footer-legal { flex-direction: row; justify-content: space-between; text-align: left; }
	}
	.copyright {
		font-size: 0.75rem; font-size: calc(var(--u) * 0.75); line-height: 1.4;
		color: rgba(255, 255, 255, 0.6);
		margin: 0; letter-spacing: normal; text-align: inherit;
	}
	.footer-links {
		list-style: none; display: flex; flex-wrap: wrap; justify-content: center;
		margin: 0; padding: 0; gap: 0.35rem 1.25rem;
	}
	.footer-links li { margin: 0; }
	.footer-links a {
		color: rgba(255, 255, 255, 0.6); font-size: calc(var(--u) * 0.75); line-height: 1.4;
		text-decoration: none; letter-spacing: normal; transition: color 0.2s ease;
	}
	.footer-links a:hover { color: #fff; }
</style>
