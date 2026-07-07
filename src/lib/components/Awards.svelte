<script>
	import { AWARDS } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="awards" class="section awards" use:reveal>
	<div class="awards-inner">
		<div class="award-badges">
			{#each AWARDS.years as year}
				<div class="award-badge">
					<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6">
						<path d="M32 24C22 34 20 52 30 74M68 24c10 10 12 28 2 50" stroke-linecap="round" />
						<path d="M30 40c-4 2-6 4-7 8M30 54c-4 1-7 2-9 5M70 40c4 2 6 4 7 8M70 54c4 1 7 2 9 5" stroke-linecap="round" />
						<circle cx="50" cy="46" r="10" />
					</svg>
					<span class="yr">{year}</span>
				</div>
			{/each}
		</div>
		<h2>{AWARDS.title}</h2>
		<p>{AWARDS.body}</p>
	</div>
</section>
