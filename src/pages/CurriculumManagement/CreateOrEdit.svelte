<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { WrappedFetch, WrappedFetchPOST, WrappedFetchPOSTMultipart } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link, navigate } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { handleImageChange } from "../../utils/file";
	import { isNullOrEmpty } from "../../utils/strings";
    import { createForm } from 'felte';
	import InputFileContainer from "../../components/InputFileContainer.svelte";
	import YouTubePreviewer from "../../components/YouTubePreviewer/index.svelte";
	

    //import { WrappedFetch } from "../../utils/fetch";

    const description_field_key = "description";
    const icon_id_key = "icon_id";
	const parent_id_key = "parent_id";
    const icon_file_field_key = "icon_file";
    const icon_file_preview_field_key = "icon_file_preview";
	const id_field_key = "id";


	const youtube_video_entries_field_key = "youtube_video_entries";
	const youtube_video_entries_title_field_key = "title";
	const youtube_video_entries_url_field_key = "url";

	const information_entries_field_key = "information_entries";
	const information_entries_title_field_key = "title";
	const information_entries_icon_id_field_key = "icon_id";
	const information_entries_icon_file_field_key = "icon_file";
	const information_entries_icon_file_preview_field_key = "icon_file_preview";
	const information_entries_content_field_key = "content";

	const blog_entries_field_key = "blog_entries";
	const blog_entries_external_url_field_key = "external_url";
	const blog_entries_title_field_key = "title";

	const dispatch = createEventDispatcher();

    export let id;
	export let parentId;

	let shouldBeACourse = false;
	let toBeACourse = false;
    // export let previousPath;

    const { form, data, setFields, addField, unsetField } = createForm({ 
        onSubmit: (values, context) => {
			// const { 
			// 	[icon_file_preview_field_key]: undefined,
			// 	[information_entries_field_key]: [], 
			// 	...tempValues 
			// } = { [information_entries_field_key]: (values[information_entries_field_key] || []), ...values};

			// const finalValues = {
			// 	[information_entries_field_key]: (values[information_entries_field_key] || [])
			// 		.map(information_entry => {
			// 			const { [information_entries_icon_file_preview_field_key]: undefined, ...obj  } = information_entry;
			// 			return ({...obj})
			// 		}),
			// 	...tempValues
			// };
			const formData = new FormData(context.event.target);

		

			// console.log(finalValues);

			debugger;

			const [  wrappedFetchPromise , abort ] = WrappedFetchPOSTMultipart("/api/curriculum-entry", formData);
			wrappedFetchPromise
			.then(() => {
				alert("OK");
				dispatch('done');
			})
			.catch(err => {
				alert(`Not OK: ${err}`)
			});
        },
    });

	
	$: if (toBeACourse) {
		if (($data[youtube_video_entries_field_key] || []).length < 1) {
			addYouTubeVideo(0)();
		}

		if (($data[information_entries_field_key] || []).length < 1) {
			addInformationEntry(0)();
		}

		if (($data[blog_entries_field_key] || []).length < 1) {
			addBlogEntry(0)();
		}
	} else {
		Array(($data[youtube_video_entries_field_key] || []).length).fill(0).forEach((_, i) => {
			removeYouTubeVideo(i);
		});

		Array(($data[information_entries_field_key] || []).length).fill(0).forEach((_, i) => {
			removeInformationEntry(i);
		});

		Array(($data[blog_entries_field_key] || []).length).fill(0).forEach((_, i) => {
			removeBlogEntry(i);
		});
	}

    onMount(() => {
		if (isNullOrEmpty(id)) {
			setFields(description_field_key, "", true);
			setFields(icon_id_key, "", true);
			setFields(parent_id_key, parentId, true);
		} else {
			const [  _wrappedFetchCurriculumEntry ] = WrappedFetch(`/api/curriculum?id=${id}&top-level=${!!parentId ? "false" : "true"}`);

			_wrappedFetchCurriculumEntry.then(_data => {
				setFields({
					[id_field_key]: _data[id_field_key],
					[description_field_key]: _data[description_field_key],
					[icon_id_key]: _data[icon_id_key],
					[parent_id_key]: _data[parent_id_key],
					[blog_entries_field_key]: (_data[blog_entries_field_key] || []),
					[youtube_video_entries_field_key]: (_data[youtube_video_entries_field_key] || []),
					[information_entries_field_key]: (_data[information_entries_field_key] || [])
				});
			})
		}



		// setFields(youtube_video_entries_field_key , ($data[youtube_video_entries_field_key] || [{ 
		// 	[youtube_video_entries_title_field_key]: "",  
		// 	[youtube_video_entries_url_field_key]: "" 
		// }]), true);

		// setFields(blog_entries_field_key , ($data[] || [{
		// 	[blog_entries_external_url_field_key]: "", 
		// 	[blog_entries_title_field_key]: ""
		// }]), true);

		// setFields(information_entries_field_key , ($data[information_entries_field_key] || [{ 
		// 	[information_entries_icon_id_field_key]: "",
		// 	[information_entries_title_field_key]: "", 
		// 	[information_entries_content_field_key]: "" 
		// }]), true);

	});

	// function handleImageChange(event, callback) {
	// 	const file = event.target.files[0];

	// 	if (file) {
	// 		const reader = new FileReader();

	// 		reader.onload = (event) => {
	// 			callback(event.target.result);
	// 		};

	// 		reader.readAsDataURL(file);
	// 	}
	// }

	function removeYouTubeVideo(index) {
		return () => unsetField(`${youtube_video_entries_field_key}.${index}`);
	}

	function addYouTubeVideo(index) {
		return () => addField(`${youtube_video_entries_field_key}`, { [youtube_video_entries_title_field_key]: "", [youtube_video_entries_url_field_key]: "" }, index);
	}


	function removeBlogEntry(index) {
		return () => unsetField(`${blog_entries_field_key}.${index}`);
	}

	function addBlogEntry(index) {
		return () => addField(`${blog_entries_field_key}`, { [blog_entries_external_url_field_key]: "", [blog_entries_title_field_key]: "" }, index);
	}


	function removeInformationEntry(index) {
		return () => unsetField(`${information_entries_field_key}.${index}`);
	}

	function addInformationEntry(index) {
		return () => addField(`${information_entries_field_key}`, { [information_entries_icon_id_field_key]: "", [information_entries_title_field_key]: "", [information_entries_content_field_key]: "" }, index);
	}
</script>

<!-- <div class="columns">
	<div class="column">
		<div class="content">
			-- <p>
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
			</p>
		</div>
	</div>
</div> -->

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

	<!-- <div class="field">
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
	</div> -->

	<label>
		<input type="checkbox" bind:checked={toBeACourse} />
		This item is a course
	</label>
	<br>
	<br>

	  
	{#if toBeACourse}

		<section class="hero">
			<div class="box">
				<div class="field">
					<label class="label">Curriculum plan
						<div class="control">
							<InputFileContainer>
								<input
									class="file-input"
									type="file"
									name="{information_entries_icon_file_field_key}"
									on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_icon_file_preview_field_key}`, dataURI, true))}
								/>
							</InputFileContainer> 
						</div>
					</label>
				</div>
				<div class="field">
					<p class="label">YouTube videos</p>
					<div class="columns is-multiline is-mobile">
						{#each $data.youtube_video_entries || [] as youtube_video_entry, index}
							<YouTubePreviewer bind:videoURL={youtube_video_entry.url}/>
						{/each}
						<div class="column">
							<button type="button" class="button is-primary is-light" style="width: 100%;" on:click={addBlogEntry(($data.youtube_video_entries || []).length)}>
								Add new
							</button>
						</div>
					  </div>
				</div>
				<div class="field">
					<p class="label">Blog entries</p>
					<div class="columns is-multiline is-mobile">
						{#each $data.blog_entries || [] as blog_entry, index}
									<div class="column is-half">
										<input
															class="input"
															type="text"
															placeholder="URL of the video"
															required={true}
														/>
									</div>
								<div class="column is-half">
									<input
									class="input"
									type="text"
									placeholder="URL of the video"
									required={true}
								/>
								</div>
						{/each}
					</div>
				</div>

				
				<div class="field">
					<p class="label">Classes</p>
					<!-- <div class="columns is-multiline is-mobile">
						{#each $data.blog_entries || [] as blog_entry, index}
								<div class="column is-one-quarter">
									A
								</div>

						{/each}
					</div> -->
					<div class="box">
						<input
							class="input"
							type="text"
							placeholder="Class name (A? B?)"
							required={true}
						/>
						<!-- <div class="field">
							<label class="label">Curriculum plan
								<div class="control">
									<InputFileContainer>
										<input
											class="file-input"
											type="file"
											name="{information_entries_icon_file_field_key}"
											on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_icon_file_preview_field_key}`, dataURI, true))}
										/>
									</InputFileContainer> 
								</div>
							</label>
						</div> -->

						<div class="columns is-multiline is-mobile mt-2">
							<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
								Lesson 1
							</div>
							<div class="column  is-three-quarters">
								<div class="columns is-multiline is-mobile">
									<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										Presentation notes
									</div>
									<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										<a href="google.com" class="is-underlined">App Inventor Introductory [L1-HelloCodi].pptx</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
									<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										Student notes
									</div>
									<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										<a href="google.com" class="is-underlined">App Inventor Intro _Lesson1_Student Notes.pdf</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
									<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										Misc. teaching materials<br/>(e.g. source code)
									</div>
									<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										<a href="google.com" class="is-underlined">Bee-Sound.mp3</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
										<br>
										<a href="google.com" class="is-underlined">codi.jpg</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
										<br>
										<a href="google.com" class="is-underlined">HelloCodi.aia</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
								</div>
							</div>


							<div class="column is-one-quarter" style="background-color: hsl(0deg,0%,95%);">
								Lesson 2
							</div>
							<div class="column  is-three-quarters" style="background-color: hsl(0deg,0%,95%);">
								<div class="columns is-multiline is-mobile">
									<div class="column is-one-quarter" style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										Presentation notes
									</div>
									<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										<a href="google.com" class="is-underlined">App Inventor Introductory [L2 -HelloPurr].pptx</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
									<div class="column is-one-quarter" style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										Student notes
									</div>
									<div class="column is-three-quarters" style="border-bottom: 1px solid hsl(0deg,0%,86%);">
										<a href="google.com" class="is-underlined">App Inventor Intro _Lesson2_Student Notes.pdf</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
									<div class="column is-one-quarter">
										Misc. teaching materials<br/>(e.g. source code)
									</div>
									<div class="column is-three-quarters">
										<a href="google.com" class="is-underlined">HelloPurr.aia</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
										<br/>
										<a href="google.com" class="is-underlined">kitty.png</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
										<br/>
										<a href="google.com" class="is-underlined">meow.mp3</a>
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
											x
										</button>
									</div>
								</div>
							</div>

						</div>
					  </div>
				</div>
			</div>
		</section>
<!-- 	
		<section class="hero">
			<h2 class="subtitle"></h2>
			
				<div class="box">
					<label class="label">#{index + 1}
						{#if index > 0}
							<button type="button" class="is-danger button delete" style="height: 1rem; vertical-align: middle;position: absolute; top: 0; right: 0;" on:click={removeBlogEntry(index)}>
								x
							</button>
						{/if}
						<br><br>
						<div class="field">
							<div class="control">
								<label class="label">External Url
									<input
										class="input"
										type="text"
										name="{blog_entries_field_key}.{index}.{blog_entries_external_url_field_key}"
										bind:value={blog_entry.external_url}
										placeholder="External URL of the blog"
										required={true}
									/>
								</label>
							</div>
						</div>
						<div class="field">
							<div class="control">
								<label class="label">Title
									<input
										class="input"
										type="text"
										name="{blog_entries_field_key}.{index}.{blog_entries_title_field_key}"
										bind:value={blog_entry.title}
										placeholder="Title of the blog"
										required={true}
									/>
								</label>
							</div>
						</div>
					</label>
				</div>
			{/each}
			<button type="button" class="button is-primary is-light" on:click={addBlogEntry(($data.blog_entries || []).length)}>
				Add new
			</button>
		</section> -->

		<!-- <section class="hero">
			<h2 class="subtitle">Classes</h2>
			{#each $data.information_entries || [] as information_entry, index}
				<div class="box">
					<label class="label">#{index + 1}
						{#if index > 0}
							<button type="button" class="is-danger button delete" style="height: 1rem; vertical-align: middle;position: absolute; top: 0; right: 0;" on:click={removeInformationEntry(index)}>
								x
							</button>
						{/if}
						<br><br>
						<figure class="image is-128x128">
							<img
								src={information_entry[information_entries_icon_id_field_key]
									? getResourcesAPIByID(information_entry[information_entries_icon_id_field_key])
									: information_entry[information_entries_icon_file_preview_field_key]
									? information_entry[information_entries_icon_file_preview_field_key]
									: `https://bulma.io/images/placeholders/128x128.png`}
								alt=""
							/>
						</figure>
						<div class="field">
							<div class="control">
								<label class="label">Icon
									<InputFileContainer>
										<input
											class="file-input"
											type="file"
											name="{information_entries_field_key}.{index}.{information_entries_icon_file_field_key}"
											on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_field_key}.${index}.${information_entries_icon_file_preview_field_key}`, dataURI, true))}
										/>
									</InputFileContainer> 
								</label>
							</div>
						</div>
						<div class="field">
							<div class="control">
								<label class="label">Class name
									<input
										class="input"
										type="text"
										name="{information_entries_field_key}.{index}.{information_entries_title_field_key}"
										bind:value={information_entry.title}
										required={true}
										placeholder="Title of the information entry"
									/>
								</label>
							</div>
						</div>
						<div class="field">
							<div class="control">
								<label class="label">Description
									<textarea
										class="textarea"
										type="text"
										name="{information_entries_field_key}.{index}.{information_entries_content_field_key}"
										bind:value={information_entry.content}
										placeholder="Content of the information entry"
										required={true}
									/>
								</label>
							</div>
						</div>

						<div class="field">
							<h2 class="subtitle">Presentation Notes</h2>
							{#each $data.information_entries || [] as information_entry, index}
								<div class="box">
									<label class="label">#{index + 1}
										{#if index > 0}
											<button type="button" class="is-danger button delete" style="height: 1rem; vertical-align: middle;position: absolute; top: 0; right: 0;" on:click={removeInformationEntry(index)}>
												x
											</button>
										{/if}
										<br><br>
										<div class="field">
											<div class="control">
												<label class="label">File
													<InputFileContainer>
														<input
															class="file-input"
															type="file"
															name="{information_entries_field_key}.{index}.{information_entries_icon_file_field_key}"
															on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_field_key}.${index}.${information_entries_icon_file_preview_field_key}`, dataURI, true))}
														/>
													</InputFileContainer> 
												</label>
											</div>
										</div>
									</label>
								</div>
							{/each}
							<button type="button" class="button is-primary is-light" on:click={addInformationEntry(($data.information_entries || []).length)}>
								Add new
							</button>
						</div>
						<h2 class="subtitle">Student notes</h2>
						{#each $data.information_entries || [] as information_entry, index}
							<div class="box">
								<label class="label">#{index + 1}
									{#if index > 0}
										<button type="button" class="is-danger button delete" style="height: 1rem; vertical-align: middle;position: absolute; top: 0; right: 0;" on:click={removeInformationEntry(index)}>
											x
										</button>
									{/if}
									<br><br>
									<div class="field">
										<div class="control">
											<label class="label">File
												<InputFileContainer>
													<input
														class="file-input"
														type="file"
														name="{information_entries_field_key}.{index}.{information_entries_icon_file_field_key}"
														on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_field_key}.${index}.${information_entries_icon_file_preview_field_key}`, dataURI, true))}
													/>
												</InputFileContainer> 
											</label>
										</div>
									</div>
								</label>
							</div>
						{/each}
						<button type="button" class="button is-primary is-light" on:click={addInformationEntry(($data.information_entries || []).length)}>
							Add new
						</button>



					</label>
				</div>
			{/each}
			<button type="button" class="button is-primary is-light" on:click={addInformationEntry(($data.information_entries || []).length)}>
				Add new
			</button>
		</section> -->
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
	div.ex3 {
	  width: 100%;
	  height: 200px;
	  overflow-y: auto;
	}
</style>
