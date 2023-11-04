<script>
	import { onMount } from "svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import { splitArrayToArrayGroups } from "../../utils/array";
    import Collapsible from "../../components/Collapsible/index.svelte";
    import Modal from "../../components/Modal/index.svelte";
	
    const scratch0 = "https://www.youtube.com/watch?v=_eDDre7drsY";
    const scratch1 = "https://www.youtube.com/watch?v=_LIQPioIP44";
    const scratch2 = "https://www.youtube.com/watch?v=0cgKCNZbbKk";

    let data = [];
    FakeFetch("/api/435").then(a => {
        data = [
            {
                className: "Coding Minecraft Elementary",
                photos: [
                    "51aa549e7a5711ee9aa006c3bc34e27e"
                ],
                videos: [
                    scratch0,
                    scratch1,
                    scratch2
                ]
            }, 
            {
                className: "Lego Robotics Advance - EV3",
                photos: [
                    "https://www.w3schools.com/w3images/wedding.jpg",
                    "https://www.w3schools.com/w3images/rocks.jpg",
                    "https://www.w3schools.com/w3images/falls2.jpg",
                    "https://www.w3schools.com/w3images/paris.jpg",
                    "https://www.w3schools.com/w3images/nature.jpg",
                    "https://www.w3schools.com/w3images/mist.jpg",
                    "https://www.w3schools.com/w3images/paris.jpg",
                    "https://www.w3schools.com/w3images/underwater.jpg",
                    "https://www.w3schools.com/w3images/ocean.jpg",
                    "https://www.w3schools.com/w3images/wedding.jpg",
                    "https://www.w3schools.com/w3images/mountainskies.jpg",
                    "https://www.w3schools.com/w3images/rocks.jpg",
                    "https://www.w3schools.com/w3images/underwater.jpg",
                    "https://www.w3schools.com/w3images/wedding.jpg",
                    "https://www.w3schools.com/w3images/rocks.jpg",
                    "https://www.w3schools.com/w3images/falls2.jpg",
                    "https://www.w3schools.com/w3images/paris.jpg",
                    "https://www.w3schools.com/w3images/nature.jpg",
                    "https://www.w3schools.com/w3images/mist.jpg",
                    "https://www.w3schools.com/w3images/paris.jpg",
                    "https://www.w3schools.com/w3images/underwater.jpg",
                    "https://www.w3schools.com/w3images/ocean.jpg",
                    "https://www.w3schools.com/w3images/wedding.jpg",
                    "https://www.w3schools.com/w3images/mountainskies.jpg",
                    "https://www.w3schools.com/w3images/rocks.jpg",
                    "https://www.w3schools.com/w3images/underwater.jpg",
                ],
                videos: [
                    scratch0,
                    scratch1,
                    scratch2
                ]
            }
        ];

        data = data.map(dataum => {
            return ({...dataum, photoGroups: splitArrayToArrayGroups(dataum.photos, 3)})
        })
    });
	let location = useLocation();

    let openModal = false;
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
                    <svelte:fragment slot="header" let:datum>
                        {datum.className} <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </svelte:fragment>

                    <svelte:fragment slot="content" let:datum>
                        <div class="columns is-multiline is-mobile">
                            {#each datum.photoGroups as photoGroup}
                                <div class="column is-one-third-desktop is-half-tablet is-full-mobile">
                                    {#each photoGroup as photo}
                                        
                                            <!-- <img src={`${getResourcesAPIByID(photo)}`} style="max-height: 100px;" alt="testing"> --> 
                                            <img src={`${photo}`} style="width: 100%; padding-bottom: 0.75rem;"  on:click={() => {openModal = true}} alt="random img">

                                            <!-- on:click={() => { }} aria-label="4" -->
                                      
                                    {/each}
                                </div>
                            {/each}
                            
                           
                        </div>
                    </svelte:fragment>
                </Collapsible>
            {:else}
                <p>loading</p>
            {/if}
        </div>
    </div>
</div>

<Modal open={openModal} callback={(out) => {openModal = out} }/>