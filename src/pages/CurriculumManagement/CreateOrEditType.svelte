
<form use:form enctype="multipart/form-data">
	<input
		class="input"
		type="hidden"
		name={parent_id_key}
		bind:value={$data[parent_id_key]}
	/>
	
	<div class="field">
		<figure class="image is-128x128">
			<img
				src={$data[icon_id_key]
					? getResourcesAPIByID($data[icon_id_key])
					: 
					$data[icon_file_preview_field_key]
					? $data[icon_file_preview_field_key]
					: `https://bulma.io/images/placeholders/128x128.png`}
				alt=""
			/>
		</figure>
		<label class="label">Icon
			<div class="control">
				<InputFileContainer>
					<input
						class="file-input"
						type="file"
						name={icon_file_field_key}
						on:change={e => handleImageChange(e, dataURI => setFields(icon_file_preview_field_key , dataURI, true))}
					/>
				</InputFileContainer>
			</div>
		</label>
	</div>
	<div class="field">
		<label class="label">Description
			<div class="control">
				<input
					class="input"
					type="text"
					name={description_field_key}
					bind:value={$data[description_field_key]}
					required={true}
				/>
			</div>
		</label>
	</div>

	<div class="field">
		<label class="label" for="select-accessible">Accessible to
			<div class="notification ex3 p-2" id="select-accessible">
				{#each partners as { full_name }}
					<label class="checkbox">
						<input type="checkbox">&nbsp;&nbsp;{full_name} (and their parents registered this course)
					</label>
					<br>
				{/each}
				<br>
			</div>
		</label>
	</div>
</form>