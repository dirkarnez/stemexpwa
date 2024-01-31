<script>
	import { onMount } from 'svelte';

    const fakeFetch = Promise.resolve(data = [{
        name: "knowledge",
        count: 13
    }, {
        name: "skill",
        count: 14
    }, {
        name: "attitude",
        count: 15
    }]);

    const w = 200;
    const h = 200;
    const r = 100;
    
	let canvas;

	onMount(() => {
    });



</script>