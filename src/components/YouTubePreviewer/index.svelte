<script>
	let name = '';
	let real;

	$: if (!!name) {
		const matched = name.match(/.*watch\?v=([^&]+).*/);
		if (Array.isArray(matched) && matched.length == 2) {
			real = `https://www.youtube.com/embed/${matched[1]}`;
		} else {
			real = "";
		}
	} else {
		real = "";
	}
</script>
<style>
	div {
		overflow: hidden;
		padding-top: 56.25%;
		position: relative;
	}

	iframe {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
</style>
<div>
	<iframe src={!!real ? real : ""} title="preview"></iframe>
</div>

<input bind:value={name} placeholder="enter youtube URL" />
