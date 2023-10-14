<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
    import { toUUIDexString } from "../../utils/UUIDex";
    
    //import elementry1 from "../assets/images/schedule-details/codingMineCraftElementry/elementry1.png"

    //export let courses;
    //export let routePath;
    export let parentId;

    //$: selectedUpdatedSchedule = courses.get(routePath);
    
    const location = useLocation();

    let wrappedFetchCurriculumCategoryCourse = null;
    let curriculumCategoryCourseDetails = [];

    onMount(() => {
        debugger;
        const url = `/api/curriculum-course-details?id=${toUUIDexString(parentId)}`;
        const [  _wrappedFetchCurriculumCategoryCourse ] = WrappedFetch(url);
        wrappedFetchCurriculumCategoryCourse = _wrappedFetchCurriculumCategoryCourse;
        wrappedFetchCurriculumCategoryCourse
        .then(data => {
            curriculumCategoryCourseDetails = data;
        })
    });
</script>

<div class="columns is-multiline">
	<div class="column is-one-third-desktop is-full-tablet is-full-mboile">
		<div class="columns is-multiline">
			<div class="column is-full-desktop is-half-tablet is-full-mobile">
				<iframe
					style="height: 380px; width: 100%"
					frameborder="0"
					webkitallowfullscreen=""
					mozallowfullscreen=""
					allowfullscreen=""
					src="https://www.youtube.com/embed/0SLnKsFWwFA"
					title="2019 STEMex Summer Camp - Technology & Coding"
				/>
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
				{#each curriculumCategoryCourseDetails.information_entries as { title, content }}
					<div class="box">
						<article class="media">
							<div class="media-left">
								<figure class="image" style="height: 150px; width: 150px;">
									<!-- <img src={elementry1} alt="fg"> -->
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
