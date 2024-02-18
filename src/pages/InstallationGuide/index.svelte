<script>
	import { onMount } from "svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
    import Loading from "../../components/Loading/index.svelte";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
	
	// export let parentId = null;

	let location = useLocation();
	// const currentPath = $location.pathname;

	const colors = [
		"rgb(66, 133, 244)",
        "rgb(232, 62, 140)",
        "rgb(23, 162, 184)",
        "rgb(111, 66, 193)"
	];

	// // export let role = "";

	// let wrappedFetchCurriculum = null;
	// let curriculum = [];

	// // export let previousPath;

	// const init = () => {
	// 	const [  _wrappedFetchCurriculum ] = WrappedFetch(isNullOrEmpty(parentId) ? `/api/` : `/api/`);
	// 	wrappedFetchCurriculum = _wrappedFetchCurriculum;
	// 	wrappedFetchCurriculum.then(data => {
	// 		curriculum = data;
	// 	})
	// }

    let guidelines = [];

    const init = () => {
        FakeFetch("/api/installation-guide", [
            { name: "Coding Minecraft" },
            { name: "Coding Roblox"},
            { name: "Python"},
            { name: "Cyber Virtual Robotics"},
            { name: "App Inventor"},
            { name: "Micro:bit"},
            { name: "Scratch"},
            { name: "3D Design & Printing"},
            { name: "A.I. & Machine Learning"},
            { name: "AR / VR"},
            { name: "Smart City"},
            { name: "LEGO EV3"},
            { name: "LEGO Wedo"}
        ])
        .then(data => {
            guidelines = data;
        })
    };
	onMount(init);

</script>

<Router>
    {#if Array.isArray(guidelines) && guidelines.length > 0}
        {#each guidelines as { name, id } }
            <Route path={`/${stringToURLPart(name)}/*`}>
                Will be available
                <!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
            </Route>
        {/each}
    {/if}
    <Route path="/">
        <div class="columns">
            <div class="column">
                <div class="content">
                    <h4>Installation Guide</h4>
                </div>
            </div>
        </div>
        <div class="columns is-multiline is-mobile">
			{#if Array.isArray(guidelines) && guidelines.length > 0}
				{#each guidelines as { name }, index}
					<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
						<Link to={`${$location.pathname}/${stringToURLPart(name)}`}>
							<div class="card" style={`background-color: ${colors[index % colors.length]}`}>
								<!-- <div class="card-image">
									<figure class="image is-96x96">
										<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/  }
											style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
											alt="Placeholder">
									</figure>
								</div> -->
                                <div class="card-content is-flex is-align-items-center is-justify-content-center" style="height: 120px; color: white;">
                                    <div class="content is-flex is-align-items-center is-justify-content-center">
                                        <div style="text-align: center;">
                                            <span><i class="fa-solid fa-cloud-arrow-down" style="font-size: 2rem;"></i></span>
                                            <br>
                                            {name}
                                        </div>
                                    </div>
                                  </div>
							</div>
						</Link>
					</div>
				{/each}
            {:else}
                <Loading/>
			{/if}
		</div>
    </Route>
</Router>