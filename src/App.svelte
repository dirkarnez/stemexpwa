<script>
	import { Router, Route } from "svelte-routing";
	import stemex_icon from "../../assets/images/stemex_icon.png";
	import Home from "./Home.svelte";
	import LoginPage from "./pages/Login/index.svelte";
	import RegisterPage from "./pages/Register/index.svelte";
	import ActivationPage from "./pages/Activation/index.svelte";
	import Curriculum from "./pages/Curriculum/index.svelte";

</script>

<Router>
	<Route path="/login">
		<LoginPage/>
	</Route>
	<Route path="/register">
		<RegisterPage/>
	</Route>
	<Route path="/activation">
		<ActivationPage/>
	</Route>
	<Route path="/curriculum-embeded/*">
		<div>
			Title
			<br>
			<Curriculum/>
		</div>
	</Route>
	<Route path="/*">
		<Home/>
	</Route>
</Router>

<!-- 
  "/"
if logined -> "/"
else "/login"

-->