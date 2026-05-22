<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';

	let countdown = 3;
	let timer: ReturnType<typeof setInterval>;
	let isCounting = false;
	let showCredits = false;

	const startCountdown = () => {
		isCounting = true;
		timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				goto('/listen');
			}
		}, 1000);
	};

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="min-h-screen flex items-center justify-center relative font-marlboro">
	<div class="grain-overlay"></div>
	
	<div class="absolute inset-0 overflow-hidden">
		<img 
			src="/visuals/menu-bg.jpg" 
			alt="Reality Awaits"
			class="w-full h-full object-cover animate-zoom-in"
			style="filter: sepia(1) hue-rotate(-10deg);"
		/>
		<div class="absolute inset-0 bg-deep-black/30"></div>
	</div>

	<div class="relative z-10 text-center fade-in">
		{#if !isCounting && !showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="w-2 h-2 bg-soft-white rounded-full animate-pulse"></div>
				<div class="flex flex-col gap-4">
					<button 
						on:click={startCountdown}
						class="px-20 py-5 bg-white/5 border-2 border-soft-white/30 hover:border-soft-white/70 text-soft-white/70 hover:text-soft-white transition-all hover:scale-105 tracking-[0.15em] uppercase text-4xl"
					>
						Hit The Road
					</button>
					<button 
						on:click={() => showCredits = true}
						class="px-20 py-5 bg-white/5 border-2 border-soft-white/30 hover:border-soft-white/70 text-soft-white/70 hover:text-soft-white transition-all hover:scale-105 tracking-[0.15em] uppercase text-4xl"
					>
						Credits
					</button>
				</div>
			</div>
		{:else if showCredits}
			<div class="flex flex-col items-center gap-6">
				<div class="w-2 h-2 bg-soft-white rounded-full animate-pulse"></div>
				<div class="flex flex-col gap-8 text-left bg-white/5 border-2 border-soft-white/30 rounded-2xl p-8 md:p-10 max-w-2xl">
					<div>
						<h2 class="text-lg uppercase tracking-widest text-soft-white/100 mb-3 font-medium">Developed by</h2>
						<p class="text-4xl text-soft-white mb-2">Pedro Hirschle</p>
						<a 
							href="https://linkedin.com/in/pedrohirschle" 
							target="_blank" 
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-black hover:text-soft-white transition-colors text-xl"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
								<rect x="2" y="9" width="4" height="12"></rect>
								<circle cx="4" cy="4" r="2"></circle>
							</svg>
							LinkedIn
						</a>
					</div>

					<div>
						<h2 class="text-lg uppercase tracking-widest text-soft-white/100 mb-3 font-medium">Techs n' Stacks</h2>
						<div class="flex flex-wrap gap-0">
							<span class="px-4 py-2 bg-dark-gray text-md text-soft-white/70">SvelteKit</span>
							<span class="px-4 py-2 bg-dark-gray text-md text-soft-white/70">TypeScript</span>
							<span class="px-4 py-2 bg-dark-gray text-md text-soft-white/70">TailwindCSS</span>
							<span class="px-4 py-2 bg-dark-gray text-md text-soft-white/70">Howler.js</span>
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
				<div class="w-2 h-2 bg-soft-white rounded-full animate-pulse"></div>
				<p class="text-6xl text-soft-white/70 tracking-[0.15em] uppercase">
					Listening experience in {countdown}s
				</p>
			</div>
		{/if}
	</div>

	<style>
		@keyframes zoom-in {
			0% {
				transform: scale(1);
			}
			100% {
				transform: scale(1.05);
			}
		}
		.animate-zoom-in {
			animation: zoom-in 7s ease-out forwards;
		}
	</style>
</div>
