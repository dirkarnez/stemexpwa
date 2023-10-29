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

    let wrappedFetchCurriculumEntry = null;

    const { data, form } = createForm({ 
        onSubmit: (values) => {
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
			$data[description_field_key] = "";
			$data[icon_id_key] = "";
			$data[parent_id_key] = parentId;
		} else {
			const [  _wrappedFetchCurriculumEntry ] = WrappedFetch(`/api/curriculum?id=${id}`);
			wrappedFetchCurriculumEntry = _wrappedFetchCurriculumEntry;
			wrappedFetchCurriculumEntry.then(_data => {
				$data[id_field_key] = _data[id_field_key];
				$data[description_field_key] = _data[description_field_key];
				$data[icon_id_key] = _data[icon_id_key];
				$data[parent_id_key] = _data[parent_id_key];
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
		<label class="label">Name
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

	<div class="field is-grouped">
		<div class="control">
			<button class="button is-link">Save</button>
		</div>
	</div>
</form>
