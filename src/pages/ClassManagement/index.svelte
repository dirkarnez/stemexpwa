<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
	
	// export let parentId = null;

	let location = useLocation();
	// const currentPath = $location.pathname;

	// const colors = [
	// 	"rgb(33, 209, 100)",
	// 	"rgb(219, 93, 50)",
	// 	"rgb(247, 163, 27)",
	// 	"rgb(33, 130, 209)",
	// 	"rgb(222, 219, 49)",
	// 	"rgb(145, 20, 186)"
	// ];

	// // export let role = "";

	// let wrappedFetchCurriculum = null;
	// let curriculum = [];

	// // export let previousPath;

	// const init = () => {
	// 	const [  _wrappedFetchCurriculum ] = WrappedFetch(isNullOrEmpty(parentId) ? `/api/curriculum?top-level=true` : `/api/`);
	// 	wrappedFetchCurriculum = _wrappedFetchCurriculum;
	// 	wrappedFetchCurriculum.then(data => {
	// 		curriculum = data;
	// 	})
	// }

	// onMount(init);
</script>

<Router>
    <Route path="/">
        <h1>1</h1>
    </Route>
</Router>