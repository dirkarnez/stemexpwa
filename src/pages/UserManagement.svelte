<script>
	import { onMount } from 'svelte';
	import { useLocation, Route, Router, link } from "svelte-routing";
  	import { WrappedFetch } from '../utils/fetch';
	//xport let customProp: boolean;

	let location = useLocation();

	let name = '';

	let i = NaN;
	let k = NaN;

	let users = [];
	let roles = [];

	$: userEditing = !isNaN(i) ? users[i] : undefined;

	$: reset_inputs(userEditing);

	async function getUsers() {
		const [  fetchUsersPromise , abortFetchUsers ] = WrappedFetch("/api/users")
		users = await fetchUsersPromise;
	}

	async function getRoles() {
		const [  fetchRolesPromise , abortFetchRoles ] = WrappedFetch("/api/roles")
		roles = await fetchRolesPromise;
	}

	function reset_inputs(user) {
		name = user ? user.UserName : '';
		if (user && Array.isArray(user.RoleID)) {
			k = roles.findIndex(e => e.ID == user.RoleID);
		} else {
			k = -1;
		}
	}

	function update() {
		// success then update

		const temp = {
			user_id: userEditing.ID,
			user_name: name,
			role_id: !isNaN(k) && k > -1 ? [...roles[k].ID] : null
				//!isNaN(k) && k > -1 ? { ...roles[k] } : {Name: "prospect"};
		};

		debugger;

		
		const [  wrappedFetchPromise , abort ] = WrappedFetch("/api/user", {
			method: "POST",
			body: JSON.stringify(temp)
		});

		wrappedFetchPromise
		.then(_ => {
			userEditing.UserName = temp.user_name;
			userEditing.RoleID = temp.role_id;
			//userEditing.Role = { Name:  userEditing.RoleID != null ? roles[roles.findIndex(e => isUUIDexEqual(e.ID, user.RoleID))] }
			i = NaN;
			alert("ok");
		}).catch(err => {
			alert(err);
		})


	}

	onMount(async () => {
		await Promise.all([getUsers(), getRoles()]);
	});
</script>

<div class="columns">
	<div class="column">
		<div class="content">
			<h4>User Management</h4>
		</div>
	</div>
</div>
<div class="columns">
	<div class="column">
		<div class="content">
			<Router>
				<Route path="/add">
					hi
				</Route>
				<Route path="/">
					<div class="box">
						{#await getUsers}
							<p>...waiting</p>
						{:then _}
						<a class="button is-primary is-pulled-right" href={`${$location.pathname}/add`} use:link>Add New User</a>

							<br/>
							<table class="table is-fullwidth">
								<thead>
									<tr>
										<th>User</th>
										<th>Role</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{#each users as user, j}
										{#if i == j }
											<tr>
												<td><input class="input" type="text" bind:value={name} /></td>
												<td>
													<div class="select">
														<select bind:value={k}>
															<option value={-1}>prospect</option>
															{#each roles as role, m}
																<option value={m}>{role["name"]}</option>
															{/each}
														</select>
													</div>
												</td>
												<td>
													<button class="button is-primary" on:click={() => update()}>Save</button>
													<button class="button is-primary" on:click={() => {i = NaN;}}>Cancel</button>
												</td>
											</tr>
										{:else}
											<tr>
												<td>{user["user_name"]}</td>
												<td>{!!user["role"] ? user["role"]["name"] : "prospect"}</td>
												<td>
													<button class="button is-primary" on:click={() => {i = j}} disabled={!isNaN(i) && i != j}>Edit</button>
													<button class="button is-primary" on:click={() => {i = j}} disabled={!isNaN(i) && i != j}>Delete</button>
												</td>
											</tr>
										{/if}
									{/each}
								</tbody>
							</table>
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}

				</div>
				</Route>
			</Router>

		</div>
	</div>
</div>
