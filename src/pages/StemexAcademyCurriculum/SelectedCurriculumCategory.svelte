<script>
	import { onMount } from "svelte";
	import { WrappedFetch } from "../../utils/fetch";
    import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
    import { toUUIDexString } from "../../utils/UUIDex";
    import { getHost } from "../../utils/api";
    import SelectedCurriculumCategoryCourse from "./SelectedCurriculumCategoryCourse.svelte"
    
    //import elementry1 from "../assets/images/schedule-details/codingMineCraftElementry/elementry1.png"

    //export let courses;
    //export let routePath;
    export let parentId;
    export let colors;

    //$: selectedUpdatedSchedule = courses.get(routePath);
    
    const location = useLocation();

    const currentPath = $location.pathname;

    let wrappedFetchCurriculumCategory = null;
    let curriculumCategoryCourses = [];

    onMount(() => {
        const url = `/api/curriculum-courses?parent-id=${toUUIDexString(parentId)}`;
        const [  _wrappedFetchCurriculumCategory ] = WrappedFetch(url);
        wrappedFetchCurriculumCategory = _wrappedFetchCurriculumCategory;
        wrappedFetchCurriculumCategory
        .then(data => {
            curriculumCategoryCourses = data;
        })
    });
</script>



<Router>
	{#if Array.isArray(curriculumCategoryCourses)}
		{#each curriculumCategoryCourses as { description, id } }
            <Route path={`/${stringToURLPart(description)}`}>
				<SelectedCurriculumCategoryCourse parentId={id} previousPath={currentPath}/>
			</Route>
		{/each}
	{/if}

	<Route path="/">
        <div class="columns">
            <div class="column">
                <div class="content">
                    <p>
                        <a href="/stemex-academy-curriculum" class="button is-danger" use:link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left align-middle" _ngcontent-drd-c75=""><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Back
                        </a>
                    </p>
                </div>
            </div>
        </div>
        {#if Array.isArray(curriculumCategoryCourses)}
            <div class="columns is-multiline is-mobile">
                {#each curriculumCategoryCourses as { description, icon_id}, index}
                    <div class="column is-one-third-desktop is-half-tablet is-full-mobile">
                        <Link to={`${$location.pathname}/${stringToURLPart(description)}`}>
                            <div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
                                <div class="card-image">
                                    <figure class="image is-96x96">
                                        <img src={ `${getHost()}${icon_id ? `/api/resourses?id=${toUUIDexString(icon_id)}`  :""}`}
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
                {/each}
            </div>
        {/if}
    </Route>
</Router>

<!-- 
<Router>
    {#each selectedUpdatedSchedule.subCategories as { name, icon, routePath}, index}
        <Route path="/{routePath}">
            <div class="columns is-multiline">
                <div class="column is-one-third-desktop is-full-tablet is-full-mboile">
                    <div class="columns is-multiline">
                        <div class="column is-full-desktop is-half-tablet is-full-mobile">
                            <iframe style="height: 380px; width: 100%" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="https://www.youtube.com/embed/0SLnKsFWwFA" title="2019 STEMex Summer Camp - Technology & Coding"/>
                        </div>
                        <div class="column is-full-desktop is-half-tablet is-full-mobile">
                            <div class="content">
                                <h4>Our blog</h4>
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-two-thirds-desktop is-full-tablet is-full-mboile">
                    <div class="content">
                        <div class="box">
                            <article class="media">
                                <div class="media-left">
                                <figure class="image" style="height: 150px; width: 150px;">
                                    <img src={elementry1} alt="fg">
                                </figure>
                                </div>
                                <div class="media-content">
                                <div class="content">
                                    <h2>A-Medieval Machinations Redstone</h2>
                                    <p>
                                    This course will introduce students to use Redstone, electrical circuitry, in a Medieval Theme. Students make mine carts to gather resources, collaborate to build their kingdom and to defend their castle. They are going to experience a lot of creation, adventure and exploration.
                                    </p>
                                </div>
                                </div>
                            </article>
                            </div>    
                    </div>
                </div>
            </div>
        </Route>
    {/each}


    <Route path="/">
        <div class="columns is-multiline is-mobile">
            {#each selectedUpdatedSchedule.subCategories as { name, icon, routePath}, index}
                <div class="column is-one-third-desktop is-half-tablet is-full-mobile">
                    <Link to={`${$location.pathname}/${routePath}`}>
                        <div class="card is-flex is-flex-direction-row" style={`background-color: ${colors[index % colors.length]}`}>
                            <div class="card-image">
                                <figure class="image is-96x96">
                                    <img src={icon ?? "https://bulma.io/images/placeholders/96x96.png"} 
                                        style="border-top-left-radius: 0.25rem; border-top-right-radius: 0; border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0;" 
                                        alt="Placeholder">
                                </figure>
                            </div>
                            <div class="card-content pt-0 pb-0">
                                <div class="content" style="height: 96px;width: 100%;">
                                    <div class="is-flex is-flex-direction-row is-align-items-center pt-1 pb-1" style="height: 100%; width: 100%">
                                        <p style="color: white; text-align: center;" class="is-size-5 is-size-6-tablet has-text-weight-semibold">{name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            {/each}
        </div>
    </Route>
</Router> -->

                <!-- {#if !!promise}
                    {#await promise}
                        <p>...waiting</p>
                    {:then response}
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td style="width: 250px;">Course Name :-</td>
                                    <td>{response.data.properties.new_course_name?.value ?? "-"}</td>
                                </tr>                        
                                <tr>        
                                    <td style="width: 250px;">Course Name :-</td>
                                    <td>{response.data.properties.course_dates?.value ?? "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="columns is-mobile is-centered">
                            <div class="column is-narrow">
                                <a href="https://www.google.com/maps/place/STEMex+Academy/@22.3030887,114.1730048,17z/data=!3m1!4b1!4m5!3m4!1s0x340401964d551321:0xaf551dc6e2467710!8m2!3d22.3030887!4d114.1751935" target="_blank" class="button is-link">Location</a>
                            </div>
                        </div>
                    {:catch error}
                        <p style="color: red">{error.message}</p>
                    {/await}
                {/if} -->

