<script>
	import { NAV_LINKS, BRAND } from '$lib/content.js';
	import { openReservation } from '$lib/reservation.svelte.js';
	import { scrolled } from '$lib/actions.js';

	let navOpen = $state(false);
	const close = () => (navOpen = false);
</script>

<header class="site-header" id="top" class:nav-open={navOpen} use:scrolled>
	<div class="header-inner">
		<a href="#top" class="wordmark" onclick={close}>{BRAND}</a>
		<nav class="nav">
			{#each NAV_LINKS as link}
				<a href={link.href} onclick={close}>{link.label}</a>
			{/each}
			<a href="#newsletter" class="nav-utility" onclick={close}>Delivery &amp; Pickup</a>
			<button
				class="btn btn-primary"
				onclick={() => {
					openReservation();
					close();
				}}>Reservations</button
			>
		</nav>
		<button
			class="hamburger"
			aria-label="Toggle menu"
			aria-expanded={navOpen}
			onclick={() => (navOpen = !navOpen)}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>
