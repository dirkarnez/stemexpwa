<script>
	export let filename;
</script>

<div class="file has-name">
	<label class="file-label" style="width: 100%;">
		<slot />
		<span class="file-cta">
			<span class="file-icon">
				<i class="fas fa-upload" />
			</span>
			<span class="file-label">Choose a file...</span>
		</span>
		<span class="file-name" style="width: 100%;">
			{!!filename ? filename : ""}
		</span>
	</label>
</div>