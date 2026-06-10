<script lang="ts">
	import { player } from '$lib/stores/playerStore';
	import { onMount, tick } from 'svelte';

	export let variant: 'reality' | 'abnormal' = 'reality';

	let titleContainer: HTMLDivElement;
	let titleText: HTMLSpanElement;
	let isOverflowing = false;

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const handleSeek = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		player.seek(Number(target.value));
	};

	const handleVolume = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		player.setVolume(Number(target.value));
	};

	const checkOverflow = async () => {
		await tick();
		if (titleContainer && titleText) {
			isOverflowing = titleText.scrollWidth > titleContainer.clientWidth;
		}
	};

	$: if ($player.currentTrack) {
		checkOverflow();
	}

	onMount(() => {
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => window.removeEventListener('resize', checkOverflow);
	});
</script>

<div class="glass dust-card player-shell rounded-2xl p-6 md:p-8 red-glow" class:abnormal-player={variant === 'abnormal'}>
	<div class="dust-card-content">
	{#if $player.showLyrics}
		<div class="h-full">
			<div class="flex items-center justify-between mb-6">
				<button 
					on:click={player.toggleLyrics}
					class="flex items-center gap-2 text-soft-white/60 hover:text-soft-white transition-all hover:scale-105"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>
					<span class="text-sm tracking-wider">BACK</span>
				</button>
				<h3 class="text-sm uppercase tracking-widest text-soft-white/50 font-medium">LYRICS</h3>
			</div>
			<div class="max-h-80 overflow-y-auto text-soft-white/80 leading-relaxed whitespace-pre-wrap text-justify">
				{$player.currentTrack?.lyrics || "Lyrics not available"}
			</div>
		</div>
	{:else}
		{#if $player.currentTrack}
			<div class="flex items-center gap-6 mb-8">
				<div class="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-2xl">
					<img 
						src={$player.currentTrack.cover} 
						alt={$player.currentTrack.title}
						class="w-full h-full object-cover"
						style={variant === 'abnormal' ? 'filter: saturate(1.08) contrast(1.04);' : 'filter: sepia(0.6) hue-rotate(-10deg);'}
					/>
				</div>
				<div class="flex-1 min-w-0 overflow-hidden" bind:this={titleContainer}>
					<span class="absolute opacity-0 text-xl md:text-2xl font-medium whitespace-nowrap pointer-events-none" bind:this={titleText}>
						{$player.currentTrack.title}
					</span>
					{#key $player.currentTrack.id}
						{#if isOverflowing}
							<div class="animate-marquee whitespace-nowrap inline-block">
								<h2 class="text-xl md:text-2xl font-medium text-soft-white inline-block">
									{$player.currentTrack.title}
								</h2>
								<span class="inline-block w-8"></span>
								<h2 class="text-xl md:text-2xl font-medium text-soft-white inline-block">
									{$player.currentTrack.title}
								</h2>
							</div>
						{:else}
							<h2 class="text-xl md:text-2xl font-medium text-soft-white truncate">
								{$player.currentTrack.title}
							</h2>
						{/if}
					{/key}
					<p class="text-soft-white/60 text-lg">{$player.currentTrack.artist}</p>
				</div>
			</div>
		{/if}

		<div class="mb-6">
			<input 
				type="range" 
				min="0" 
				max={$player.duration || 100}
				value={$player.progress}
				on:input={handleSeek}
				class="w-full h-2 rounded-full appearance-none cursor-pointer transition-all"
				style={variant === 'abnormal' ? 'background: rgba(255, 122, 0, 0.2); accent-color: #ff7a00;' : 'background: rgba(170, 146, 94, 0.11); accent-color: #e0e0e0;'}
			/>
			<div class="flex justify-between text-sm text-soft-white/70 mt-2 font-mono">
				<span>{formatTime($player.progress)}</span>
				<span>{formatTime($player.duration)}</span>
			</div>
		</div>

		<div class="grid grid-cols-[1fr_auto_1fr] items-center mb-6">
			<div class="flex items-center justify-end gap-6">
				<button 
					on:click={player.previous}
					class="w-12 h-12 flex items-center justify-center text-soft-white/70 hover:text-soft-white transition-all hover:scale-110"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="19 20 9 12 19 4 19 20"></polygon>
						<line x1="5" y1="19" x2="5" y2="5"></line>
					</svg>
				</button>
			</div>
			
			<button 
				on:click={player.togglePlay}
				class="w-16 h-16 flex items-center justify-center play-button text-soft-white rounded-full transition-all hover:scale-105 shadow-lg mx-6"
				class:abnormal-play={variant === 'abnormal'}
			>
				{#if $player.isPlaying}
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="6" y="4" width="4" height="16"></rect>
						<rect x="14" y="4" width="4" height="16"></rect>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
						<polygon points="5 3 19 12 5 21 5 3"></polygon>
					</svg>
				{/if}
			</button>
			
			<div class="flex items-center justify-start gap-2">
				<button 
					on:click={player.next}
					class="w-12 h-12 flex items-center justify-center text-soft-white/70 hover:text-soft-white transition-all hover:scale-110"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="5 4 15 12 5 20 5 4"></polygon>
						<line x1="19" y1="5" x2="19" y2="19"></line>
					</svg>
				</button>
				<button 
					on:click={player.toggleLyrics}
					class="w-12 h-12 flex items-center justify-center text-soft-white/70 hover:text-soft-white transition-all hover:scale-110"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9 18V5l12-2v13"></path>
						<circle cx="6" cy="18" r="3"></circle>
						<circle cx="18" cy="16" r="3"></circle>
					</svg>
				</button>
			</div>
		</div>

		<div class="flex items-center gap-3">
			{#if $player.volume === 0}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-soft-white/60">
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
					<line x1="23" y1="9" x2="17" y2="15"></line>
					<line x1="17" y1="9" x2="23" y2="15"></line>
				</svg>
			{:else if $player.volume < 0.5}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-soft-white/60">
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
					<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-soft-white/60">
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
					<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
				</svg>
			{/if}
			<input 
				type="range" 
				min="0" 
				max="1" 
				step="0.01"
				value={$player.volume}
				on:input={handleVolume}
				class="flex-1 h-2 rounded-full appearance-none cursor-pointer transition-all"
				style={variant === 'abnormal' ? 'background: rgba(255, 122, 0, 0.2); accent-color: #ff7a00;' : 'background: rgba(170, 146, 94, 0.11); accent-color: #e0e0e0;'}
			/>
		</div>
	{/if}
	</div>
</div>

<style>
	.play-button {
		background: #746751ff;
		box-shadow: 0 10px 15px -3px rgba(116, 103, 81, 0.3);
	}

	.play-button:hover {
		background: rgba(116, 103, 81, 0.9);
	}

	.abnormal-player.glass.dust-card {
		position: relative;
		isolation: isolate;
		overflow: visible;
		border: 0;
		border-radius: 4px;
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		color: #14354d;
		box-shadow: none;
		transform: rotate(-0.18deg);
	}

	.abnormal-player.dust-card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		border: 1px solid rgba(20, 53, 77, 0.18);
		border-radius: 4px 2px 5px 3px;
		background:
			radial-gradient(circle at 12% 20%, rgba(255, 111, 18, 0.18) 0 2px, transparent 4px),
			radial-gradient(circle at 78% 18%, rgba(20, 53, 77, 0.12) 0 3px, transparent 6px),
			radial-gradient(circle at 89% 72%, rgba(255, 111, 18, 0.13) 0 5px, transparent 9px),
			linear-gradient(2deg, rgba(20, 53, 77, 0.08) 0 1px, transparent 1px 100%),
			linear-gradient(91deg, rgba(255, 111, 18, 0.08) 0 1px, transparent 1px 100%),
			#f2ead8;
		background-size:
			auto,
			auto,
			auto,
			100% 14px,
			18px 100%,
			auto;
		box-shadow:
			inset 0 0 0 3px rgba(255, 255, 255, 0.18),
			inset 0 -20px 32px rgba(189, 109, 34, 0.08);
		animation: none;
		filter: none;
		opacity: 1;
		transform: none;
		pointer-events: none;
	}

	.abnormal-player .dust-card-content {
		position: relative;
		z-index: 1;
	}

	.abnormal-player :where(h2, h3, p, span, button, svg) {
		color: #14354d;
		stroke: currentColor;
	}

	.abnormal-player :where(button:hover, button:focus-visible) {
		color: #ef6515;
	}

	.abnormal-player img {
		border: 0;
		border-radius: 3px;
		box-shadow: 5px 6px 0 rgba(20, 53, 77, 0.28);
	}

	.abnormal-play {
		border-radius: 5px;
		width: 3.55rem;
		height: 3.55rem;
		background: #ef6515;
		box-shadow:
			4px 5px 0 rgba(20, 53, 77, 0.42),
			0 0 0 2px rgba(255, 248, 236, 0.76);
		color: #fff8ec;
		clip-path: polygon(4% 10%, 96% 2%, 100% 82%, 12% 100%, 0 42%);
	}

	.abnormal-play:hover {
		background: #ff7a00;
		color: #fff8ec;
	}
</style>
