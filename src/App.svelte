<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import LoginPage from "./pages/Login/index.svelte";
	import RegisterPage from "./pages/Register/index.svelte";
	
</script>

<Router>
	<Route path="/login">
		<LoginPage/>
	</Route>
	<Route path="/register">
		<RegisterPage/>
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