<script>
	import { themeState } from '$lib/theme.svelte.js';
	import EditorialPage from '$lib/editorial/EditorialPage.svelte';
	import IllustrativePage from '$lib/illustrative/IllustrativePage.svelte';
	import BentoPage from '$lib/bento/BentoPage.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import About from '$lib/components/About.svelte';
	import Feature from '$lib/components/Feature.svelte';
	import Locations from '$lib/components/Locations.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import Awards from '$lib/components/Awards.svelte';
	import InfoBar from '$lib/components/InfoBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { FEATURE_A, FEATURE_B } from '$lib/content.js';
</script>

<svelte:head>
	<title>Sora Sushi — Modern Japanese Restaurant | New York</title>
</svelte:head>

{#if themeState.current === 'editorial'}
	<!-- Editorial = polished venue-site template with its own component tree -->
	<EditorialPage />
{:else if themeState.current === 'illustrative'}
	<!-- Illustrative = hand-crafted storybook template with its own component tree -->
	<IllustrativePage />
{:else if themeState.current === 'bento'}
	<!-- Bento = Apple-Store-style modular tiles with its own component tree -->
	<BentoPage />
{:else}
	<Header />

	<main>
		<Hero />
		<Gallery />
		<About />
		<Feature feature={FEATURE_A} variant="a" />
		<Feature feature={FEATURE_B} variant="b" />
		<Locations />
		<Newsletter />
		<Awards />
		<InfoBar />
	</main>

	<Footer />
{/if}
