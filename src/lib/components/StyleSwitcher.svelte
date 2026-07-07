<script>
	import { THEMES, themeState, setTheme } from '$lib/theme.svelte.js';

	let open = $state(false);
	let root = $state(null);
	let optionEls = $state([]);

	const current = $derived(THEMES.find((t) => t.id === themeState.current) ?? THEMES[0]);

	function choose(id) {
		setTheme(id);
		open = false;
	}
	function onDocClick(e) {
		if (root && !root.contains(e.target)) open = false;
	}
	function onArrows(e, i) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const n =
				e.key === 'ArrowDown' ? (i + 1) % THEMES.length : (i - 1 + THEMES.length) % THEMES.length;
			optionEls[n]?.focus();
		}
	}

	$effect(() => {
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<div class="switcher" class:open bind:this={root}>
	<button
		class="switcher-toggle"
		aria-haspopup="true"
		aria-expanded={open}
		onclick={(e) => {
			e.stopPropagation();
			open = !open;
		}}
	>
		<span class="sw-swatch sw-sw-{current.id}"></span>
		<span class="sw-labels">
			<span class="sw-kicker">Design Style</span>
			<span class="sw-name">{current.name}</span>
		</span>
		<svg class="sw-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
	</button>

	<div class="switcher-panel" role="menu" aria-label="Choose a design style">
		<div class="sw-head">Choose a Design Style</div>
		{#each THEMES as theme, i}
			<button
				class="sw-option"
				class:active={theme.id === themeState.current}
				role="menuitemradio"
				aria-checked={theme.id === themeState.current}
				bind:this={optionEls[i]}
				onclick={() => choose(theme.id)}
				onkeydown={(e) => onArrows(e, i)}
			>
				<span class="sw-swatch sw-sw-{theme.id}"></span>
				<span class="sw-text">
					<span class="sw-t-name">{theme.name}</span>
					<span class="sw-t-desc">{theme.desc}</span>
				</span>
				<svg class="sw-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7" /></svg>
			</button>
		{/each}
	</div>
</div>
