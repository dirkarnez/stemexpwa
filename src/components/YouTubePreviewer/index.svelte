<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<script>
	// 
	// let real;



	import { onMount } from 'svelte';

	let urlInput = '';
	let videoId = '';
	let isReady = false;

	$: if (isReady === true) {
		if(!!urlInput) {
			const matched = urlInput.match(/.*watch\?v=([^&]+).*/);
			if (Array.isArray(matched) && matched.length == 2) {
				videoId = `${matched[1]}`;
				player.loadVideoById(videoId);
			} else {
				videoId = "";
				player.loadVideoById(videoId);
			}
		} else {
			videoId = "";
			player.loadVideoById(videoId);
		}
	} 
	
	let container;
	let player;

	// export let initialVideoId = '';

	function onPlayerReady(event) {
		debugger;
		isReady = true;
		debugger;
		alert(event.target.getIframe().title);
	}

	onMount(() => {
		function load() {
			debugger;
			player = new window.YT.Player(container, {
				height: '100%',
				width: '100%',
				// videoId: videoId,
				playerVars: { autoplay: 1 },
				events: {
					'onReady': onPlayerReady 
				}
			});
		}

		if (window.YT) {
			load();
		} else {
			window.onYouTubeIframeAPIReady = load;
		}
	});
</script>


<style>
	.iframe-container {
		overflow: hidden;
		padding-top: 56.25%;
		position: relative;
	}
</style>
<div class="columns">
	<div class="column">
		<div class="iframe-container" bind:this={container}  />
			<!-- <iframe src={!!real ? real : ""} title="preview"></iframe> -->
	</div>
	<div class="column">
		<input bind:value={urlInput} placeholder="enter youtube URL" />
	</div>
</div>	


