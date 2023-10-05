<script>
	import { onMount } from 'svelte';
	import { useLocation, Route, Router, link } from "svelte-routing";
  	import { WrappedFetch } from '../utils/fetch';
	import D3Chart from "../components/D3Chart.svelte";
	//xport let customProp: boolean;

	export let role = "";

	let location = useLocation();
	let wrappedFetchParentPromise = null;
	let wrappedFetchProspectPromise = null;
	let wrappedFetchInternalUserPromise = null;

	onMount(() => {
		const [  _wrappedFetchParentPromise ] = WrappedFetch("/api/parent-activity");
		wrappedFetchParentPromise = _wrappedFetchParentPromise;
		
		const [  _wrappedFetchProspectPromise ] = WrappedFetch("/api/prospect-activity");
		wrappedFetchProspectPromise = _wrappedFetchProspectPromise;

		const [  _wrappedFetchInternalUserPromise ] = WrappedFetch("/api/internal-user-activity");
		wrappedFetchInternalUserPromise = _wrappedFetchInternalUserPromise;
		
	});
</script>

<div class="columns">
	<div class="column">
		<div class="content">
			<h4>Statistics</h4>
		</div>
	</div>
</div>
<div class="columns">
	<div class="column">
		<div class="content">
			{#if role == "admin" || role == "sales"}
				<div class="box">
					{#if !!wrappedFetchParentPromise}
						{#await wrappedFetchParentPromise}
							<p>...waiting</p>
						{:then response}
				<h3>Parent Login</h3>
							<!-- <table class="table">
								<thead>
									<tr>
										<th>User</th>
					<th>Role</th>
										<th>Login Time</th>
									</tr>
								</thead>
								<tbody>
									{#each response as item}
										<tr>
											<td>{item.User.UserName}</td>
						<td>{item.User.Role.Name}</td>
											<td>{new Date(item.CreatedAt).toLocaleDateString()} {new Date(item.CreatedAt).toLocaleTimeString()}</td>
										</tr>
									{/each}
								</tbody>
							</table> -->
							<D3Chart data={response}/>
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/if}
				</div>
			{/if}	
			{#if role == "admin" || role == "sales"}
				<div class="box">
					{#if !!wrappedFetchProspectPromise}
						{#await wrappedFetchProspectPromise}
							<p>...waiting</p>
						{:then response}
				<h3>Prospect Login</h3>
							<!-- <table class="table">
								<thead>
									<tr>
										<th>User</th>
					<th>Role</th>
										<th>Login Time</th>
									</tr>
								</thead>
								<tbody>
									{#each response as item}
										<tr>
											<td>{item.User.UserName}</td>
						<td>{item.User.Role.Name}</td>
											<td>{new Date(item.CreatedAt).toLocaleDateString()} {new Date(item.CreatedAt).toLocaleTimeString()}</td>
										</tr>
									{/each}
								</tbody>
							</table> -->
							<D3Chart data={response}/>
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/if}
				</div>
			{/if}	
			{#if role == "admin"}
				<div class="box">
					{#if !!wrappedFetchInternalUserPromise}
						{#await wrappedFetchInternalUserPromise}
							<p>...waiting</p>
						{:then response}
				<h3>Internal Users Login</h3>
					<D3Chart data={response}/>
							<!-- <table class="table">
								<thead>
									<tr>
										<th>User</th>
					<th>Role</th>
										<th>Login Time</th>
									</tr>
								</thead>
								<tbody>
									{#each response as item}
										<tr>
											<td>{item.User.UserName}</td>
						<td>{item.User.Role.Name}</td>
											<td>{new Date(item.CreatedAt).toLocaleDateString()} {new Date(item.CreatedAt).toLocaleTimeString()}</td>
										</tr>
									{/each}
								</tbody>
							</table> -->
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
