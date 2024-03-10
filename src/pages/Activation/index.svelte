<script lang="ts">
	import { useLocation, link } from "svelte-routing";
	import stemex_icon from "../../assets/images/stemex_icon.png";
	import queryString from "query-string";
	import { WrappedFetch } from "../../utils/fetch";
	import { onMount } from "svelte";
	import HundredVh from "../../components/HundredVh/index.svelte";

	let location = useLocation();
	const key = queryString.parse($location.search)["key"] || "";

	enum State {
		Idle,
		Activating,
		ActivationSuccessful,
		ActivationFailed
	}

	let state: State =  State.Idle;

	onMount(() => {
		state = State.Activating;

		const [wrappedFetchPromise, abort] = WrappedFetch(`/api/activation`, {
			method: "POST",
			body: JSON.stringify({ key: key }),
		});
		wrappedFetchPromise
			.then((data: any) => {
				state = State.ActivationSuccessful;
			})
			.catch((e) => {
				state = State.ActivationFailed;
			});
	});
</script>

<HundredVh>
	<h2 slot="title" class="subtitle" style="color: white">Activating</h2>
	<div slot="content" class="card" style="text-align: left;">
		<div class="card-content" style="padding: 4rem 2.5rem;">
			<div class="content">
				<div style="text-align: center;">
					<img
						src={stemex_icon}
						alt="stemex_icon"
						width="132"
						height="132"
						class="img-fluid"
					/>
				</div>
				{#if state == State.ActivationSuccessful}
					<p>Your account is activated! Please proceed to <a href="/login" use:link>login</a>!</p>
				{:else if state == State.ActivationFailed}
					<p>Oops, something is wrong with the link. Please try again later.</p>
				{:else if state == State.Activating}
					<p>We are checking your activation...</p>
				{:else if state == State.Idle}
					<p>Loading...</p>
				{/if}
			</div>
		</div>
	</div>
</HundredVh>
