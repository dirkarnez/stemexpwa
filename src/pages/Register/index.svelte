<script>
	import stemex_icon from "../../assets/images/stemex_icon.png";
	// import { form, field, defaultFieldOptions } from "svelte-forms";
	// import { required } from "svelte-forms/validators";
	import { navigate, link } from "svelte-routing";
	import { WrappedFetch } from "../../utils/fetch";
	import { createForm } from 'felte';
	import HundredVh from "../../components/HundredVh/index.svelte";
	import SocialMediaButtons from "../../components/SocialMediaButtons/index.svelte";
	import areacodes from "../../data/areacodes";
	
	let registerButtonText = "Register";

	const { form } = createForm({
		onSubmit: (values) => {
			registerButtonText = "Registering...";

			const [  wrappedFetchPromise , abort ] = WrappedFetch("/api/register", {
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
		}
	})

	// const userName = field("user_name", "", [required()], {
	// 	...defaultFieldOptions,
	// 	validateOnChange: false
	// });
	
	// const password = field("password", "", [required()], {
	// 	...defaultFieldOptions,
	// 	validateOnChange: false
	// });
	


	// function handleSubmit() {
	// 	myForm.validate().then(() => {
	// 		if ($myForm.valid) {

	// 		}
	// 	});
	// }
</script>
<HundredVh>
	<h2 slot="title" class="subtitle" style="color: white">
		Sign in to your account to continue
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
				<form use:form>
					<div class="field">
						<label class="label" for="userName">User name
						<div class="control has-icons-left">
							<!-- {#if $myForm.hasError('user_name.required')}
								<input
									id="b"
									class="input is-danger"
									type="text"
									placeholder="Enter your user name"
									bind:value={$userName.value} />
							{:else} -->
								<input
									id="userName"
									class="input"
									name="user_name"
									type="text"
									placeholder="Enter your user name"
									required={true}/>
							<!-- {/if} -->
							<span class="icon is-small is-left">
								<i class="fas fa-user" />
							</span>
						</div>
						<!-- {#if $myForm.hasError('user_name.required')}
							<p class="help is-danger">User Name is required</p>
						{/if} -->
					</div>

					<div class="field">
						<label class="label" for="email">Email</label>
						<div class="control has-icons-left">
							<!-- {#if $myForm.hasError('password.required')}
								<input
									id="c"
									class="input is-danger"
									type="password"
									placeholder="Enter your password"
									bind:value={$password.value} />
							{:else} -->
								<input
									id="email"
									class="input"
									type="email"
									name="email"
									placeholder="Enter your email"
									required={true}/>
							<!-- {/if} -->
							<span class="icon is-small is-left">
								<i class="fa-solid fa-at"></i>
							</span>
						</div>
						<!-- {#if $myForm.hasError('password.required')}
							<p class="help is-danger">Password is required</p>
						{/if} -->
					</div>

					
					<div class="field">
						<label class="label" for="contactNumber">Contact Number</label>
						<div class="control has-icons-left">
							<!-- {#if $myForm.hasError('password.required')}
								<input
									id="c"
									class="input is-danger"
									type="password"
									placeholder="Enter your password"
									bind:value={$password.value} />
							{:else} -->
								<input
									id="contactNumber"
									class="input"
									type="tel"
									name="contact_number" inputmode="numeric" pattern="[0-9]+" minlength="8" maxlength="20"
									placeholder="Enter your contact number"
									required={true}/>
							<!-- {/if} -->
							<span class="icon is-small is-left">
								<i class="fa-solid fa-phone"></i>
							</span>
						</div>
						<!-- {#if $myForm.hasError('password.required')}
							<p class="help is-danger">Password is required</p>
						{/if} -->
					</div>

					<div class="field">
						<label class="label" for="contactNumber">Contact Number</label>
						<div class="control has-icons-left">
							<!-- {#if $myForm.hasError('password.required')}
								<input
									id="c"
									class="input is-danger"
									type="password"
									placeholder="Enter your password"
									bind:value={$password.value} />
							{:else} -->
								<input
									id="contactNumber"
									class="input"
									type="tel"
									name="contact_number" inputmode="numeric" pattern="[0-9]+" minlength="8" maxlength="20"
									placeholder="Enter your contact number"
									required={true}/>
							<!-- {/if} -->
							<span class="icon is-small is-left">
								<i class="fa-solid fa-phone"></i>
							</span>
						</div>
						<!-- {#if $myForm.hasError('password.required')}
							<p class="help is-danger">Password is required</p>
						{/if} -->
					</div>


					<div class="field">
						<label class="label" for="password">Password</label>
						<div class="control has-icons-left">
							<!-- {#if $myForm.hasError('password.required')}
								<input
									id="c"
									class="input is-danger"
									type="password"
									placeholder="Enter your password"
									bind:value={$password.value} />
							{:else} -->
								<input
									id="password"
									class="input"
									type="password"
									name="password"
									placeholder="Enter your password"
									required={true}/>
							<!-- {/if} -->
							<span class="icon is-small is-left">
								<i class="fas fa-key" />
							</span>
						</div>
						<!-- {#if $myForm.hasError('password.required')}
							<p class="help is-danger">Password is required</p>
						{/if} -->
					</div>

					<div class="field">
						<div class="control">
							<button class="button is-warning is-fullwidth" type="submit">{registerButtonText}</button>
						</div>
					</div>
					<a href="/login" use:link>Already have an account? Log in now !</a>
					<div>
						<div class="divider">OR</div>
					</div>
					<SocialMediaButtons/>
				</form>
			</div>
		</div>
	</div>
</HundredVh>
