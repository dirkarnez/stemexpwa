<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link, useRouter } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import CreateOrEditCourse from "./CreateOrEditCourse.svelte";
	import CreateOrEditCourseType from "./CreateOrEditCourseType.svelte";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
	import CurriculumEntryButton from "../../components/CurriculumEntryButton/index.svelte"
	
	export let parentId = null;

	let location = useLocation();
	let router = useRouter();
	const dispatch = createEventDispatcher();
	// const currentPath = $location.pathname;

	const colors = [
		"rgb(33, 209, 100)",
		"rgb(219, 93, 50)",
		"rgb(247, 163, 27)",
		"rgb(33, 130, 209)",
		"rgb(222, 219, 49)",
		"rgb(145, 20, 186)"
	];

	// export let role = "";

	let wrappedFetchCurriculum = null;
	let curriculum = [];

	// export let previousPath;

	const init = () => {
		const [  _wrappedFetchCurriculum ] = WrappedFetch(isNullOrEmpty(parentId) ? `/api/curriculum-tree` : `/api/curriculum-tree?parent-id=${parentId}`);
		wrappedFetchCurriculum = _wrappedFetchCurriculum;
		wrappedFetchCurriculum.then(data => {
			curriculum = data;
			debugger;
		})
	}
	
	onMount(init);
</script>
<div class="columns">
	<div class="column">
		<!-- <div class="content">
			<h4>Curriculum</h4>
			<nav class="breadcrumb" aria-label="breadcrumbs">
				<ul style="margin-left: 0;">
				  <li><a href={`javascript:void(0)`}>Bulma</a></li>
				  <li><a href={`javascript:void(0)`}>Documentation</a></li>
				  <li><a href={`javascript:void(0)`}>Components</a></li>
				  <li class="is-active"><a href={`javascript:void(0)`} aria-current="page">Breadcrumb</a></li>
				</ul>
			</nav>
		</div> -->
		<!-- {#if (previousPath.match(/\//g) || []).length > 1}
			<p>
				<a href={previousPath} class="button is-danger" use:link>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-chevron-left align-middle">
						<polyline points="15 18 9 12 15 6" />
					</svg>
					Back
				</a>
			</p>
		{/if} -->
	</div>
</div>

<Router>
	{#if Array.isArray(curriculum)}
		{#each curriculum as { description, icon_id, id, parent_id, is_course } }

			<Route path={`/${stringToURLPart(description)}/*`}>
				<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
				<Index parentId={id}/> <!---previousPath={currentPath}-->
			</Route>
			<Route path={`/${stringToURLPart(description)}/new-course`}>
				<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
				<CreateOrEditCourse parentId={id} id={""}/> <!---previousPath={currentPath}-->
			</Route>
			{#if is_course}
				<Route path={`/${stringToURLPart(description)}/edit-course`}>
					<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
					<CreateOrEditCourse parentId={parent_id} id={id} on:done={init}/> <!---previousPath={currentPath}-->
				</Route>
			{:else}
				<Route path={`/${stringToURLPart(description)}/edit-course-type`}>
					<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
					<CreateOrEditCourseType parentId={parent_id} id={id} on:done={() => {
						debugger;
						init();
						dispatch('done', {});
					}}/> <!---previousPath={currentPath}-->
				</Route>	
			{/if}	
		{/each}
	{/if}
	<Route path={`/new-course`}>
		<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->
		<CreateOrEditCourse parentId={""} id={""} on:done={init}/> <!---previousPath={currentPath}-->
	</Route>
	<Route path={`/new-course-type`}>
		<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->

		<CreateOrEditCourseType bind:parentId={parentId} on:done={() => {
			init();
			dispatch('done', {});
		}}/> <!---previousPath={currentPath}-->
	</Route>

	<Route path="/">
		<div class="columns is-multiline is-mobile">
			{#if Array.isArray(curriculum)}
				{#each curriculum as { description, icon_id, is_course }, index}
					<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
						<div style="margin-top: 1.5rem; position:relative;">
							<div style={`position:absolute;right:0; top: -1.5rem;`}>
								<a href={`${$location.pathname}/${stringToURLPart(description)}/${is_course ? "edit-course" : "edit-course-type"}`} use:link><i class="fas fa-pen" style="padding: 0.2rem"></i></a>
							</div>
							{#if !is_course}
								<Link to={`${$location.pathname}/${stringToURLPart(description)}`}>
									<!-- <div class="box is-flex is-flex-direction-row">
										<div class="card-image">
											<figure class="image is-96x96" style="overflow: hidden;">
											<img 
												style={`height: 100%; width: 100%; object-fit: cover; border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;`}
												src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/  getResourcesAPIByID(icon_id)}
												alt="Placeholder">
											</figure>
										</div>
										<div class="card-content pt-0 pb-0">
											<div class="content" style="height: 96px;width: 100%;">
											<div class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1" style="height: 100%; width: 100%">
												<p style="text-align: center;" class="is-size-5 is-size-6-tablet has-text-weight-semibold"></p>
											</div>
											</div>
										</div>
									</div> -->

									<CurriculumEntryButton description={description} iconId={icon_id} color={colors[index % colors.length]}  />
								</Link>
							{:else}
								<!-- <div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
									<div class="card-image">
										<figure class="image is-96x96"  style="overflow: hidden;">
										<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/   getResourcesAPIByID(icon_id)}
											style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
											alt="Placeholder">
										</figure>
									</div>
									<div class="card-content pt-0 pb-0">
										<div class="content" style="height: 96px;width: 100%;">
											<div class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1" style="height: 100%; width: 100%">
												<p style="color: white; text-align: center;" class="is-size-5 is-size-6-tablet has-text-weight-semibold">{description}</p>
											</div>
										</div>
									</div>
								</div> -->
								<CurriculumEntryButton description={description} iconId={icon_id} color={colors[index % colors.length]}  />
							{/if}
						</div>
					</div>
				{/each}
			{/if}
			<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
				<div style="margin-top: 1.5rem; position:relative;">
					<!-- <div class="box" style={` border-radius: 5px; height: 96px; width: 100%;`}>
						<div class="content" >
							<div class="is-flex ">
							
							</div>
						</div>
					</div> -->


					<div class="box m-0 p-0" style={`background-color: unset; border: 2px dashed #0087F7; height: 96px; width: 100%;`}>
						<div class="columns is-mobile m-0 p-0">
							<div class={`column`}>
								<div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
									<p>
										<a class="is-text is-underlined" href={`${$location.pathname}/new-course`} use:link>add a new course here</a>
									</p>
									<p>
										or
									</p>
									<p>
										<a class="is-text is-underlined" href={`${$location.pathname}/new-course-type`} use:link>add a new course type here</a>
									</p>
								</div>
							</div>
						</div>
					</div>
						<!-- <div class="card is-flex is-flex-direction-row">
							--- <div class="card-image">
								<figure class="image is-96x96">
								<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/  getResourcesAPIByID(icon_id)}
									style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
									alt="Placeholder">
								</figure>
							</div> --
							<div class="card-content pt-0 pb-0">
									
							</div>
						</div> -->
				</div>
			</div>
		</div>
	</Route>
</Router>