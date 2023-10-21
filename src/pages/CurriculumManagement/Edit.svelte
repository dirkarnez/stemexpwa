<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getResourcesAPIByID } from "../../utils/api";

    //export let id;
    export let description;
    export let iconId;
    export let previousPath;

</script>
<div class="columns">
    <div class="column">
        <div class="content">
            <p>
                <a href={previousPath} class="button is-danger" use:link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left align-middle" _ngcontent-drd-c75=""><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back
                </a>
            </p>
        </div>
    </div>
</div>

<div class="field">
    <figure class="image is-128x128">
        <img src={getResourcesAPIByID(iconId)} alt="">
    </figure>
    <br>
    <label class="label">Icon
        <div class="control">
            <input class="input" type="file">
        </div>
    </label>
</div>
<div class="field">
    <label class="label">Name
    <div class="control">
      <input class="input" type="text" placeholder="Text input" value={description}>
    </div>
    </label>
</div>

<div class="field is-grouped">
    <div class="control">
        <button class="button is-link">Update</button>
    </div>
</div>