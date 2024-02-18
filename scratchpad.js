CurriculumEntry -> new table (CurriculumPlan)
-> levels (information entry) -> each levels has 8 lesson (files)




information_entries

{
    "id": "",
    "description": "",
    "icon_id": "",
    "parent_id": "",
    "youtube_video_entries": [{

    }],
    "curriculum_plan_id": "",
    "blog_entries": [{
      "title": "",
      "external_url": ""
    }],
    "levels": [{
      "id": "",
      "name": "",
      "icon_id": "",
      "description": "",
      "lessons": [{
        "presentation_notes": [{
           "id": "",
          "resourse_id": ""
        }],
        "student_notes": [{
           "id": "",
          "resourse_id": ""
        }],
        "teacher_notes": [{
           "id": "",
          "resourse_id": ""
        }],
        "misc_materials": [{
           "id": "",
          "resourse_id": ""
        }]
      }]
    }]
  }


  ``````````
  
				
  


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
                                  placeholder="Level name (A? B?)"
                                  name="{curriculumFormKeys.levels_key}.{levelIndex}.{curriculumFormKeys.level_name_key}"
                                  bind:value={$data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.level_name_key]}
                                  required={true}
                              />
                          </div>
                          <div class="column is-narrow">
                              <button class="button is-danger is-light ml-auto" on:click={removeBlogEntry(0)}>
                                  delete this level
                              </button>
                          </div>
                      </div>

                      <div class="field">
                          <figure class="image is-128x128">
                              <img
                                  style={`object-fit: cover; height: 100%;`}
                                  src={$data[curriculumFormKeys.icon_id_key]
                                      ? getResourcesAPIByID($data[curriculumFormKeys.icon_id_key])
                                      : 
                                      $data[curriculumFormKeys.icon_file_preview_key]
                                      ? $data[curriculumFormKeys.icon_file_preview_key]
                                      : `https://bulma.io/images/placeholders/128x128.png`}
                                  alt=""
                              />
                          </figure>
                          <label class="label">
                              <div class="control">
                                  <InputFileContainer>
                                      <input
                                          class="file-input"
                                          type="file"
                                          name={curriculumFormKeys.icon_file_key}
                                          on:change={e => handleImageChange(e, dataURI => setFields(curriculumFormKeys.icon_file_preview_key , dataURI, true))}
                                          required={true}
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
                                      name={curriculumFormKeys.description_key}
                                      bind:value={$data[curriculumFormKeys.description_key]}
                                      required={true}
                                  />
                              </div>
                          </label>
                      </div>
  
                      <div class="columns is-multiline is-mobile mt-2">
                          {#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key] || []) as lesson, lessonIndex}
                              <div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                  Lesson 1
                              </div>
                              <div class="column  is-three-quarters">
                                  <div class="columns is-multiline is-mobile">
                                      <div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          Presentation notes
                                      </div>
                                      <div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          {#each ($data[curriculumFormKeys.levels_key][levelIndex][curriculumFormKeys.lessons_key][lessonIndex][curriculumFormKeys.lesson_presentation_notes_key] || []) as presentationNote, presentationNoteIndex}
                                              <div>
                                                  <a href="google.com" class="is-underlined">{presentationNote}</a><!-- App Inventor Introductory [L1-HelloCodi].pptx</a> -->
                                                  <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                                      x
                                                  </button>
                                              </div>
                                          {/each}
                                          <div>
                                              <InputFileContainer>
                                                  <input
                                                      class="file-input"
                                                      type="file"
                                                      name={`${curriculumFormKeys.levels_key}.${levelIndex}.${curriculumFormKeys.lessons_key}.`}
                                                      
                                                      on:change={e => handleImageChange(e, dataURI => setFields(`${curriculumFormKeys.information_entries_icon_file_preview_key}`, dataURI, true))}
                                                  />
                                              </InputFileContainer> 
                                              <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                                  x
                                              </button>
                                          </div>
                                      </div>
                                      <div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          Student notes
                                      </div>
                                      <div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          <div>
                                              <a href="google.com" class="is-underlined">App Inventor Intro _Lesson1_Student Notes.pdf</a>
                                              <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                                  x
                                              </button>
                                          </div>
                                          <div>
                                              <InputFileContainer>
                                                  <input
                                                      class="file-input"
                                                      type="file"
                                                      name="{curriculumFormKeys.information_entries_icon_file_key}"
                                                      on:change={e => handleImageChange(e, dataURI => setFields(`${curriculumFormKeys.information_entries_icon_file_preview_key}`, dataURI, true))}
                                                  />
                                              </InputFileContainer> 
                                          </div>
                                      </div>
                                      <div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          Teacher notes
                                      </div>
                                      <div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          <div>
                                              <a href="google.com" class="is-underlined">App Inventor Intro _Lesson1_Student Notes.pdf</a>
                                              <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                                  x
                                              </button>
                                          </div>
                                          <div>
                                              <InputFileContainer>
                                                  <input
                                                      class="file-input"
                                                      type="file"
                                                      name={curriculumFormKeys.information_entries_icon_file_key}
                                                      on:change={e => handleImageChange(e, dataURI => setFields(`${curriculumFormKeys.information_entries_icon_file_preview_key}`, dataURI, true))}
                                                  />
                                              </InputFileContainer> 
                                          </div>
                                      </div>
                                      <div class="column is-one-quarter"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          Misc. teaching materials<br/>(e.g. source code)
                                      </div>
                                      <div class="column is-three-quarters"  style="border-bottom: 1px solid hsl(0deg,0%,86%);">
                                          <div>
                                              <a href="google.com" class="is-underlined">Bee-Sound.mp3</a>
                                              <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                                  x
                                              </button>
                                          </div>
                                          <div>
                                              <InputFileContainer>
                                                  <input
                                                      class="file-input"
                                                      type="file"
                                                      name="{curriculumFormKeys.information_entries_icon_file_key}"
                                                      on:change={e => handleImageChange(e, dataURI => setFields(`${curriculumFormKeys.information_entries_icon_file_preview_key}`, dataURI, true))}
                                                  />
                                              </InputFileContainer> 
                                          </div>
<!-- 	
                                          <br>
                                          <a href="google.com" class="is-underlined">codi.jpg</a>
                                          <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                              x
                                          </button>
                                          <br>
                                          <a href="google.com" class="is-underlined">HelloCodi.aia</a>
                                          <button type="button" class="is-danger button delete" on:click={removeBlogEntry(0)}>
                                              x
                                          </button> -->
                                      </div>
                                  </div>
                              </div>
                          {/each}
  
  
                          <!-- <div class="column is-one-quarter" style="background-color: hsl(0deg,0%,95%);">
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
                          </div> -->
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
````