<script>
	import '../app.css';
	import { themeState } from '$lib/theme.svelte.js';
	import StyleSwitcher from '$lib/components/StyleSwitcher.svelte';
	import ReservationModal from '$lib/components/ReservationModal.svelte';

	let { children } = $props();

	// Apply the active theme class to <body> so the CSS-variable token sets
	// and theme-scoped selectors take effect across the whole page.
	$effect(() => {
		document.body.className = 'theme-' + themeState.current;
	});
</script>

{@render children()}

<StyleSwitcher />
<ReservationModal />
