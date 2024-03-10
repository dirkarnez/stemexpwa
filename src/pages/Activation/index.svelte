<script>
	import { Router, Route, useLocation } from "svelte-routing";
    import queryString from 'query-string';
	import { onMount } from "svelte";
	let location = useLocation();
    const key = queryString.parse($location.search)["key"] || "";

    onMount(() => {
        const [  wrappedFetchPromise , abort ] = WrappedFetch(`/api/ac?key=${key}"`, {
				method: "POST",
				body: JSON.stringify(values)
			});
			wrappedFetchPromise
			.then(() => {
				registerButtonText = "Please check your email for activation!"
				return new Promise(res => setTimeout(res, 10000));
			})
			.catch(e => {
				registerButtonText = "Oops! Something went wrong. Please try again later."
				return new Promise(res => setTimeout(res, 10000));
			})
			.finally(() => {
				registerButtonText = "Register";
			});
    })
</script>

<h1>{key}</h1>