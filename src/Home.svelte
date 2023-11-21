<script>
	import { useLocation, navigate, Route, Router, link } from "svelte-routing";
    import BookedClasses from "./pages/BookedClasses.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import Settings from "./pages/Settings/index.svelte";
	import StudentPortfolio from "./pages/StudentPortfolio/index.svelte";
	import StemexAcademyCurriculum from "./pages/StemexAcademyCurriculum/index.svelte";
	import CurriculumManagement from "./pages/CurriculumManagement/index.svelte";
	
	import InstallationGuide from "./pages/InstallationGuide/index.svelte";
	import InstructorSchedule from "./pages/InstructorSchedule.svelte";
	import LastMinuteOffer from "./pages/LastMinuteOffer/index.svelte";
	import UserManagement from "./pages/UserManagement.svelte";
	import ClassManagement from "./pages/ClassManagement/index.svelte";
	import FileManagement from "./pages/FileManagement/index.svelte";
	import ClientManagement from "./pages/ClientManagement.svelte";
	import Statistics from "./pages/Statistics.svelte";

	import stemexIcon from "./assets/images/stemex_icon.png"

	import { WrappedFetch, WrappedFetchPOST } from "./utils/fetch";
	import { getHost } from "./utils/api";
	// import { AreaPlugin } from "rete-area-plugin";
	// import { NodeEditor } from "rete";
	// import { SveltePlugin, Presets } from "rete-svelte-plugin";

	// const area = new AreaPlugin();
	// const render = new SveltePlugin();
	// render.addPreset(Presets.classic.setup());
	// const editor = new NodeEditor();
	// editor.use(area);
	// area.use(render);

	let location = useLocation();
    // if (Math.random() > 0.5) {
	// 	navigate("/login", { replace: true });
    // }

	let role = "";
	let userName = "";
	 
	// this may return 403
	const [ wrappedFetchPromise, abort ] = WrappedFetch("/api/init")
	wrappedFetchPromise
	.then(json => {
		role = json.role;
		userName = json["user_name"];
	})
	.catch(e => {
		navigate("/login", { replace: true });
	});

	let isSideBarOpen = false;

	function toggleSidebar() {
		isSideBarOpen = !isSideBarOpen;
	}
</script>

<!-- <svelte:head>
	<style>
		html {
			height: fill-available;
			height: -webkit-fill-available;
		}

		body {
			margin: 0;
            /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            min-height: 100vh;
            min-height: fill-available;
            min-height: -webkit-fill-available;
		}

		. {
            z-index: 10;
            top: var(--navbar-height);
            background-color: black;
            color: white;

            width: 15rem;
            /*height: 100%;*/


            bottom: 0;
			right: 0;
            left: 0;
            overflow: hidden;
            position: fixed;
            z-index: 4;
        }
	</style>
</svelte:head> -->
	<!-- <Route path="/dashboard" component={Dashboard} />
	<Route path="/installation" component={Installation} />
	<Route path="/settings" component={Settings} />
	<Route path="/student-portfolio" component={StudentPortfolio} />


 <nav>
	<Link to="/">Home</Link>
	redirect to home and set invisible after login
	<Link to="/login">Login</Link>

	<Link to="/booked-classes">BookedClass</Link>
	<Link to="/dashboard">Dashboard</Link>
	<Link to="/installation">Installation</Link>
	<Link to="/settings">Settings</Link>
	<Link to="/student-portfolio">StudentPortfolio</Link>
</nav> -->
<nav class="navbar" aria-label="main navigation" style="box-shadow: 0 0 2rem #2125291a;">
	<div class="navbar-brand">
		<div class="navbar-start">
			<a
				href={`javascript:void(0);`}
				on:click={toggleSidebar}
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false">
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>
		<a class="navbar-item" href="/" use:link>
			<img
				src={stemexIcon}
				height="100%"
				alt="" />
		</a>
	</div>

	<!-- <div id="navbarBasicExample" class="navbar-menu"> -->
		<!-- <div class="navbar-start">
			<a class="navbar-item" href={`javascript:void(0);`}>Home</a>

			<a class="navbar-item" href={`javascript:void(0);`}>Documentation</a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link" href={`javascript:void(0);`}>More</a>

				<div class="navbar-dropdown">
					<a class="navbar-item" href={`javascript:void(0);`}>About</a>
					<a class="navbar-item" href={`javascript:void(0);`}>Jobs</a>
					<a class="navbar-item" href={`javascript:void(0);`}>Contact</a>
					<hr class="navbar-divider" />
					<a class="navbar-item" href={`javascript:void(0);`}>
						Report an issue
					</a>
				</div>
			</div>
		</div> -->

		<!-- <div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-primary" href={`javascript:void(0);`}>
						<strong>Sign up</strong>
					</a>
					<a class="button is-light" href={`javascript:void(0);`}>Log in</a>
				</div>
			</div>
		</div> -->
	<!-- </div> -->
	<div class="navbar-menu">
		<div class="navbar-end">
			<div class="navbar-item">
			  <!-- <div class="buttons">
				<a class="button is-primary" href={`javascript:void(0)`}>
				  <strong>Sign up</strong>
				</a>
				<a class="button is-light" href={`javascript:void(0)`}>
				  Log in
				</a>
			  </div>
			</div> -->
			<!-- <div class="image">
				<img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="testing">
			</div> -->
			
			<span>{userName}</span>
			&nbsp;&nbsp;
			<span class="icon" style="border-radius: 50%; background: hsl(0, 0%, 96%);">
				<i class="fa-solid fa-user"></i>
			</span>
		</div>
	</div>
</nav>

<!-- const sidebar = document.querySelector('.left-menu');
const main = document.querySelector('.main');
sidebar.classList.toggle('open');
main.classList.toggle('closed'); -->

<aside class={`my-left-menu menu ${isSideBarOpen ? "open" : ""}`} style="background-color: #222e3c;">
	<div style="flex: 1; overflow-y: auto;" class="pt-4 pb-4 pl-0">
		<ul class="menu-list">
			<li>
				<a class={$location.pathname == "/" ? "is-active" : "" } href="/" use:link>
					<i class="fa-solid fa-display"></i>&nbsp;
					Dashboard
				</a>
			</li>
		</ul>
		<p class="menu-label pl-4">
			Classes
		</p>
		<ul class="menu-list">
			{#if role == "parent"}
				<li>
					<a class={$location.pathname.includes("/booked-classes") ? "is-active" : "" } href="/booked-classes" use:link>
						<i class="fas fa-user" />&nbsp;&nbsp;Booked Classes
					</a>
				</li>
				<li>
					<a class={$location.pathname.includes("/student-portfolio") ? "is-active" : "" } href="/student-portfolio" use:link>
						<i class="fas fa-award"></i>&nbsp;&nbsp;Student Portfolio
					</a>
				</li>
			{/if}
			<li>
				<a class={$location.pathname.includes("/last-minute-offer") ? "is-active" : "" } href="/last-minute-offer" use:link>
					<i class="fa-regular fa-clock"></i>&nbsp;&nbsp;Last Minute Offer
				</a>
			</li>
			<li>
				<a class={$location.pathname.includes("/stemex-academy-curriculum") ? "is-active" : "" } href="/stemex-academy-curriculum" use:link>
					<i class="fa-solid fa-book-open"></i>&nbsp;&nbsp;Stemex Academy Curriculum
				</a>
			</li>
			{#if role == "parent"}
			<li>
				<a class={$location.pathname.includes("/installation-guide") ? "is-active" : "" } href="/installation-guide" use:link>
					<i class="fa-solid fa-cloud-arrow-down"></i>&nbsp;&nbsp;Installation Guide
				</a>
			</li>
			<li>
				<a class={$location.pathname.includes("/settings") ? "is-active" : "" } href="/settings" use:link>
					<i class="fa-solid fa-gear"></i>&nbsp;&nbsp;Settings
				</a>
			</li>
			{/if}
			{#if role == "admin" || role == "sales" || role == "instructor"}
				<p class="menu-label pl-4">
					Internal
				</p>
				<ul class="menu-list">
					{#if role == "admin" || role == "sales"}
						<li>
							<a class={$location.pathname.includes("/statistics") ? "is-active" : "" } href="/statistics" use:link>
								<i class="fa-solid fa-chart-line"></i>&nbsp;&nbsp;Statistics
							</a>
						</li>
					{/if}
					{#if role == "admin"}
						<li>
							<a class={$location.pathname.includes("/user-management") ? "is-active" : "" } href="/user-management" use:link>
								<i class="fa-solid fa-users"></i>&nbsp;&nbsp;User management
							</a>
						</li>
					{/if}
					{#if role == "admin"}
						<li>
							<a class={$location.pathname.includes("/file-management") ? "is-active" : "" } href="/file-management" use:link>
								<i class="fa-regular fa-folder-open"></i>&nbsp;&nbsp;File management
							</a>
						</li>
					{/if}
					{#if role == "sales"}
						<li>
							<a class={$location.pathname.includes("/client-management") ? "is-active" : "" } href="/client-management" use:link>
								<i class="fa-solid fa-users"></i>&nbsp;&nbsp;Client management
							</a>
						</li>
					{/if}
					{#if role == "admin"}
						<li>
							<a class={$location.pathname.includes("/class-management") ? "is-active" : "" } href="/class-management" use:link>
								<i class="fa-regular fa-calendar-days"></i>&nbsp;&nbsp;Class management
							</a>
						</li>
					{/if}
					{#if role == "admin"}
						<li>
							<a class={$location.pathname.includes("/curriculum-management") ? "is-active" : "" } href="/curriculum-management" use:link>
								<i class="fa-solid fa-flask"></i>&nbsp;&nbsp;Curriculum management
							</a>
						</li>
					{/if}
					{#if role == "instructor"}
						<li>
							<a class={$location.pathname.includes("/instructor-schedule") ? "is-active" : "" } href="/instructor-schedule" use:link>
								<i class="fa-regular fa-calendar-days"></i>&nbsp;&nbsp;Instructor Schedule
							</a>
						</li>
					{/if}
				</ul>
			{/if}
			<li>
				<a class={$location.pathname == `${getHost()}/api/logout` ? "is-active" : "" } href={`javascript:void(0)`} on:click={() => { 
						if (confirm('Are you sure?')) {
							const [ logout, _ ]= WrappedFetchPOST(`/api/logout`, JSON.stringify({}));
							logout.then(() => {
								navigate("/login", {replace: true})
							})
							.catch(err => {
								alert(err);
							})
						} 
					}
				}>
					<i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;Logout
				</a>
			</li>
		</ul>
	</div>
	<!-- <div>dfsd</div> -->
</aside>
<div class={`my-main ${isSideBarOpen ? "closed" : ""}`}>
<!-- <div id="main" class="column" style="background-color: #f5f7fb; padding: 3rem; border-top: 2px solid rgb(245, 245, 245);"> -->
	<section class="section">
		<Router>
			<Route path="/">
				<Dashboard role={role} userName={userName}/>
			</Route>

			<Route path="/booked-classes/*">
				<BookedClasses/>
			</Route>

			<Route path="/stemex-academy-curriculum/*">
				<StemexAcademyCurriculum/>
			</Route>
			
			<Route path="/student-portfolio">
				<StudentPortfolio/>
			</Route>

			<Route path="/last-minute-offer">
				<LastMinuteOffer/>
			</Route>
				
			<Route path="/user-management">
				<UserManagement/>
			</Route>

			<Route path="/class-management">
				<ClassManagement/>
			</Route>


			<Route path="/client-management">
				<ClientManagement/>
			</Route>

			<Route path="/file-management">
				<FileManagement/>
			</Route>

			<Route path="/curriculum-management/*">
				<CurriculumManagement previousPath={$location.pathname}/>
			</Route>

			<Route path="/statistics">
				<Statistics role={role} userName={userName}/>
			</Route>

			<Route path="/instructor-schedule">
				<InstructorSchedule role={role} userName={userName}/>
			</Route>

			<Route path="/installation-guide/*">
				<InstallationGuide role={role} userName={userName}/>
			</Route>
			
			<Route path="/sales">
				<div class="columns">
					<div class="column">
						<div class="content">
							<h4>Hi sales {userName}</h4>
						</div>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<div class="content">
							<div class="box">
								<!-- <table class="table">
									<thead>
										<tr>
											<th>A</th>
											<th>Course Date</th>
										</tr>
									</thead>
									<tbody>
										{#each response.data.results as item}
											<tr>
												<td>
													<a href="{$location.pathname}/{item.id}"
														class="is-underlined"
														use:link
													>
														{item.properties.course_dates}
													</a>
												</td>
												<td>{item.properties.new_course_name}</td>
											</tr>
										{/each}
									</tbody>
								</table> -->
							</div>
						</div>
					</div>
				</div>
			</Route>
			<Route path="/settings/*">
				<Settings/>
			</Route>

			<Route>
				<h1>Not found</h1>
			</Route>
		</Router>
	</section>
</div>