<script>
	import { onMount } from "svelte";

// /student-deal-attachments 
    export let dealId = "";

    onMount(() => {
        debugger;
        console.log(dealId);
        const [ wrappedFetchPromise, abort ] = WrappedFetch("/api/students-to-user")
		wrappedFetchPromise.then(studentsResponse => {
			students = studentsResponse;

			// _
			
		});
    })
</script>

<div>
    de
</div>

