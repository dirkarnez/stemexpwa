<script>
	import { onMount, createEventDispatcher } from "svelte";
	import {
		WrappedFetch,
		WrappedFetchPOST,
		WrappedFetchPOSTMultipart,
	} from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { newIndexedArray } from "../../utils/array";
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
	import { removeDuplicateKeys } from "../../utils/formData";
	import { createForm } from "felte";
	import InputFileContainer from "../../components/InputFileContainer.svelte";
	import YouTubePreviewer from "../../components/YouTubePreviewer/index.svelte";
	import * as curriculumFormKeys from "../../formkeys/curriculum";

	//import { WrappedFetch } from "../../utils/fetch";

	const dispatch = createEventDispatcher();

	export let id = "";
	export let parentId = "";

	// export let previousPath;

	

	function validateFormData(value, formData) {
		return new Promise((rs, rj) => {
			if (formData.get(curriculumFormKeys.icon_file_key).size == 0) {
				formData.delete(curriculumFormKeys.icon_file_key)
			}

			if (formData.get(curriculumFormKeys.curriculum_plan_file_key).size == 0) {
				formData.delete(curriculumFormKeys.curriculum_plan_file_key)
			}
			
			const youtubeLength = value[curriculumFormKeys.youtube_video_entries_key].length;
			if (youtubeLength < 1) {
				rj(new Error(`Not OK: Please add at least 1 YouTube video`));
				return;
			}

			newIndexedArray(youtubeLength).forEach(i => {
				if (!(
					formData.get(`${curriculumFormKeys.youtube_video_entries_key}.${i}.${curriculumFormKeys.youtube_video_entries_url_key}`)
				)) {
					rj(new Error(`Not OK: Please add at least 1 YouTube video`));
					return;
				}
			});

			const blogLength = (value[curriculumFormKeys.blog_entries_key] || []).length;
			if (blogLength < 1) {
				rj(new Error(`Not OK: Please add at least 1 blog entries`));
				return;
			}


			newIndexedArray(blogLength).forEach(i => {
				if (!(
					!!formData.get(`${curriculumFormKeys.blog_entries_key}.${i}.${curriculumFormKeys.blog_entries_title_key}`) && 
					!!formData.get(`${curriculumFormKeys.blog_entries_key}.${i}.${curriculumFormKeys.blog_entries_external_url_key}`)
				)) {
					rj(new Error(`Not OK: Please add at least 1 blog entries`));
					return;
				}
			});

			const levelLength = (value[curriculumFormKeys.levels_key] || []).length;
			if (levelLength < 1) {
				rj(new Error(`Not OK: Please add at least 1 course level`));
				return;
			}

			newIndexedArray(levelLength).forEach(i => {
				if (!(
					formData.get(`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.level_name_key}`)
					/*extra fields here*/
				)) {
					rj(new Error(`Not OK: Please add at least 1 course level`));
					return;
				}
				const lessonLength = (value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key] || []).length;

				if (lessonLength < 1) {
					rj(new Error(`Not OK: Please add at least 1 lesson for every course level`));
					return;
				}
				
				newIndexedArray(lessonLength).forEach(j => {
					const presentationNotesLength = value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][j][curriculumFormKeys.lesson_presentation_notes_key].length
					if (presentationNotesLength < 1) {
						rj(new Error(`Not OK: Please add at least 1 presentation notes for every course level`));
						return;
					} else
					{
						newIndexedArray(presentationNotesLength).forEach(k => {
							formData.set(
								`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_presentation_notes_key}.${k}.${curriculumFormKeys.lesson_presentation_note_file_key}`, 
								new File(
									[formData.get(`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_presentation_notes_key}.${k}.${curriculumFormKeys.lesson_presentation_note_file_key}`)], 
									value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][i][curriculumFormKeys.lesson_presentation_notes_key][k][curriculumFormKeys.lesson_presentation_note_file_name_key]
								)
							);
						});
					}

					const studentNotesLength = value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][j][curriculumFormKeys.lesson_student_notes_key].length
					if (studentNotesLength < 1) {
						rj(new Error(`Not OK: Please add at least 1 student notes for every course level`));
						return;
					} else {
						newIndexedArray(studentNotesLength).forEach(k => {
							formData.set(
								`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_student_notes_key}.${k}.${curriculumFormKeys.lesson_student_note_file_key}`, 
								new File(
									[formData.get(`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_student_notes_key}.${k}.${curriculumFormKeys.lesson_student_note_file_key}`)], 
									value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][i][curriculumFormKeys.lesson_student_notes_key][k][curriculumFormKeys.lesson_student_note_file_name_key]
								)
							);
						});
					}

					const teacherNotesLength = value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][j][curriculumFormKeys.lesson_teacher_notes_key].length;
					if (teacherNotesLength < 1) {
						rj(new Error(`Not OK: Please add at least 1 teacher notes for every course level`));
						return;
					} else {
						newIndexedArray(teacherNotesLength).forEach(k => {
							formData.set(
								`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_teacher_notes_key}.${k}.${curriculumFormKeys.lesson_teacher_note_file_key}`, 
								new File(
									[formData.get(`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_teacher_notes_key}.${k}.${curriculumFormKeys.lesson_teacher_note_file_key}`)], 
									value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][i][curriculumFormKeys.lesson_teacher_notes_key][k][curriculumFormKeys.lesson_teacher_note_file_name_key]
								)
							);
						});
					}

					const miscMaterialsLength = (value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][j][curriculumFormKeys.lesson_misc_materials_key] || []).length;
					newIndexedArray(miscMaterialsLength).forEach(k => {
						formData.set(
							`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_misc_materials_key}.${k}.${curriculumFormKeys.lesson_misc_materials_file_key}`, 
							new File(
								[formData.get(`${curriculumFormKeys.levels_key}.${i}.${curriculumFormKeys.lessons_key}.${j}.${curriculumFormKeys.lesson_misc_materials_key}.${k}.${curriculumFormKeys.lesson_misc_materials_file_key}`)], 
								value[curriculumFormKeys.levels_key][i][curriculumFormKeys.lessons_key][i][curriculumFormKeys.lesson_misc_materials_key][k][curriculumFormKeys.lesson_misc_materials_file_name_key]
							)
						);
					});
				});
			});
			rs(true);
		})

	}

	const { form, data, setFields, addField, unsetField } = createForm({
        onSubmit: (value, context) => {
			const formData = removeDuplicateKeys(new FormData(context.event.target));
			
			validateFormData(value, formData).then(() => {
				const [wrappedFetchPromise, abort] = WrappedFetchPOSTMultipart(
					"/api/curriculum-course",
					formData,
				);
				return wrappedFetchPromise
			})
			.then(() => {
				alert("OK");
				dispatch("done");
			})
			.catch((err) => {
				alert(`Not OK: ${err}`);
			});
		},
	});


	onMount(() => {
		/*
			if parent key only, create empty
		*/
		const [  _wrappedFetchCurriculumCourse ] = (
			!!id
			?  
			WrappedFetch(`/api/curriculum-course?id=${id}`)
			: 
			[Promise.resolve({[curriculumFormKeys.parent_id_key]: parentId}), null]
		)
		
		_wrappedFetchCurriculumCourse
		.then((_data) => {
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
									[curriculumFormKeys.id_key]: "",
									[curriculumFormKeys.level_name_key]: "",
									[curriculumFormKeys.lessons_key]: [
										{
											[curriculumFormKeys.lesson_presentation_notes_key]: [],
											[curriculumFormKeys.lesson_student_notes_key]: [],
											[curriculumFormKeys.lesson_teacher_notes_key]: [],
											[curriculumFormKeys.lesson_misc_materials_key]: []
										},
									],
								},
							],
			};
			debugger;
			setFields(initValues);
		});
	});

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

	function removeLevel(index) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${index}`);
	}

	function addLesson(levelIndex, index) {
		debugger;
		return () =>
			addField(
				`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}`,
				{
					[curriculumFormKeys.lesson_presentation_notes_key]: [],
					[curriculumFormKeys.lesson_student_notes_key]: [],
					[curriculumFormKeys.lesson_teacher_notes_key]: [],
					[curriculumFormKeys.lesson_misc_materials_key]: []
				},
				index,
			);
	}

	function removeLesson(levelIndex, lessonIndex) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}`);
	}

	function removePresentationNote(levelIndex, lessonIndex, presentationNoteIndex) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_presentation_notes_key}.${presentationNoteIndex}`);
	}

	function removeStudentNote(levelIndex, lessonIndex, studentNoteIndex) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_student_notes_key}.${studentNoteIndex}`);
	}

	function removeTeacherNote(levelIndex, lessonIndex, teacherNoteIndex) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_teacher_notes_key}.${teacherNoteIndex}`);
	}

	function removeMiscMaterial(levelIndex, lessonIndex, miscMaterialIndex) {
		return () => unsetField(`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_misc_materials_key}.${miscMaterialIndex}`);
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
								name={`${curriculumFormKeys.youtube_video_entries_key}.${index}.${curriculumFormKeys.youtube_video_entries_url_key}`}
								bind:value={$data[curriculumFormKeys.youtube_video_entries_key][index][curriculumFormKeys.youtube_video_entries_url_key]}
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
								Add new YouTube video
							</button>
						</div>
					</div>
				</div>
				<div class="field">
					<p class="label">Blog entries</p>
					<div class="columns is-multiline is-mobile">
						{#each $data[curriculumFormKeys.blog_entries_key] || [] as _, blogIndex}
							<div class="column is-full">
								<div class="columns is-multiline is-mobile">
									<div class="column">
										<div class="columns is-multiline is-mobile">
											<div class="column is-half">
												<input
													class="input"
													type="text"
													name={`${curriculumFormKeys.blog_entries_key}.${blogIndex}.${curriculumFormKeys.blog_entries_external_url_key}`}
													bind:value={$data[curriculumFormKeys.blog_entries_key][blogIndex][curriculumFormKeys.blog_entries_external_url_key]}
													placeholder="URL of the blog"
													required={true}
												/>
											</div>
											<div class="column is-half">
												<input
													class="input"
													type="text"
													placeholder="Title of the blog"
													name={`${curriculumFormKeys.blog_entries_key}.${blogIndex}.${curriculumFormKeys.blog_entries_title_key}`}
													bind:value={$data[curriculumFormKeys.blog_entries_key][blogIndex][curriculumFormKeys.blog_entries_title_key]}
													required={true}
												/>
											</div>
										</div>
									</div>
									<div class="column is-narrow">
										<button type="button" class="is-danger button delete" on:click={removeBlogEntry(blogIndex)}>
											x
										</button>
									</div>
								</div>
							</div>
						{/each}
						<div class="column is-full">
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

				<!-- before this line are ok -->
				<div class="field">
					<p class="label">Levels</p>
					<div class="columns is-multiline is-mobile">
						<!-- !!!!!!!!TODO -->
						{#each ($data[curriculumFormKeys.levels_key] || []) as level, levelIndex}
								<div class="column is-full">
									<div class="box">
										<div class="columns">
											<div class="column">
												<input
													class="input"
													type="text"
													placeholder="Level name (e.g. A? B?)"
													name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.level_name_key}"
													bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_name_key]}
													required={true}
												/>
												<input
													class="input"
													type="hidden"
													name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.id_key}"
													bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.id_key]}
												/>
											</div>
											<div class="column is-narrow">
												<button class="button is-danger is-light ml-auto" on:click={removeLevel(levelIndex)}>
													delete this level
												</button>
											</div>
										</div>
				  
										<div class="field">
											<figure class="image is-128x128">
												<img
													style={`object-fit: cover; height: 100%;`}
													src={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_file_preview_key]
														? 
														$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_file_preview_key]
														: 
														(
															$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_id_key]
															? 
															getResourcesAPIByID($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_id_key])
															: 
															`https://bulma.io/images/placeholders/128x128.png`
														)}
													alt=""
												/>
											</figure>
											<label class="label">
												<div class="control">
													<InputFileContainer
														filename={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_file_preview_file_name_key]}
													>
														<input
															class="file-input"
															type="file"
															name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.level_icon_file_key}"
															on:change={(e) =>
																handleImageChange(e, (dataURI, filename) => {
																	setFields(
																		`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.level_icon_file_preview_key}`,
																		dataURI,
																		true,
																	);
																	setFields(
																		`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.level_icon_file_preview_file_name_key}`,
																		filename,
																		true,
																	);
																})}
															multiple={false}
															required={!$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_icon_id_key]}
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
														name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.level_description_key}"
														bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_description_key]}
														required={true}
													/>
												</div>
											</label>
										</div>
					
										<div class="columns is-multiline is-mobile mt-2">
											{#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key] || []) as lesson, lessonIndex}
												<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
													Lesson {lessonIndex + 1}
													<br>
													<br>
													<input
														class="input"
														type="hidden"
														style="display: none;"
														name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_number_key}"
														bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_number_key]}
													/> 
													<button class="button is-danger is-light" on:click={removeLesson(levelIndex, lessonIndex)}>
														delete this lesson
													</button>
												</div>
												<div class="column  is-three-quarters">
													<div class="columns is-multiline is-mobile">
														<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															Presentation notes
														</div>
														<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															<!-- bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key][presentationNoteIndex][curriculumFormKeys.lesson_presentation_note_file_key]} -->
															{#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key] || []) as presentationNote, presentationNoteIndex}
																<div>
																	<input
																		class="input"
																		type="hidden"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{presentationNoteIndex}.{curriculumFormKeys.id_key}"
																	/>
																	<input
																		class="input"
																		type="hidden"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{presentationNoteIndex}.{curriculumFormKeys.lesson_presentation_note_file_id_key}"
																	/>
																	<input
																		class="input"
																		type="file"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{presentationNoteIndex}.{curriculumFormKeys.lesson_presentation_note_file_key}"
																	/>
																	<a href={`javascript:void(0);`} class="is-underlined">{presentationNote[curriculumFormKeys.lesson_presentation_note_file_name_key] || "" }</a>
																	<button type="button" class="is-danger button delete" on:click={removePresentationNote(levelIndex, lessonIndex, presentationNoteIndex)}>
																		x
																	</button>
																</div>
															{/each}
															<div>
																<InputFileContainer filename={""}>
																	<input
																		class="file-input"
																		type="file"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key] || []).length - 1}.{curriculumFormKeys.lesson_presentation_note_file_key}"
																		multiple={false}
																		required={!(($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key] || []).length > 0)}
																		on:change={e => 
																			handleDocumentChange(e, (file, filename) => {
																				const index = ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key] || []).length;
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_presentation_notes_key}.${index}.${curriculumFormKeys.lesson_presentation_note_file_key}`,
																					file,
																					true,
																				);
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_presentation_notes_key}.${index}.${curriculumFormKeys.lesson_presentation_note_file_name_key}`,
																					filename,
																					true,
																				);
																			})
																		}
																	/>
																</InputFileContainer>
															</div>
														</div>
														<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															Student notes
														</div>
														<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															{#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_student_notes_key] || []) as studentNote, studentNoteIndex}
																<div>
																	<input
																		class="input"
																		type="file"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_student_notes_key}.{studentNoteIndex}.{curriculumFormKeys.lesson_student_note_file_key}"
																		bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_student_notes_key][studentNoteIndex][curriculumFormKeys.lesson_student_note_file_key]}
																	/>
																	<input
																		class="input"
																		type="hidden"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{studentNoteIndex}.{curriculumFormKeys.id_key}"
																	/>
																	<a href={`javascript:void(0);`} class="is-underlined">{studentNote[curriculumFormKeys.lesson_student_note_file_name_key] || "" }</a>
																	<button type="button" class="is-danger button delete" on:click={removeStudentNote(levelIndex, lessonIndex, studentNoteIndex)}>
																		x
																	</button>
																</div>
															{/each}
															<div>
																<InputFileContainer filename={""}>
																	<input
																		class="file-input"
																		type="file"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_student_notes_key}.{($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_student_notes_key] || []).length - 1}.{curriculumFormKeys.lesson_student_note_file_key}"
																		multiple={false}
																		required={!(($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_student_notes_key] || []).length > 0)}
																		on:change={e => 
																			handleDocumentChange(e, (file, filename) => {
																				const index = ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_student_notes_key] || []).length;
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_student_notes_key}.${index}.${curriculumFormKeys.lesson_student_note_file_key}`,
																					file,
																					true,
																				);
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_student_notes_key}.${index}.${curriculumFormKeys.lesson_student_note_file_name_key}`,
																					filename,
																					true,
																				);
																			})
																		}
																	/>
																</InputFileContainer>
															</div>
														</div>
														<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															Teacher notes
														</div>
														<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															{#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_teacher_notes_key] || []) as teacherNote, teacherNoteIndex}
																<div>
																	<input
																		class="input"
																		type="file"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_teacher_notes_key}.{teacherNoteIndex}.{curriculumFormKeys.lesson_teacher_note_file_key}"
																		bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_teacher_notes_key][teacherNoteIndex][curriculumFormKeys.lesson_teacher_note_file_key]}
																	/>
																	<input
																		class="input"
																		type="hidden"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{teacherNoteIndex}.{curriculumFormKeys.id_key}"
																	/>
																	<a href={`javascript:void(0);`} class="is-underlined">{teacherNote[curriculumFormKeys.lesson_teacher_note_file_name_key] || "" }</a>
																	<button type="button" class="is-danger button delete" on:click={removeTeacherNote(levelIndex, lessonIndex, teacherNoteIndex)}>
																		x
																	</button>
																</div>
															{/each}
															<div>
																<InputFileContainer filename={""}>
																	<input
																		class="file-input"
																		type="file"
																		name={`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_teacher_notes_key}.${($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_teacher_notes_key] || []).length - 1}.${curriculumFormKeys.lesson_teacher_note_file_key}`}
																		multiple={false}
																		required={!(($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_teacher_notes_key] || []).length > 0)}
																		on:change={e => 
																			handleDocumentChange(e, (file, filename) => {
																				const index = ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_teacher_notes_key] || []).length;
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_teacher_notes_key}.${index}.${curriculumFormKeys.lesson_teacher_note_file_key}`,
																					file,
																					true,
																				);
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_teacher_notes_key}.${index}.${curriculumFormKeys.lesson_teacher_note_file_name_key}`,
																					filename,
																					true,
																				);
																			})
																		}
																	/>
																</InputFileContainer>
															</div>
														</div>
														<div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															Misc. teaching materials<br/>(e.g. source code)
														</div>
														<div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
															{#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_misc_materials_key] || []) as miscMaterial, miscMaterialIndex}
																<div>
																	<input
																		class="input"
																		type="file"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_misc_materials_key}.{miscMaterialIndex}.{curriculumFormKeys.lesson_misc_materials_file_key}"
																		bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_misc_materials_key][miscMaterialIndex][curriculumFormKeys.lesson_misc_materials_file_key]}
																	/>
																	<input
																		class="input"
																		type="hidden"
																		style="display: none;"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_presentation_notes_key}.{miscMaterialIndex}.{curriculumFormKeys.id_key}"
																	/>
																	<a href={`javascript:void(0);`} class="is-underlined">{miscMaterial[curriculumFormKeys.lesson_misc_materials_file_name_key] || "" }</a>
																	<button type="button" class="is-danger button delete" on:click={removeMiscMaterial(levelIndex, lessonIndex, miscMaterialIndex)}>
																		x
																	</button>
																</div>
															{/each}
															<div>
																<InputFileContainer filename={""}>
																	<input
																		class="file-input"
																		type="file"
																		name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.lessons_key}.{lessonIndex}.{curriculumFormKeys.lesson_misc_materials_key}.{($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_misc_materials_key] || []).length - 1}.{curriculumFormKeys.lesson_misc_materials_file_key}"
																		multiple={false}
																		on:change={e => 
																			handleDocumentChange(e, (file, filename) => {
																				const index = ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_misc_materials_key] || []).length;
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_misc_materials_key}.${index}.${curriculumFormKeys.lesson_misc_materials_file_key}`,
																					file,
																					true,
																				);
																				setFields(
																					`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.${lessonIndex}.${curriculumFormKeys.lesson_misc_materials_key}.${index}.${curriculumFormKeys.lesson_misc_materials_file_name_key}`,
																					filename,
																					true,
																				);
																			})
																		}
																	/>
																</InputFileContainer>
															</div>
														</div>
													</div>
												</div>
											{/each}
											<div class="column is-full">
												<button type="button" class="button is-primary is-light" style="width: 100%;" on:click={addLesson(levelIndex, ($data[curriculumFormKeys.lessons_key] || []).length)}>
													Add new lesson
												</button>
											</div>
										</div>
									  </div>
								</div>
						{/each}
						<div class="column">
							<button type="button" class="button is-primary is-light" style="width: 100%;" on:click={addLevel(($data[curriculumFormKeys.levels_key] || []).length)}>
								Add new level
							</button>
						</div>
					</div>
				  </div>
			
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
