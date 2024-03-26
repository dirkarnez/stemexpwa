<script>
	import { onMount } from "svelte";
    import { FakeFetch, WrappedFetch } from "../../../utils/fetch";

// /student-deal-attachments 
    export let dealId = "";

    onMount(() => {
        debugger;
        console.log(dealId);
        const [ wrappedFetchPromise, abort ] = WrappedFetch("/api/student-deal-attachments")
		wrappedFetchPromise.then(studentsResponse => {
			students = studentsResponse;

			// _
			
		});
    })
</script>

<div>
    de
</div>

