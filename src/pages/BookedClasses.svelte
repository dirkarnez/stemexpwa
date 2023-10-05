<script>
	import { Route, Router, link, useLocation } from "svelte-routing";
	import { onMount } from "svelte";
  import SelectedBookedClass from "./SelectedBookedClass.svelte";

	const location = useLocation();

	let promise = undefined;

	function handleClick() {
		promise = Promise.resolve(
			JSON.parse(
				'{"data":{"total":18,"results":[{"id":"13953328933","properties":{"course_dates":"8,22,29Jul,5Aug2023","createdate":"2023-07-03T09:19:41.439Z","dealname":"Offline/AppInventor-IntermediateB(Eng)8,22,29Jul,5Aug2023(13:30-15:00)","hs_lastmodifieddate":"2023-07-03T09:20:08.473Z","hs_object_id":"13953328933","new_course_name":"AppInventor-IntermediateB","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-07-03T09:19:41.439Z","updatedAt":"2023-07-03T09:20:08.473Z","archived":false},{"id":"13393927738","properties":{"course_dates":"20May10,17,24Jun2023","createdate":"2023-05-20T02:59:29.466Z","dealname":"Offline/AppInventor-IntermediateA(Eng/Conto)20May10,17,24Jun2023(13:30-15:00)","hs_lastmodifieddate":"2023-07-11T10:09:03.139Z","hs_object_id":"13393927738","new_course_name":"AppInventor-IntermediateA","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-05-20T02:59:29.466Z","updatedAt":"2023-07-11T10:09:03.139Z","archived":false},{"id":"13054276918","properties":{"course_dates":"22,29Apr6,13May2023","createdate":"2023-04-19T05:24:09.864Z","dealname":"Offline/AppInventor-IntroductoryB(Both)22,29Apr6,13May2023(13:30-15:00)","hs_lastmodifieddate":"2023-05-20T05:34:34.061Z","hs_object_id":"13054276918","new_course_name":"AppInventor-IntroductoryB","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-04-19T05:24:09.864Z","updatedAt":"2023-05-20T05:34:34.061Z","archived":false},{"id":"12249608286","properties":{"course_dates":"18,25Mar,1,15Apr2023","createdate":"2023-02-21T03:13:40.998Z","dealname":"Offline/AppInventorIntroductoryA(Eng)-18,25Mar,1,15Apr2023(13:30-15:00)","hs_lastmodifieddate":"2023-05-20T05:34:22.571Z","hs_object_id":"12249608286","new_course_name":"AppInventor-IntroductoryA","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-02-21T03:13:40.998Z","updatedAt":"2023-05-20T05:34:22.571Z","archived":false},{"id":"10851364950","properties":{"course_dates":"12,19,26Nov2Dec2022","createdate":"2022-11-08T03:50:29.738Z","dealname":"OfflineCodingRobloxIntermediateE12,19,26Nov2Dec1330-1500","hs_lastmodifieddate":"2023-02-20T09:05:37.152Z","hs_object_id":"10851364950","new_course_name":"CodingRobloxIntermediateE","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-11-08T03:50:29.738Z","updatedAt":"2023-02-20T09:05:37.152Z","archived":false},{"id":"10534300340","properties":{"course_dates":"15,22,29Oct5Nov2022","createdate":"2022-10-12T04:17:40.582Z","dealname":"OfflineCodingRobloxIntermediateD15,22,29Oct5Nov1330-1500","hs_lastmodifieddate":"2023-02-20T09:05:11.067Z","hs_object_id":"10534300340","new_course_name":"CodingRobloxIntermediateD","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-10-12T04:17:40.582Z","updatedAt":"2023-02-20T09:05:11.067Z","archived":false},{"id":"10064689564","properties":{"course_dates":"10,17,24Sep,8Oct2022","createdate":"2022-09-05T07:36:53.109Z","dealname":"WSCodingRobloxIntermediateC10,17,24Sep,8Oct1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:09.996Z","hs_object_id":"10064689564","new_course_name":"CodingRobloxIntermediateC","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-09-05T07:36:53.109Z","updatedAt":"2023-02-06T09:23:09.996Z","archived":false},{"id":"9721202580","properties":{"course_dates":"13,20,27Aug3Sep2022","createdate":"2022-08-06T06:37:56.957Z","dealname":"WSOfflineCodingRobloxIntermediateB13,20,27Aug3Sep1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:27.848Z","hs_object_id":"9721202580","new_course_name":"CodingRobloxIntermediateB","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-08-06T06:37:56.957Z","updatedAt":"2023-02-06T09:23:27.848Z","archived":false},{"id":"9455025962","properties":{"course_dates":"16,23,30Jul6Aug2022","createdate":"2022-07-11T05:06:11.478Z","dealname":"WSOfflineCodingRobloxIntermediateA16,23,30Jul6Aug1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:49.046Z","hs_object_id":"9455025962","new_course_name":"CodingRobloxIntermediateA","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-07-11T05:06:11.478Z","updatedAt":"2023-02-06T09:23:49.046Z","archived":false},{"id":"9043934382","properties":{"course_dates":"11,18,25Jun2Jul2022","createdate":"2022-05-30T04:27:40.340Z","dealname":"WSOfflineCodingRobloxIntroductory11,18,25Jun2Jul1330-1500","hs_lastmodifieddate":"2023-02-06T09:32:20.318Z","hs_object_id":"9043934382","new_course_name":"CodingRobloxIntroductory","student_id":"20220001.stemex","zoom_link":"3"},"createdAt":"2022-05-30T04:27:40.340Z","updatedAt":"2023-02-06T09:32:20.318Z","archived":false}],"paging":{"next":{"after":"10"}}},"status":200}'
			)
		);
		// promise = fetch("https://ec2-43-198-151-195.ap-east-1.compute.amazonaws.com/api/deals/search?studentId=20220001.stemex")
		// .then(resp => {
		//   debugger;
		//   return resp.json();
		// })
	}

	/*

	*/
	onMount(() => {
		handleClick();
	});

	promise = Promise.resolve(
		JSON.parse(
			'{"data":{"total":18,"results":[{"id":"13953328933","properties":{"course_dates":"8,22,29Jul,5Aug2023","createdate":"2023-07-03T09:19:41.439Z","dealname":"Offline/AppInventor-IntermediateB(Eng)8,22,29Jul,5Aug2023(13:30-15:00)","hs_lastmodifieddate":"2023-07-03T09:20:08.473Z","hs_object_id":"13953328933","new_course_name":"AppInventor-IntermediateB","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-07-03T09:19:41.439Z","updatedAt":"2023-07-03T09:20:08.473Z","archived":false},{"id":"13393927738","properties":{"course_dates":"20May10,17,24Jun2023","createdate":"2023-05-20T02:59:29.466Z","dealname":"Offline/AppInventor-IntermediateA(Eng/Conto)20May10,17,24Jun2023(13:30-15:00)","hs_lastmodifieddate":"2023-07-11T10:09:03.139Z","hs_object_id":"13393927738","new_course_name":"AppInventor-IntermediateA","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-05-20T02:59:29.466Z","updatedAt":"2023-07-11T10:09:03.139Z","archived":false},{"id":"13054276918","properties":{"course_dates":"22,29Apr6,13May2023","createdate":"2023-04-19T05:24:09.864Z","dealname":"Offline/AppInventor-IntroductoryB(Both)22,29Apr6,13May2023(13:30-15:00)","hs_lastmodifieddate":"2023-05-20T05:34:34.061Z","hs_object_id":"13054276918","new_course_name":"AppInventor-IntroductoryB","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-04-19T05:24:09.864Z","updatedAt":"2023-05-20T05:34:34.061Z","archived":false},{"id":"12249608286","properties":{"course_dates":"18,25Mar,1,15Apr2023","createdate":"2023-02-21T03:13:40.998Z","dealname":"Offline/AppInventorIntroductoryA(Eng)-18,25Mar,1,15Apr2023(13:30-15:00)","hs_lastmodifieddate":"2023-05-20T05:34:22.571Z","hs_object_id":"12249608286","new_course_name":"AppInventor-IntroductoryA","student_id":"20220001.stemex","zoom_link":null},"createdAt":"2023-02-21T03:13:40.998Z","updatedAt":"2023-05-20T05:34:22.571Z","archived":false},{"id":"10851364950","properties":{"course_dates":"12,19,26Nov2Dec2022","createdate":"2022-11-08T03:50:29.738Z","dealname":"OfflineCodingRobloxIntermediateE12,19,26Nov2Dec1330-1500","hs_lastmodifieddate":"2023-02-20T09:05:37.152Z","hs_object_id":"10851364950","new_course_name":"CodingRobloxIntermediateE","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-11-08T03:50:29.738Z","updatedAt":"2023-02-20T09:05:37.152Z","archived":false},{"id":"10534300340","properties":{"course_dates":"15,22,29Oct5Nov2022","createdate":"2022-10-12T04:17:40.582Z","dealname":"OfflineCodingRobloxIntermediateD15,22,29Oct5Nov1330-1500","hs_lastmodifieddate":"2023-02-20T09:05:11.067Z","hs_object_id":"10534300340","new_course_name":"CodingRobloxIntermediateD","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-10-12T04:17:40.582Z","updatedAt":"2023-02-20T09:05:11.067Z","archived":false},{"id":"10064689564","properties":{"course_dates":"10,17,24Sep,8Oct2022","createdate":"2022-09-05T07:36:53.109Z","dealname":"WSCodingRobloxIntermediateC10,17,24Sep,8Oct1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:09.996Z","hs_object_id":"10064689564","new_course_name":"CodingRobloxIntermediateC","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-09-05T07:36:53.109Z","updatedAt":"2023-02-06T09:23:09.996Z","archived":false},{"id":"9721202580","properties":{"course_dates":"13,20,27Aug3Sep2022","createdate":"2022-08-06T06:37:56.957Z","dealname":"WSOfflineCodingRobloxIntermediateB13,20,27Aug3Sep1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:27.848Z","hs_object_id":"9721202580","new_course_name":"CodingRobloxIntermediateB","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-08-06T06:37:56.957Z","updatedAt":"2023-02-06T09:23:27.848Z","archived":false},{"id":"9455025962","properties":{"course_dates":"16,23,30Jul6Aug2022","createdate":"2022-07-11T05:06:11.478Z","dealname":"WSOfflineCodingRobloxIntermediateA16,23,30Jul6Aug1330-1500","hs_lastmodifieddate":"2023-02-06T09:23:49.046Z","hs_object_id":"9455025962","new_course_name":"CodingRobloxIntermediateA","student_id":"20220001.stemex","zoom_link":"/"},"createdAt":"2022-07-11T05:06:11.478Z","updatedAt":"2023-02-06T09:23:49.046Z","archived":false},{"id":"9043934382","properties":{"course_dates":"11,18,25Jun2Jul2022","createdate":"2022-05-30T04:27:40.340Z","dealname":"WSOfflineCodingRobloxIntroductory11,18,25Jun2Jul1330-1500","hs_lastmodifieddate":"2023-02-06T09:32:20.318Z","hs_object_id":"9043934382","new_course_name":"CodingRobloxIntroductory","student_id":"20220001.stemex","zoom_link":"3"},"createdAt":"2022-05-30T04:27:40.340Z","updatedAt":"2023-02-06T09:32:20.318Z","archived":false}],"paging":{"next":{"after":"10"}}},"status":200}'
		)
	);
</script>

<Router>
	<Route path="/:id" component={SelectedBookedClass} />
	<Route>
		<div class="columns">
			<div class="column">
				<div class="content">
					<h4>Booked Classes</h4>
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
								</table>
							{:catch error}
								<p style="color: red">{error.message}</p>
							{/await}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Route>
</Router>
