<script>
	import { onMount } from "svelte";
    import Loading from "../../components/Loading/index.svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
    import { splitArrayToArrayGroups } from "../../utils/array";
    import Collapsible from "../../components/Collapsible/index.svelte";
    import Modal from "../../components/Modal/index.svelte";
	
    // const scratch0 = "https://www.youtube.com/embed/h0GNlnvaL48";
    const scratch1 = "https://www.youtube.com/embed/RkgI3gPpC4w";
    // const scratch2 = "https://www.youtube.com/embed/HaLB9OvXbN8";

    let data = [];

    FakeFetch("/api/435").then(a => {
        data = [
            {
                className: "Coding Scratch Jr",
                portfolio: "d8475e8c7bdf11ee9aa006c3bc34e27e",
                from: "2 Aug 2023",
                to: "10 Aug 2023",
                photos: [
                    "11e29e537bdf11ee9aa006c3bc34e27e"
                ],
                videos: [
                    // scratch0,
                    scratch1,
                    // scratch2
                ]
            }, 
            {
                className: "Lego Robotics Advanced - EV3",
                portfolio: "d8475e8c7bdf11ee9aa006c3bc34e27e",
                from: "30 June 2023",
                to: "5 July 2023",
                photos: [
                    "85ade8027cb511ee9aa006c3bc34e27e",
                    "85b132a47cb511ee9aa006c3bc34e27e"
                ]
                /*,
                videos: [
                    scratch0,
                    scratch1,
                    scratch2
                ]*/
            }
        ];

        data = data.map(dataum => {
            return ({...dataum, 
                photoGroups: splitArrayToArrayGroups(dataum.photos, 3),
                videoGroups: splitArrayToArrayGroups(dataum.videos, 2)
            })
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
            {#if Array.isArray(data) && data.length > 0}
                <Collapsible data={data}>
                    <svelte:fragment slot="header" let:datum>
                        {datum.className}&nbsp;(Joined at&nbsp{datum.from}&nbsp;to&nbsp;{datum.to})
                    </svelte:fragment>
                    <svelte:fragment slot="content" let:datum>
                        <h4>Student Learning Portfolio</h4>
                        <div class="columns is-multiline is-mobile">
                            <div class="column">
                                <object data={getResourcesAPIByID(datum.portfolio)} type="application/pdf" width="100%" height="500px" title="student learning portfolio">
                                    <p>Unable to display PDF file. <a href="/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf">Download</a> instead.</p>
                                </object>
                            </div>
                        </div>
                        {#if Array.isArray(datum.videoGroups) && datum.videoGroups.length > 0}
                            <h4>Videos</h4>
                            <div class="columns is-multiline is-mobile">
                                {#each datum.videoGroups as videoGroup}
                                    <div class="column is-half-desktop is-half-tablet is-full-mobile">
                                        {#each videoGroup as video}
                                            <!-- <button on:click={() => {openModal = true}} style="border: none; margin-bottom: 0.75rem;background-color: white;">
                                                <img src={`${video}`} style="width: 100%;"  alt="random img">
                                            </button> -->
                                            <div class="overflow: hidden; padding-top: 56.25%; position: relative;">
                                                <iframe src={video} title="YouTube video player" frameborder="0" style="border: none; width: 100%; height: 400px;"></iframe>
                                            </div>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        {#if Array.isArray(datum.photoGroups) && datum.photoGroups.length > 0}
                            <h4>Photos</h4>
                            <div class="columns is-multiline is-mobile">
                                {#each datum.photoGroups as photoGroup}
                                    <div class="column is-one-third-desktop is-half-tablet is-full-mobile">
                                        {#each photoGroup as photo}
                                            <button on:click={() => {openModal = true}} style="border: none; margin-bottom: 0.75rem;background-color: white;">
                                                <img src={`${getResourcesAPIByID(photo)}`} style="width: 100%;"  alt="random img">
                                            </button>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </svelte:fragment>
                </Collapsible>
            {:else}
                <Loading/>
            {/if}
        </div>
    </div>
</div>

<Modal open={openModal} callback={(out) => {openModal = out} }/>
