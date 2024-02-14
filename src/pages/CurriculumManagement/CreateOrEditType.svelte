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
	

    let location = useLocation();

    export let parentId = "";
    export let id = "";
    
    
	let partners = [];

    const { form, data, setFields, addField, unsetField } = createForm({
        onSubmit: (_, context) => {
            
            console.log(parentId);
			const formData = new FormData(context.event.target);
            console.log(JSON.stringify([...formData]));

            if (formData.get(curriculumFormKeys.icon_file_key).size == 0) {
                formData.delete(curriculumFormKeys.icon_file_key)
            }

			const [  wrappedFetchPromise, abort ] = WrappedFetchPOSTMultipart("/api/curriculum-type", formData);
			wrappedFetchPromise
			.then(newData => {
                alert(`OK!`);

                const reinitValues = {
                    [curriculumFormKeys.id_key]: newData[curriculumFormKeys.id_key],
                    [curriculumFormKeys.description_key]: newData[curriculumFormKeys.description_key],
                    [curriculumFormKeys.icon_id_key]: newData[curriculumFormKeys.icon_id_key],
                    [curriculumFormKeys.parent_id_key]: newData[curriculumFormKeys.parent_id_key]
                };

                setFields(reinitValues);
			})
			.catch(err => {
				alert(`Not OK: ${err}`)
			});
        },
    });

    onMount(() => {
		debugger;
		const [  _wrappedFetchPartners ] = WrappedFetch(`/api/partners`);
		_wrappedFetchPartners.then(data => {
			partners = data;
		});

        if (!!id) {
            const [  _wrappedFetchCurriculumEntry ] = WrappedFetch(`/api/curriculum?id=${id}`);

            _wrappedFetchCurriculumEntry.then(_data => {
                const initValues = {
                    [curriculumFormKeys.id_key]: _data[curriculumFormKeys.id_key],
                    [curriculumFormKeys.description_key]: _data[curriculumFormKeys.description_key],
                    [curriculumFormKeys.icon_id_key]: _data[curriculumFormKeys.icon_id_key],
                    [curriculumFormKeys.parent_id_key]: _data[curriculumFormKeys.parent_id_key]
                };
                debugger;
                setFields(initValues);
            });
        }
    });



</script>
<div class="columns">
    <div class="column is-full-mobile is-three-quarters-desktop">

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

            <div class="field">
                <figure class="image is-128x128">
                    <img
                        style={`height: 100%; width: 100%; object-fit: cover;`}
                        src={$data[curriculumFormKeys.icon_id_key]
                            ? getResourcesAPIByID($data[curriculumFormKeys.icon_id_key])
                            : 
                            $data[curriculumFormKeys.icon_file_preview_key]
                            ? $data[curriculumFormKeys.icon_file_preview_key]
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
                                name={curriculumFormKeys.icon_file_key}
                                on:change={e => handleImageChange(e, dataURI => {
                                    setFields(curriculumFormKeys.icon_file_preview_key , dataURI, true);
                                })}
                                multiple={false}
                                required={!$data[curriculumFormKeys.icon_id_key]}
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
        
            <div class="field">
                <label class="label" for="select-accessible">Accessible to
                    <div class="notification ex3 p-2" id="select-accessible">
                        {#each (Array.isArray(partners) ? partners : []) as { full_name }}
                            <label class="checkbox">
                                <input type="checkbox">&nbsp;&nbsp;{full_name} (and their parents registered this course)
                            </label>
                            <br>
                        {/each}
                        <br>
                    </div>
                </label>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
  </div>
