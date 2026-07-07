<script>
	// Reusable horizontal carousel: arrow buttons + drag-to-scroll.
	let { label = 'items', children } = $props();
	let track = $state(null);
	let moved = 0;
	let down = false;
	let startX = 0;
	let startLeft = 0;

	function scroll(dir) {
		if (!track) return;
		const card = track.querySelector(':scope > *');
		const amount = card ? (card.getBoundingClientRect().width + 16) * 1.4 : 320;
		track.scrollBy({ left: dir === 'prev' ? -amount : amount, behavior: 'smooth' });
	}
	function pdown(e) {
		down = true;
		moved = 0;
		startX = e.clientX;
		startLeft = track.scrollLeft;
		track.classList.add('dragging');
	}
	function pmove(e) {
		if (!down) return;
		const dx = e.clientX - startX;
		moved += Math.abs(dx);
		track.scrollLeft = startLeft - dx;
	}
	function pup() {
		down = false;
		track?.classList.remove('dragging');
	}
	// Suppress the click that follows a drag so cards/links don't fire.
	function clickCapture(e) {
		if (moved > 8) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
</script>

<div class="carousel">
	<button class="carousel-btn prev" onclick={() => scroll('prev')} aria-label={`Previous ${label}`}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 18l-6-6 6-6" /></svg>
	</button>
	<div
		class="carousel-track"
		bind:this={track}
		onpointerdown={pdown}
		onpointermove={pmove}
		onpointerup={pup}
		onpointerleave={pup}
		onclickcapture={clickCapture}
	>
		{@render children()}
	</div>
	<button class="carousel-btn next" onclick={() => scroll('next')} aria-label={`Next ${label}`}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18l6-6-6-6" /></svg>
	</button>
</div>
