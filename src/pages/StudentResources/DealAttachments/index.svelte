<script>
	import { onMount } from "svelte";
    import { FakeFetch, WrappedFetch } from "../../../utils/fetch";

    export let dealId = "";

    let attachments = [];

    $: portfolios  = (attachments || []).filter(attachment => `${attachment["extension"]}`.endsWith("pdf"));

    onMount(() => {
        debugger;
        console.log(dealId);
        const [ wrappedFetchPromise, abort ] = WrappedFetch(`/api/student-deal-attachments?deal-id=${dealId}`)
		wrappedFetchPromise.then(attachmentsResponse => {
			attachments = attachmentsResponse.data;
		});
    })
</script>
<h4>Learning Portfolio</h4>
<div class="columns is-multiline is-mobile">
    <div class="column">

        {#each portfolios as portfolio}
            <a class="button is-link" href={portfolio.url}  target="_blank">
                <span class="icon is-small">
                    <i class="fa fa-download"></i>
                </span>
                &nbsp;&nbsp; Download portfolio as PDF
            </a>
        {/each}
    </div>
</div>
<h4>Class videos</h4>
<div class="columns is-multiline is-mobile">
{#if Array.isArray([].videoGroups) && [].videoGroups.length > 0 && [].videoGroups.some((videoGroup) => Array.isArray(videoGroup) && videoGroup.length > 0)}
    {#each [].videoGroups as videoGroup}
        <div
            class="column is-half-desktop is-half-tablet is-full-mobile"
        >
            {#each videoGroup as video}
                <!-- <button on:click={() => {openModal = true}} style="border: none; margin-bottom: 0.75rem;background-color: white;">
                        <img src={`${video}`} style="width: 100%;"  alt="random img">
                    </button> -->
                <!-- <div
                    class="overflow: hidden; padding-top: 56.25%; position: relative;"
                >
                    <iframe
                        src={video}
                        title="YouTube video player"
                        frameborder="0"
                        style="border: none; width: 100%; height: 400px;"
                    ></iframe>
                    
                </div> -->
                <!-- <VideoPlayer/> -->
            {/each}
        </div>
    {/each}
{:else}
    <div
        class="column is-half-desktop is-half-tablet is-full-mobile"
    >
        None
    </div>
{/if}
</div>
<h4>Class photos</h4>
<div class="columns is-multiline is-mobile">
{#if Array.isArray([].photoGroups) && [].photoGroups.length > 0 && [].photoGroups.some((photoGroup) => Array.isArray(photoGroup) && photoGroup.length > 0)}
    {#each [].photoGroups as photoGroup}
        <div
            class="column is-one-third-desktop is-half-tablet is-full-mobile"
        >
            {#each photoGroup as photo}
                <button
                    on:click={() => {
                        // openModal = true;
                    }}
                    style="border: none; margin-bottom: 0.75rem;background-color: white;"
                >
                    <!-- <img
                        src={getResourcesAPIByID(photo)}
                        style="width: 100%;"
                        alt="random img"
                    /> -->
                </button>
            {/each}
        </div>
    {/each}
{:else}
    <div
        class="column is-one-third-desktop is-half-tablet is-full-mobile"
    >
        None
    </div>
{/if}
</div>


