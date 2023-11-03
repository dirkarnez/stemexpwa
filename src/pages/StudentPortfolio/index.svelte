<script>
	import { onMount } from "svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import Collapsible from "../../components/Collapsible/index.svelte";
	
    let data = [];
    FakeFetch("/api/435").then(a => {
        data = [1, 2, 3, 4, 5];
    });
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

<div class="tabs">
<ul>
    <li class="is-active"><a href={`javascript:void(0)`}>Pictures</a></li>
    <li><a href={`javascript:void(0)`}>Music</a></li>
</ul>
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
            {#if Array.isArray(data)}
                <Collapsible data={data}></Collapsible>
            {:else}
                <p>loading</p>
            {/if}

                    
        </div>
    </div>
</div>