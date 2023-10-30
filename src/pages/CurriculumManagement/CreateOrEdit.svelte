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


	const youtube_video_entries_field_key = "youtube_video_entries";
	const information_entries_field_key = "information_entries";
	const blog_entries_field_key = "blog_entries";

	const dispatch = createEventDispatcher();

    export let id;
	export let parentId;

	let shouldBeACourse = false;
	let toBeACourse = false;
    // export let previousPath;

    const { form, data, setFields, addField, unsetField } = createForm({ 
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
			_wrappedFetchCurriculumEntry.then(_data => {
				setFields(id_field_key, _data[id_field_key], true);
				setFields(description_field_key, _data[description_field_key], true);
				setFields(icon_id_key, _data[icon_id_key], true);
				setFields(parent_id_key, _data[parent_id_key], true);
				setFields(youtube_video_entries_field_key , (_data[youtube_video_entries_field_key] || []), true);
				setFields(blog_entries_field_key , (_data[blog_entries_field_key] || []), true);
				setFields(information_entries_field_key , (_data[information_entries_field_key] || []), true);
			})
		}

debugger;
		if (!isNullOrEmpty(parentId)) {
			const [  _wrappedFetchShouldBeACourse ] = WrappedFetch(`/api/should-be-a-course?parent-id=${parentId}`);
			_wrappedFetchShouldBeACourse.then(_data => {
				shouldBeACourse = _data["it_should_be_a_course"];
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

	function removeYouTubeVideo(index) {
		return () => unsetField(`${youtube_video_entries_field_key}.${index}`);
	}

	function addYouTubeVideo(index) {
		return () => addField(`${youtube_video_entries_field_key}`, { value: '' }, index);
	}


	function removeBlogEntry(index) {
		return () => unsetField(`${blog_entries_field_key}.${index}`);
	}

	function addBlogEntry(index) {
		return () => addField(`${blog_entries_field_key}`, { value: '' }, index);
	}


	function removeInformationEntry(index) {
		return () => unsetField(`${blog_entries_field_key}.${index}`);
	}

	function addInformationEntry(index) {
		return () => addField(`${blog_entries_field_key}`, { value: '' }, index);
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
			<img
				src={$data[icon_id_key]
					? getResourcesAPIByID($data[icon_id_key])
					: previewImageSrc
					? previewImageSrc
					: `https://bulma.io/images/placeholders/96x96.png`}
				alt=""
			/>
		</figure>
		<br />
		<label class="label">Icon
			<div class="control">
				<input
					class="input"
					type="file"
					name={icon_file_field_key}
					on:change={handleImageChange}
				/>
			</div>
		</label>
	</div>
	<div class="field">
		<label class="label"
			>Description
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

	<label>
		<input type="checkbox" bind:checked={toBeACourse} />
		This item is a course
	</label>

	{#if shouldBeACourse || toBeACourse}
		<section class="hero">
			<h1 class="title">YouTube Videos</h1>
			{#each $data.youtube_video_entries || [] as youtube_video_entry, index}
				<div class="field">
					<label class="label">entry #{index + 1}
						<button type="button" class="button is-danger" style="height: 1rem; vertical-align: middle;" on:click={removeYouTubeVideo(index)}>
							x
						</button>
						<div class="control">
							<input
								class="input"
								type="text"
								name="{youtube_video_entries_field_key}.{index}.title}"
								bind:value={youtube_video_entry.title}
								required={true}
							/>
						</div>
						<div class="control">
							<input
								class="input"
								type="text"
								name="youtube_video_entries.{index}.url"
								bind:value={youtube_video_entry.url}
								required={true}
							/>
						</div>
					</label>
				</div>
			{/each}
			<button type="button" class="button is-primary" on:click={addYouTubeVideo(($data.youtube_video_entries || []).length)}>
				+
			</button>
		</section>
		<section class="hero">
			<h1 class="title">Blog entries</h1>
			{#each $data.blog_entries || [] as blog_entry, index}
				<div class="field">
					<label class="label">entry #{index + 1}
						<button type="button" class="button is-danger" style="height: 1rem; vertical-align: middle;" on:click={removeBlogEntry(index)}>
							x
						</button>
						<div class="control">
							<input
								class="input"
								type="text"
								name="{blog_entries_field_key}.{index}.external_url"
								bind:value={blog_entry.external_url}
								required={true}
							/>
						</div>
						<div class="control">
							<input
								class="input"
								type="text"
								name="{blog_entries_field_key}.{index}.title"
								bind:value={blog_entry.title}
								required={true}
							/>
						</div>
					</label>
				</div>
			{/each}
			<button type="button" class="button is-primary" on:click={addBlogEntry(($data.blog_entries || []).length)}>
				+
			</button>
		</section>

		<section class="hero">
			<h1 class="title">Information entries</h1>
			{#each $data.information_entries || [] as information_entry, index}
				<div class="field">
					<label class="label">entry #{index + 1}
						<button type="button" class="button is-danger" style="height: 1rem; vertical-align: middle;" on:click={removeInformationEntry(index)}>
							x
						</button>
						<figure class="image is-128x128">
							<img
								src={information_entry[icon_id_key]
									? getResourcesAPIByID(information_entry[icon_id_key])
									: previewImageSrc
									? previewImageSrc
									: `https://bulma.io/images/placeholders/96x96.png`}
								alt=""
							/>
						</figure>
						<div class="control">
							<input
								class="input"
								type="file"
								name={icon_file_field_key}
								on:change={handleImageChange}
							/>
						</div>
						<div class="control">
							<input
								class="input"
								type="text"
								name="{information_entries_field_key}.{index}.title"
								bind:value={information_entry.title}
								required={true}
							/>
						</div>
						<!-- <div class="control">
							<input
								class="input"
								type="text"
								name="information_entries.{index}.icon_id"
								bind:value={information_entry.icon_id}
								required={true}
							/>
						</div> -->
						<div class="control">
							<textarea
								class="textarea"
								type="text"
								name="{information_entries_field_key}.{index}.content"
								bind:value={information_entry.content}
								required={true}
							/>
						</div>
					</label>
				</div>
			{/each}
			<button type="button" class="button is-primary" on:click={addInformationEntry(($data.information_entries || []).length)}>
				+
			</button>
		</section>
	{/if}

	<div class="field is-grouped">
		<div class="control">
			<button class="button is-primary">Save</button>
		</div>
	</div>
</form>

<style>
	.hero {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
</style>
