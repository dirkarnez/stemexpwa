<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	// import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	
	let location = useLocation();

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

	onMount(() => {
		const [  _wrappedFetchCurriculum ] = WrappedFetch("/api/curriculum");
		wrappedFetchCurriculum = _wrappedFetchCurriculum;
		wrappedFetchCurriculum.then(data => {
			curriculum = data;
		})
	});
</script>

<Router>
	{#if Array.isArray(curriculum)}
		{#each curriculum as { description, icon_id, id } }
			<Route path={`/${stringToURLPart(description)}/edit`}>
				<!-- <SelectedCurriculumCategory colors={colors} parentId={id}/> -->

				<div class="field">
					<figure class="image is-128x128">
						<img src={getResourcesAPIByID(icon_id)} alt="">
					</figure>
					<br>
					<label class="label">Icon
						<div class="control">
							<input class="input" type="file">
						</div>
					</label>
				</div>
				<div class="field">
					<label class="label">Name
					<div class="control">
					  <input class="input" type="text" placeholder="Text input" value={description}>
					</div>
					</label>
				</div>

				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link">Update</button>
					</div>
					<div class="control">
						<button class="button is-link is-light">Cancel</button>
					</div>
				</div>
			</Route>
		{/each}
	{/if}

	<Route path="/">
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>Stemex Academy Curriculum</h4>
				</div>
			</div>
		</div>
		<div class="columns is-multiline is-mobile">
			{#if Array.isArray(curriculum)}
				{#each curriculum as { description, icon_id }, index}
					<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
						<div style="margin-top: 1.2rem; position:relative;">
							<div style="position:absolute;right:0;top:-20px;">
								<a href={`${$location.pathname}/${stringToURLPart(description)}/edit`} use:link><i class="fas fa-pen" style="padding: 0.2rem"></i></a>
							</div>
							<Link to={`${$location.pathname}/${stringToURLPart(description)}`}>
								<div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
									<div class="card-image">
										<figure class="image is-96x96">
										<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/ /* /api/resourses?id=23*/  getResourcesAPIByID(icon_id)}
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
								</div>
							</Link>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</Route>
</Router>
