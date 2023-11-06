<script>
	import { Route, Router, link, useLocation } from "svelte-routing";
	import { onMount } from "svelte";
	import Loading from "../components/Loading/index.svelte";
  import SelectedBookedClass from "./SelectedBookedClass.svelte";
	import { FakeFetch } from "../utils/fetch";

	const location = useLocation();

	let items = [];

	const jsonstring = `
	{
  "data": {
    "total": 20,
    "results": [
      {
        "id": "14568779046",
        "properties": {
          "course_dates": "7, 14, 21, 28 Oct 4, 11 Nov 2023",
          "createdate": "2023-08-11T08:26:01.382Z",
          "dealname": "[NEW TIME SLOT] Offline/ App Inventor Level 3 (Eng)  7, 14, 21, 28 Oct 4, 11 Nov 2023  (1400-1500)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.646Z",
          "hs_object_id": "14568779046",
          "new_course_name": "App Inventor Level 3",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-08-11T08:26:01.382Z",
        "updatedAt": "2023-11-06T10:11:39.646Z",
        "archived": false
      },
      {
        "id": "14568779038",
        "properties": {
          "course_dates": "12, 26 Aug 2, 9, 16, 23 Sep 2023",
          "createdate": "2023-08-11T08:25:57.287Z",
          "dealname": "[NEW TIME SLOT] Offline/ App Inventor Level 3 (Eng) 12, 26 Aug 2, 9, 16, 23 Sep 2023 (1400-1500)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.636Z",
          "hs_object_id": "14568779038",
          "new_course_name": "App Inventor Level 3",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-08-11T08:25:57.287Z",
        "updatedAt": "2023-11-06T10:11:39.636Z",
        "archived": false
      },
      {
        "id": "13953328933",
        "properties": {
          "course_dates": "8, 22, 29 Jul, 5 Aug 2023",
          "createdate": "2023-07-03T09:19:41.439Z",
          "dealname": "Offline/App Inventor -Intermediate B (Eng) 8, 22, 29 Jul, 5 Aug 2023 (13:30-15:00)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.026Z",
          "hs_object_id": "13953328933",
          "new_course_name": "App Inventor - Intermediate B",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-07-03T09:19:41.439Z",
        "updatedAt": "2023-11-06T10:11:39.026Z",
        "archived": false
      },
      {
        "id": "13393927738",
        "properties": {
          "course_dates": "20 May 10, 17, 24 Jun 2023",
          "createdate": "2023-05-20T02:59:29.466Z",
          "dealname": "Offline/App Inventor-Intermediate A (Eng/Conto) 20 May 10, 17, 24 Jun 2023 (13:30-15:00)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.568Z",
          "hs_object_id": "13393927738",
          "new_course_name": "App Inventor - Intermediate A",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-05-20T02:59:29.466Z",
        "updatedAt": "2023-11-06T10:11:39.568Z",
        "archived": false
      },
      {
        "id": "13054276918",
        "properties": {
          "course_dates": "22, 29 Apr 6, 13 May 2023",
          "createdate": "2023-04-19T05:24:09.864Z",
          "dealname": "Offline/App Inventor- Introductory B (Both)  22, 29 Apr 6, 13 May 2023   (13:30-15:00)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.026Z",
          "hs_object_id": "13054276918",
          "new_course_name": "App Inventor - Introductory B",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-04-19T05:24:09.864Z",
        "updatedAt": "2023-11-06T10:11:39.026Z",
        "archived": false
      },
      {
        "id": "12249608286",
        "properties": {
          "course_dates": "18,25 Mar, 1,15 Apr 2023",
          "createdate": "2023-02-21T03:13:40.998Z",
          "dealname": "Offline/ App Inventor Introductory A (Eng) - 18,25 Mar, 1,15 Apr 2023 (13:30-15:00)",
          "hs_lastmodifieddate": "2023-11-06T10:11:39.281Z",
          "hs_object_id": "12249608286",
          "new_course_name": "App Inventor - Introductory A",
          "student_id": "20220001.stemex",
          "zoom_link": null
        },
        "createdAt": "2023-02-21T03:13:40.998Z",
        "updatedAt": "2023-11-06T10:11:39.281Z",
        "archived": false
      },
      {
        "id": "10851364950",
        "properties": {
          "course_dates": "12,19,26 Nov 2 Dec 2022",
          "createdate": "2022-11-08T03:50:29.738Z",
          "dealname": "Offline Coding Roblox Intermediate E 12,19,26Nov 2Dec 1330-1500",
          "hs_lastmodifieddate": "2023-09-08T09:08:57.914Z",
          "hs_object_id": "10851364950",
          "new_course_name": "Coding Roblox Intermediate E",
          "student_id": "20220001.stemex",
          "zoom_link": "/"
        },
        "createdAt": "2022-11-08T03:50:29.738Z",
        "updatedAt": "2023-09-08T09:08:57.914Z",
        "archived": false
      },
      {
        "id": "10534300340",
        "properties": {
          "course_dates": "15,22,29 Oct 5 Nov 2022",
          "createdate": "2022-10-12T04:17:40.582Z",
          "dealname": "Offline Coding Roblox Intermediate D 15,22,29Oct 5Nov 1330-1500",
          "hs_lastmodifieddate": "2023-09-08T09:08:57.873Z",
          "hs_object_id": "10534300340",
          "new_course_name": "Coding Roblox Intermediate D",
          "student_id": "20220001.stemex",
          "zoom_link": "/"
        },
        "createdAt": "2022-10-12T04:17:40.582Z",
        "updatedAt": "2023-09-08T09:08:57.873Z",
        "archived": false
      },
      {
        "id": "10064689564",
        "properties": {
          "course_dates": "10,17,24 Sep, 8 Oct 2022",
          "createdate": "2022-09-05T07:36:53.109Z",
          "dealname": "WS Coding Roblox Intermediate C 10,17,24 Sep, 8 Oct 1330-1500",
          "hs_lastmodifieddate": "2023-09-08T09:08:57.834Z",
          "hs_object_id": "10064689564",
          "new_course_name": "Coding Roblox Intermediate C",
          "student_id": "20220001.stemex",
          "zoom_link": "/"
        },
        "createdAt": "2022-09-05T07:36:53.109Z",
        "updatedAt": "2023-09-08T09:08:57.834Z",
        "archived": false
      },
      {
        "id": "9721202580",
        "properties": {
          "course_dates": "13,20,27Aug 3Sep 2022",
          "createdate": "2022-08-06T06:37:56.957Z",
          "dealname": "WS Offline Coding Roblox Intermediate B  13,20,27Aug 3Sep   1330-1500",
          "hs_lastmodifieddate": "2023-09-08T09:08:57.793Z",
          "hs_object_id": "9721202580",
          "new_course_name": "Coding Roblox Intermediate B",
          "student_id": "20220001.stemex",
          "zoom_link": "/"
        },
        "createdAt": "2022-08-06T06:37:56.957Z",
        "updatedAt": "2023-09-08T09:08:57.793Z",
        "archived": false
      }
    ],
    "paging": {
      "next": {
        "after": "10"
      }
    }
  },
  "status": 200
}
`

	// function handleClick() {
	// 	promise = Promise.resolve(
	// 		JSON.parse(
	// 			''
	// 		)
	// 	);
	// 	// promise = fetch("https://ec2-43-198-151-195.ap-east-1.compute.amazonaws.com/api/deals/search?studentId=20220001.stemex")
	// 	// .then(resp => {
	// 	//   debugger;
	// 	//   return resp.json();
	// 	// })
	// }

	/*

	*/
	onMount(() => {
		FakeFetch("/api/booked-classes", JSON.parse(jsonstring))
		.then(data => {
			items = data.data.results;
		})
	});

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
						{#if Array.isArray(items) && items.length > 0}
							<table class="table">
								<thead>
									<tr>
										<th>Course Date</th>
										<th>Course Name</th>
									</tr>
								</thead>
								<tbody>
									{#each items as item}
										<tr>
											<td>
												<!-- <a href="{$location.pathname}/{item.id}"
													class="is-underlined"
													use:link
												> -->
                        <a href={`javascript:void(0)`}
													class="is-underlined"
												> 
													{item.properties.course_dates}
												</a>
											</td>
											<td>{item.properties.new_course_name}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{:else}
							<Loading/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Route>
</Router>
