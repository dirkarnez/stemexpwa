<script>
	import { onMount } from "svelte";
	import { getResourcesAPIByID } from "../../utils/api";
  //import codingMinecraft from "../assets/images/upcoming-schedule/codingMinecraft/Level 1-min.png";
  import { FakeFetch } from "../../utils/fetch";

  let promise = undefined;

  promise = FakeFetch("", [
    {

    }
  ]);
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
			<!-- <div class="box"> -->
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
						<!-- <div class="timeline is-centered">
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
						</div> -->

						<ol class="timeline">
							{#each [
								{ icon_id: "84b20e8a7cb511ee9aa006c3bc34e27e", name: `Coding Python Introductory`, description: `First lesson on ${new Date(Date.now() + 60*60*24*2 * 1000).toDateString()}`},
								{ icon_id: "84b3df1c7cb511ee9aa006c3bc34e27e", name: `Lego Robotics Master`, description: `Second lesson on ${new Date(Date.now() + 60*60*24*2 * 1000).toDateString()}`},
								{ icon_id: "84b2a5ad7cb511ee9aa006c3bc34e27e", name: `Coding Scratch Advanced`, description: `First lesson on ${new Date(Date.now() + 60*60*24*3 * 1000).toDateString()}`},
								{ icon_id: "84b06f777cb511ee9aa006c3bc34e27e", name: `Coding Minecraft Elementary`, description: `Third lesson on ${new Date(Date.now() + 60*60*24*3 * 1000).toDateString()}`},
								{ icon_id: "84b128dd7cb511ee9aa006c3bc34e27e", name: `Coding Roblox Intermediate`, description: `Second lesson on ${new Date(Date.now() + 60*60*24*3 * 1000).toDateString()}`}
							] as {icon_id, name, description}}
																<li class="timeline-item extra-space">
																	<span
																		class="timeline-item-icon filled-icon has-background-link"
																	>
																		<!-- <svg
																			xmlns="http://www.w3.org/2000/svg"
																			viewBox="0 0 24 24"
																			width="24"
																			height="24"
																		>
																			<path fill="none" d="M0 0h24v24H0z" />
																			<path
																				fill="currentColor"
																				d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"
																			/>
																		</svg> -->
																		<i class="fa-solid fa-tag"></i>
																	</span>
																	<div class="timeline-item-wrapper" style="width: 100%;">
																		<!-- <div class="comment">
																			<p>
																				I've sent him the assignment we discussed recently, he is
																				coming back to us this week. Regarding to our last call, I
																				really enjoyed talking to him and so far he has the
																				profile we are looking for. Can't wait to see his
																				technical test, I'll keep you posted and we'll debrief it
																				all together!😊
																			</p>
																			<button class="button">👏 2</button>
																		</div> -->
																		<!-- <div class="card is-flex is-flex-direction-row">
																			<div class="card-image">
																				<figure class="image is-96x96">
																					<img src={/*icon ?? "https://bulma.io/images/placeholders/96x96.png"*/  }
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

																		<div class="box" style="width: 100%;">
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
																						<h4>{name}</h4>
																						<p>{description}</p>
																						<br>
																						<a class="is-link" href={`javascript:void(0)`}>Join now</a>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</li>
																<br>	
							{/each}
						</ol>
						<!-- {:catch error}
						<p style="color: red">{error.message}</p> -->
					{/await}
				{/if}
			<!-- </div> -->
		</div>
	</div>
</div>
