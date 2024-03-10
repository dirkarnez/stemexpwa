<script>
	import { Router, Route, useLocation } from "svelte-routing";
    import queryString from 'query-string';
    import { WrappedFetch } from "../../utils/fetch";
	import { onMount } from "svelte";
	let location = useLocation();
    const key = queryString.parse($location.search)["key"] || "";

    onMount(() => {
        const [  wrappedFetchPromise , abort ] = WrappedFetch(`/api/activation"`, {
            method: "POST",
            body: JSON.stringify({key: key})
        });
        wrappedFetchPromise
            .then(() => {

            })
            .catch(e => {

            });
    })
</script>

<h1></h1>