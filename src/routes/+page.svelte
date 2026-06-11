<script lang="ts">
	import { goto } from '$app/navigation';

	type Album = {
		title: string;
		subtitle: string;
		cover: string;
		bg: string;
		href?: string;
		status: string;
		accent: string;
	};

	const albums: Album[] = [
		{
			title: 'The New Abnormal',
			subtitle: 'The Strokes',
			cover: '/visuals/abnormal-cover-select.jpg',
			bg: '/visuals/abnormal-bg.jpg',
			href: '/the-new-abnormal',
			status: 'Listen Now',
			accent: '#e24b3a'
		},
		{
			title: 'Reality Awaits',
			subtitle: 'The Strokes',
			cover: '/visuals/cover-icon.jpg',
			bg: '/visuals/menu-bg.jpg',
			href: '/reality-awaits',
			status: 'Out June 26',
			accent: '#c4a35a'
		}
	];

	const defaultBg = '/visuals/default-bg.jpg';

	let activeAlbum: Album | null = null;

	const selectAlbum = (album: Album) => {
		if (album.href) {
			goto(album.href);
		}
	};

	const handlePointerMove = (event: PointerEvent, album: Album) => {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;

		target.style.setProperty('--album-rotate-x', `${-y * 22}deg`);
		target.style.setProperty('--album-rotate-y', `${x * 28}deg`);
		target.style.setProperty('--album-glare-x', `${(x + 0.5) * 100}%`);
		target.style.setProperty('--album-glare-y', `${(y + 0.5) * 100}%`);
		activeAlbum = album;
	};

	const resetTilt = (event: PointerEvent) => {
		const target = event.currentTarget as HTMLElement;
		target.style.setProperty('--album-rotate-x', '0deg');
		target.style.setProperty('--album-rotate-y', '0deg');
		activeAlbum = null;
	};
</script>

<svelte:head>
	<title>Choose an Album</title>
</svelte:head>

<div class="album-select min-h-screen relative overflow-hidden font-nimbus-sans">
	<div class="absolute inset-0">
		<img
			src={defaultBg}
			alt=""
			class:active-bg={activeAlbum === null}
			class="album-bg default-album-bg absolute inset-0 h-full w-full object-cover"
		/>
		{#each albums as album}
			<img
				src={album.bg}
				alt=""
				class:active-bg={activeAlbum?.title === album.title}
				class="album-bg absolute inset-0 h-full w-full object-cover"
			/>
		{/each}
		<div class="absolute inset-0 bg-deep-black/65"></div>
		<div class="album-bg-vignette absolute inset-0"></div>
	</div>

	<div class="grain-overlay"></div>

	<main class="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-5 py-8 md:px-10">
		<div class="text-center">
			<p class="mb-3 text-xs uppercase tracking-[0.34em] text-soft-white/45">The Strokes Player</p>
			<h1 class="text-4xl uppercase text-soft-white md:text-6xl">CHOOSE YOUR RECORD</h1>
		</div>

		<div class="album-grid grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12">
			{#each albums as album}
				<button
					type="button"
					aria-label={`Select ${album.title}`}
					class:album-available={album.href}
					class="album-card group"
					on:click={() => selectAlbum(album)}
					on:pointerenter={() => activeAlbum = album}
					on:pointermove={(event) => handlePointerMove(event, album)}
					on:pointerleave={resetTilt}
				>
					<span class="album-stack">
						<span class="album-cover-wrap">
							<img src={album.cover} alt={album.title} class="album-cover" />
						</span>
						<span class="album-meta mt-5 flex min-h-24 flex-col items-center justify-start text-center">
							<span class="album-title uppercase leading-none text-soft-white">{album.title}</span>
							<span class="mt-2 text-sm uppercase tracking-[0.18em] text-soft-white/45">{album.subtitle}</span>
							<span class="mt-4 text-xs uppercase tracking-[0.22em]" style={`color: ${album.accent}`}>
								{album.status}
							</span>
						</span>
					</span>
				</button>
			{/each}
		</div>
	</main>

	<style>
		@keyframes default-bg-drift {
			0%,
			100% {
				transform: scale(1.02) translate3d(-0.7%, -0.35%, 0);
			}
			50% {
				transform: scale(1.055) translate3d(0.8%, 0.45%, 0);
			}
		}

		.album-bg {
			opacity: 0;
			transform: scale(1.08);
			transition: opacity 700ms ease, transform 1200ms ease;
			filter: saturate(0.84) contrast(1.08);
		}

		.default-album-bg {
			animation: default-bg-drift 31s ease-in-out infinite;
			transform-origin: center center;
		}

		.album-bg.active-bg {
			opacity: 1;
			transform: scale(1.02);
		}

		.album-bg-vignette {
			background:
				radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 42%),
				linear-gradient(180deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.68) 96%);
		}

		.album-grid {
			perspective: 1100px;
		}

		.album-card {
			--album-rotate-x: 0deg;
			--album-rotate-y: 0deg;
			--album-glare-x: 50%;
			--album-glare-y: 50%;
			position: relative;
			display: flex;
			min-height: 32rem;
			width: 100%;
			cursor: default;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 0;
			background: transparent;
			color: inherit;
			transform-style: preserve-3d;
			transition: transform 240ms ease;
		}

		.album-card.album-available {
			cursor: pointer;
		}

		.album-card:hover,
		.album-card:focus-visible {
			transform: translateY(-10px);
			outline: none;
		}

		.album-stack {
			position: relative;
			display: flex;
			width: min(82vw, 22rem);
			flex-direction: column;
			align-items: center;
			transform-style: preserve-3d;
		}

		.album-cover-wrap {
			position: relative;
			display: block;
			aspect-ratio: 1;
			width: min(100%, 19rem);
			overflow: hidden;
			border: 1px solid rgba(224, 224, 224, 0.24);
			box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
			transform: rotateX(var(--album-rotate-x)) rotateY(var(--album-rotate-y)) translateZ(34px);
			transform-style: preserve-3d;
			transition: transform 160ms ease, box-shadow 240ms ease, border-color 240ms ease;
		}

		.album-cover-wrap::after {
			content: "";
			position: absolute;
			inset: 0;
			background:
				radial-gradient(circle at var(--album-glare-x) var(--album-glare-y), rgba(255, 255, 255, 0.34), transparent 24%),
				linear-gradient(120deg, rgba(255, 255, 255, 0.16), transparent 42%);
			opacity: 0;
			mix-blend-mode: screen;
			transition: opacity 180ms ease;
		}

		.album-card:hover .album-cover-wrap,
		.album-card:focus-visible .album-cover-wrap {
			border-color: rgba(224, 224, 224, 0.58);
			box-shadow: 0 34px 80px rgba(0, 0, 0, 0.58);
		}

		.album-card:hover .album-cover-wrap::after,
		.album-card:focus-visible .album-cover-wrap::after {
			opacity: 1;
		}

		.album-cover {
			display: block;
			height: 100%;
			width: 100%;
			object-fit: cover;
			transform: translateZ(1px) scale(1.01);
		}

		.album-meta {
			width: 100%;
			transform: translateZ(18px);
		}

		.album-title {
			max-width: 100%;
			font-size: 2.05rem;
			line-height: 1;
			white-space: nowrap;
		}

		@media (max-width: 640px) {
			.album-select {
				overflow-y: auto;
			}

			.album-card {
				min-height: 25rem;
			}

			.album-stack {
				width: min(88vw, 20rem);
			}

			.album-cover-wrap {
				width: min(100%, 16rem);
			}

			.album-title {
				font-size: 1.85rem;
			}

		}
	</style>
</div>
