<script>
	export let filename;
</script>

<div class="file has-name" style="width: 100%;">
	<label class="file-label">
		<slot />
		<span class="file-cta">
			<span class="file-icon">
				<i class="fas fa-upload" />
			</span>
			<span class="file-label">Choose a file...</span>
		</span>
		<span class="file-name">
			{!!filename ? filename : ""}
		</span>
	</label>
</div>