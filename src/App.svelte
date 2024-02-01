<script lang="ts">

</script>

<Router>
	<Route path="/login">
		<LoginPage/>
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