<script>
	let name = '';
	let real;

	$: if (!!name) {
		const matched = name.match(/.*watch\?v=([^&]+).*/);
		if (Array.isArray(matched) && matched.length == 2) {
			real = `https://www.youtube.com/embed/${matched[1]}`;
		}
	}
</script>
<iframe width="420" height="345" src={!!real ? real : ""} title="preview"></iframe>
<input bind:value={name} placeholder="enter youtube URL" />
