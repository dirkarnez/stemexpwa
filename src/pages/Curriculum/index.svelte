<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router } from "svelte-routing";
	import SelectedCurriculumCategory from "./SelectedCurriculumCategory.svelte";
	import CurriculumEntryButton from "../../components/CurriculumEntryButton/index.svelte";
	
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
		const [  _wrappedFetchCurriculum ] = WrappedFetch(`/api/curriculum-tree`);
		wrappedFetchCurriculum = _wrappedFetchCurriculum;
		wrappedFetchCurriculum.then(data => {
			curriculum = data;
		})
	});
</script>

<Router>
	{#if Array.isArray(curriculum)}
		{#each curriculum as { description, id } }
			<Route path={`/${stringToURLPart(description)}/*`}>
				<SelectedCurriculumCategory colors={colors} parentId={id}/>
			</Route>
		{/each}
	{/if}

	<Route path="/">
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>Curriculum</h4>
				</div>
			</div>
		</div>
		<div class="columns is-multiline is-mobile">
			{#if Array.isArray(curriculum)}
				{#each curriculum as { description, icon_id }, index}
					<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
						<Link to={`${$location.pathname}/${stringToURLPart(description)}`}>
							<!-- <div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
								<div class="card-image">
									<figure class="image is-96x96" style="overflow: hidden;">
										<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/  getResourcesAPIByID(icon_id)}
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
							<CurriculumEntryButton description={description} iconId={icon_id} color={colors[index % colors.length]} />
						</Link>
					</div>
				{/each}
			{/if}
		</div>
	</Route>
</Router>
