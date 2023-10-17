<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { useLocation, Link, Route, Router, link, navigate } from "svelte-routing";
    import { toUUIDexString } from "../../utils/UUIDex";
	import { getHost } from "../../utils/api";
    
    //import elementry1 from "../assets/images/schedule-details/codingMineCraftElementry/elementry1.png"

    //export let courses;
    //export let routePath;
    export let parentId;
	export let previousPath;

    //$: selectedUpdatedSchedule = courses.get(routePath);
    
    const location = useLocation();
	
    let wrappedFetchCurriculumCategoryCourse = null;
    let curriculumCategoryCourseDetails = [];

    onMount(() => {
        const url = `/api/curriculum-course-details?id=${toUUIDexString(parentId)}`;
        const [  _wrappedFetchCurriculumCategoryCourse ] = WrappedFetch(url);
        wrappedFetchCurriculumCategoryCourse = _wrappedFetchCurriculumCategoryCourse;
        wrappedFetchCurriculumCategoryCourse
        .then(data => {
            curriculumCategoryCourseDetails = data;
        })
    });
</script>

<div class="columns">
    <div class="column">
        <div class="content">
            <p>
                <a href={!!previousPath ? previousPath : "/stemex-academy-curriculum"} class="button is-danger" use:link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left align-middle" _ngcontent-drd-c75=""><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back
                </a>
            </p>
        </div>
    </div>
</div>

<div class="columns is-multiline">
	<div class="column is-one-third-desktop is-full-tablet is-full-mboile">
		<div class="columns is-multiline">
			<div class="column is-full-desktop is-half-tablet is-full-mobile">
                {#if Array.isArray(curriculumCategoryCourseDetails.youtube_video_entries)}
                    {#each curriculumCategoryCourseDetails.youtube_video_entries as { url, title }}
                        <iframe
                            style="height: 380px; width: 100%"
                            frameborder="0"
                            webkitallowfullscreen="false"
                            mozallowfullscreen="false"
                            allowfullscreen="false"
                            src={url}
                            title={title}
                        />
                    {/each}
                {/if}
			</div>
			<div class="column is-full-desktop is-half-tablet is-full-mobile">
				<div class="content">
					<h4>Our blog</h4>
					<p>
						{#if Array.isArray(curriculumCategoryCourseDetails.blog_entries)}
							{#each curriculumCategoryCourseDetails.blog_entries as { external_url, title }}
								<a href={external_url} target="_blank">{title}</a><br />
							{/each}
						{/if}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="column is-two-thirds-desktop is-full-tablet is-full-mboile">
		<div class="content">
			{#if Array.isArray(curriculumCategoryCourseDetails.information_entries)}
				{#each curriculumCategoryCourseDetails.information_entries as { title, content, icon_id }}
					<div class="box">
						<article class="media">
							<div class="media-left">
								<figure class="image" style="height: 150px; width: 150px;">
									<!-- svelte-ignore a11y-missing-attribute -->
									<img src={ `${getHost()}${icon_id ? `/api/resourses?id=${toUUIDexString(icon_id)}`  :""}`}>
								</figure>
							</div>
							<div class="media-content">
								<div class="content">
									<h2>{title}</h2>
									<p>{content}</p>
								</div>
							</div>
						</article>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
