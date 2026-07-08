<script>
	// BENTO THEME — dedicated component tree (like the editorial & illustrative
	// themes). Art direction: Apple-Store-style modular bento. A light system
	// (#f5f5f7) of rounded tiles on a 12-col rail, mixing compartments of
	// different sizes — a cinematic hero, a signature photo/brand/stat mosaic,
	// split feature tiles, location tiles and a connect block. Everything is
	// namespaced bt-* so app.css primitives (.btn/.section/.eyebrow…) can't leak
	// in; only the shared reservation modal + style switcher live outside.
	import { openReservation } from '$lib/reservation.svelte.js';
	import { reveal, scrolled } from '$lib/actions.js';
	import {
		BRAND,
		NAV_LINKS,
		HERO,
		FEATURE_A,
		FEATURE_B,
		LOCATIONS,
		AWARDS,
		HOURS,
		LOCATION,
		GALLERY
	} from '$lib/content.js';

	/* ---------- nav ---------- */
	let navOpen = $state(false);
	const closeNav = () => (navOpen = false);

	/* ---------- hero video (poster fades to video once playable) ---------- */
	let videoReady = $state(false);

	/* ---------- newsletter ---------- */
	let email = $state('');
	let error = $state('');
	let subscribed = $state(false);
	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	function subscribe(e) {
		e.preventDefault();
		if (!EMAIL.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		error = '';
		subscribed = true;
	}

	/* ---------- curated media for the mosaic ---------- */
	const platter = GALLERY.find((g) => g.alt === 'Sushi platter');
	const hamachi = GALLERY.find((g) => g.alt === 'Hamachi crudo');
	const barset = GALLERY.find((g) => g.alt?.startsWith('Bar set'));
	const room = GALLERY.find((g) => g.alt === 'Private dining');
</script>

<div class="bt-page">
	<!-- ============================== HEADER ============================== -->
	<header class="bt-header" id="top" class:nav-open={navOpen} use:scrolled>
		<div class="bt-header-inner">
			<a href="#top" class="bt-wordmark" onclick={closeNav}>{BRAND}</a>
			<nav class="bt-nav" aria-label="Primary">
				{#each NAV_LINKS as link}
					<a href={link.href} onclick={closeNav}>{link.label}</a>
				{/each}
				<a class="bt-nav-utility" href="#newsletter" onclick={closeNav}>Delivery &amp; Pickup</a>
				<button class="bt-btn bt-btn-primary bt-btn-sm" onclick={() => { openReservation(); closeNav(); }}>
					Reserve
				</button>
			</nav>
			<button
				class="bt-hamburger"
				aria-label="Toggle menu"
				aria-expanded={navOpen}
				onclick={() => (navOpen = !navOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</header>

	<main class="bt-main">
		<!-- ============================== HERO ============================== -->
		<section class="bt-hero" aria-label="Welcome">
			<div class="bt-hero-media">
				<img src={HERO.poster} alt="{BRAND} dining room" />
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
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
			<div class="bt-hero-body">
				<p class="bt-eyebrow bt-on-dark">{HERO.eyebrow}</p>
				<h1 class="bt-hero-title">{BRAND}</h1>
				<p class="bt-hero-lead">
					A modern Japanese kitchen on the Lower East Side — robata, temaki and seasonal
					sashimi. Tokyo soul, city nights.
				</p>
				<div class="bt-hero-cta">
					<button class="bt-btn bt-btn-light" onclick={openReservation}>Make a Reservation</button>
					<a href="#menu" class="bt-btn bt-btn-blur">View the Menu</a>
				</div>
			</div>
			<a href="#gallery" class="bt-scroll" aria-label="Scroll to gallery">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
			</a>
		</section>

		<!-- ============================== SIGNATURE MOSAIC ============================== -->
		<section class="bt-block" id="gallery" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">From the Pass</p>
				<h2 class="bt-title">A taste of Sora</h2>
			</div>

			<div class="bt-mosaic">
				<figure class="bt-tile bt-photo big">
					<img src={platter.src} alt={platter.alt} loading="lazy" />
					<figcaption class="bt-chip">The omakase platter</figcaption>
				</figure>

				<div class="bt-tile bt-brand">
					<span class="bt-brand-mark" aria-hidden="true">
						<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="20" cy="20" r="15" opacity=".5" />
							<path d="M8 24c5-3 8-3 12 0s7 3 12 0" />
							<path d="M20 9v22" opacity=".5" />
						</svg>
					</span>
					<div class="bt-brand-text">
						<span class="bt-brand-name">{BRAND}</span>
						<span class="bt-brand-sub">— New York City —</span>
					</div>
				</div>

				<figure class="bt-tile bt-photo h">
					<img src={hamachi.src} alt={hamachi.alt} loading="lazy" />
				</figure>
				<figure class="bt-tile bt-photo b">
					<img src={barset.src} alt={barset.alt} loading="lazy" />
				</figure>

				<div class="bt-tile bt-note">
					<p class="bt-note-body">Tradition and invention, at the same table — centuries of technique, a menu made for sharing.</p>
					<a href="#menu" class="bt-link">Our story <span aria-hidden="true">›</span></a>
				</div>

				<div class="bt-tile bt-stat">
					<span class="bt-stat-num">12</span>
					<span class="bt-stat-label">course omakase, nightly</span>
				</div>

				<figure class="bt-tile bt-photo d">
					<img src={room.src} alt={room.alt} loading="lazy" />
				</figure>
			</div>
		</section>

		<!-- ============================== FEATURES ============================== -->
		<section class="bt-features" use:reveal>
			<!-- Menu — full-bleed photo tile -->
			<article class="bt-feat" id="menu">
				<img class="bt-feat-bg" src={FEATURE_A.img} alt={FEATURE_A.alt} loading="lazy" />
				<div class="bt-feat-overlay">
					<p class="bt-eyebrow bt-on-dark">{FEATURE_A.eyebrow}</p>
					<h2 class="bt-feat-title">{FEATURE_A.title}</h2>
					<p class="bt-feat-body bt-on-dark">{FEATURE_A.body}</p>
					<a href="#gallery" class="bt-btn bt-btn-light bt-btn-sm">{FEATURE_A.cta}</a>
				</div>
			</article>

			<!-- Events — full-bleed photo tile -->
			<article class="bt-feat" id="events">
				<img class="bt-feat-bg" src={FEATURE_B.img} alt={FEATURE_B.alt} loading="lazy" />
				<div class="bt-feat-overlay">
					<p class="bt-eyebrow bt-on-dark">{FEATURE_B.eyebrow}</p>
					<h2 class="bt-feat-title">{FEATURE_B.title}</h2>
					<p class="bt-feat-body bt-on-dark">{FEATURE_B.body}</p>
					<button class="bt-btn bt-btn-light bt-btn-sm" onclick={openReservation}>{FEATURE_B.cta}</button>
				</div>
			</article>
		</section>

		<!-- ============================== LOCATIONS ============================== -->
		<section class="bt-block" id="locations" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">Our World</p>
				<h2 class="bt-title">Featured locations</h2>
			</div>
			<div class="bt-locs">
				{#each LOCATIONS.slice(0, 3) as loc}
					<article class="bt-tile bt-loc">
						<img src={loc.src} alt={loc.name} loading="lazy" />
						<div class="bt-loc-meta">
							<h3>{loc.name}</h3>
							<span>{loc.city}</span>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ============================== CONNECT ============================== -->
		<section class="bt-connect" use:reveal>
			<!-- Newsletter (tall, colored) -->
			<div class="bt-tile bt-news" id="newsletter">
				{#if subscribed}
					<div class="bt-news-done">
						<span class="bt-check" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7" /></svg>
						</span>
						<h2 class="bt-news-title">You’re on the list</h2>
						<p class="bt-news-sub">Watch your inbox for seasonal menus, sake dinners and members’ nights.</p>
					</div>
				{:else}
					<div class="bt-news-top">
						<p class="bt-eyebrow bt-on-dark">Stay in touch</p>
						<h2 class="bt-news-title">Join our mailing list</h2>
						<p class="bt-news-sub">Be first to know about seasonal menus, sake dinners and members’ nights.</p>
					</div>
					<form class="bt-news-form" onsubmit={subscribe} novalidate>
						<input type="email" bind:value={email} placeholder="Email address" aria-label="Email address" />
						<button type="submit" class="bt-btn bt-btn-light">Sign Up</button>
					</form>
					<p class="bt-news-consent">
						{#if error}<span class="bt-err">{error}</span>{:else}By signing up, you agree to {BRAND}’s Terms of Use and Privacy Policy.{/if}
					</p>
				{/if}
			</div>

			<!-- Awards -->
			<div class="bt-tile bt-awards">
				<span class="bt-medal" aria-hidden="true">
					<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 27 L11.5 44 L24 36.5 L36.5 44 L31 27" />
						<circle cx="24" cy="18" r="12.5" />
						<path d="M24 11.5l2 4.1 4.5.6-3.3 3.1.8 4.5-4-2.2-4 2.2.8-4.5-3.3-3.1 4.5-.6z" fill="currentColor" stroke="none" />
					</svg>
				</span>
				<h3 class="bt-awards-title">{AWARDS.title}</h3>
				<p class="bt-awards-body">{AWARDS.body}</p>
				<div class="bt-award-years">
					{#each AWARDS.years as year}
						<span class="bt-award-year">{year}</span>
					{/each}
				</div>
			</div>

			<!-- Contact / hours — full-width info bar -->
			<div class="bt-tile bt-contact" id="contact">
				<div class="bt-contact-block">
					<span class="bt-contact-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
					</span>
					<div class="bt-contact-body">
						<h4>Hours</h4>
						<ul class="bt-hours">
							{#each HOURS as line}
								<li><span class="bt-hours-day">{line.split(' · ')[0]}</span><span class="bt-hours-time">{line.split(' · ')[1]}</span></li>
							{/each}
						</ul>
					</div>
				</div>
				<div class="bt-contact-block">
					<span class="bt-contact-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5-6 8-9.5 8-13a8 8 0 1 0-16 0c0 3.5 3 7 8 13z" /><circle cx="12" cy="9" r="2.6" /></svg>
					</span>
					<div class="bt-contact-body">
						<h4>Find us</h4>
						<p>{LOCATION.address[0]}<br />{LOCATION.address[1]}</p>
						<div class="bt-contact-links">
							<a class="bt-link-accent" href="#locations">Get directions</a>
							<a class="bt-link-accent" href={`tel:${LOCATION.phone.replace(/\./g, '')}`}>{LOCATION.phone}</a>
						</div>
					</div>
				</div>
				<div class="bt-contact-cta">
					<p>A table awaits.</p>
					<button class="bt-btn bt-btn-primary" onclick={openReservation}>Make a Reservation</button>
				</div>
			</div>
		</section>
	</main>

	<!-- ============================== FOOTER ============================== -->
	<footer class="bt-footer">
	  <div class="bt-footer-card">
		<div class="bt-footer-inner">
			<div class="bt-footer-brand">
				<a href="#top" class="bt-wordmark">{BRAND}</a>
				<p>A modern high-end Japanese restaurant in Lower Manhattan. Tokyo soul, city nights.</p>
				<div class="bt-footer-social">
					<a href="#contact" aria-label="Instagram" onclick={(e) => e.preventDefault()}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
					</a>
					<a href="#contact" aria-label="Facebook" onclick={(e) => e.preventDefault()}>
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l.5-3H13V9c0-.9.3-1.5 1.6-1.5H16.5V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H7v3h3v8h3z" /></svg>
					</a>
				</div>
			</div>
			<nav class="bt-footer-links" aria-label="Footer">
				<div class="bt-footer-col">
					<span class="bt-footer-label">Visit</span>
					<a href="#" onclick={(e) => e.preventDefault()}>Reservations</a>
					<a href="#events">Special Events</a>
					<a href="#newsletter">Delivery &amp; Pickup</a>
					<a href="#" onclick={(e) => e.preventDefault()}>Gift Cards</a>
				</div>
				<div class="bt-footer-col">
					<span class="bt-footer-label">Company</span>
					<a href="#" onclick={(e) => e.preventDefault()}>Careers</a>
					<a href="#" onclick={(e) => e.preventDefault()}>Press Inquiries</a>
					<a href="#contact">Contact</a>
					<a href="#" onclick={(e) => e.preventDefault()}>Rewards</a>
				</div>
			</nav>
		</div>
		<div class="bt-footer-legal">
			<span>© 2026 Sora Restaurant Group. Demo site — not a real restaurant.</span>
			<div class="bt-legal-links">
				<a href="#" onclick={(e) => e.preventDefault()}>Privacy</a>
				<a href="#" onclick={(e) => e.preventDefault()}>Terms</a>
				<a href="#" onclick={(e) => e.preventDefault()}>Your Privacy Choices</a>
			</div>
		</div>
	  </div>
	</footer>
</div>

<style>
	/* =====================================================================
	   BENTO — scoped design system. Everything namespaced bt-* so app.css
	   primitives can't leak in. Apple-Store-inspired: light gray field,
	   rounded tiles, tight sans-serif type, one vermilion accent, pill CTAs.
	   ===================================================================== */
	.bt-page {
		--bg: #f5f5f7;
		--tile: #ffffff;
		--ink: #1d1d1f;
		--soft: #5f5f63;
		--faint: #86868b;
		--line: rgba(0, 0, 0, 0.08);
		--line-strong: rgba(0, 0, 0, 0.14);
		/* single brand accent — vermilion / lacquer red */
		--accent: #c22f27;
		--accent-deep: #97211a;
		--dark: #1d1d1f;

		--r: 20px;
		--r-lg: 28px;
		--r-sm: 14px;
		--pill: 980px;
		--gap: clamp(12px, 1.15vw, 16px);
		--maxw: 1240px;
		--rail: clamp(16px, 4vw, 40px);
		--nav-h: 58px;
		--ease: cubic-bezier(0.22, 0.61, 0.36, 1);

		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
		color: var(--ink);
		background: var(--bg);
		font-size: 16px;
		line-height: 1.55;
		-webkit-font-smoothing: antialiased;
		letter-spacing: -0.01em;
	}
	.bt-page :global([id]) {
		scroll-margin-top: 84px;
	}
	.bt-page a:focus-visible,
	.bt-page button:focus-visible,
	.bt-page input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	/* ---------- shared type ---------- */
	.bt-eyebrow {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: none;
		color: var(--accent);
		margin: 0 0 10px;
	}
	.bt-eyebrow.bt-on-dark {
		color: rgba(255, 255, 255, 0.85);
	}
	.bt-title {
		font-size: clamp(26px, 3.2vw, 40px);
		font-weight: 650;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0;
	}
	.bt-head {
		margin: 0 0 clamp(18px, 2vw, 26px);
	}

	/* ---------- buttons ---------- */
	.bt-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4em;
		font-size: 15px;
		font-weight: 500;
		letter-spacing: -0.01em;
		padding: 11px 22px;
		border-radius: var(--pill);
		border: 1px solid transparent;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background-color 0.22s var(--ease),
			color 0.22s var(--ease),
			border-color 0.22s var(--ease),
			transform 0.22s var(--ease);
	}
	.bt-btn:active {
		transform: scale(0.97);
	}
	.bt-btn-sm {
		font-size: 14px;
		padding: 8px 16px;
	}
	.bt-btn-block {
		width: 100%;
	}
	.bt-btn-primary {
		background: var(--accent);
		color: #fff;
	}
	.bt-btn-primary:hover {
		background: var(--accent-deep);
	}
	.bt-btn-light {
		background: #fff;
		color: var(--ink);
	}
	.bt-btn-light:hover {
		background: rgba(255, 255, 255, 0.85);
	}
	.bt-btn-blur {
		background: rgba(255, 255, 255, 0.14);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.bt-btn-blur:hover {
		background: rgba(255, 255, 255, 0.24);
	}

	/* ---------- text links ---------- */
	.bt-link {
		display: inline-flex;
		align-items: baseline;
		gap: 4px;
		font-size: 15px;
		font-weight: 500;
		color: var(--ink);
		transition: gap 0.2s var(--ease);
	}
	.bt-link span {
		transition: transform 0.2s var(--ease);
	}
	.bt-link:hover span {
		transform: translateX(3px);
	}
	.bt-link-accent {
		color: var(--accent);
	}
	.bt-link-accent:hover {
		text-decoration: underline;
	}

	/* ---------- tile primitive ---------- */
	.bt-tile {
		background: var(--tile);
		border-radius: var(--r);
		border: 1px solid var(--line);
		overflow: hidden;
		position: relative;
	}

	/* ================================================================
	   HEADER
	   ================================================================ */
	.bt-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 900;
		height: var(--nav-h);
		display: flex;
		align-items: center;
		background: color-mix(in srgb, var(--bg) 72%, transparent);
		backdrop-filter: saturate(1.4) blur(18px);
		-webkit-backdrop-filter: saturate(1.4) blur(18px);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.3s var(--ease),
			border-color 0.3s var(--ease);
	}
	.bt-header:global(.scrolled) {
		border-color: var(--line);
	}
	.bt-header-inner {
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 0 var(--rail);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}
	.bt-wordmark {
		font-size: 19px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	.bt-nav {
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.8vw, 28px);
	}
	.bt-nav a:not(.bt-btn) {
		font-size: 14px;
		font-weight: 450;
		color: var(--ink);
		opacity: 0.82;
		transition:
			opacity 0.2s,
			color 0.2s;
	}
	.bt-nav a:not(.bt-btn):hover {
		opacity: 1;
		color: var(--accent);
	}
	.bt-nav-utility {
		opacity: 0.5 !important;
	}
	.bt-hamburger {
		display: none;
		width: 42px;
		height: 42px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
	.bt-hamburger span {
		display: block;
		width: 20px;
		height: 1.5px;
		background: var(--ink);
		border-radius: 2px;
		transition:
			transform 0.3s var(--ease),
			opacity 0.3s;
	}
	.nav-open .bt-hamburger span:nth-child(1) {
		transform: translateY(6.5px) rotate(45deg);
	}
	.nav-open .bt-hamburger span:nth-child(2) {
		opacity: 0;
	}
	.nav-open .bt-hamburger span:nth-child(3) {
		transform: translateY(-6.5px) rotate(-45deg);
	}

	/* ================================================================
	   LAYOUT SHELL
	   ================================================================ */
	.bt-main {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: calc(var(--nav-h) + var(--gap)) var(--rail) 0;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}
	.bt-page :global(.reveal) {
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.7s var(--ease),
			transform 0.7s var(--ease);
	}
	.bt-page :global(.reveal.in) {
		opacity: 1;
		transform: none;
	}

	/* ================================================================
	   HERO
	   ================================================================ */
	.bt-hero {
		position: relative;
		min-height: clamp(520px, 66vh, 720px);
		border-radius: var(--r-lg);
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		color: #fff;
		isolation: isolate;
	}
	.bt-hero-media {
		position: absolute;
		inset: 0;
		z-index: -1;
	}
	.bt-hero-media img,
	.bt-hero-media video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.bt-hero-media video {
		opacity: 0;
		transition: opacity 1s var(--ease);
	}
	.bt-hero-media video.ready {
		opacity: 1;
	}
	.bt-hero-media::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(200deg, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.72) 100%);
	}
	.bt-hero-body {
		position: relative;
		padding: clamp(28px, 5vw, 64px);
		max-width: 760px;
	}
	.bt-hero-title {
		font-size: clamp(52px, 9vw, 118px);
		font-weight: 700;
		letter-spacing: -0.045em;
		line-height: 0.94;
		margin: 0 0 20px;
	}
	.bt-hero-lead {
		font-size: clamp(16px, 1.5vw, 20px);
		font-weight: 400;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.92);
		max-width: 44ch;
		margin: 0 0 28px;
	}
	.bt-hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.bt-scroll {
		position: absolute;
		bottom: 22px;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.85);
	}
	.bt-scroll svg {
		width: 26px;
		height: 26px;
		animation: bt-bob 2.4s var(--ease) infinite;
	}
	@keyframes bt-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(7px);
		}
	}

	/* ================================================================
	   SIGNATURE MOSAIC
	   ================================================================ */
	.bt-mosaic {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: clamp(150px, 15.5vw, 196px);
		gap: var(--gap);
	}
	.bt-mosaic .big {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
	}
	.bt-brand {
		grid-column: 3 / 5;
		grid-row: 1;
	}
	.bt-mosaic .h {
		grid-column: 3;
		grid-row: 2;
	}
	.bt-mosaic .b {
		grid-column: 4;
		grid-row: 2;
	}
	.bt-note {
		grid-column: 1 / 3;
		grid-row: 3;
	}
	.bt-stat {
		grid-column: 3;
		grid-row: 3;
	}
	.bt-mosaic .d {
		grid-column: 4;
		grid-row: 3;
	}

	/* photo tiles */
	.bt-photo,
	.bt-loc,
	.bt-feat {
		transition:
			box-shadow 0.35s var(--ease),
			transform 0.35s var(--ease);
	}
	.bt-photo:hover,
	.bt-loc:hover,
	.bt-feat:hover {
		box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.4);
		transform: translateY(-3px);
	}
	.bt-photo {
		margin: 0;
	}
	.bt-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s var(--ease);
	}
	.bt-photo:hover img {
		transform: scale(1.05);
	}
	.bt-chip {
		position: absolute;
		left: 14px;
		bottom: 14px;
		padding: 6px 12px;
		font-size: 13px;
		font-weight: 500;
		color: #fff;
		background: rgba(0, 0, 0, 0.42);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-radius: var(--pill);
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.3s var(--ease),
			transform 0.3s var(--ease);
	}
	.bt-photo.big:hover .bt-chip {
		opacity: 1;
		transform: none;
	}

	/* brand tile */
	.bt-brand {
		background: linear-gradient(150deg, var(--accent), var(--accent-deep));
		color: #fff;
		border-color: transparent;
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 0 clamp(20px, 3vw, 34px);
	}
	.bt-brand-mark {
		width: 52px;
		height: 52px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.16);
		color: #fff;
	}
	.bt-brand-mark svg {
		width: 30px;
		height: 30px;
	}
	.bt-brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
	}
	.bt-brand-name {
		font-size: clamp(22px, 2.4vw, 30px);
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.bt-brand-sub {
		font-size: 14px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.78);
		letter-spacing: 0.04em;
	}

	/* editorial note tile */
	.bt-note {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(20px, 2.4vw, 30px);
	}
	.bt-note-body {
		font-size: clamp(17px, 1.7vw, 22px);
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.28;
		color: var(--ink);
		margin: 0;
	}

	/* stat tile */
	.bt-stat {
		background: var(--dark);
		color: #fff;
		border-color: transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(18px, 2vw, 26px);
	}
	.bt-stat-num {
		font-size: clamp(46px, 5.5vw, 68px);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.bt-stat-label {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.7);
		margin-top: 6px;
	}

	/* ================================================================
	   FEATURES
	   ================================================================ */
	.bt-features {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}
	.bt-feat {
		border-radius: var(--r);
		overflow: hidden;
		min-height: clamp(400px, 42vw, 500px);
		position: relative;
		color: #fff;
	}
	.bt-feat-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.bt-feat:hover .bt-feat-bg {
		transform: scale(1.05);
	}
	.bt-feat-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		padding: clamp(28px, 3vw, 44px);
		background: linear-gradient(
			5deg,
			rgba(0, 0, 0, 0.85) 2%,
			rgba(0, 0, 0, 0.5) 38%,
			rgba(0, 0, 0, 0.08) 74%,
			transparent 100%
		);
	}
	.bt-feat-title {
		font-size: clamp(26px, 2.9vw, 38px);
		font-weight: 650;
		letter-spacing: -0.03em;
		line-height: 1.06;
		margin: 0 0 12px;
	}
	.bt-feat-body {
		font-size: 15.5px;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.86);
		max-width: 42ch;
		margin: 0 0 22px;
	}

	/* ================================================================
	   LOCATIONS
	   ================================================================ */
	.bt-locs {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
	}
	.bt-loc {
		aspect-ratio: 4 / 3.4;
		color: #fff;
	}
	.bt-loc img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s var(--ease);
	}
	.bt-loc:hover img {
		transform: scale(1.05);
	}
	.bt-loc-meta {
		position: absolute;
		inset: auto 0 0 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.68), transparent);
	}
	.bt-loc-meta h3 {
		font-size: 19px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	.bt-loc-meta span {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.78);
	}

	/* ================================================================
	   CONNECT
	   ================================================================ */
	.bt-connect {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto auto;
		gap: var(--gap);
	}
	.bt-news {
		grid-column: 1 / 8;
		grid-row: 1;
		background: linear-gradient(155deg, var(--accent), var(--accent-deep));
		color: #fff;
		border-color: transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(18px, 2.2vw, 26px);
		padding: clamp(30px, 3.6vw, 48px);
	}
	.bt-news-title {
		font-size: clamp(26px, 3vw, 40px);
		font-weight: 650;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0 0 12px;
	}
	.bt-news-sub {
		font-size: 16px;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.85);
		max-width: 40ch;
		margin: 0;
	}
	.bt-news-form {
		display: flex;
		gap: 10px;
	}
	.bt-news-form input {
		flex: 1;
		min-width: 0;
		padding: 13px 18px;
		border-radius: var(--pill);
		border: 1px solid rgba(255, 255, 255, 0.45);
		background: rgba(255, 255, 255, 0.16);
		color: #fff;
		font-size: 15px;
		transition:
			background-color 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}
	.bt-news-form input::placeholder {
		color: rgba(255, 255, 255, 0.78);
	}
	.bt-news-form input:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.24);
		border-color: rgba(255, 255, 255, 0.85);
	}
	.bt-news-form .bt-btn-light {
		color: var(--accent-deep);
	}
	.bt-news-consent {
		font-size: 12.5px;
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.68);
		margin: 0;
	}
	.bt-err {
		color: #ffe0dc;
		font-weight: 500;
	}
	.bt-news-done {
		margin: auto 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}
	.bt-check {
		width: 46px;
		height: 46px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
	}
	.bt-check svg {
		width: 24px;
		height: 24px;
	}

	.bt-awards {
		grid-column: 8 / 13;
		grid-row: 1;
		padding: clamp(24px, 2.6vw, 34px);
		display: flex;
		flex-direction: column;
	}
	.bt-medal {
		width: 46px;
		height: 46px;
		color: var(--accent);
		margin-bottom: 16px;
	}
	.bt-medal svg {
		width: 100%;
		height: 100%;
	}
	.bt-awards-title {
		font-size: clamp(19px, 2vw, 24px);
		font-weight: 650;
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin: 0 0 10px;
	}
	.bt-awards-body {
		font-size: 15px;
		line-height: 1.5;
		color: var(--soft);
		margin: 0;
	}
	.bt-award-years {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: auto;
		padding-top: 20px;
	}
	.bt-award-year {
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		padding: 5px 12px;
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		border-radius: var(--pill);
	}

	.bt-contact {
		grid-column: 1 / 13;
		grid-row: 2;
		padding: clamp(26px, 2.8vw, 38px) clamp(28px, 3.2vw, 44px);
		display: grid;
		grid-template-columns: auto auto 1fr;
		gap: clamp(28px, 4vw, 72px);
		align-items: center;
	}
	.bt-contact-block {
		display: flex;
		gap: 14px;
		align-items: flex-start;
	}
	.bt-contact-icon {
		width: 38px;
		height: 38px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		color: var(--accent);
	}
	.bt-contact-icon svg {
		width: 19px;
		height: 19px;
	}
	.bt-contact-body h4 {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--faint);
		margin: 0 0 10px;
	}
	.bt-hours {
		list-style: none;
		min-width: 216px;
	}
	.bt-hours li {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		font-size: 14px;
		padding: 3px 0;
	}
	.bt-hours-day {
		color: var(--soft);
		white-space: nowrap;
	}
	.bt-hours-time {
		color: var(--ink);
		font-weight: 500;
		white-space: nowrap;
	}
	.bt-contact-body p {
		font-size: 14.5px;
		line-height: 1.5;
		color: var(--ink);
		margin: 0 0 8px;
	}
	.bt-contact-links {
		display: flex;
		flex-direction: column;
		gap: 3px;
		align-items: flex-start;
	}
	.bt-contact-links a {
		font-size: 14.5px;
	}
	.bt-contact-cta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		justify-self: end;
	}
	.bt-contact-cta p {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0;
	}

	/* ================================================================
	   FOOTER
	   ================================================================ */
	.bt-footer {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: var(--gap) var(--rail) clamp(24px, 5vw, 44px);
	}
	.bt-footer-card {
		background: var(--tile);
		border: 1px solid var(--line);
		border-radius: var(--r-lg);
		padding: clamp(30px, 4vw, 52px) clamp(26px, 3.4vw, 48px) clamp(26px, 3vw, 40px);
	}
	.bt-footer-inner {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		gap: clamp(28px, 4vw, 60px);
	}
	.bt-footer-brand p {
		font-size: 14px;
		color: var(--soft);
		max-width: 32ch;
		margin: 12px 0 16px;
		line-height: 1.5;
	}
	.bt-footer-brand .bt-wordmark {
		font-size: 20px;
	}
	.bt-footer-social {
		display: flex;
		gap: 10px;
	}
	.bt-footer-social a {
		width: 38px;
		height: 38px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		color: var(--soft);
		transition:
			color 0.2s,
			border-color 0.2s;
	}
	.bt-footer-social a:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
	.bt-footer-social svg {
		width: 18px;
		height: 18px;
	}
	.bt-footer-links {
		display: contents;
	}
	.bt-footer-col {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.bt-footer-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--faint);
		margin-bottom: 2px;
	}
	.bt-footer-col a {
		font-size: 14px;
		color: var(--soft);
		transition: color 0.2s;
	}
	.bt-footer-col a:hover {
		color: var(--accent);
	}
	.bt-footer-legal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: clamp(28px, 4vw, 48px);
		padding-top: 20px;
		border-top: 1px solid var(--line);
		font-size: 12.5px;
		color: var(--faint);
	}
	.bt-legal-links {
		display: flex;
		gap: 20px;
	}
	.bt-legal-links a {
		color: var(--faint);
		transition: color 0.2s;
	}
	.bt-legal-links a:hover {
		color: var(--ink);
	}

	/* ================================================================
	   RESPONSIVE
	   ================================================================ */
	@media (max-width: 900px) {
		.bt-hamburger {
			display: flex;
		}
		.bt-nav {
			position: fixed;
			inset: 0 0 0 auto;
			width: min(82vw, 320px);
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			gap: 24px;
			padding: 80px 40px;
			background: color-mix(in srgb, var(--bg) 96%, transparent);
			backdrop-filter: blur(16px);
			-webkit-backdrop-filter: blur(16px);
			border-left: 1px solid var(--line);
			transform: translateX(100%);
			transition: transform 0.4s var(--ease);
			z-index: 850;
		}
		.nav-open .bt-nav {
			transform: none;
		}
		.bt-nav a:not(.bt-btn) {
			font-size: 17px;
		}
		.bt-features {
			grid-template-columns: 1fr;
		}
		.bt-connect {
			grid-template-columns: 1fr;
			grid-template-rows: none;
		}
		.bt-news,
		.bt-awards,
		.bt-contact {
			grid-column: 1;
			grid-row: auto;
		}
		.bt-contact {
			grid-template-columns: 1fr;
			gap: 24px;
			align-items: stretch;
		}
		.bt-contact-cta {
			justify-self: stretch;
		}
		.bt-contact-cta .bt-btn {
			width: 100%;
		}
	}
	@media (max-width: 680px) {
		.bt-mosaic {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: clamp(140px, 34vw, 180px);
		}
		.bt-mosaic .big {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
		.bt-brand {
			grid-column: 1 / 3;
			grid-row: 3;
		}
		.bt-mosaic .h {
			grid-column: 1;
			grid-row: 4;
		}
		.bt-mosaic .b {
			grid-column: 2;
			grid-row: 4;
		}
		.bt-note {
			grid-column: 1 / 3;
			grid-row: 5;
		}
		.bt-stat {
			grid-column: 1;
			grid-row: 6;
		}
		.bt-mosaic .d {
			grid-column: 2;
			grid-row: 6;
		}
		.bt-locs {
			grid-template-columns: 1fr;
		}
		.bt-footer-inner {
			grid-template-columns: 1fr 1fr;
		}
		.bt-footer-brand {
			grid-column: 1 / -1;
		}
		.bt-hero-cta {
			flex-direction: column;
			align-items: stretch;
			width: 100%;
			max-width: 300px;
		}
	}
</style>
