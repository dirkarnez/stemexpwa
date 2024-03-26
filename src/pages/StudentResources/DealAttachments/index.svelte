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

{#each datum.videoGroups as videoGroup}

