<script>
	import { Router, Route, useLocation } from "svelte-routing";
    import stemex_icon from "../../assets/images/stemex_icon.png";
    import queryString from 'query-string';
    import { WrappedFetch } from "../../utils/fetch";
	import { onMount } from "svelte";
    import HundredVh from "../../components/HundredVh/index.svelte";

	let location = useLocation();
    const key = queryString.parse($location.search)["key"] || "";
    let isActivated;
    onMount(() => {
        const [  wrappedFetchPromise , abort ] = WrappedFetch(`/api/activation"`, {
            method: "POST",
            body: JSON.stringify({key: key})
        });
        wrappedFetchPromise
            .then(() => {
                isActivated = true;
            })
            .catch(e => {
                isActivated = false;
            });
    })
</script>
<HundredVh>
	<h2 slot="title" class="subtitle" style="color: white">
		Activating
	</h2>
    <div slot="content" class="card" style="text-align: left;">
		<div class="card-content" style="padding: 4rem 2.5rem;">
			<div class="content">
				<div style="text-align: center;">
					<img
						src={stemex_icon}
						alt="stemex_icon"
						width="132"
						height="132"
						class="img-fluid" />
				</div>
                {#if isActivated}
                {else}
                {/if}
			</div>
		</div>
	</div>
</HundredVh>