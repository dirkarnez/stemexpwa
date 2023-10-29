<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { WrappedFetch, WrappedFetchPOST, WrappedFetchPOSTMultipart } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link, navigate } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import { createForm } from 'felte';
    //import { WrappedFetch } from "../../utils/fetch";

    const description_field_key = "description";
    const icon_id_key = "icon_id";
	const parent_id_key = "parent_id";
    const icon_file_field_key = "icon_file";
	const id_field_key = "id";

	const dispatch = createEventDispatcher();

    export let id;
	export let parentId;

    // export let previousPath;

	let isCourse = false;

    let wrappedFetchCurriculumEntry = null;

    const { form, data, setFields } = createForm({ 
        onSubmit: (values) => {
			debugger;
			const [  wrappedFetchPromise , abort ] = WrappedFetchPOSTMultipart("/api/curriculum-entry", values);
			wrappedFetchPromise
			.then(() => {
				alert("OK")
				dispatch('done');
			})
			.catch(err => {
				alert(`Not OK: ${err}`)
			});
        },
    });

    onMount(() => {
		if (isNullOrEmpty(id)) {
			setFields(description_field_key, "", true);
			setFields(icon_id_key, "", true);
			setFields(parent_id_key, parentId, true);
		} else {
			const [  _wrappedFetchCurriculumEntry ] = WrappedFetch(`/api/curriculum?id=${id}`);
			wrappedFetchCurriculumEntry = _wrappedFetchCurriculumEntry;
			wrappedFetchCurriculumEntry.then(_data => {
				setFields(id_field_key, _data[id_field_key], true);
				setFields(description_field_key, _data[description_field_key], true);
				setFields(icon_id_key, _data[icon_id_key], true);
				setFields(parent_id_key, _data[parent_id_key], true);
				setFields("youtube_video_entries", (_data["youtube_video_entries"] || []), true);
				setFields("blog_entries", (_data["blog_entries"] || []), true);
				setFields("information_entries", (_data["information_entries"] || []), true);
			})
		}
	});

	let previewImageSrc = '';
	function handleImageChange(event) {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				previewImageSrc = event.target.result;
			};

			reader.readAsDataURL(file);
		}
	}
</script>

<div class="columns">
	<div class="column">
		<div class="content">
			<!-- <p>
				<a href={previousPath} class="button is-danger" use:link>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-chevron-left align-middle">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
					Back
				</a>
			</p> -->
		</div>
	</div>
</div>

<form use:form enctype="multipart/form-data">
	<div class="field">
		<figure class="image is-128x128">
                <img src={($data[icon_id_key] ? getResourcesAPIByID($data[icon_id_key]) : (previewImageSrc ? previewImageSrc : `https://bulma.io/images/placeholders/96x96.png`))} alt=""/>
            </figure>
		<br />
		<label class="label">Icon
			<div class="control">
				<input class="input" type="file" name={icon_file_field_key} on:change={handleImageChange}/>
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


	{#each ($data.youtube_video_entries || []) as youtube_video_entry, index}
		<div class="field">
			<label class="label">YouTube URL
				<div class="control">
					<input
						class="input"
						type="text"
						name={"youtube_video_entries.{index}.url"}
						bind:value={youtube_video_entry.url}
						required={true}
					/>
				</div>
			</label>
		</div>
		<!-- <div>
			<input name= value={}/>
			<button type="button" on:click="{addInterest(index + 1)}">
				Add Interest
			</button>
			<button type="button" on:click="{removeInterest(index)}">
				Remove Interest
			</button>
		</div> -->
	{/each}

	{#each ($data.blog_entries || []) as blog_entry, index}
		<div class="field">
			<label class="label">Blog entries
				<div class="control">
					<input
						class="input"
						type="text"
						name={"blog_entries.{index}.external_url"}
						bind:value={blog_entry.external_url}
						required={true}
					/>
				</div>
			</label>
		</div>
		<!-- <div>
			<input name= value={}/>
			<button type="button" on:click="{addInterest(index + 1)}">
				Add Interest
			</button>
			<button type="button" on:click="{removeInterest(index)}">
				Remove Interest
			</button>
		</div> -->
	{/each}


	{#each ($data.information_entries || []) as information_entry, index}
		<div class="field">
			<label class="label">Information entries
				<div class="control">
					<input
						class="input"
						type="text"
						name={"information_entries.{index}.title"}
						bind:value={information_entry.title}
						required={true}
					/>
				</div>
			</label>
		</div>
		<!-- <div>
			<input name= value={}/>
			<button type="button" on:click="{addInterest(index + 1)}">
				Add Interest
			</button>
			<button type="button" on:click="{removeInterest(index)}">
				Remove Interest
			</button>
		</div> -->
	{/each}

	
<!-- 
	blog_entries

	information_entries -->

	<div class="field is-grouped">
		<div class="control">
			<button class="button is-link">Save</button>
		</div>
	</div>

	
	<label>
		<input type="checkbox" bind:checked={isCourse} />
		This item is a course
	</label>

	{#if isCourse}
		<p>Thank you. We will bombard your inbox and sell your personal details.</p>
	{/if}
</form>