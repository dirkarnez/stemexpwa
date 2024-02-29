<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import LoginPage from "./pages/Login/index.svelte";
</script>

<Router>
	<Route path="/login">
		<LoginPage/>
	</Route>
	<Route path="/register">
		<h1>Hi</h1>
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