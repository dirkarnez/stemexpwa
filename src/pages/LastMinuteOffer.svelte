<script>
	import { onMount } from "svelte";
  import codingMinecraft from "../assets/images/upcoming-schedule/codingMinecraft/Level 1-min.png";
  import { FakeFetch } from "../utils/fetch";

  let promise = undefined;

  promise = FakeFetch("", [
    {

    }
  ]);

	onMount(() => {
		console.log(`I'm the on create method of the async component c:`);
	});
</script>

<div class="columns">
	<div class="column">
		<div class="content">
			<h4>Last Minute Offer</h4>
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
						<!-- <table class="table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Course Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each response.data.results as item}
                                    <tr>
                                        <td>
                                            <a href="{$location.pathname}/{item.id}"
                                                class="is-underlined"
                                                use:link
                                            >
                                                {item.properties.course_dates}
                                            </a>
                                        </td>
                                        <td>{item.properties.new_course_name}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table> -->
						<div class="timeline is-centered">
							<header class="timeline-header">
								<span class="tag is-medium is-primary">Today</span>
							</header>
							<div class="timeline-item">
								<div class="timeline-marker" />
								<div class="timeline-content">
									<p class="heading">August 2023</p>
									<p>Timeline content - Can include any HTML element</p>
								</div>
							</div>
							<div class="timeline-item">
								<div class="timeline-marker is-image is-64x64" style="border-radius: 0;">
									<img src={codingMinecraft} alt="" />
								</div>
								<div class="timeline-content">
									<p class="heading">February 2016</p>
									<p>Timeline content - Can include any HTML element</p>
								</div>
							</div>
							<header class="timeline-header">
								<span class="tag is-primary">September 2023</span>
							</header>
							<div class="timeline-item is-danger">
								<div class="timeline-marker is-danger is-icon">
									<i class="fa fa-flag" />
								</div>
								<div class="timeline-content">
									<p class="heading">March 2017</p>
									<p>Timeline content - Can include any HTML element</p>
								</div>
							</div>
							<div class="timeline-header">
								<span class="tag is-medium is-primary">End</span>
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
