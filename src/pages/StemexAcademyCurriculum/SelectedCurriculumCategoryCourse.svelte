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
    // let curriculumCategoryCourses = []

    onMount(() => {
        debugger;
        const url = `/api/curriculum-course?parent-id=${toUUIDexString(parentId)}`;
        const [  _wrappedFetchCurriculumCategoryCourse ] = WrappedFetch(url);
        wrappedFetchCurriculumCategoryCourse = _wrappedFetchCurriculumCategoryCourse;
        wrappedFetchCurriculumCategoryCourse
        .then(data => {
            debugger;
        })
    });
</script>

123