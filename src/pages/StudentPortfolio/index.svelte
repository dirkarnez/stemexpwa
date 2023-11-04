<script>
	import { onMount } from "svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import Collapsible from "../../components/Collapsible/index.svelte";
	
    const scratch0 = "https://www.youtube.com/watch?v=_eDDre7drsY";
    const scratch1 = "https://www.youtube.com/watch?v=_LIQPioIP44";
    const scratch2 = "https://www.youtube.com/watch?v=0cgKCNZbbKk";

    let data = [];
    FakeFetch("/api/435").then(a => {
        data = [
            {
                className: "Coding Minecraft Elementary",
                photos: "51aa549e7a5711ee9aa006c3bc34e27e"
            }, 
            {
                className: "Lego Robotics Advance - EV3",
                photos: "51aa549e7a5711ee9aa006c3bc34e27e"
            }
        ];
    });
	let location = useLocation();
	// const currentPath = $location.pathname;

   // https://localhost/api/resourses?id=
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
    <li class="is-active"><a href={`javascript:void(0)`}>Lincoln Leung</a></li>
</ul>
</div>

<div class="columns is-multiline is-mobile">
    <!-- <div class="column is-one-third-desktop is-one-third-tablet is-full-mobile">
        <div class="content">
            <div class="box">
                <figure class="image is-128x128">
                    <img src={`https://ec2-43-198-50-165.ap-east-1.compute.amazonaws.com/assets/images/defaultImg.png`} alt="testing">
                </figure>
                <p>
                    Lincoln Leung
                </p>
            </div>
        </div>
    </div> -->
    <!-- <div class="column is-two-third-desktop is-two-third-tablet is-full-mobile"> -->
    <div class="column">
        <div class="content">
            {#if Array.isArray(data)}
                <Collapsible data={data}>
                    <div slot="header" let:datum>
                        {datum.className} <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>

                    <div slot="content" let:datum>
                        <figure class="image is-128x128">
                            <!-- <img src={`${getResourcesAPIByID(photos)}`} alt="testing"> -->
                        </figure>
                    </div>
                </Collapsible>

            {:else}
                <p>loading</p>
            {/if}
        </div>
    </div>
</div>