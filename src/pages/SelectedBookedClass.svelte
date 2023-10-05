<script>
	import { onMount } from "svelte";
    import { link } from "svelte-routing";
    import { FakeFetch /*WrappedFetch*/ } from "../utils/fetch";

    export let id;
    let promise = undefined;

    onMount(() => {
        promise = fakeFetch(id, {
            data: {
                properties: {
                    new_course_name: {
                        value: "Coding Minecraft Advance B"
                    },
                    course_dates: {
                        value: "12, 19 May 2, 9 Jun 2023"
                    }
                }
            }
        });
    });
</script>

<div class="columns">
    <div class="column">
        <div class="content">
            <p>
                <a href="/booked-classes" class="button is-danger" use:link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left align-middle" _ngcontent-drd-c75=""><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back
                </a>
            </p>
            <h4>Course Detail</h4>
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="content">
            <div class="box">
                {#if !!promise}
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
                {/if}
            </div>
        </div>
    </div>
</div>