<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

	let countdown = 3;
	let timer: ReturnType<typeof setInterval>;
	let isCounting = false;
	let showCredits = false;

	const startCountdown = () => {
		isCounting = true;
		timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer);
				goto('/listen/the-new-abnormal');
			}
		}, 1000);
	};

	const goAlbumSelect = () => {
		clearInterval(timer);
		goto('/');
	};

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="new-abnormal-menu min-h-screen flex items-center justify-center relative font-apercu-bold">
	<div class="grain-overlay"></div>

	<div class="absolute inset-0 overflow-hidden">
		<img
			src="/visuals/abnormal-bg.jpg"
			alt="The New Abnormal"
			class="abnormal-bg w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-deep-black/24"></div>
		<div class="blue-wash absolute inset-0"></div>
	</div>

	<div class="relative z-10 text-center fade-in">
		{#if !isCounting && !showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="abnormal-pulse-triangle animate-pulse"></div>
				<div class="flex flex-col gap-4">
					<button
						on:click={startCountdown}
						class="abnormal-button px-20 py-5 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						<span>Find Your Way</span>
					</button>
					<button
						on:click={() => showCredits = true}
						class="abnormal-button px-20 py-5 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						<span>Credits</span>
					</button>
					<button
						on:click={goAlbumSelect}
						class="abnormal-button px-20 py-5 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						<span>Back</span>
					</button>
				</div>
			</div>
		{:else if showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="flex flex-col gap-8 text-left p-8 md:p-10 max-w-2xl">
					<div>
						<h2 class="credits-graffiti-tag text-lg uppercase tracking-widest text-abnormal-orange-muted mb-2 font-medium">Developed by</h2>
						<a
							href="https://www.linkedin.com/in/pedro-hirschle"
							target="_blank"
							rel="noopener noreferrer"
							class="credits-graffiti-name text-4xl text-abnormal-orange hover:text-abnormal-orange/80 transition-colors"
						>
							Pedro Hirschle
						</a>
					</div>

					<div>
						<h2 class="credits-graffiti-tag text-lg uppercase tracking-widest text-abnormal-orange-muted mb-2 font-medium">Techs n' Stacks</h2>
						<div class="flex flex-wrap gap-0">
							<span class="credits-graffiti-chip text-lg text-abnormal-orange">SvelteKit</span>
							<span class="credits-graffiti-chip text-lg text-abnormal-orange">TypeScript</span>
							<span class="credits-graffiti-chip text-lg text-abnormal-orange">TailwindCSS</span>
							<span class="credits-graffiti-chip text-lg text-abnormal-orange">Howler.js</span>
						</div>
					</div>
				</div>
				<button
					on:click={() => showCredits = false}
					class="credits-graffiti-back flex items-center gap-2 text-abnormal-orange-muted hover:text-abnormal-orange transition-all hover:scale-105 text-3xl"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>
					<span class="tracking-wider">BACK</span>
				</button>
			</div>
		{:else}
			<div class="flex flex-col items-center gap-4">
				<div class="abnormal-pulse-triangle animate-pulse"></div>
				<p class="text-6xl text-abnormal-orange tracking-[0.08em] uppercase">
					Listening experience in {countdown}s
				</p>
			</div>
		{/if}
	</div>

	<style>
		@keyframes abnormal-drift {
			0% {
				transform: scale(1.04) translate3d(-0.8%, -0.4%, 0);
			}
			100% {
				transform: scale(1.12) translate3d(0.9%, 0.7%, 0);
			}
		}

		.abnormal-bg {
			animation: abnormal-drift 18s ease-in-out infinite alternate;
			filter: saturate(1.04) contrast(1.03);
			transform-origin: center center;
		}

		.text-abnormal-orange {
			color: #ff7a00;
		}

		.text-abnormal-orange-muted {
			color: #ffbb00;
		}

		.abnormal-pulse-triangle {
			width: 0;
			height: 0;
			border-left: 0.42rem solid transparent;
			border-right: 0.42rem solid transparent;
			border-bottom: 0.76rem solid #ff7a00;
			filter: drop-shadow(0 0 10px rgba(255, 122, 0, 0.56));
		}

		.blue-wash {
			background:
				radial-gradient(circle at 50% 42%, rgb(55, 117, 161), transparent 34%),
				radial-gradient(circle at 14% 78%, rgb(0, 149, 255), transparent 30%),
				linear-gradient(180deg, rgba(55, 117, 161, 0.04), rgba(10, 10, 10, 0.12) 52%, rgba(10, 10, 10, 0.48));
			mix-blend-mode: screen;
			opacity: 0.34;
		}

		.credits-graffiti-tag,
		.credits-graffiti-name,
		.credits-graffiti-chip {
			display: inline-block;
			position: relative;
			padding: 0.16rem 0.54rem;
			background:
				radial-gradient(circle at 12% 32%, rgba(10, 10, 10, 0.18) 0 2px, transparent 4px),
				radial-gradient(circle at 82% 68%, rgba(255, 122, 0, 0.24) 0 4px, transparent 7px),
				linear-gradient(112deg, transparent 0 24%, rgba(10, 10, 10, 0.12) 25% 27%, transparent 28% 100%),
				#fff7eb;
			clip-path: polygon(2% 12%, 98% 0, 96% 88%, 5% 100%, 0 48%);
			box-shadow:
				5px 6px 0 rgba(10, 10, 10, 0.66),
				0 0 24px rgba(255, 122, 0, 0.26);
			text-shadow: none;
		}

		.credits-graffiti-tag {
			transform: rotate(-0.8deg);
		}

		.credits-graffiti-name {
			padding: 0.18rem 0.62rem;
			clip-path: polygon(1% 8%, 99% 5%, 95% 93%, 7% 100%, 0 36%);
			background:
				radial-gradient(circle at 18% 76%, rgba(255, 122, 0, 0.22) 0 5px, transparent 8px),
				radial-gradient(circle at 69% 27%, rgba(10, 10, 10, 0.16) 0 4px, transparent 7px),
				linear-gradient(18deg, transparent 0 56%, rgba(255, 122, 0, 0.18) 57% 61%, transparent 62% 100%),
				#fffaf1;
			transform: rotate(0.55deg);
		}

		.credits-graffiti-chip {
			margin: 0.08rem;
			clip-path: polygon(5% 4%, 100% 10%, 94% 96%, 0 90%, 2% 34%);
			background:
				radial-gradient(circle at 78% 22%, rgba(10, 10, 10, 0.2) 0 2px, transparent 5px),
				linear-gradient(154deg, transparent 0 38%, rgba(255, 122, 0, 0.2) 39% 44%, transparent 45% 100%),
				#fff8ec;
			box-shadow:
				4px 5px 0 rgba(10, 10, 10, 0.58),
				0 0 18px rgba(255, 122, 0, 0.18);
		}

		.credits-graffiti-chip:nth-child(2) {
			clip-path: polygon(0 12%, 96% 2%, 100% 82%, 6% 96%, 3% 56%);
			transform: rotate(-0.5deg);
		}

		.credits-graffiti-chip:nth-child(3) {
			clip-path: polygon(3% 0, 98% 14%, 93% 92%, 1% 100%, 6% 44%);
			transform: rotate(0.6deg);
		}

		.credits-graffiti-chip:nth-child(4) {
			clip-path: polygon(6% 10%, 100% 0, 96% 100%, 0 86%, 3% 42%);
			transform: rotate(-0.25deg);
		}

		.credits-graffiti-back {
			position: relative;
			padding: 0.18rem 0.72rem;
			background:
				radial-gradient(circle at 18% 30%, rgba(10, 10, 10, 0.2) 0 3px, transparent 6px),
				radial-gradient(circle at 84% 72%, rgba(255, 122, 0, 0.22) 0 5px, transparent 8px),
				linear-gradient(21deg, transparent 0 43%, rgba(10, 10, 10, 0.13) 44% 47%, transparent 48% 100%),
				#fff8ec;
			clip-path: polygon(4% 6%, 100% 14%, 95% 91%, 0 100%, 2% 46%);
			box-shadow:
				5px 6px 0 rgba(10, 10, 10, 0.62),
				0 0 18px rgba(255, 122, 0, 0.2);
			transform: rotate(-0.4deg);
		}

		.abnormal-button {
			position: relative;
			isolation: isolate;
			overflow: hidden;
			min-width: min(88vw, 28rem);
			border: 0;
			clip-path: polygon(2% 10%, 98% 2%, 96% 88%, 4% 98%, 0 42%);
			background: #ff7a00;
			box-shadow:
				8px 10px 0 rgba(10, 10, 10, 0.72),
				inset 10px -8px 0 rgba(10, 10, 10, 0.12),
				inset -12px 9px 0 rgba(255, 255, 255, 0.08),
				0 18px 42px rgba(0, 0, 0, 0.2),
				0 0 42px rgb(255, 123, 0);
			text-shadow:
				2px 2px 0 rgba(10, 10, 10, 0.66),
				-1px 0 0 rgba(255, 231, 196, 0.26);
			transform: rotate(-1deg);
			transition-property: color, box-shadow, transform, filter;
		}

		.abnormal-button:nth-child(2) {
			clip-path: polygon(4% 4%, 100% 12%, 94% 96%, 0 88%, 2% 38%);
			transform: rotate(0.7deg);
		}

		.abnormal-button:nth-child(3) {
			clip-path: polygon(0 14%, 96% 0, 100% 78%, 7% 100%, 3% 58%);
			transform: rotate(-0.45deg);
		}

		.abnormal-button::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			clip-path: inherit;
			background:
				radial-gradient(circle at 9% 24%, rgba(10, 10, 10, 0.34) 0 2px, transparent 3px),
				radial-gradient(circle at 27% 76%, rgba(255, 255, 255, 0.2) 0 4px, transparent 6px),
				radial-gradient(circle at 68% 30%, rgba(10, 10, 10, 0.28) 0 5px, transparent 7px),
				radial-gradient(circle at 91% 62%, rgba(255, 255, 255, 0.18) 0 3px, transparent 5px),
				linear-gradient(101deg, transparent 0 18%, rgba(10, 10, 10, 0.22) 19% 21%, transparent 22% 100%),
				linear-gradient(-8deg, transparent 0 54%, rgba(255, 255, 255, 0.16) 55% 58%, transparent 59% 100%),
				linear-gradient(172deg, transparent 0 72%, rgba(10, 10, 10, 0.2) 73% 75%, transparent 76% 100%);
			mix-blend-mode: soft-light;
			opacity: 0.92;
			transform: translate3d(0, 0, 0);
			transition: transform 180ms ease, opacity 180ms ease;
		}

		.abnormal-button:nth-child(2)::before {
			background:
				radial-gradient(circle at 16% 68%, rgba(255, 255, 255, 0.18) 0 5px, transparent 7px),
				radial-gradient(circle at 39% 26%, rgba(10, 10, 10, 0.3) 0 3px, transparent 5px),
				radial-gradient(circle at 74% 79%, rgba(10, 10, 10, 0.26) 0 6px, transparent 8px),
				radial-gradient(circle at 88% 18%, rgba(255, 255, 255, 0.22) 0 2px, transparent 4px),
				linear-gradient(14deg, transparent 0 26%, rgba(10, 10, 10, 0.2) 27% 30%, transparent 31% 100%),
				linear-gradient(156deg, transparent 0 39%, rgba(255, 255, 255, 0.15) 40% 45%, transparent 46% 100%),
				linear-gradient(86deg, transparent 0 80%, rgba(10, 10, 10, 0.24) 81% 83%, transparent 84% 100%);
		}

		.abnormal-button:nth-child(3)::before {
			background:
				radial-gradient(circle at 8% 80%, rgba(10, 10, 10, 0.32) 0 4px, transparent 6px),
				radial-gradient(circle at 33% 42%, rgba(255, 255, 255, 0.2) 0 2px, transparent 4px),
				radial-gradient(circle at 58% 18%, rgba(10, 10, 10, 0.28) 0 7px, transparent 9px),
				radial-gradient(circle at 82% 70%, rgba(255, 255, 255, 0.16) 0 5px, transparent 8px),
				linear-gradient(168deg, transparent 0 15%, rgba(255, 255, 255, 0.15) 16% 19%, transparent 20% 100%),
				linear-gradient(42deg, transparent 0 57%, rgba(10, 10, 10, 0.24) 58% 62%, transparent 63% 100%),
				linear-gradient(114deg, transparent 0 72%, rgba(255, 255, 255, 0.12) 73% 78%, transparent 79% 100%);
		}

		.abnormal-button::after {
			content: '';
			position: absolute;
			inset: -2px;
			z-index: -2;
			clip-path: polygon(1% 8%, 99% 4%, 97% 91%, 3% 99%, 0 43%);
			background: rgb(245, 94, 48);
			transform: translate(5px, 5px) rotate(0.35deg);
		}

		.abnormal-button span {
			position: relative;
			z-index: 1;
			display: inline-block;
		}

		.abnormal-button:hover,
		.abnormal-button:focus-visible {
			filter: saturate(1.16) contrast(1.08);
			box-shadow:
				10px 12px 0 rgba(10, 10, 10, 0.76),
				0 20px 46px rgba(0, 0, 0, 0.28),
				0 0 54px rgba(255, 122, 0, 0.42);
			transform: rotate(0.25deg) scale(1.05);
		}

		.abnormal-button:hover::before,
		.abnormal-button:focus-visible::before {
			opacity: 1;
			transform: translate3d(-3px, 2px, 0) scale(1.04) rotate(-0.4deg);
		}

		.abnormal-button:nth-child(2):hover::before,
		.abnormal-button:nth-child(2):focus-visible::before {
			transform: translate3d(4px, -2px, 0) scale(1.05) rotate(0.6deg);
		}

		.abnormal-button:nth-child(3):hover::before,
		.abnormal-button:nth-child(3):focus-visible::before {
			transform: translate3d(2px, 3px, 0) scale(1.03) rotate(-0.9deg);
		}

		.abnormal-button:hover span,
		.abnormal-button:focus-visible span {
			transform: translate(-1px, 1px) skewX(-3deg);
		}

		@media (max-width: 640px) {
			.abnormal-button {
				min-width: min(88vw, 21rem);
				padding-inline: 1.5rem;
				font-size: 2rem;
			}
		}
	</style>
</div>
