<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let videoId = '';
	export let videoURL = '';
	// let videoTitle = '';
	let isReady = false;

	$: if (isReady === true) {
		if(!!videoURL) {
			const matched = videoURL.match(/.*watch\?v=([^&]+).*/);
			if (Array.isArray(matched) && matched.length == 2) {
				videoId = `${matched[1]}`;
				player.loadVideoById(videoId);
			} else {
				videoId = "";
				player.loadVideoById(videoId);
			}
		} else {
			videoId = "";
			if (!!player) {
				player.loadVideoById(videoId);
			}
		}
	} 
	
	let container;
	let player;

	// export let initialVideoId = '';

	function onPlayerReady() {
		isReady = true;
	}

	function onPlayerStateChange(event) {
		// videoTitle = event.target.getVideoData().title;
		videoId = event.target.getVideoData().video_id;
		videoURL = !!videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
	}

	onMount(() => {
		debugger;
		function load() {
			player = new window.YT.Player(container, {
				height: '100%',
				width: '100%',
				// videoId: videoId,
				playerVars: { autoplay: 1 },
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
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
		<div class="field">
			<div class="control">
				<label class="label">URL
					<input
						class="input"
						type="text"
						bind:value={videoURL}
						placeholder="URL of the video"
						required={true}
					/>
					<br/>
					<div class="columns">
						<div class="column is-three-fifths">
							<div class="">
								<div class="iframe-container">
									<div bind:this={container}/>
								</div>
							</div>
						</div>
					</div>
				</label>
			</div>
		</div>
	</div>
</div>	


