<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import Collapsible from "../../components/Collapsible/index.svelte";
	


	let location = useLocation();
	// const currentPath = $location.pathname;


</script>

<!-- <Router>
	<Route path="/">

    </Route>
</Router> -->

<div class="columns">
    <div class="column">
        <div class="content">
            <h4>Student Portfolio</h4>
        </div>
    </div>
</div>


<div class="columns is-multiline is-mobile">
    <div class="column is-one-third-desktop is-one-third-tablet is-full-mobile">
        <div class="content">
            <div class="box">
               324
            </div>
        </div>
    </div>
    <div class="column is-two-third-desktop is-two-third-tablet is-full-mobile">
        <div class="content">
            <Collapsible data={[1, 2, 3]}></Collapsible>
        </div>
    </div>
</div>