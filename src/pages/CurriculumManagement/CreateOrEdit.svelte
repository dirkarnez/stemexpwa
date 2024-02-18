<script>
	import { onMount, createEventDispatcher } from "svelte";
	import {
		WrappedFetch,
		WrappedFetchPOST,
		WrappedFetchPOSTMultipart,
	} from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { hasAtLeastOneItemInArray } from "../../utils/array";
	import {
		useLocation,
		Link,
		Route,
		Router,
		link,
		navigate,
	} from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { handleImageChange, handleDocumentChange } from "../../utils/file";
	import { isNullOrEmpty } from "../../utils/strings";
	import { createForm } from "felte";
	import InputFileContainer from "../../components/InputFileContainer.svelte";
	import YouTubePreviewer from "../../components/YouTubePreviewer/index.svelte";
	import * as curriculumFormKeys from "../../formkeys/curriculum.ts";

	//import { WrappedFetch } from "../../utils/fetch";

	const dispatch = createEventDispatcher();

	export let id = "";
	export let parentId = "";

	// export let previousPath;

	const { form, data, setFields, addField, unsetField } = createForm({
		onSubmit: (values, context) => {
			// const {
			// 	[icon_file_preview_key]: undefined,
			// 	[information_entries_key]: [],
			// 	...tempValues
			// } = { [information_entries_key]: (values[information_entries_key] || []), ...values};

			// const finalValues = {
			// 	[information_entries_key]: (values[information_entries_key] || [])
			// 		.map(information_entry => {
			// 			const { [information_entries_icon_file_preview_key]: undefined, ...obj  } = information_entry;
			// 			return ({...obj})
			// 		}),
			// 	...tempValues
			// };

			if (!hasAtLeastOneItemInArray(values[curriculumFormKeys.youtube_video_entries_key])) {
				alert(`Not OK: Please add at least 1 YouTube video`);
				return;
			}

			if (!hasAtLeastOneItemInArray(values[curriculumFormKeys.blog_entries_key])) {
				alert(`Not OK: Please add at least 1 blog entries`);
				return;
			}

			const levels = values[curriculumFormKeys.levels_key];
			if (!hasAtLeastOneItemInArray(levels)) {
				alert(`Not OK: Please add at least 1 course level`);
				return;
			}

			if((!values[curriculumFormKeys.levels_key] || []).every(level => {
				if (!hasAtLeastOneItemInArray(level[curriculumFormKeys.lessons_key])) {
					return false;
				}
				const lessons = level[curriculumFormKeys.lessons_key][curriculumFormKeys.lesson_presentation_notes_key];

			}))




			if (!hasAtLeastOneItemInArray(level)) {
					alert(`Not OK: Please add at least 1 course level`);
					return;
				}
			const formData = new FormData(context.event.target);

			// console.log(finalValues);

			const [wrappedFetchPromise, abort] = WrappedFetchPOSTMultipart(
				"/api/curriculum-course",
				formData,
			);
			wrappedFetchPromise
				.then(() => {
					alert("OK");
					dispatch("done");
				})
				.catch((err) => {
					alert(`Not OK: ${err}`);
				});
		},
	});

	// $: if (toBeACourse) {
	// 	if (($data[youtube_video_entries_key] || []).length < 1) {
	// 		addYouTubeVideo(0)();
	// 	}

	// 	if (($data[information_entries_key] || []).length < 1) {
	// 		addInformationEntry(0)();
	// 	}

	// 	if (($data[blog_entries_key] || []).length < 1) {
	// 		addBlogEntry(0)();
	// 	}
	// } else {
	// 	Array(($data[youtube_video_entries_key] || []).length).fill(0).forEach((_, i) => {
	// 		removeYouTubeVideo(i);
	// 	});

	// 	Array(($data[information_entries_key] || []).length).fill(0).forEach((_, i) => {
	// 		removeInformationEntry(i);
	// 	});

	// 	Array(($data[blog_entries_key] || []).length).fill(0).forEach((_, i) => {
	// 		removeBlogEntry(i);
	// 	});
	// }

	onMount(() => {
		// if (isNullOrEmpty(id)) {
		// 	setFields(description_key, "", true);
		// 	setFields(icon_id_key, "", true);
		// 	setFields(parent_id_key, parentId, true);
		// } else {

		const [_wrappedFetchCurriculumEntry] = WrappedFetch(
			`/api/curriculum?id=${id}&top-level=${!!parentId ? "false" : "true"}`,
		);
		/*
			if parent key only, create empty
		*/
		(!!id
			? _wrappedFetchCurriculumEntry
			: Promise.resolve({
					[curriculumFormKeys.parent_id_key]: parentId,
				})
		).then((_data) => {
			const initValues = {
				[curriculumFormKeys.id_key]: _data[curriculumFormKeys.id_key],
				[curriculumFormKeys.description_key]: _data[curriculumFormKeys.description_key],
				[curriculumFormKeys.icon_id_key]: _data[curriculumFormKeys.icon_id_key],
				[curriculumFormKeys.parent_id_key]: _data[curriculumFormKeys.parent_id_key],
				[curriculumFormKeys.curriculum_plan_id_key]: _data[curriculumFormKeys.curriculum_plan_id_key],
				[curriculumFormKeys.youtube_video_entries_key]:
					Array.isArray(_data[curriculumFormKeys.youtube_video_entries_key]) &&
					_data[curriculumFormKeys.youtube_video_entries_key].length > 0
						? _data[curriculumFormKeys.youtube_video_entries_key]
						: [
								{
									[curriculumFormKeys.youtube_video_entries_url_key]: "",
								},
							],
				[curriculumFormKeys.blog_entries_key]:
					Array.isArray(_data[curriculumFormKeys.blog_entries_key]) &&
					_data[curriculumFormKeys.blog_entries_key].length > 0
						? _data[curriculumFormKeys.blog_entries_key]
						: [
								{
									[curriculumFormKeys.blog_entries_external_url_key]: "",
									[curriculumFormKeys.blog_entries_title_key]: "",
								},
							],
				[curriculumFormKeys.levels_key]:
					Array.isArray(_data[curriculumFormKeys.levels_key]) &&
					_data[curriculumFormKeys.levels_key].length > 0
						? _data[curriculumFormKeys.levels_key]
						: [
								{
									[curriculumFormKeys.lessons_key]: [
										{
											[curriculumFormKeys.blog_entries_external_url_key]: "",
											[curriculumFormKeys.blog_entries_title_key]: "",
										},
									],
								},
							],

				// 	,
				// [curriculumFormKeys.youtube_video_entries_key]:	(Array.isArray(_data[curriculumFormKeys.youtube_video_entries_key]) && _data[curriculumFormKeys.youtube_video_entries_key].length > 0)
				// 	?
				// 	_data[curriculumFormKeys.blog_entries_key] : [{
				// 		[curriculumFormKeys.blog_entries_external_url_key]: "",
				// 		[curriculumFormKeys.blog_entries_title_key]: ""
				// 	}],
				// [curriculumFormKeys.levels_key]:	(Array.isArray(_data[curriculumFormKeys.levels_key]) && _data[curriculumFormKeys.levels_key].length > 0)
				// ?
				// _data[curriculumFormKeys.levels_key] : [{
				// 	[curriculumFormKeys.id_key]: "",
				// 	[curriculumFormKeys.blog_entries_external_url_key]: "",
				// 	[curriculumFormKeys.blog_entries_title_key]: ""
				// }],

				// [curriculumFormKeys.information_entries_key]: (Array.isArray(_data[curriculumFormKeys.youtube_video_entries_key]) && _data[curriculumFormKeys.youtube_video_entries_key].length > 0)
				// 	?
				// 	_data[curriculumFormKeys.youtube_video_entries_key] : [{
				// 		[curriculumFormKeys.blog_entries_external_url_key]: "",
				// 		[curriculumFormKeys.blog_entries_title_key]: ""
				// 	}],

				// ,
				// []: (Array.isArray(_data[youtube_video_entries_key]) && _data[youtube_video_entries_key].length > 0) ? _data[youtube_video_entries_key] : [{
				// 	[blog_entries_external_url_key]: "",
				// 	[blog_entries_title_key]: ""
				// }],
				// []: (Array.isArray(_data[information_entries_key]) && _data[information_entries_key].length > 0) ? _data[information_entries_key] : [{
				// 	[blog_entries_external_url_key]: "",
				// 	[blog_entries_title_key]: ""
				// }]
			};
			debugger;
			setFields(initValues);
		});

		// setFields(youtube_video_entries_key , ($data[youtube_video_entries_key] || [{
		// 	[youtube_video_entries_title_key]: "",
		// 	[youtube_video_entries_url_key]: ""
		// }]), true);

		// setFields(blog_entries_key , ($data[] || [{
		// 	[blog_entries_external_url_key]: "",
		// 	[blog_entries_title_key]: ""
		// }]), true);

		// setFields(information_entries_key , ($data[information_entries_key] || [{
		// 	[information_entries_icon_id_key]: "",
		// 	[information_entries_title_key]: "",
		// 	[information_entries_content_key]: ""
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

	function addYouTubeVideo(index) {
		return () =>
			addField(
				`${curriculumFormKeys.youtube_video_entries_key}`,
				{
					[curriculumFormKeys.youtube_video_entries_url_key]: "",
				},
				index,
			);
	}

	function removeYouTubeVideo(index) {
		return () =>
			unsetField(`${curriculumFormKeys.youtube_video_entries_key}.${index}`);
	}

	function addBlogEntry(index) {
		return () =>
			addField(
				`${curriculumFormKeys.blog_entries_key}`,
				{
					[curriculumFormKeys.blog_entries_external_url_key]: "",
					[curriculumFormKeys.blog_entries_title_key]: "",
				},
				index,
			);
	}

	function removeBlogEntry(index) {
		return () => unsetField(`${curriculumFormKeys.blog_entries_key}.${index}`);
	}

	function addLevel(index) {
		return () =>
			addField(
				`${curriculumFormKeys.levels_key}`,
				[
					{
						[curriculumFormKeys.id_key]: "",
						[curriculumFormKeys.level_name_key]: "",
						[curriculumFormKeys.lessons_key]: [
							{
								[curriculumFormKeys.blog_entries_external_url_key]: "",
								[curriculumFormKeys.blog_entries_title_key]: "",
							},
						],
					},
				],
				index,
			);
	}

	function addLesson(levelIndex, index) {
		debugger;
		return () =>
			addField(
				`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}`,
				{
					[curriculumFormKeys.blog_entries_external_url_key]: "",
					[curriculumFormKeys.blog_entries_title_key]: "",
				},
				index,
			);
	}

	// function removeInformationEntry(index) {
	// 	return () => unsetField(`${curriculumFormKeys.information_entries_key}.${index}`);
	// }

	// function addInformationEntry(index) {
	// 	return () => addField(`${curriculumFormKeys.information_entries_key}`, {
	// 		[curriculumFormKeys.information_entries_icon_id_key]: "",
	// 		[curriculumFormKeys.information_entries_title_key]: "",
	// 		[curriculumFormKeys.information_entries_content_key]: ""
	// 	}, index);
	// }
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

<div class="columns is-multiline">
	<div class="column is-full">
		<div class="content">
			<h4>Curriculum</h4>
		</div>
	</div>
	<div class="column is-full">
		<div class="box">
			<form use:form enctype="multipart/form-data">
				<input
					class="input"
					type="hidden"
					name={curriculumFormKeys.parent_id_key}
					bind:value={$data[curriculumFormKeys.parent_id_key]}
				/>
				<input
					class="input"
					type="hidden"
					name={curriculumFormKeys.id_key}
					bind:value={$data[curriculumFormKeys.id_key]}
				/>
				<input
					class="input"
					type="hidden"
					name={curriculumFormKeys.icon_id_key}
					bind:value={$data[curriculumFormKeys.icon_id_key]}
				/>
				<input
					class="input"
					type="hidden"
					name={curriculumFormKeys.curriculum_plan_id_key}
					bind:value={$data[curriculumFormKeys.curriculum_plan_id_key]}
				/>

				<div class="field">
					<figure class="image is-128x128">
						<img
							style={`height: 100%; width: 100%; object-fit: cover;`}
							src={$data[curriculumFormKeys.icon_file_preview_key]
								? $data[curriculumFormKeys.icon_file_preview_key]
								: $data[curriculumFormKeys.icon_id_key]
									? getResourcesAPIByID($data[curriculumFormKeys.icon_id_key])
									: `https://bulma.io/images/placeholders/128x128.png`}
							alt=""
						/>
					</figure>
					<label class="label"
						>Icon
						<div class="control">
							<InputFileContainer
								filename={$data[
									curriculumFormKeys.icon_file_preview_file_name_key
								]}
							>
								<input
									class="file-input"
									type="file"
									name={curriculumFormKeys.icon_file_key}
									on:change={(e) =>
										handleImageChange(e, (dataURI, filename) => {
											setFields(
												curriculumFormKeys.icon_file_preview_key,
												dataURI,
												true,
											);
											setFields(
												curriculumFormKeys.icon_file_preview_file_name_key,
												filename,
												true,
											);
										})}
									multiple={false}
									required={!$data[curriculumFormKeys.icon_id_key]}
								/>
							</InputFileContainer>
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
								name={curriculumFormKeys.description_key}
								bind:value={$data[curriculumFormKeys.description_key]}
								required={true}
							/>
						</div>
					</label>
				</div>

				<div class="field">
					<label class="label"
						>Curriculum plan
						<div class="control">
							<InputFileContainer
								filename={$data[
									curriculumFormKeys.curriculum_plan_file_name_key
								]}
							>
								<input
									class="file-input"
									type="file"
									name={curriculumFormKeys.curriculum_plan_file_key}
									on:change={(e) =>
										handleDocumentChange(e, (file, filename) => {
											setFields(
												`${curriculumFormKeys.curriculum_plan_file_key}`,
												file,
												true,
											);
											setFields(
												`${curriculumFormKeys.curriculum_plan_file_name_key}`,
												filename,
												true,
											);
										})}
									multiple={false}
									required={!$data[curriculumFormKeys.curriculum_plan_id_key]}
								/>
							</InputFileContainer>
						</div>
					</label>
				</div>

				<div class="field">
					<p class="label">YouTube videos</p>
					<div class="columns is-multiline is-mobile">
						{#each $data[curriculumFormKeys.youtube_video_entries_key] || [] as youtube_video_entry, index}
							<YouTubePreviewer
								bind:videoURL={$data[
									curriculumFormKeys.youtube_video_entries_key
								][index][curriculumFormKeys.youtube_video_entries_url_key]}
							>
								<br />
								<br />
								<button
									class="button is-danger is-light"
									on:click={removeYouTubeVideo(index)}
								>
									delete this youtube video
								</button>
							</YouTubePreviewer>
						{/each}
						<div class="column is-full">
							<button
								type="button"
								class="button is-primary is-light"
								style="width: 100%;"
								on:click={addYouTubeVideo(
									($data[curriculumFormKeys.youtube_video_entries_key] || [])
										.length,
								)}
							>
								Add new
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<p class="label">Blog entries</p>
					<div class="columns is-multiline is-mobile">
						{#each $data[curriculumFormKeys.blog_entries_key] || [] as blog_entry, index}
							<div class="column is-half">
								<input
									class="input"
									type="text"
									placeholder="URL of the blog"
									required={true}
								/>
							</div>
							<div class="column is-half">
								<input
									class="input"
									type="text"
									placeholder="Title of the blog"
									required={true}
								/>
							</div>
						{/each}
						<div class="column">
							<button
								type="button"
								class="button is-primary is-light"
								style="width: 100%;"
								on:click={addBlogEntry(
									($data[curriculumFormKeys.blog_entries_key] || []).length,
								)}
							>
								Add new blog
							</button>
						</div>
					</div>
				</div>

				<!-- here -->
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-primary">Save</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

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
										name="{blog_entries_key}.{index}.{blog_entries_external_url_key}"
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
										name="{blog_entries_key}.{index}.{blog_entries_title_key}"
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
								src={information_entry[information_entries_icon_id_key]
									? getResourcesAPIByID(information_entry[information_entries_icon_id_key])
									: information_entry[information_entries_icon_file_preview_key]
									? information_entry[information_entries_icon_file_preview_key]
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
											name="{information_entries_key}.{index}.{information_entries_icon_file_key}"
											on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_key}.${index}.${information_entries_icon_file_preview_key}`, dataURI, true))}
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
										name="{information_entries_key}.{index}.{information_entries_title_key}"
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
										name="{information_entries_key}.{index}.{information_entries_content_key}"
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
															name="{information_entries_key}.{index}.{information_entries_icon_file_key}"
															on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_key}.${index}.${information_entries_icon_file_preview_key}`, dataURI, true))}
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
														name="{information_entries_key}.{index}.{information_entries_icon_file_key}"
														on:change={e => handleImageChange(e, dataURI => setFields(`${information_entries_key}.${index}.${information_entries_icon_file_preview_key}`, dataURI, true))}
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

<!-- 
<style>
	.hero {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
	/* div.ex3 {
	  width: 100%;
	  height: 200px;
	  overflow-y: auto;
	} */
</style> -->
