<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { useLocation, Link, Route, Router, link, navigate } from "svelte-routing";
	import { getResourcesAPIByID } from "../../utils/api";
	import { convertYouTubeUrl } from "../../utils/url";
    
    //import elementry1 from "../assets/images/schedule-details/codingMineCraftElementry/elementry1.png"

    //export let courses;
    //export let routePath;
    export let parentId;

    //$: selectedUpdatedSchedule = courses.get(routePath);
    
    const location = useLocation();
	
    let wrappedFetchCurriculumCategoryCourse = null;
    let curriculumCategoryCourseDetails = [];

    onMount(() => {
        const url = `/api/curriculum-course?id=${parentId}`;
        const [  _wrappedFetchCurriculumCategoryCourse ] = WrappedFetch(url);
        wrappedFetchCurriculumCategoryCourse = _wrappedFetchCurriculumCategoryCourse;
        wrappedFetchCurriculumCategoryCourse
        .then(data => {
			debugger;
            curriculumCategoryCourseDetails = data;
        })
    });
</script>

<!-- <div class="columns">
    <div class="column">
        <div class="content">
            <p>
                <a href={!!previousPath ? previousPath : "/curriculum"} class="button is-danger" use:link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left align-middle" _ngcontent-drd-c75=""><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back
                </a>
            </p>
        </div>
    </div>
</div> -->

<div class="columns is-multiline">
	<div class="column is-one-third-desktop is-full-tablet is-full-mboile">
		<div class="columns is-multiline">
			<div class="column is-full-desktop is-half-tablet is-full-mobile">
                {#if Array.isArray(curriculumCategoryCourseDetails.youtube_video_entries)}
                    {#each curriculumCategoryCourseDetails.youtube_video_entries as { url  }}
						<div class="iframe-container">
							<iframe
								style="width: 100%; border: none;"
								frameborder="0"
								webkitallowfullscreen="false"
								mozallowfullscreen="false"
								allowfullscreen="false"
								src={convertYouTubeUrl(url)}
								title="dfg"
							>
								<p>Your browser does not support iframes.</p>
							</iframe>
						</div>
                    {/each}
                {/if}
			</div>
			<div class="column is-full-desktop is-half-tablet is-full-mobile">
				<div class="content">
					<h4>Our blog</h4>
					{#if Array.isArray(curriculumCategoryCourseDetails.blog_entries)}
						{#each curriculumCategoryCourseDetails.blog_entries as { external_url, title }}
						<p>
							<a href={external_url} target="_blank">{title}</a>
						</p>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="column is-two-thirds-desktop is-full-tablet is-full-mboile">
		<div class="content">
			{#if Array.isArray(curriculumCategoryCourseDetails.levels)}
				{#each curriculumCategoryCourseDetails.levels as { title, description, icon_id }}
					<div class="box">
						<!-- <article class="media">
							<div class="media-left">
								<figure class="image" style="height: 150px; width: 150px;">
									
								</figure>
							</div>
							<div class="media-content">
								
							</div>
						</article> -->
						<div class="columns is-multiline is-mobile">
							<div class="column is-narrow-desktop is-full-mobile">
								<div class="columns is-mobile is-centered">
									<div class="column is-full" style="text-align: center;">
										<img src={getResourcesAPIByID(icon_id)} style="max-height: 150px" alt="">
									</div>
								</div>
							</div>
							<div class="column is-full-mobile">
								<div class="content">
									<h2>{title}</h2>
									<p>{description}</p>
									<a class="is-link" href={`javascript:void(0)`}>Join now</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
