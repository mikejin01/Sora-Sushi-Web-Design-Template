<script>
	// ILLUSTRATIVE THEME — dedicated component tree (like the editorial theme).
	// Art direction: modern Japanese print / storybook — washi-paper grain,
	// seigaiha wave bands, hand-drawn stroke motifs (crane, ginkgo, lanterns),
	// a red hanko seal, polaroid gallery, postcard locations and handwritten
	// Caveat annotations. All styles are scoped; only the shared reservation
	// modal + style switcher (app.css tokens) live outside this file.
	import { onMount } from 'svelte';
	import { openReservation } from '$lib/reservation.svelte.js';
	import { reveal, scrolled } from '$lib/actions.js';
	import {
		BRAND,
		NAV_LINKS,
		HERO,
		GALLERY,
		ABOUT,
		FEATURE_A,
		FEATURE_B,
		LOCATIONS,
		AWARDS,
		HOURS,
		LOCATION
	} from '$lib/content.js';

	/* ---------- nav ---------- */
	let navOpen = $state(false);
	const closeNav = () => (navOpen = false);

	/* ---------- hero video (poster fades to video once playable) ---------- */
	let videoReady = $state(false);

	/* ---------- handwritten gallery captions (by GALLERY index) ---------- */
	const galleryNotes = [
		'the omakase platter',
		'hamachi crudo — a favorite',
		'happy hour, five to seven',
		'', // branded tile
		'sushi & sashimi sets',
		'the dining room',
		'the lantern room'
	];

	/* ---------- postcard stamps cycle through little motifs ---------- */
	const stampMotifs = ['torii', 'sun', 'ginkgo', 'wave', 'lantern'];

	/* ---------- drag-to-scroll rows (gallery + locations) ---------- */
	function dragScroll(node) {
		let down = false;
		let moved = 0;
		let startX = 0;
		let startLeft = 0;
		const pdown = (e) => {
			down = true;
			moved = 0;
			startX = e.clientX;
			startLeft = node.scrollLeft;
			node.classList.add('dragging');
		};
		const pmove = (e) => {
			if (!down) return;
			const dx = e.clientX - startX;
			moved += Math.abs(dx);
			node.scrollLeft = startLeft - dx;
		};
		const pup = () => {
			down = false;
			node.classList.remove('dragging');
		};
		const click = (e) => {
			if (moved > 8) {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		node.addEventListener('pointerdown', pdown);
		node.addEventListener('pointermove', pmove);
		node.addEventListener('pointerup', pup);
		node.addEventListener('pointerleave', pup);
		node.addEventListener('click', click, true);
		return {
			destroy() {
				node.removeEventListener('pointerdown', pdown);
				node.removeEventListener('pointermove', pmove);
				node.removeEventListener('pointerup', pup);
				node.removeEventListener('pointerleave', pup);
				node.removeEventListener('click', click, true);
			}
		};
	}
	let galleryTrack = $state(null);
	let locTrack = $state(null);
	function scrollRow(track, dir) {
		if (!track) return;
		const card = track.querySelector(':scope > *');
		const amount = card ? (card.getBoundingClientRect().width + 26) * 1.3 : 340;
		track.scrollBy({ left: dir * amount, behavior: 'smooth' });
	}

	/* ---------- newsletter ---------- */
	let email = $state('');
	let subscribed = $state(false);
	function subscribe(e) {
		e.preventDefault();
		if (email.trim()) subscribed = true;
	}

	onMount(() => () => {});
</script>

<!-- =============== reusable hand-drawn bits =============== -->
{#snippet seal(size = 64)}
	<svg
		class="il-seal-svg"
		width={size}
		height={size}
		viewBox="0 0 64 64"
		aria-hidden="true"
		focusable="false"
	>
		<rect x="3.5" y="3.5" width="57" height="57" rx="13" fill="#c25a3a" />
		<rect
			x="8"
			y="8"
			width="48"
			height="48"
			rx="9"
			fill="none"
			stroke="#f6eedd"
			stroke-opacity=".55"
			stroke-width="1.6"
			stroke-dasharray="3 4"
		/>
		<text
			x="32"
			y="45"
			font-size="32"
			text-anchor="middle"
			fill="#fbf5e7"
			font-family="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
			font-weight="600">空</text
		>
	</svg>
{/snippet}

{#snippet divider(prev, next)}
	<div class="il-divider" style="background:{prev};color:{next}" aria-hidden="true">
		<svg viewBox="0 0 1440 64" preserveAspectRatio="none" fill="currentColor">
			<path
				d="M0,36 C58,22 122,46 190,38 C258,30 300,12 372,18 C444,24 488,50 560,46 C632,42 676,18 748,20 C820,22 862,44 934,44 C1006,44 1050,22 1122,22 C1194,22 1240,42 1312,44 C1384,46 1414,32 1440,28 L1440,64 L0,64 Z"
			/>
		</svg>
	</div>
{/snippet}

{#snippet scribble()}
	<svg class="il-scribble" viewBox="0 0 220 14" aria-hidden="true" focusable="false">
		<path
			d="M4 9 C40 3 82 12 120 7 C152 3 188 9 216 5"
			fill="none"
			stroke="currentColor"
			stroke-width="5"
			stroke-linecap="round"
			opacity=".45"
		/>
	</svg>
{/snippet}

{#snippet arrow()}
	<svg class="il-arrow" viewBox="0 0 56 40" aria-hidden="true" focusable="false">
		<path
			d="M4 6 C14 26 30 34 46 30 M46 30 l-10 -1 M46 30 l-4 -9"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/snippet}

{#snippet ginkgo()}
	<svg viewBox="0 0 60 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M30 60 C30 52 30 46 30 38" />
		<path
			d="M30 38 C16 38 7 28 8 12 C16 19 23 20 29 15 L30 8 L31 15 C37 20 44 19 52 12 C53 28 44 38 30 38 Z"
			fill="currentColor"
			fill-opacity=".14"
		/>
	</svg>
{/snippet}

{#snippet crane()}
	<svg viewBox="0 0 120 96" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<!-- body sweep + neck -->
		<path d="M16 66 C28 64 36 56 44 46 C52 36 62 28 74 26 C82 25 90 27 95 32" />
		<!-- head + beak -->
		<path d="M95 32 C99 30 103 31 105 34" />
		<circle cx="98" cy="31.4" r="1.4" fill="currentColor" stroke="none" />
		<path d="M104 30 l12 -4 -9 8" />
		<!-- wings -->
		<path d="M40 50 C46 32 60 20 78 18" />
		<path d="M46 54 C52 42 62 34 74 32" />
		<!-- tail + legs -->
		<path d="M16 66 l-10 4 M18 70 l-8 8" />
		<path d="M48 60 l6 26 M58 56 l10 24" />
	</svg>
{/snippet}

{#snippet sprig()}
	<svg viewBox="0 0 48 84" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false">
		<path d="M24 80 C24 58 24 36 24 12" />
		<path d="M24 52 C14 50 8 42 8 30 M24 40 C34 38 40 30 40 19 M24 28 C17 26 13 20 12 11 M24 18 C31 17 35 11 36 4" />
	</svg>
{/snippet}

{#snippet fish()}
	<svg viewBox="0 0 80 42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M8 22 C18 10 44 7 62 17 C56 27 38 33 22 30 C14 28 10 26 8 22 Z" />
		<path d="M62 17 l14 -8 -4 12 4 8 -15 -6" />
		<circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none" />
		<path d="M26 13 C28 17 28 23 26 27" />
	</svg>
{/snippet}

{#snippet flame()}
	<svg viewBox="0 0 44 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M20 54 C8 44 8 30 17 18 C18 26 24 28 25 22 C33 30 34 42 28 50 C25 54 23 56 20 54 Z" />
		<path d="M20 44 C17 39 19 33 23 30 C23 35 27 37 25 42 C24 45 22 46 20 44 Z" />
	</svg>
{/snippet}

{#snippet temaki()}
	<svg viewBox="0 0 60 62" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M16 56 L38 12 L54 44 Z" />
		<path d="M24 40 L40 32 M22 48 L46 36" opacity=".55" />
		<path d="M38 12 C34 6 28 6 26 10 C24 6 18 7 18 13 C18 17 24 20 30 18" />
		<path d="M42 14 C46 10 50 12 50 16" />
	</svg>
{/snippet}

{#snippet sake()}
	<svg viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M28 14 C24 20 22 26 22 33 C22 41 24 48 25 54 L43 54 C44 48 46 41 46 33 C46 26 44 20 40 14 C40 10 38 8 34 8 C30 8 28 10 28 14 Z" />
		<path d="M26 26 L43 26" opacity=".55" />
		<path d="M56 44 C56 50 59 54 63 54 C67 54 70 50 70 44 Z" transform="translate(-6 0)" />
		<path d="M33 2 C34 4 33 5 34 6" opacity=".6" />
	</svg>
{/snippet}

{#snippet lanterns()}
	<svg class="il-lanterns" viewBox="0 0 560 96" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M0 14 C140 40 420 40 560 14" opacity=".7" />
		<g transform="translate(120 30)">
			<path d="M0 0 L0 6 M-12 6 L12 6" />
			<path d="M-14 6 C-18 16 -18 28 -14 38 C-8 42 8 42 14 38 C18 28 18 16 14 6 C8 2 -8 2 -14 6 Z" />
			<path d="M-15 16 L15 16 M-16 27 L16 27" opacity=".5" />
			<path d="M-8 40 L8 40 M0 40 L0 48" />
		</g>
		<g transform="translate(280 40)">
			<path d="M0 0 L0 6 M-12 6 L12 6" />
			<path d="M-14 6 C-18 16 -18 28 -14 38 C-8 42 8 42 14 38 C18 28 18 16 14 6 C8 2 -8 2 -14 6 Z" />
			<path d="M-15 16 L15 16 M-16 27 L16 27" opacity=".5" />
			<path d="M-8 40 L8 40 M0 40 L0 48" />
		</g>
		<g transform="translate(440 30)">
			<path d="M0 0 L0 6 M-12 6 L12 6" />
			<path d="M-14 6 C-18 16 -18 28 -14 38 C-8 42 8 42 14 38 C18 28 18 16 14 6 C8 2 -8 2 -14 6 Z" />
			<path d="M-15 16 L15 16 M-16 27 L16 27" opacity=".5" />
			<path d="M-8 40 L8 40 M0 40 L0 48" />
		</g>
	</svg>
{/snippet}

{#snippet nigiri()}
	<svg viewBox="0 0 88 56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M18 40 C18 32 30 28 42 28 C54 28 66 32 66 40 C66 46 55 49 42 49 C29 49 18 46 18 40 Z" />
		<path d="M12 32 C22 20 60 16 74 26 L69 35 C56 28 30 30 20 39 Z" fill="currentColor" fill-opacity=".14" />
		<path d="M30 26 L34 31 M44 23 L47 29 M58 23 L60 29" opacity=".55" />
	</svg>
{/snippet}

{#snippet chopsticks()}
	<svg viewBox="0 0 120 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false">
		<path d="M6 26 C40 18 76 12 114 8" />
		<path d="M8 34 C44 28 78 24 116 22" />
	</svg>
{/snippet}

{#snippet enso()}
	<svg class="il-enso" viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
		<path
			d="M120 22 C70 10 22 48 24 100 C26 152 74 186 124 176 C166 168 186 128 176 90 C168 60 144 40 116 38"
			stroke="currentColor"
			stroke-width="10"
			stroke-linecap="round"
			opacity=".9"
		/>
	</svg>
{/snippet}

{#snippet clockIcon()}
	<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" focusable="false">
		<path d="M32 6 C17 6 6 18 6 32 C6 47 18 58 32 58 C47 58 58 46 58 32 C58 18 47 6 33 6" />
		<path d="M32 16 L32 33 L43 39" />
		<path d="M32 8 L32 12 M56 32 L52 32 M32 56 L32 52 M8 32 L12 32" opacity=".5" />
	</svg>
{/snippet}

{#snippet pinIcon()}
	<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<path d="M32 58 C20 42 14 33 14 24 C14 14 22 6 32 6 C42 6 50 14 50 24 C50 33 44 42 32 58 Z" />
		<circle cx="32" cy="24" r="7" />
		<path d="M10 60 C24 56 40 56 54 60" opacity=".4" stroke-dasharray="2 5" />
	</svg>
{/snippet}

{#snippet doorIcon()}
	<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		<!-- noren curtain -->
		<path d="M8 12 C24 8 40 8 56 12" />
		<path d="M12 12 L12 46 M32 13 L32 50 M52 12 L52 46" />
		<path d="M12 46 C18 48 26 49 32 50 M32 50 C38 49 46 48 52 46" opacity=".55" />
		<circle cx="22" cy="30" r="4" opacity=".6" />
	</svg>
{/snippet}

{#snippet stampArt(kind)}
	<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
		{#if kind === 'torii'}
			<path d="M6 12 C16 9 24 9 34 12 M9 18 L31 18 M12 12 L12 34 M28 12 L28 34" />
		{:else if kind === 'sun'}
			<circle cx="20" cy="20" r="9" fill="currentColor" fill-opacity=".2" />
			<path d="M20 4 L20 8 M36 20 L32 20 M20 36 L20 32 M4 20 L8 20" opacity=".7" />
		{:else if kind === 'ginkgo'}
			<path d="M20 34 L20 24 M20 24 C12 24 7 18 8 9 C13 13 17 13 20 10 C23 13 27 13 32 9 C33 18 28 24 20 24 Z" />
		{:else if kind === 'wave'}
			<path d="M4 26 C9 20 14 20 18 26 M14 32 C19 26 24 26 28 32 M22 20 C27 14 32 14 36 20" />
		{:else}
			<path d="M20 6 L20 10 M12 10 L28 10 M11 10 C8 17 8 25 11 31 C16 34 24 34 29 31 C32 25 32 17 29 10 M10 18 L30 18" />
		{/if}
	</svg>
{/snippet}

{#snippet postmark()}
	<svg class="il-postmark" viewBox="0 0 80 44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false">
		<circle cx="22" cy="22" r="15" stroke-dasharray="3 4" />
		<path d="M44 14 C54 10 64 18 74 14 M44 22 C54 18 64 26 74 22 M44 30 C54 26 64 34 74 30" opacity=".7" />
	</svg>
{/snippet}

{#snippet medal(year)}
	<div class="il-medal">
		<svg viewBox="0 0 96 116" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
			<path d="M36 74 L26 106 L40 98 L48 112 L54 92" fill="#c25a3a" fill-opacity=".85" stroke="#8f3a20" stroke-width="1.6" />
			<path d="M60 74 L70 106 L56 98 L48 112" fill="#a84527" fill-opacity=".85" stroke="#8f3a20" stroke-width="1.6" />
			<circle cx="48" cy="44" r="36" fill="#fbf5e7" stroke="#2b2820" stroke-width="2" />
			<circle cx="48" cy="44" r="29" fill="none" stroke="#d8a24a" stroke-width="2" stroke-dasharray="1 6" />
			<path d="M48 12 l3 6 M76 32 l-6 3 M20 32 l6 3" stroke="#d8a24a" stroke-width="2" opacity=".8" />
		</svg>
		<span class="il-medal-year">{year}</span>
	</div>
{/snippet}

<div class="il-page">
	<!-- ============================== HEADER ============================== -->
	<header class="il-header" id="top" class:nav-open={navOpen} use:scrolled>
		<div class="il-header-inner">
			<a href="#top" class="il-brand" onclick={closeNav} aria-label="{BRAND} — top">
				{@render seal(38)}
				<span class="il-brand-text">
					<span class="il-wordmark">{BRAND}</span>
					<span class="il-brand-sub">modern japanese kitchen</span>
				</span>
			</a>
			<nav class="il-nav" aria-label="Primary">
				{#each NAV_LINKS as link}
					<a href={link.href} onclick={closeNav}>{link.label}</a>
				{/each}
				<a class="il-nav-utility" href="#newsletter" onclick={closeNav}>Delivery &amp; Pickup</a>
				<button
					class="il-btn il-btn-primary il-btn-sm"
					onclick={() => {
						openReservation();
						closeNav();
					}}>Reservations</button
				>
				<div class="il-nav-sprig" aria-hidden="true">{@render sprig()}</div>
			</nav>
			<button
				class="il-hamburger"
				aria-label="Toggle menu"
				aria-expanded={navOpen}
				onclick={() => (navOpen = !navOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</header>

	<main>
		<!-- ============================== HERO ============================== -->
		<section class="il-hero" id="hero">
			<div class="il-hero-inner">
				<div class="il-hero-copy">
					<p class="il-eyebrow"><span class="il-eyebrow-tick" aria-hidden="true">~</span> {HERO.eyebrow} <span class="il-eyebrow-tick" aria-hidden="true">~</span></p>
					<h1 class="il-hero-title">
						Tradition &amp; invention,
						<span class="il-hand-wrap">
							<span class="il-hand">at the same table</span>
							{@render scribble()}
						</span>
					</h1>
					<p class="il-hero-welcome">{HERO.welcome} — robata, temaki &amp; sashimi on the Lower East Side.</p>
					<div class="il-hero-cta">
						<button class="il-btn il-btn-primary" onclick={openReservation}>Make a Reservation</button>
						<a href="#menu" class="il-link-cta">
							View the menu
							{@render arrow()}
						</a>
					</div>
				</div>

				<div class="il-hero-art" aria-hidden="false">
					<div class="il-sun" aria-hidden="true"></div>
					<div class="il-hero-crane" aria-hidden="true">{@render crane()}</div>
					<div class="il-hero-leaf l1" aria-hidden="true">{@render ginkgo()}</div>
					<div class="il-hero-leaf l2" aria-hidden="true">{@render ginkgo()}</div>
					<div class="il-arch">
						<div class="il-arch-media">
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
						<div class="il-arch-seal" aria-hidden="true">{@render seal(72)}</div>
					</div>
					<p class="il-hero-caption">
						<span class="il-caption-arrow" aria-hidden="true">{@render arrow()}</span>
						the dining room, 88 Bowery
					</p>
				</div>
			</div>
			<a href="#gallery" class="il-scroll" aria-label="Scroll down to the gallery">
				<span class="il-hand">scroll</span>
				<svg viewBox="0 0 24 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 C11 10 12 18 12 26 M12 26 l-6 -7 M12 26 l6 -7" /></svg>
			</a>
		</section>

		{@render divider('var(--paper)', 'var(--paper-2)')}

		<!-- ============================== GALLERY ============================== -->
		<section class="il-section il-band-2 il-gallery" id="gallery" use:reveal>
			<div class="il-section-head">
				<p class="il-eyebrow">From the Pass</p>
				<h2 class="il-title">
					<span class="il-title-word">The Gallery {@render scribble()}</span>
				</h2>
				<p class="il-aside il-gallery-aside"><span class="il-hand">fresh, daily!</span></p>
			</div>
			<div class="il-row-wrap">
				<button class="il-row-btn prev" onclick={() => scrollRow(galleryTrack, -1)} aria-label="Previous gallery images">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19 C11 17 8 14 6 12 C8 10 11 7 15 5" /></svg>
				</button>
				<div class="il-row" bind:this={galleryTrack} use:dragScroll>
					{#each GALLERY as item, i}
						{#if item.branded}
							<figure class="il-polaroid il-polaroid-brand">
								<div class="il-brand-tile">
									{@render seal(88)}
									<span class="il-brand-tile-name">{BRAND}</span>
									<span class="il-hand il-brand-tile-sub">— new york city —</span>
								</div>
							</figure>
						{:else}
							<figure class="il-polaroid">
								<div class="il-polaroid-img"><img src={item.src} alt={item.alt} loading="lazy" /></div>
								<figcaption class="il-hand">{galleryNotes[i] ?? item.alt}</figcaption>
							</figure>
						{/if}
					{/each}
				</div>
				<button class="il-row-btn next" onclick={() => scrollRow(galleryTrack, 1)} aria-label="Next gallery images">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5 C13 7 16 10 18 12 C16 14 13 17 9 19" /></svg>
				</button>
			</div>
		</section>

		{@render divider('var(--paper-2)', 'var(--paper)')}

		<!-- ============================== ABOUT ============================== -->
		<section class="il-section il-about" use:reveal>
			<div class="il-about-enso" aria-hidden="true">{@render enso()}</div>
			<div class="il-about-inner">
				<p class="il-eyebrow">{ABOUT.eyebrow}</p>
				<p class="il-about-body">{ABOUT.body}</p>
				<ul class="il-pillars">
					<li>
						<span class="il-pillar-icon">{@render flame()}</span>
						<span class="il-hand">robata &amp; yakitori</span>
					</li>
					<li>
						<span class="il-pillar-icon">{@render temaki()}</span>
						<span class="il-hand">temaki, cut to order</span>
					</li>
					<li>
						<span class="il-pillar-icon">{@render fish()}</span>
						<span class="il-hand">seasonal sashimi</span>
					</li>
					<li>
						<span class="il-pillar-icon">{@render sake()}</span>
						<span class="il-hand">sake &amp; whiskies</span>
					</li>
				</ul>
				<button class="il-btn il-btn-primary" onclick={openReservation}>Make a Reservation</button>
			</div>
		</section>

		<!-- ============================== FEATURE A — MENU ============================== -->
		<section class="il-section il-feature" id={FEATURE_A.id} use:reveal>
			<div class="il-feature-inner">
				<div class="il-menu-card">
					<div class="il-menu-card-motif" aria-hidden="true">{@render chopsticks()}</div>
					<p class="il-eyebrow">{FEATURE_A.eyebrow}</p>
					<h2 class="il-title">{FEATURE_A.title}</h2>
					<p class="il-body">{FEATURE_A.body}</p>
					<ul class="il-menu-lines" aria-label="Sample menu items">
						<li><span>chef’s omakase, twelve courses</span><i></i><span>145</span></li>
						<li><span>nigiri set of nine</span><i></i><span>62</span></li>
						<li><span>sashimi moriawase</span><i></i><span>78</span></li>
					</ul>
					<a href="#gallery" class="il-btn">{FEATURE_A.cta}</a>
				</div>
				<div class="il-feature-art">
					<div class="il-plate">
						<div class="il-plate-media"><img src={FEATURE_A.img} alt={FEATURE_A.alt} loading="lazy" /></div>
						<div class="il-plate-sticker" aria-hidden="true">{@render nigiri()}</div>
					</div>
					<p class="il-hero-caption il-plate-caption">
						<span class="il-caption-arrow flip" aria-hidden="true">{@render arrow()}</span>
						fresh from Toyosu market
					</p>
				</div>
			</div>
		</section>

		{@render divider('var(--paper)', 'var(--pine)')}

		<!-- ============================== FEATURE B — EVENTS ============================== -->
		<section class="il-section il-band-pine il-events" id={FEATURE_B.id} use:reveal>
			<div class="il-events-lanterns" aria-hidden="true">{@render lanterns()}</div>
			<div class="il-feature-inner il-events-inner">
				<div class="il-events-art">
					<div class="il-frame-wobbly">
						<img src={FEATURE_B.img} alt={FEATURE_B.alt} loading="lazy" />
					</div>
					<p class="il-hand il-events-caption">lantern-lit rooms, upstairs</p>
				</div>
				<div class="il-events-copy">
					<p class="il-eyebrow il-eyebrow-gold">{FEATURE_B.eyebrow}</p>
					<h2 class="il-title">{FEATURE_B.title}</h2>
					<p class="il-body">{FEATURE_B.body}</p>
					<button class="il-btn il-btn-primary" onclick={openReservation}>{FEATURE_B.cta}</button>
				</div>
			</div>
		</section>

		{@render divider('var(--pine)', 'var(--paper)')}

		<!-- ============================== LOCATIONS ============================== -->
		<section class="il-section il-locations" id="locations" use:reveal>
			<div class="il-section-head">
				<p class="il-eyebrow">Sora, Around Town</p>
				<h2 class="il-title">
					<span class="il-title-word">Featured Locations {@render scribble()}</span>
				</h2>
				<p class="il-aside"><span class="il-hand">come say hi!</span></p>
			</div>
			<div class="il-row-wrap">
				<button class="il-row-btn prev" onclick={() => scrollRow(locTrack, -1)} aria-label="Previous locations">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19 C11 17 8 14 6 12 C8 10 11 7 15 5" /></svg>
				</button>
				<div class="il-row" bind:this={locTrack} use:dragScroll>
					{#each LOCATIONS as venue, i}
						<article class="il-postcard">
							<div class="il-postcard-stamp" aria-hidden="true">{@render stampArt(stampMotifs[i % stampMotifs.length])}</div>
							{@render postmark()}
							<div class="il-postcard-img"><img src={venue.src} alt={venue.name} loading="lazy" /></div>
							<div class="il-postcard-meta">
								<h3>{venue.name}</h3>
								<span class="il-hand">{venue.city}</span>
							</div>
						</article>
					{/each}
				</div>
				<button class="il-row-btn next" onclick={() => scrollRow(locTrack, 1)} aria-label="Next locations">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5 C13 7 16 10 18 12 C16 14 13 17 9 19" /></svg>
				</button>
			</div>
		</section>

		{@render divider('var(--paper)', 'var(--paper-2)')}

		<!-- ============================== NEWSLETTER ============================== -->
		<section class="il-section il-band-2 il-newsletter" id="newsletter" use:reveal>
			<div class="il-envelope">
				<div class="il-envelope-seal" aria-hidden="true">{@render seal(58)}</div>
				<p class="il-eyebrow">Stay in Touch</p>
				<h2 class="il-title">Join our Mailing List</h2>
				{#if subscribed}
					<p class="il-hand il-subscribed">arigatou — you’re on the list ♡</p>
				{:else}
					<form class="il-news-form" onsubmit={subscribe}>
						<input
							type="email"
							bind:value={email}
							placeholder="Email address"
							required
							aria-label="Email address"
						/>
						<button class="il-btn il-btn-primary">Subscribe</button>
					</form>
				{/if}
				<p class="il-consent">
					By signing up, I agree to {BRAND}’s <a href="#newsletter">Terms of Use</a> and
					<a href="#newsletter">Privacy Policy</a>.
				</p>
			</div>
		</section>

		{@render divider('var(--paper-2)', 'var(--paper)')}

		<!-- ============================== AWARDS ============================== -->
		<section class="il-section il-awards" use:reveal>
			<div class="il-section-head">
				<p class="il-eyebrow">Accolades</p>
				<h2 class="il-title">{AWARDS.title}</h2>
			</div>
			<div class="il-medals" role="list">
				{#each AWARDS.years as year}
					<div role="listitem">{@render medal(year)}</div>
				{/each}
			</div>
			<p class="il-awards-copy">{AWARDS.body}</p>
		</section>

		<!-- ============================== INFO / CONTACT ============================== -->
		<section class="il-section il-info" id="contact" use:reveal>
			<div class="il-info-grid">
				<div class="il-info-card">
					<span class="il-info-icon">{@render clockIcon()}</span>
					<h3 class="il-hand">hours</h3>
					<ul>
						{#each HOURS as line}
							<li>{line}</li>
						{/each}
					</ul>
				</div>
				<div class="il-info-card">
					<span class="il-info-icon">{@render pinIcon()}</span>
					<h3 class="il-hand">find us</h3>
					<p>
						{LOCATION.address[0]}<br />{LOCATION.address[1]}<br />
						<a class="il-inline" href="#contact" onclick={(e) => e.preventDefault()}>Get Directions</a><br />
						Tel: <a class="il-inline" href="tel:{LOCATION.phone.replaceAll('.', '-')}">{LOCATION.phone}</a>
					</p>
				</div>
				<div class="il-info-card">
					<span class="il-info-icon">{@render doorIcon()}</span>
					<h3 class="il-hand">come by</h3>
					<div class="il-info-actions">
						<button class="il-btn il-btn-primary il-btn-sm" onclick={openReservation}>Reservations</button>
						<a class="il-btn il-btn-sm" href="#contact" onclick={(e) => e.preventDefault()}>Careers</a>
						<a class="il-btn il-btn-sm" href="#contact" onclick={(e) => e.preventDefault()}>Press Inquiries</a>
					</div>
				</div>
			</div>
		</section>
	</main>

	{@render divider('var(--paper)', 'var(--ink)')}

	<!-- ============================== FOOTER ============================== -->
	<footer class="il-footer">
		<div class="il-footer-inner">
			<div class="il-footer-brand">
				{@render seal(56)}
				<span class="il-footer-wordmark">{BRAND}</span>
				<span class="il-hand il-footer-farewell">see you soon · またね</span>
				<p class="il-footer-address">
					{LOCATION.address.join(', ')}<br />{LOCATION.phone}
				</p>
			</div>
			<div class="il-footer-col">
				<span class="il-footer-label">Visit</span>
				<ul>
					<li><button onclick={openReservation}>Reservations</button></li>
					<li><a href="#events">Private Events</a></li>
					<li><a href="#newsletter">Delivery &amp; Pickup</a></li>
					<li><a href="#newsletter">Gift Cards</a></li>
				</ul>
			</div>
			<div class="il-footer-col">
				<span class="il-footer-label">Company</span>
				<ul>
					<li><a href="#contact">Careers</a></li>
					<li><a href="#contact">Press Inquiries</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</div>
			<div class="il-footer-col">
				<span class="il-footer-label">Follow</span>
				<div class="il-footer-social">
					<a href="#contact" aria-label="Instagram" onclick={(e) => e.preventDefault()}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
					</a>
					<a href="#contact" aria-label="Facebook" onclick={(e) => e.preventDefault()}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8.5 C14 7 15 6 16.5 6 H18 V3 h-2.5 C13 3 11 5 11 8 v3 H8 v3 h3 v7 h3 v-7 h3 l.5 -3 H14 Z" /></svg>
					</a>
					<a href="#newsletter" aria-label="Newsletter sign up">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12 L21 4 L15 21 L11 13 Z M11 13 L21 4" /></svg>
					</a>
				</div>
			</div>
		</div>
		<div class="il-footer-legal">
			<p>© 2026 {BRAND}. All Rights Reserved.</p>
			<ul>
				<li><a href="#contact">Privacy</a></li>
				<li><a href="#contact">Terms</a></li>
				<li><a href="#contact">Accessibility</a></li>
				<li><a href="#contact">Your Privacy Choices</a></li>
			</ul>
		</div>
	</footer>

	<div class="il-grain" aria-hidden="true"></div>
</div>

<style>
	/* =====================================================================
	   ILLUSTRATIVE — scoped design system. Everything is namespaced il-*
	   so app.css primitives (.btn/.section/.eyebrow…) can't leak in.
	   ===================================================================== */
	.il-page {
		--paper: #f6eedd;
		--paper-2: #eee1c6;
		--card: #fbf6e9;
		--ink: #2b2820;
		--ink-soft: #5c5647;
		--ink-faint: #8c8570;
		--ver: #c25a3a;
		--ver-deep: #a84527;
		--pine: #2e4034;
		--cream: #f3ead6;
		--gold: #d8a24a;
		--display: 'Playfair Display', serif;
		--body: 'EB Garamond', serif;
		--hand: 'Caveat', cursive;
		--ease: cubic-bezier(0.22, 0.61, 0.36, 1);
		--rail: clamp(20px, 4.5vw, 64px);
		--maxw: 1280px;
		--seigaiha: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 100 50'%3E%3Cpath d='M0 25a25 25 0 0 1 50 0M8 25a17 17 0 0 1 34 0M16 25a9 9 0 0 1 18 0M50 25a25 25 0 0 1 50 0M58 25a17 17 0 0 1 34 0M66 25a9 9 0 0 1 18 0M-25 50a25 25 0 0 1 50 0M-17 50a17 17 0 0 1 34 0M-9 50a9 9 0 0 1 18 0M25 50a25 25 0 0 1 50 0M33 50a17 17 0 0 1 34 0M41 50a9 9 0 0 1 18 0M75 50a25 25 0 0 1 50 0M83 50a17 17 0 0 1 34 0M91 50a9 9 0 0 1 18 0' fill='none' stroke='%232e4034' stroke-opacity='.12' stroke-width='1.3'/%3E%3C/svg%3E");

		font-family: var(--body);
		font-size: 17px;
		line-height: 1.65;
		color: var(--ink);
		background: var(--paper);
	}

	/* washi-paper grain over everything (very faint, print feel) */
	.il-grain {
		position: fixed;
		inset: 0;
		z-index: 3000;
		pointer-events: none;
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
	}

	.il-page :global(::selection) {
		background: rgba(216, 162, 74, 0.4);
	}
	.il-page a,
	.il-page button {
		border-radius: 4px;
	}
	.il-page a:focus-visible,
	.il-page button:focus-visible,
	.il-page input:focus-visible {
		outline: 2px dashed var(--ver);
		outline-offset: 3px;
	}

	/* ---------- shared type ---------- */
	.il-eyebrow {
		font-family: var(--body);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--ver);
		margin: 0 0 14px;
	}
	.il-eyebrow-tick {
		color: var(--gold);
		letter-spacing: 0;
	}
	.il-eyebrow-gold {
		color: var(--gold);
	}
	.il-title {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(34px, 4.4vw, 58px);
		line-height: 1.06;
		letter-spacing: 0;
		text-transform: none;
		margin: 0 0 18px;
		color: inherit;
	}
	.il-title-word {
		position: relative;
		display: inline-block;
	}
	.il-scribble {
		display: block;
		width: min(100%, 230px);
		height: 12px;
		color: var(--gold);
	}
	.il-title-word .il-scribble {
		position: absolute;
		left: 50%;
		bottom: -14px;
		transform: translateX(-50%);
	}
	.il-hand {
		font-family: var(--hand);
		font-weight: 600;
		letter-spacing: 0;
		text-transform: none;
	}
	.il-body {
		color: var(--ink-soft);
		font-size: 17.5px;
		max-width: 46ch;
		margin: 0 0 26px;
	}
	.il-section {
		padding: clamp(76px, 9.5vw, 128px) var(--rail);
		position: relative;
	}
	/* anchor-nav targets land clear of the fixed header */
	.il-hero,
	.il-page :global([id]) {
		scroll-margin-top: 92px;
	}
	.il-section-head {
		max-width: var(--maxw);
		margin: 0 auto;
		text-align: center;
		position: relative;
		padding-bottom: clamp(30px, 4vw, 48px);
	}
	.il-section-head .il-title {
		margin-bottom: 6px;
	}
	.il-aside {
		position: absolute;
		right: clamp(0px, 6vw, 90px);
		top: 8px;
		transform: rotate(6deg);
		color: var(--ver);
		font-size: clamp(20px, 2vw, 26px);
	}

	/* ---------- band backgrounds ---------- */
	.il-band-2 {
		background-color: var(--paper-2);
		background-image: var(--seigaiha);
	}
	.il-band-pine {
		background-color: var(--pine);
		color: var(--cream);
	}
	.il-divider {
		display: block;
		line-height: 0;
	}
	.il-divider svg {
		display: block;
		width: 100%;
		height: clamp(26px, 4.5vw, 58px);
	}

	/* ---------- buttons: hand-cut sticker style ---------- */
	.il-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		font-family: var(--body);
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--ink);
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 16px 10px 17px 9px / 10px 16px 9px 17px;
		padding: 12px 26px;
		box-shadow: 3px 4px 0 rgba(43, 40, 32, 0.2);
		cursor: pointer;
		white-space: nowrap;
		transition:
			transform 0.18s var(--ease),
			box-shadow 0.18s var(--ease),
			background-color 0.18s,
			color 0.18s;
	}
	.il-btn:hover {
		transform: translate(-1px, -2px) rotate(-0.4deg);
		box-shadow: 5px 7px 0 rgba(43, 40, 32, 0.22);
	}
	.il-btn:active {
		transform: translate(1px, 2px);
		box-shadow: 1px 1px 0 rgba(43, 40, 32, 0.25);
	}
	.il-btn-primary {
		background: var(--ver);
		color: #fdf8ec;
		border-color: var(--ver-deep);
		box-shadow: 3px 4px 0 rgba(143, 58, 32, 0.35);
	}
	.il-btn-primary:hover {
		background: var(--ver-deep);
		box-shadow: 5px 7px 0 rgba(143, 58, 32, 0.35);
	}
	.il-btn-sm {
		font-size: 15px;
		padding: 8px 18px;
	}

	/* ================================================================
	   HEADER
	   ================================================================ */
	.il-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 900;
		height: 78px;
		display: flex;
		align-items: center;
		background: color-mix(in srgb, var(--paper) 55%, transparent);
		border-bottom: 2px solid transparent;
		transition:
			background-color 0.35s var(--ease),
			border-color 0.35s,
			height 0.35s var(--ease),
			backdrop-filter 0.35s;
	}
	.il-header:global(.scrolled) {
		height: 64px;
		background: color-mix(in srgb, var(--paper) 88%, transparent);
		backdrop-filter: blur(12px) saturate(1.15);
		-webkit-backdrop-filter: blur(12px) saturate(1.15);
		border-color: rgba(43, 40, 32, 0.85);
	}
	.il-header-inner {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--rail);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}
	.il-brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		color: var(--ink);
		text-decoration: none;
	}
	.il-brand :global(.il-seal-svg) {
		transform: rotate(-6deg);
		filter: drop-shadow(1.5px 2px 0 rgba(43, 40, 32, 0.25));
		flex: none;
	}
	.il-brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}
	.il-wordmark {
		font-family: var(--display);
		font-weight: 700;
		font-size: 23px;
		letter-spacing: 0.02em;
	}
	.il-brand-sub {
		font-family: var(--hand);
		font-weight: 600;
		font-size: 15px;
		color: var(--ver);
	}
	.il-nav {
		display: flex;
		align-items: center;
		gap: clamp(14px, 2vw, 30px);
	}
	.il-nav a:not(.il-btn) {
		font-family: var(--body);
		font-size: 16.5px;
		font-weight: 500;
		color: var(--ink);
		opacity: 0.85;
		text-decoration: none;
		transition:
			opacity 0.2s,
			color 0.2s;
	}
	.il-nav a:not(.il-btn):hover {
		opacity: 1;
		color: var(--ver);
		text-decoration: underline wavy var(--ver) 1.5px;
		text-underline-offset: 6px;
	}
	.il-nav-utility {
		font-size: 14px !important;
		opacity: 0.55 !important;
	}
	.il-nav-sprig {
		display: none;
	}
	.il-hamburger {
		display: none;
		width: 44px;
		height: 44px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 6px;
		background: none;
		border: none;
		cursor: pointer;
	}
	.il-hamburger span {
		display: block;
		height: 2px;
		border-radius: 2px;
		background: var(--ink);
		transition:
			transform 0.3s var(--ease),
			opacity 0.3s;
	}
	/* uneven hand-drawn lines */
	.il-hamburger span:nth-child(1) {
		width: 24px;
		transform: rotate(-1.2deg);
	}
	.il-hamburger span:nth-child(2) {
		width: 19px;
		transform: rotate(0.8deg);
	}
	.il-hamburger span:nth-child(3) {
		width: 23px;
		transform: rotate(-0.6deg);
	}
	.nav-open .il-hamburger span:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}
	.nav-open .il-hamburger span:nth-child(2) {
		opacity: 0;
	}
	.nav-open .il-hamburger span:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	/* ================================================================
	   HERO
	   ================================================================ */
	.il-hero {
		min-height: 100svh;
		padding: calc(78px + clamp(28px, 5vh, 64px)) var(--rail) clamp(70px, 9vh, 110px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}
	.il-hero-inner {
		max-width: var(--maxw);
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(36px, 5vw, 80px);
	}
	.il-hero-copy .il-eyebrow {
		margin-bottom: 20px;
	}
	.il-hero-title {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(42px, 5.6vw, 78px);
		line-height: 1.04;
		letter-spacing: 0;
		text-transform: none;
		margin: 0 0 22px;
	}
	.il-hand-wrap {
		position: relative;
		display: inline-block;
	}
	.il-hero-title .il-hand {
		display: inline-block;
		font-size: 1.18em;
		color: var(--ver);
		transform: rotate(-2.5deg);
		padding: 0 0.08em;
	}
	.il-hand-wrap .il-scribble {
		position: absolute;
		left: 4%;
		bottom: -8px;
		width: 92%;
	}
	.il-hero-welcome {
		color: var(--ink-soft);
		font-size: clamp(17px, 1.6vw, 20px);
		max-width: 44ch;
		margin: 0 0 34px;
	}
	.il-hero-cta {
		display: flex;
		align-items: center;
		gap: 26px;
		flex-wrap: wrap;
	}
	.il-link-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 17px;
		font-weight: 600;
		font-style: italic;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: rgba(43, 40, 32, 0.35);
		text-underline-offset: 5px;
		transition: color 0.2s;
	}
	.il-link-cta:hover {
		color: var(--ver);
	}
	.il-arrow {
		width: 34px;
		height: 24px;
		color: var(--ver);
		flex: none;
	}

	/* --- hero art --- */
	.il-hero-art {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px 10px 0;
	}
	.il-sun {
		position: absolute;
		top: -6%;
		right: 4%;
		width: clamp(130px, 14vw, 200px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--gold);
		opacity: 0.85;
	}
	.il-sun::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 2px solid var(--ver);
		border-radius: 50%;
		transform: translate(7px, 6px);
		opacity: 0.55;
	}
	.il-hero-crane {
		position: absolute;
		top: -2%;
		left: -4%;
		width: clamp(90px, 9vw, 132px);
		color: var(--pine);
		animation: il-float 7s ease-in-out infinite alternate;
	}
	.il-hero-leaf {
		position: absolute;
		color: var(--gold);
		z-index: 3;
	}
	.il-hero-leaf.l1 {
		width: 44px;
		left: 2%;
		bottom: 22%;
		transform: rotate(-24deg);
		animation: il-float 6s 0.8s ease-in-out infinite alternate;
	}
	.il-hero-leaf.l2 {
		width: 30px;
		right: -2%;
		bottom: 34%;
		transform: rotate(18deg);
		color: var(--ver);
		opacity: 0.75;
		animation: il-float 5s 0.3s ease-in-out infinite alternate;
	}
	@keyframes il-float {
		from {
			translate: 0 -6px;
		}
		to {
			translate: 0 8px;
		}
	}
	.il-arch {
		position: relative;
		width: min(420px, 100%);
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 999px 999px 22px 22px;
		padding: 12px;
		box-shadow: 5px 7px 0 rgba(43, 40, 32, 0.16);
	}
	.il-arch::before {
		content: '';
		position: absolute;
		inset: -2px;
		border: 2px solid var(--ver);
		border-radius: inherit;
		transform: translate(10px, 12px);
		opacity: 0.35;
		z-index: -1;
		pointer-events: none;
	}
	.il-arch-media {
		position: relative;
		aspect-ratio: 4 / 5.1;
		border-radius: 999px 999px 13px 13px;
		overflow: hidden;
	}
	.il-arch-media img,
	.il-arch-media video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.il-arch-media video {
		opacity: 0;
		transition: opacity 0.9s ease;
	}
	.il-arch-media video.ready {
		opacity: 1;
	}
	.il-arch-seal {
		position: absolute;
		left: -22px;
		bottom: -16px;
		transform: rotate(-8deg);
		filter: drop-shadow(2px 3px 0 rgba(43, 40, 32, 0.25));
	}
	.il-hero-caption {
		margin: 18px 0 0 auto;
		display: flex;
		align-items: flex-end;
		gap: 6px;
		font-family: var(--hand);
		font-weight: 600;
		font-size: clamp(19px, 1.8vw, 24px);
		color: var(--ink-soft);
		transform: rotate(-1.5deg);
	}
	.il-caption-arrow {
		display: inline-block;
		width: 34px;
		color: var(--ink-faint);
		transform: scaleY(-1) rotate(18deg);
	}
	.il-caption-arrow.flip {
		transform: scaleX(-1) scaleY(-1) rotate(-6deg);
	}
	.il-caption-arrow :global(svg) {
		width: 100%;
	}
	.il-scroll {
		position: absolute;
		bottom: 22px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		color: var(--ink-soft);
		text-decoration: none;
		font-size: 20px;
	}
	.il-scroll svg {
		width: 20px;
		height: 26px;
		animation: il-bob 2.4s var(--ease) infinite;
	}
	@keyframes il-bob {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 8px;
		}
	}

	/* ================================================================
	   GALLERY — polaroids on a seigaiha band
	   ================================================================ */
	.il-gallery-aside {
		right: clamp(10px, 8vw, 140px);
	}
	.il-row-wrap {
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
	}
	.il-row {
		display: flex;
		gap: clamp(20px, 2.4vw, 30px);
		overflow-x: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
		padding: 26px 6px 30px;
		cursor: grab;
	}
	.il-row::-webkit-scrollbar {
		display: none;
	}
	.il-row:global(.dragging) {
		cursor: grabbing;
		scroll-behavior: auto;
	}
	.il-row-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 5;
		width: 50px;
		height: 50px;
		border-radius: 45% 55% 52% 48% / 55% 48% 52% 45%;
		background: var(--card);
		border: 2px solid var(--ink);
		color: var(--ink);
		box-shadow: 2.5px 3.5px 0 rgba(43, 40, 32, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background-color 0.2s,
			color 0.2s,
			transform 0.2s;
	}
	.il-row-btn:hover {
		background: var(--ver);
		border-color: var(--ver-deep);
		color: #fdf8ec;
		transform: translateY(-50%) scale(1.06);
	}
	.il-row-btn svg {
		width: 22px;
		height: 22px;
	}
	.il-row-btn.prev {
		left: -6px;
	}
	.il-row-btn.next {
		right: -6px;
	}

	.il-polaroid {
		flex: 0 0 clamp(230px, 24vw, 310px);
		background: var(--card);
		border: 1.5px solid rgba(43, 40, 32, 0.85);
		border-radius: 6px;
		padding: 11px 11px 0;
		box-shadow: 4px 6px 0 rgba(43, 40, 32, 0.14);
		position: relative;
		margin: 0;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}
	.il-polaroid:nth-child(odd) {
		transform: rotate(-1.7deg);
	}
	.il-polaroid:nth-child(even) {
		transform: rotate(1.4deg) translateY(6px);
	}
	.il-polaroid:hover {
		transform: rotate(0deg) translateY(-8px);
		box-shadow: 6px 12px 0 rgba(43, 40, 32, 0.16);
		z-index: 2;
	}
	/* washi tape */
	.il-polaroid::before {
		content: '';
		position: absolute;
		top: -12px;
		left: 50%;
		width: 86px;
		height: 24px;
		transform: translateX(-50%) rotate(-3deg) skewX(-6deg);
		background: rgba(216, 162, 74, 0.5);
		border-left: 1px dashed rgba(43, 40, 32, 0.25);
		border-right: 1px dashed rgba(43, 40, 32, 0.25);
		z-index: 3;
	}
	.il-polaroid:nth-child(even)::before {
		transform: translateX(-50%) rotate(2.5deg) skewX(5deg);
		background: rgba(194, 90, 58, 0.35);
	}
	.il-polaroid-img {
		aspect-ratio: 4 / 4.6;
		overflow: hidden;
		border-radius: 3px;
		border: 1px solid rgba(43, 40, 32, 0.25);
	}
	.il-polaroid-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.il-polaroid:hover .il-polaroid-img img {
		transform: scale(1.05);
	}
	.il-polaroid figcaption {
		text-align: center;
		font-size: clamp(19px, 1.8vw, 23px);
		color: var(--ink-soft);
		padding: 10px 4px 14px;
		line-height: 1.2;
	}
	.il-polaroid-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 11px;
		background: var(--pine);
		border-color: var(--pine);
	}
	.il-brand-tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		text-align: center;
		padding: 20px 10px;
	}
	.il-brand-tile :global(.il-seal-svg) {
		transform: rotate(-5deg);
	}
	.il-brand-tile-name {
		font-family: var(--display);
		font-weight: 700;
		font-size: 26px;
		color: var(--cream);
	}
	.il-brand-tile-sub {
		font-size: 21px;
		color: var(--gold);
	}

	/* ================================================================
	   ABOUT
	   ================================================================ */
	.il-about {
		text-align: center;
	}
	.il-about-enso {
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(640px, 92vw);
		transform: translate(-50%, -52%);
		color: var(--pine);
		opacity: 0.06;
		pointer-events: none;
	}
	.il-enso {
		width: 100%;
		height: auto;
	}
	.il-about-inner {
		position: relative;
		max-width: 840px;
		margin: 0 auto;
	}
	.il-about .il-eyebrow {
		display: block;
		margin-bottom: 28px;
		line-height: 1.8;
	}
	.il-about-body {
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(19px, 2.2vw, 26px);
		line-height: 1.6;
		color: var(--ink-soft);
		margin: 0 0 40px;
	}
	.il-pillars {
		list-style: none;
		margin: 0 0 44px;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(18px, 3vw, 36px);
	}
	.il-pillars li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
	.il-pillar-icon {
		width: 62px;
		height: 62px;
		color: var(--pine);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.il-pillar-icon :global(svg) {
		width: 100%;
		height: 100%;
	}
	.il-pillars li:nth-child(2) .il-pillar-icon {
		color: var(--ver);
	}
	.il-pillars li:nth-child(4) .il-pillar-icon {
		color: var(--ver);
	}
	.il-pillars .il-hand {
		font-size: clamp(19px, 1.9vw, 24px);
		color: var(--ink-soft);
		line-height: 1.15;
	}

	/* ================================================================
	   FEATURES
	   ================================================================ */
	.il-feature-inner {
		max-width: var(--maxw);
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(40px, 6vw, 90px);
	}

	/* --- menu card --- */
	.il-menu-card {
		position: relative;
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 18px 14px 20px 12px / 14px 18px 12px 20px;
		box-shadow: 5px 7px 0 rgba(43, 40, 32, 0.14);
		padding: clamp(36px, 4.5vw, 64px) clamp(28px, 4vw, 56px);
	}
	.il-menu-card::before {
		content: '';
		position: absolute;
		inset: 9px;
		border: 1.5px dashed rgba(43, 40, 32, 0.3);
		border-radius: 12px;
		pointer-events: none;
	}
	.il-menu-card-motif {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%) rotate(-3deg);
		width: 110px;
		color: var(--ink);
		background: var(--card);
		padding: 2px 10px;
	}
	.il-menu-card-motif :global(svg) {
		display: block;
		width: 100%;
	}
	.il-menu-lines {
		list-style: none;
		margin: 0 0 30px;
		padding: 0;
		max-width: 46ch;
	}
	.il-menu-lines li {
		display: flex;
		align-items: baseline;
		gap: 10px;
		font-size: 17px;
		color: var(--ink-soft);
		padding: 7px 0;
	}
	.il-menu-lines li span:last-child {
		font-family: var(--display);
		font-weight: 600;
		color: var(--ink);
	}
	.il-menu-lines i {
		flex: 1;
		border-bottom: 2px dotted rgba(43, 40, 32, 0.35);
		transform: translateY(-4px);
	}

	/* --- round plate photo --- */
	.il-feature-art {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.il-plate {
		position: relative;
		width: min(440px, 100%);
	}
	.il-plate-media {
		aspect-ratio: 1;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid var(--ink);
		box-shadow: 6px 8px 0 rgba(43, 40, 32, 0.14);
		background: var(--card);
		padding: 0;
	}
	.il-plate-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.il-plate::before {
		content: '';
		position: absolute;
		inset: 0;
		border: 2px solid var(--gold);
		border-radius: 50%;
		transform: translate(12px, 10px);
		opacity: 0.6;
		z-index: -1;
	}
	.il-plate-sticker {
		position: absolute;
		bottom: 2%;
		left: -6%;
		width: 108px;
		padding: 10px 12px;
		color: var(--ink);
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 55% 45% 50% 50% / 48% 52% 48% 52%;
		box-shadow: 3px 4px 0 rgba(43, 40, 32, 0.18);
		transform: rotate(-7deg);
	}
	.il-plate-sticker :global(svg) {
		display: block;
		width: 100%;
	}
	.il-plate-caption {
		margin: 20px auto 0 0;
		transform: rotate(1.4deg);
	}

	/* --- events (pine band) --- */
	.il-events {
		overflow: hidden;
	}
	.il-events-lanterns {
		max-width: 640px;
		margin: -20px auto clamp(30px, 4vw, 54px);
		color: var(--gold);
	}
	.il-lanterns {
		display: block;
		width: 100%;
		height: auto;
	}
	.il-events-inner {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.02fr);
	}
	.il-events-copy .il-title {
		color: var(--cream);
	}
	.il-events-copy .il-body {
		color: rgba(243, 234, 214, 0.82);
	}
	.il-frame-wobbly {
		position: relative;
		background: var(--cream);
		border: 2px solid rgba(43, 40, 32, 0.9);
		border-radius: 28px 20px 30px 18px / 20px 28px 18px 30px;
		padding: 12px;
		transform: rotate(-1.6deg);
		box-shadow: 6px 8px 0 rgba(0, 0, 0, 0.22);
	}
	.il-frame-wobbly::before {
		content: '';
		position: absolute;
		top: -13px;
		left: 12%;
		width: 92px;
		height: 26px;
		transform: rotate(-5deg) skewX(-7deg);
		background: rgba(216, 162, 74, 0.55);
		border-left: 1px dashed rgba(43, 40, 32, 0.3);
		border-right: 1px dashed rgba(43, 40, 32, 0.3);
		z-index: 3;
	}
	.il-frame-wobbly img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3.1;
		object-fit: cover;
		border-radius: 18px 12px 20px 10px / 12px 18px 10px 20px;
	}
	.il-events-caption {
		display: inline-block;
		margin: 18px 0 0 8%;
		font-size: clamp(20px, 1.9vw, 25px);
		color: var(--gold);
		transform: rotate(-2deg);
	}

	/* ================================================================
	   LOCATIONS — postcards
	   ================================================================ */
	.il-postcard {
		flex: 0 0 clamp(280px, 30vw, 350px);
		background: var(--card);
		border: 1.5px solid rgba(43, 40, 32, 0.85);
		border-radius: 10px;
		padding: 14px 14px 16px;
		box-shadow: 4px 6px 0 rgba(43, 40, 32, 0.13);
		position: relative;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}
	.il-postcard:nth-child(odd) {
		transform: rotate(-1.1deg);
	}
	.il-postcard:nth-child(even) {
		transform: rotate(1.2deg) translateY(5px);
	}
	.il-postcard:hover {
		transform: rotate(0deg) translateY(-7px);
		box-shadow: 6px 11px 0 rgba(43, 40, 32, 0.15);
		z-index: 2;
	}
	.il-postcard-stamp {
		position: absolute;
		top: 22px;
		right: 22px;
		z-index: 4;
		width: 48px;
		height: 58px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--card);
		border: 1.6px dashed rgba(43, 40, 32, 0.55);
		border-radius: 4px;
		color: var(--ver);
		transform: rotate(5deg);
		padding: 5px;
	}
	.il-postcard-stamp :global(svg) {
		width: 100%;
		height: auto;
	}
	.il-postmark {
		position: absolute;
		top: 26px;
		right: 54px;
		width: 84px;
		color: rgba(43, 40, 32, 0.5);
		z-index: 5;
		pointer-events: none;
	}
	.il-postcard-img {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: 6px;
		border: 1px solid rgba(43, 40, 32, 0.3);
	}
	.il-postcard-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.il-postcard:hover .il-postcard-img img {
		transform: scale(1.05);
	}
	.il-postcard-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 4px 2px;
	}
	.il-postcard-meta h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: 21px;
		letter-spacing: 0;
		text-transform: none;
		margin: 0;
	}
	.il-postcard-meta .il-hand {
		font-size: 21px;
		color: var(--ver);
		white-space: nowrap;
	}

	/* ================================================================
	   NEWSLETTER — envelope
	   ================================================================ */
	.il-newsletter {
		display: flex;
		justify-content: center;
	}
	.il-envelope {
		position: relative;
		width: min(660px, 100%);
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 16px;
		box-shadow: 5px 7px 0 rgba(43, 40, 32, 0.15);
		padding: clamp(44px, 6vw, 64px) clamp(26px, 5vw, 60px) clamp(32px, 4vw, 44px);
		text-align: center;
	}
	.il-envelope::before {
		content: '';
		position: absolute;
		inset: 9px;
		border: 1.5px dashed rgba(194, 90, 58, 0.45);
		border-radius: 10px;
		pointer-events: none;
	}
	.il-envelope-seal {
		position: absolute;
		top: -26px;
		left: 50%;
		transform: translateX(-50%) rotate(6deg);
		filter: drop-shadow(2px 3px 0 rgba(43, 40, 32, 0.22));
	}
	.il-envelope .il-title {
		font-size: clamp(30px, 3.6vw, 44px);
		margin-bottom: 26px;
	}
	.il-news-form {
		display: flex;
		gap: 12px;
		max-width: 460px;
		margin: 0 auto;
	}
	.il-news-form input {
		flex: 1;
		min-width: 0;
		font-family: var(--body);
		font-size: 16px;
		color: var(--ink);
		background: var(--paper);
		border: 2px solid rgba(43, 40, 32, 0.8);
		border-radius: 12px 9px 13px 8px / 9px 12px 8px 13px;
		padding: 12px 18px;
		outline: none;
		transition: border-color 0.2s;
	}
	.il-news-form input::placeholder {
		color: var(--ink-faint);
	}
	.il-news-form input:focus {
		border-color: var(--ver);
	}
	.il-subscribed {
		font-size: clamp(24px, 2.6vw, 32px);
		color: var(--ver);
		margin: 6px 0 10px;
	}
	.il-consent {
		font-size: 13.5px;
		color: var(--ink-faint);
		margin: 22px auto 0;
		max-width: 46ch;
		line-height: 1.6;
	}
	.il-consent a {
		color: var(--ink-soft);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.il-consent a:hover {
		color: var(--ver);
	}

	/* ================================================================
	   AWARDS — medals
	   ================================================================ */
	.il-awards {
		text-align: center;
	}
	.il-medals {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: clamp(14px, 3vw, 38px);
		margin: 0 0 30px;
	}
	.il-medal {
		position: relative;
		width: clamp(86px, 8vw, 104px);
	}
	.il-medal svg {
		display: block;
		width: 100%;
		height: auto;
	}
	.il-medal:nth-child(odd) {
		transform: rotate(-2deg);
	}
	.il-medals > div:nth-child(even) .il-medal {
		transform: rotate(2deg);
	}
	.il-medal-year {
		position: absolute;
		top: 31%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(17px, 1.7vw, 21px);
		color: var(--ink);
	}
	.il-awards-copy {
		color: var(--ink-soft);
		max-width: 54ch;
		margin: 0 auto;
	}

	/* ================================================================
	   INFO CARDS
	   ================================================================ */
	.il-info {
		padding-top: 0;
	}
	.il-info-grid {
		max-width: var(--maxw);
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(20px, 2.6vw, 34px);
	}
	.il-info-card {
		background: var(--card);
		border: 2px solid var(--ink);
		border-radius: 17px 12px 18px 11px / 12px 17px 11px 18px;
		box-shadow: 4px 6px 0 rgba(43, 40, 32, 0.13);
		padding: clamp(28px, 3vw, 40px);
		text-align: center;
	}
	.il-info-card:nth-child(1) {
		transform: rotate(-0.7deg);
	}
	.il-info-card:nth-child(2) {
		transform: rotate(0.5deg);
	}
	.il-info-card:nth-child(3) {
		transform: rotate(-0.4deg);
	}
	.il-info-icon {
		display: inline-flex;
		width: 54px;
		height: 54px;
		color: var(--ver);
		margin-bottom: 8px;
	}
	.il-info-icon :global(svg) {
		width: 100%;
		height: 100%;
	}
	.il-info-card h3 {
		font-size: 30px;
		font-weight: 600;
		color: var(--ink);
		letter-spacing: 0;
		text-transform: none;
		margin: 0 0 14px;
	}
	.il-info-card ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.il-info-card li,
	.il-info-card p {
		color: var(--ink-soft);
		font-size: 16.5px;
		line-height: 2;
		margin: 0;
	}
	.il-inline {
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: rgba(43, 40, 32, 0.4);
		text-underline-offset: 4px;
	}
	.il-inline:hover {
		color: var(--ver);
	}
	.il-info-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 13px;
		margin-top: 6px;
	}

	/* ================================================================
	   FOOTER
	   ================================================================ */
	.il-footer {
		background: var(--ink);
		color: var(--cream);
		padding: clamp(56px, 7vw, 90px) var(--rail) 36px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 100 50'%3E%3Cpath d='M0 25a25 25 0 0 1 50 0M8 25a17 17 0 0 1 34 0M16 25a9 9 0 0 1 18 0M50 25a25 25 0 0 1 50 0M58 25a17 17 0 0 1 34 0M66 25a9 9 0 0 1 18 0M-25 50a25 25 0 0 1 50 0M-17 50a17 17 0 0 1 34 0M-9 50a9 9 0 0 1 18 0M25 50a25 25 0 0 1 50 0M33 50a17 17 0 0 1 34 0M41 50a9 9 0 0 1 18 0M75 50a25 25 0 0 1 50 0M83 50a17 17 0 0 1 34 0M91 50a9 9 0 0 1 18 0' fill='none' stroke='%23f3ead6' stroke-opacity='.05' stroke-width='1.3'/%3E%3C/svg%3E");
	}
	.il-footer-inner {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 0.9fr;
		gap: clamp(30px, 4vw, 56px);
		padding-bottom: 44px;
		border-bottom: 1px dashed rgba(243, 234, 214, 0.25);
	}
	.il-footer-brand {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
	.il-footer-brand :global(.il-seal-svg) {
		transform: rotate(-6deg);
		margin-bottom: 6px;
	}
	.il-footer-wordmark {
		font-family: var(--display);
		font-weight: 700;
		font-size: 30px;
	}
	.il-footer-farewell {
		font-size: 24px;
		color: var(--gold);
		transform: rotate(-2deg);
	}
	.il-footer-address {
		margin: 10px 0 0;
		font-size: 14.5px;
		line-height: 1.9;
		color: rgba(243, 234, 214, 0.6);
	}
	.il-footer-label {
		display: block;
		font-family: var(--body);
		font-weight: 600;
		font-size: 13px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 16px;
	}
	.il-footer-col ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.il-footer-col li {
		line-height: 2.3;
	}
	.il-footer-col a,
	.il-footer-col button {
		font-family: var(--body);
		font-size: 16px;
		color: rgba(243, 234, 214, 0.82);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-decoration: none;
		transition: color 0.2s;
	}
	.il-footer-col a:hover,
	.il-footer-col button:hover {
		color: var(--gold);
		text-decoration: underline wavy var(--gold) 1px;
		text-underline-offset: 5px;
	}
	.il-footer-social {
		display: flex;
		gap: 12px;
	}
	.il-footer-social a {
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--cream);
		border: 1.6px solid rgba(243, 234, 214, 0.45);
		border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s,
			transform 0.2s;
	}
	.il-footer-social a:hover {
		background: var(--ver);
		border-color: var(--ver);
		transform: rotate(-6deg);
	}
	.il-footer-social svg {
		width: 19px;
		height: 19px;
	}
	.il-footer-legal {
		max-width: 1400px;
		margin: 0 auto;
		padding-top: 26px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 24px;
	}
	.il-footer-legal p {
		margin: 0;
		font-size: 13px;
		color: rgba(243, 234, 214, 0.55);
	}
	.il-footer-legal ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 20px;
		margin: 0;
		padding: 0;
	}
	.il-footer-legal a {
		font-size: 13px;
		color: rgba(243, 234, 214, 0.55);
		text-decoration: none;
	}
	.il-footer-legal a:hover {
		color: var(--gold);
	}

	/* ================================================================
	   RESPONSIVE
	   ================================================================ */
	@media (max-width: 1020px) {
		.il-nav {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			width: min(84vw, 350px);
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			gap: 24px;
			background: var(--paper);
			border-left: 2px solid var(--ink);
			padding: 90px 44px;
			transform: translateX(105%);
			transition: transform 0.4s var(--ease);
			z-index: 850;
		}
		.nav-open .il-nav {
			transform: translateX(0);
		}
		.il-nav a:not(.il-btn) {
			font-family: var(--display);
			font-size: 24px;
			font-weight: 600;
		}
		.il-nav-utility {
			font-family: var(--body) !important;
			font-size: 16px !important;
		}
		.il-nav .il-btn {
			margin-top: 10px;
		}
		.il-nav-sprig {
			display: block;
			position: absolute;
			bottom: 34px;
			right: 38px;
			width: 44px;
			color: var(--pine);
			opacity: 0.5;
		}
		.il-nav-sprig :global(svg) {
			width: 100%;
			height: auto;
		}
		.il-hamburger {
			display: flex;
		}

		.il-hero {
			padding-top: calc(78px + 22px);
			min-height: 0;
		}
		.il-hero-inner {
			grid-template-columns: 1fr;
			gap: 56px;
			text-align: center;
		}
		.il-hero-copy {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.il-hero-cta {
			justify-content: center;
		}
		.il-hero-art {
			max-width: 470px;
			margin: 0 auto;
			width: 100%;
		}
		.il-hero-crane {
			left: -2%;
			top: -6%;
		}
		.il-scroll {
			display: none;
		}

		.il-feature-inner,
		.il-events-inner {
			grid-template-columns: 1fr;
			gap: 52px;
		}
		.il-events-art {
			order: 2;
		}
		.il-feature-art {
			width: 100%;
		}
		.il-info-grid {
			grid-template-columns: 1fr;
			max-width: 560px;
		}
		.il-footer-inner {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.il-page {
			font-size: 16px;
		}
		/* Tighten the storybook vertical rhythm on phones so there's less dead
		   space to scroll past between sections. */
		.il-section {
			padding: clamp(52px, 13vw, 76px) var(--rail);
		}
		.il-pillars {
			grid-template-columns: repeat(2, 1fr);
			gap: 26px;
		}
		.il-polaroid {
			flex-basis: min(72vw, 280px);
		}
		.il-postcard {
			flex-basis: min(80vw, 320px);
		}
		.il-news-form {
			flex-direction: column;
		}
		.il-news-form .il-btn {
			width: 100%;
		}
		.il-aside {
			display: none;
		}
		.il-row-btn.prev {
			left: 2px;
		}
		.il-row-btn.next {
			right: 2px;
		}
		.il-sun {
			right: 0;
		}
		.il-hero-caption {
			margin-right: 6px;
		}
		.il-footer-inner {
			grid-template-columns: 1fr;
			text-align: left;
		}
		.il-footer-legal {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
