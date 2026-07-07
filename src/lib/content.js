// All demo copy + data in one place, shared by the minimalist / illustrative /
// bento redesign concepts. (The editorial theme has its own component tree —
// see src/lib/editorial/EditorialPage.svelte.)
// "Sora Sushi" is the fictional brand for this website template; media in
// static/assets/ is placeholder imagery (see docs/asset-manifest.md).

import { base } from '$app/paths';

export const BRAND = 'Sora Sushi';
export const GROUP = 'Sora Restaurant Group';

const A = `${base}/assets`;

export const NAV_LINKS = [
	{ label: 'Menu', href: '#menu' },
	{ label: 'Gallery', href: '#gallery' },
	{ label: 'Special Events', href: '#events' },
	{ label: 'Locations', href: '#locations' },
	{ label: 'Contact', href: '#contact' }
];

export const HERO = {
	eyebrow: 'Lower East Side, Japanese-Styled',
	welcome: 'Welcome to Sora Sushi',
	poster: `${A}/images/dining-room.jpg`,
	video: `${A}/videos/hero.mp4`
};

export const GALLERY = [
	{ src: `${A}/images/platter.jpg`, alt: 'Sushi platter' },
	{ src: `${A}/images/hamachi-crudo.jpg`, alt: 'Hamachi crudo' },
	{ src: `${A}/images/bar-set.jpg`, alt: 'Bar set — happy hour' },
	{ branded: true },
	{ src: `${A}/images/sushi.jpg`, alt: 'Sushi and sashimi sets' },
	{ src: `${A}/images/dining-room.jpg`, alt: 'Dining room and bar' },
	{ src: `${A}/images/venue-lantern.jpg`, alt: 'Private dining' }
];

export const ABOUT = {
	eyebrow: 'Japanese Modern Classics with a New York Point of View',
	body: `Sora Sushi is a modern Japanese restaurant built on a simple belief — that tradition and invention belong at the same table. Our chefs translate centuries of technique into a menu made for sharing: robata and yakitori from the open flame, temaki cut to order, seasonal sashimi, and premium cuts like snow-aged wagyu, complemented by a curated selection of sakes, Japanese whiskies, and original cocktails.`
};

export const FEATURE_A = {
	id: 'menu',
	eyebrow: 'On the Menu',
	title: 'Sushi & Sashimi Sets',
	body: `Dive into an elevated sushi experience served tableside and enjoy the chef's selection of the freshest fish sourced from the best purveyors worldwide, including Japan's famous Toyosu Market.`,
	cta: 'View Menu',
	ctaHref: '#gallery',
	img: `${A}/images/sushi.jpg`,
	alt: 'Sushi and sashimi set'
};

export const FEATURE_B = {
	id: 'events',
	eyebrow: 'Gatherings',
	title: 'Private Events',
	body: `Host your private event in the refined ambiance of Sora Sushi, where contemporary design meets bespoke dining and unforgettable service.`,
	cta: 'Book Now',
	reserve: true,
	img: `${A}/images/dining-room.jpg`,
	alt: 'Sora Sushi dining room and bar'
};

export const LOCATIONS = [
	{ name: 'The Lantern Room', city: 'New York', src: `${A}/images/venue-lantern.jpg` },
	{ name: 'Sora Uptown', city: 'New York', src: `${A}/images/venue-uptown.jpg` },
	{ name: 'Kumo', city: 'New York', src: `${A}/images/venue-downtown.jpg` },
	{ name: 'Ginkgo Lounge', city: 'Miami', src: `${A}/images/venue-lounge.jpg` },
	{ name: 'Izakaya West', city: 'Los Angeles', src: `${A}/images/venue-rooftop.jpg` }
];

export const AWARDS = {
	years: ['2023', '2024', '2025', '2026'],
	title: 'Award of Excellence Winner',
	body: 'Honored with the Award of Excellence since 2023 for one of the city’s finest sake and wine programs.'
};

export const HOURS = [
	'Tuesday – Thursday · 6PM–11PM',
	'Friday – Saturday · 6PM–12AM',
	'Sunday · 6PM–11PM'
];

export const LOCATION = {
	address: ['88 Bowery', 'New York, NY 10013'],
	phone: '212.555.0199'
};

export const FOOTER_LINKS = [
	'Reservations',
	'Special Events',
	'Rewards',
	'Gift Cards',
	'Careers',
	'Press Inquiries',
	'Delivery & Pickup',
	'Contact'
];

export const LEGAL_LINKS = [
	'Restaurants',
	'Nightlife',
	'Daylife',
	'Newsletter',
	'Privacy',
	'Terms',
	'Diversity',
	'Your Privacy Choices'
];
