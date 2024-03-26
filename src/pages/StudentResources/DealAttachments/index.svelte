<script>
	import { onMount } from "svelte";
    import { FakeFetch, WrappedFetch } from "../../../utils/fetch";

    export let dealId = "";

    let attachments = [];

    onMount(() => {
        debugger;
        console.log(dealId);
        const [ wrappedFetchPromise, abort ] = WrappedFetch("/api/student-deal-attachments")
		wrappedFetchPromise.then(attachmentsResponse => {
			attachments = attachmentsResponse;

			// _
			
		});
    })
</script>

<div>
    de
</div>

