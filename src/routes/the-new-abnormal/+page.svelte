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
				countdown = 3;
				isCounting = false;
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
		<div class="absolute inset-0 bg-deep-black/35"></div>
		<div class="orange-wash absolute inset-0"></div>
	</div>

	<div class="relative z-10 text-center fade-in">
		{#if !isCounting && !showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="w-2 h-2 bg-soft-white animate-pulse"></div>
				<div class="flex flex-col gap-4">
					<button
						on:click={startCountdown}
						class="abnormal-button px-20 py-5 border-1 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						Find Your Way
					</button>
					<button
						on:click={() => showCredits = true}
						class="abnormal-button px-20 py-5 border-1 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						Credits
					</button>
					<button
						on:click={goAlbumSelect}
						class="abnormal-button px-20 py-5 border-1 text-soft-white/90 hover:text-soft-white transition-all hover:scale-105 tracking-[0.08em] uppercase text-4xl"
					>
						Back
					</button>
				</div>
			</div>
		{:else if showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="flex flex-col gap-8 text-left p-8 md:p-10 max-w-2xl">
					<div>
						<h2 class="text-lg uppercase tracking-widest text-soft-white/100 mb-2 font-medium">Developed by</h2>
						<a
							href="https://www.linkedin.com/in/pedro-hirschle"
							target="_blank"
							rel="noopener noreferrer"
							class="px-2 py-1 text-4xl bg-deep-black/75 text-soft-white/80 hover:text-soft-white transition-colors"
						>
							Pedro Hirschle
						</a>
					</div>

					<div>
						<h2 class="text-lg uppercase tracking-widest text-soft-white/100 mb-2 font-medium">Techs n' Stacks</h2>
						<div class="flex flex-wrap gap-0">
							<span class="px-2 py-1 bg-deep-black/75 text-lg text-soft-white/80">SvelteKit</span>
							<span class="px-2 py-1 bg-deep-black/75 text-lg text-soft-white/80">TypeScript</span>
							<span class="px-2 py-1 bg-deep-black/75 text-lg text-soft-white/80">TailwindCSS</span>
							<span class="px-2 py-1 bg-deep-black/75 text-lg text-soft-white/80">Howler.js</span>
						</div>
					</div>
				</div>
				<button
					on:click={() => showCredits = false}
					class="flex items-center gap-2 text-soft-white/100 hover:text-soft-white transition-all hover:scale-105 text-3xl"
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
				<div class="w-2 h-2 bg-soft-white animate-pulse"></div>
				<p class="text-6xl text-soft-white/90 tracking-[0.08em] uppercase">
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
			filter: sepia(0.28) saturate(1.38) hue-rotate(-13deg) contrast(1.08);
			transform-origin: center center;
		}

		.orange-wash {
			background:
				radial-gradient(circle at 50% 42%, rgba(255, 131, 43, 0.34), transparent 32%),
				radial-gradient(circle at 12% 78%, rgba(245, 92, 28, 0.2), transparent 28%),
				linear-gradient(180deg, rgba(255, 110, 31, 0.16), rgba(93, 29, 12, 0.4) 52%, rgba(10, 10, 10, 0.82));
			mix-blend-mode: screen;
			opacity: 0.78;
		}

		.abnormal-button {
			min-width: min(88vw, 28rem);
			border-color: rgba(255, 181, 98, 0.42);
			background:
				linear-gradient(90deg, rgba(255, 114, 37, 0.14), rgba(10, 10, 10, 0.56), rgba(255, 150, 60, 0.14)),
				rgba(10, 10, 10, 0.42);
			box-shadow: 0 18px 42px rgba(0, 0, 0, 0.24), 0 0 34px rgba(255, 101, 31, 0.16);
			text-shadow: 0 2px 0 rgba(0, 0, 0, 0.34);
			transition-property: color, border-color, box-shadow, transform, background-color;
		}

		.abnormal-button:hover,
		.abnormal-button:focus-visible {
			border-color: rgba(255, 216, 154, 0.82);
			box-shadow: 0 20px 46px rgba(0, 0, 0, 0.32), 0 0 44px rgba(255, 117, 35, 0.3);
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
