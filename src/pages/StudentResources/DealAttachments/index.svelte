<script>
	import { onMount } from "svelte";
    import { FakeFetch, WrappedFetch } from "../../../utils/fetch";

    export let dealId = "";

    let attachments = [];

    onMount(() => {
        debugger;
        console.log(dealId);
        const [ wrappedFetchPromise, abort ] = WrappedFetch(`/api/student-deal-attachments?deal-id=${dealId}`)
		wrappedFetchPromise.then(attachmentsResponse => {
			attachments = attachmentsResponse.data;
		});
    })
</script>

<div class="columns is-multiline is-mobile">
    <div class="column">
        {#each attachments.filter(attachment => `${attachment["extension"]}`.endsWith("pdf")) as portfolio}
        <a class="button is-link" href={portfolio.url}  target="_blank">
            <span class="icon is-small">
                <i class="fa fa-download"></i>
            </span>
            &nbsp;&nbsp; Download portfolio as PDF
        </a>
        {/each}
    </div>
</div>



