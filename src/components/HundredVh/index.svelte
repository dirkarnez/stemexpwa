<script>
	import AppBackground from "../../assets/images/AppBackground.png";
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
			overflow-y: hidden;
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
		class="columns is-centered has-text-centered mt-4 mb-4"
		style="width: 100%; max-width: 1024px">
		<div class="column is-full-mobile is-half-desktop is-half-tablet">
			<h1 class="title" style="color: white">STEMex Academy</h1>
            <slot name="title"></slot>
            <slot name="content"></slot>
        </div>
	</div>
</div>
