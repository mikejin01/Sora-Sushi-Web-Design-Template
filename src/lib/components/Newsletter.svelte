<script>
	import { reveal } from '$lib/actions.js';

	let email = $state('');
	let error = $state('');
	let done = $state(false);

	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function submit(e) {
		e.preventDefault();
		if (!EMAIL.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		error = '';
		done = true;
	}
</script>

<section id="newsletter" class="section newsletter" use:reveal>
	<div class="newsletter-inner">
		{#if done}
			<div class="form-success">
				<div class="check-circle">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 13l4 4L19 7" /></svg>
				</div>
				<h3>You’re on the list</h3>
				<p>Thanks for subscribing — watch your inbox for seasonal menus, sake dinners, and members’ nights.</p>
			</div>
		{:else}
			<h2>Join our Mailing List</h2>
			<p class="n-sub">Be first to know about seasonal menus, sake dinners, and members’ nights.</p>
			<form class="newsletter-form" onsubmit={submit} novalidate>
				<input type="email" bind:value={email} placeholder="Email address" aria-label="Email address" />
				<button type="submit" class="btn btn-primary">Sign Up</button>
			</form>
			{#if error}
				<p class="consent" style="color:#d9483b">{error}</p>
			{:else}
				<p class="consent">
					By signing up, I agree to SORA’s Terms of Use. I also agree to SORA’s Privacy Policy.
				</p>
			{/if}
		{/if}
	</div>
</section>
