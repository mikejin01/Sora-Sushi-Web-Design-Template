<script>
	import { BRAND, GROUP, FOOTER_LINKS, LEGAL_LINKS } from '$lib/content.js';
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-top">
			<div class="footer-brand">
				<a href="#top" class="wordmark">{BRAND}</a>
				<p>A modern high-end Japanese restaurant in Lower Manhattan. Tokyo soul, city nights.</p>
				<div class="footer-social">
					<a href="#" aria-label="Instagram">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
					</a>
					<a href="#" aria-label="Facebook">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l.5-3H13V9c0-.9.3-1.5 1.6-1.5H16.5V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H7v3h3v8h3z" /></svg>
					</a>
				</div>
			</div>
			<nav class="footer-links" aria-label="Footer">
				{#each FOOTER_LINKS as link}
					<a href="#">{link}</a>
				{/each}
			</nav>
		</div>
		<div class="footer-strip">
			<div class="group-name">{GROUP}</div>
		</div>
		<div class="footer-legal">
			{#each LEGAL_LINKS as link}
				<a href="#">{link}</a>
			{/each}
		</div>
		<p class="copyright">© 2026 {GROUP}. All Rights Reserved. · Demo site — not a real restaurant.</p>
	</div>
</footer>
