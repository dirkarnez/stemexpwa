<script>
    export let open = false;
	export let callback;
</script>

<div class={`modal ${open ? "is-active" : ""}`}>
	<div class="modal-background" />
	<div class="modal-content">
		<p class="image is-4by3">
			<img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
		</p>
	</div>
	<button class="modal-close is-large" aria-label="close" on:click={() => { open = false; callback(open)}}/>
</div>
