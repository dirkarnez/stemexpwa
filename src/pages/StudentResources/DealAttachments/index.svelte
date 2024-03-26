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

{#each attachments.filter(attachment => `${attachment["extension"]}`.endsWith("pdf")) as portfolio}
    
    <button class="button is-link" on:click={a}>
		<span class="icon is-small">
			<i class="fa fa-download"></i>
		</span>
		&nbsp;&nbsp; Download portfolio as PDF
	</button>
{/each}

