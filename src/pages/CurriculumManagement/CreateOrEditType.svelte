
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
    import * as curriculumFormKeys from "../../formkeys/curriculum.ts";
	

    //import { WrappedFetch } from "../../utils/fetch";



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
            console.log(JSON.stringify(formData));
            debugger;

            setFields

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

</script>
<div class="columns">
    <div class="column is-full-mobile is-three-quarters-desktop">

        <form  use:form enctype="multipart/form-data">
            <div class="field">
                <label class="label">Description
                    <div class="control">
                            <input
                            class="input"
                            type="hidden"
                            name={curriculumFormKeys.parent_id_key}
                            bind:value={$data[curriculumFormKeys.parent_id_key]}
                        />
                    </div>
                </label>
            
            <div class="field">
                <figure class="image is-128x128">
                    <img
                        src={$data[curriculumFormKeys.icon_id_key]
                            ? getResourcesAPIByID($data[curriculumFormKeys.icon_id_key])
                            : 
                            $data[curriculumFormKeys.icon_file_preview_field_key]
                            ? $data[curriculumFormKeys.icon_file_preview_field_key]
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
                                name={curriculumFormKeys.icon_file_field_key}
                                on:change={e => handleImageChange(e, dataURI => setFields(curriculumFormKeys.icon_file_preview_field_key , dataURI, true))}
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
                            name={curriculumFormKeys.description_field_key}
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
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
  </div>
