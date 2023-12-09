<script>
	import stemex_icon from "../assets/images/stemex_icon.png";
	import AppBackground from "../assets/images/AppBackground.png";
	// import { form, field, defaultFieldOptions } from "svelte-forms";
	// import { required } from "svelte-forms/validators";
	import { navigate } from "svelte-routing";
	import { WrappedFetch } from "../utils/fetch";

	const userName = field("user_name", "", [required()], {
		...defaultFieldOptions,
		validateOnChange: false
	});
	
	const password = field("password", "", [required()], {
		...defaultFieldOptions,
		validateOnChange: false
	});
	
	const myForm = form(userName, password);

	function handleSubmit() {
		myForm.validate().then(() => {
			if ($myForm.valid) {
				const [  wrappedFetchPromise , abort ] = WrappedFetch("/api/login", {
					method: "POST",
					body: JSON.stringify(myForm.summary())
				});

				wrappedFetchPromise
					.then(json => {
						navigate("/", { replace: true });
					})
					.catch(e => {
						alert("fetch error: " + "cannot login");
					});
			}
		});
	}
</script>

<svelte:head>
	<style>
		body {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100vh;
			height: 100%;
			width: 100%;
		}

		#login {
			height: 100%;
			width: 100%;
			min-height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			animation: moveSlideshow 20000s linear infinite;
		}

		@keyframes moveSlideshow {
			0% {
				background-position: 0%;
			}

			100% {
				background-position: 90000%;
			}
		}
	</style>
</svelte:head>
<!-- 
<div class="signin">
	<div class="content">
		<h2>Sign In</h2>

		<div class="form">
			<div class="inputBox">
				<input type="text" required />
				<i>Username</i>
			</div>

			<div class="inputBox">
				<input type="password" required />
				<i>Password</i>
			</div>

			<div class="links">
				<a href="www.google.com">Forgot Password</a>
				<a href="www.google.com">Signup</a>
			</div>
			<div class="inputBox">
				<input type="submit" value="Login" />
			</div>
		</div>
	</div>
</div> -->

<div
	id="login"
	style={`background: linear-gradient(to top,#222e3c,rgba(0,0,0,.7)),url(${AppBackground}); background-size: cover;`}>
	<div
		class="columns is-centered has-text-centered"
		style="width: 100%; max-width: 1024px">
		<div class="column is-full-mobile is-half-desktop">
			<h1 class="title" style="color: white">STEMex Academy</h1>
			<h2 class="subtitle" style="color: white">
				Sign in to your account to continue
			</h2>
			<div class="card" style="text-align: left;">
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
						<form on:submit|preventDefault={handleSubmit}>
							<div class="field">
								<label class="label" for="b">User name</label>
								<div class="control has-icons-left">
									{#if $myForm.hasError('user_name.required')}
										<input
											id="b"
											class="input is-danger"
											type="text"
											placeholder="Enter your user name"
											bind:value={$userName.value} />
									{:else}
										<input
											id="b"
											class="input"
											type="text"
											placeholder="Enter your user name"
											bind:value={$userName.value} />
									{/if}
									<span class="icon is-small is-left">
										<i class="fas fa-user" />
									</span>
								</div>
								{#if $myForm.hasError('user_name.required')}
									<p class="help is-danger">User Name is required</p>
								{/if}
							</div>
							<div class="field">
								<label class="label" for="c">Password</label>
								<div class="control has-icons-left">
									{#if $myForm.hasError('password.required')}
										<input
											id="c"
											class="input is-danger"
											type="password"
											placeholder="Enter your password"
											bind:value={$password.value} />
									{:else}
										<input
											id="c"
											class="input"
											type="password"
											placeholder="Enter your password"
											bind:value={$password.value} />
									{/if}
									<span class="icon is-small is-left">
										<i class="fas fa-key" />
									</span>
								</div>
								{#if $myForm.hasError('password.required')}
									<p class="help is-danger">Password is required</p>
								{/if}
							</div>

							<div class="field">
								<div class="control">
									<button class="button is-primary">Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
