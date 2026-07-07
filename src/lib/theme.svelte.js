// Shared, reactive theme state (Svelte 5 runes in a .svelte.js module).
// In-memory only — no localStorage/sessionStorage, per the demo spec.

export const THEMES = [
	{ id: 'editorial', name: 'Editorial', desc: 'Dark & cinematic' },
	{ id: 'minimalist', name: 'Minimalist', desc: 'Light & serene' },
	{ id: 'illustrative', name: 'Illustrative', desc: 'Warm & hand-crafted' },
	{ id: 'bento', name: 'Bento', desc: 'Modular & modern' }
];

export const DEFAULT_THEME = 'editorial';

export const themeState = $state({ current: DEFAULT_THEME });

export function setTheme(id) {
	if (THEMES.some((t) => t.id === id)) themeState.current = id;
}
