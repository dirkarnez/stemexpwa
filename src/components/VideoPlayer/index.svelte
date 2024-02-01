<script>
  import videoJs from "video.js";
	import { onMount } from 'svelte';

  var options = {};

	let video;

  onMount(() => {
    videoJs(video, options);
  });
</script>

<div style="width: 100%">
  <video bind:this={video} 
    controls
    class="video-js"
    preload="auto"
    data-setup={`{"fluid": true}`}>
    <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
    <track kind="captions"/>
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video
      </a>
    </p>
  </video>
</div>