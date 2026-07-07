<script>
	import { reservation, closeReservation } from '$lib/reservation.svelte.js';

	let name = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('19:00');
	let guests = $state('2');
	let notes = $state('');
	let errors = $state({});
	let done = $state(false);

	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate() {
		const e = {};
		if (!name.trim()) e.name = 'Please tell us your name.';
		if (!EMAIL.test(email.trim())) e.email = 'A valid email is required.';
		if (!date) e.date = 'Pick a date.';
		errors = e;
		return Object.keys(e).length === 0;
	}
	function submit(ev) {
		ev.preventDefault();
		if (validate()) done = true;
	}
	function close() {
		closeReservation();
		// reset once the fade-out is done
		setTimeout(() => {
			done = false;
			errors = {};
			name = email = notes = '';
			date = '';
			time = '19:00';
			guests = '2';
		}, 260);
	}
</script>

<svelte:window onkeydown={(e) => reservation.open && e.key === 'Escape' && close()} />

{#if reservation.open}
	<div class="modal-backdrop" onclick={close} role="presentation">
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-label="Make a reservation"
			onclick={(e) => e.stopPropagation()}
		>
			<button class="modal-x" onclick={close} aria-label="Close">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
			</button>
			<div class="modal-inner">
				{#if done}
					<div class="form-success">
						<div class="check-circle">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 13l4 4L19 7" /></svg>
						</div>
						<h3>Reservation requested</h3>
						<p>
							Thank you, {name.trim().split(' ')[0] || 'friend'} — we’ve noted a table for {guests}
							{Number(guests) === 1 ? 'guest' : 'guests'}{date ? ` on ${date}` : ''}{time ? ` at ${time}` : ''}.
							A confirmation would normally be sent to {email}.
						</p>
						<div class="form-actions">
							<button class="btn btn-primary" onclick={close}>Done</button>
						</div>
					</div>
				{:else}
					<span class="eyebrow">Reservations</span>
					<h3>Reserve a Table</h3>
					<p class="modal-sub">Tell us when — we’ll hold your table at SORA.</p>
					<form onsubmit={submit} novalidate>
						<div class="form-grid">
							<div class="field full" class:invalid={errors.name}>
								<label for="r-name">Name</label>
								<input id="r-name" bind:value={name} autocomplete="name" />
								<span class="err">{errors.name ?? ''}</span>
							</div>
							<div class="field full" class:invalid={errors.email}>
								<label for="r-email">Email</label>
								<input id="r-email" type="email" bind:value={email} autocomplete="email" />
								<span class="err">{errors.email ?? ''}</span>
							</div>
							<div class="field" class:invalid={errors.date}>
								<label for="r-date">Date</label>
								<input id="r-date" type="date" bind:value={date} />
								<span class="err">{errors.date ?? ''}</span>
							</div>
							<div class="field">
								<label for="r-time">Time</label>
								<input id="r-time" type="time" bind:value={time} />
								<span class="err"></span>
							</div>
							<div class="field full">
								<label for="r-guests">Party size</label>
								<select id="r-guests" bind:value={guests}>
									{#each ['1', '2', '3', '4', '5', '6', '7', '8+'] as n}
										<option value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>
									{/each}
								</select>
							</div>
							<div class="field full">
								<label for="r-notes">Notes (optional)</label>
								<textarea id="r-notes" bind:value={notes} placeholder="Allergies, occasion, seating preference…"></textarea>
							</div>
						</div>
						<div class="form-actions">
							<button type="submit" class="btn btn-primary">Confirm Reservation</button>
						</div>
						<p class="form-note">This is a demo — no reservation is actually booked and no data is sent anywhere.</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}
