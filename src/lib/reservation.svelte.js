// Shared state for the reservation modal, opened by any "Reserve / Book" CTA.

export const reservation = $state({ open: false });

export function openReservation() {
	reservation.open = true;
}

export function closeReservation() {
	reservation.open = false;
}
