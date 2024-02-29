<script>
	import { Router, Route, useLocation } from "svelte-routing";
    import queryString from 'query-string';
	import { onMount } from "svelte";
	let location = useLocation();
    const key = queryString.parse($location.search)["key"] || "";

    onMount(() => {
        fetch(`/api/${key}`)
    })
</script>

<h1>{key}</h1>