<script>
	// 
	// let real;



	import { onMount } from 'svelte';

	let urlInput = '';
	let videoId = '';

	$: if (!!urlInput) {
		const matched = urlInput.match(/.*watch\?v=([^&]+).*/);
		if (Array.isArray(matched) && matched.length == 2) {
			videoId = `${matched[1]}`;
		} else {
			videoId = "";
		}
	} else {
		videoId = "";
	}
	
	let container;
	let player;

	// export let initialVideoId = '';

	function onPlayerReady(event) {
		alert(event.target.getIframe().title);
	}
	onMount(() => {
		debugger;
		player = new YT.Player(container, {
				height: '100%',
				width: '100%',
				videoId: videoId,
				playerVars: { autoplay: 1 },
			events: {
				'onReady': onPlayerReady 
			}

		});
	});
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>
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


