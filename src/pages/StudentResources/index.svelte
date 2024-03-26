<script>
	import { onMount } from "svelte";
	import Loading from "../../components/Loading/index.svelte";
	import { FakeFetch, WrappedFetch } from "../../utils/fetch";
	import { stringToURLPart } from "../../utils/url";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import Index from "./index.svelte";
	import { getResourcesAPIByID } from "../../utils/api";
	import { isNullOrEmpty } from "../../utils/strings";
	import { splitArrayToArrayGroups } from "../../utils/array";
	import Collapsible from "../../components/Collapsible/index.svelte";
	import Modal from "../../components/Modal/index.svelte";
    import LearningPortfolio from "./LearningPortfolio/index.svelte";
    import DealAttachments from "./DealAttachments/index.svelte";
	import VideoPlayer from  "../../components/VideoPlayer/index.svelte";
	

	// import stemexIcon from "./assets/images/stemex_icon.png";
	// import SmartCity from "../assets/images/upcoming-schedule/Smart City/Level 1-min.png";

	// import { Document, Page, preferThisHeight, type MultipleOf90 } from 'svelte-pdfjs';

	// let scale = 1;
	// let num = 1;
	// let filename = 'tackling-ts-preview-book.pdf';
	// let max_pages = 1;
	// let renderTextLayer = false;
	// let target_height = 500;
	// let rotation: MultipleOf90 = 0;

	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xb80a924961bb466e90de73288e5046c2, '1.1.png', '1.1.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x2be39cea2cab4a529be17d41c8035858, '1.2.png', '1.2.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xe7d0d94e62c844bfb91d1e21eaa3efa1, '1.3.png', '1.3.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xff282a002c994ea8a58cfa9acebabedd, '2.1.png', '2.1.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xa0f8a0e10eeb4056a0212e3a1f44ff73, '2.2.png', '2.2.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xfedc89a1bda9411992fc8cb9b8107fcf, '2.3.png', '2.3.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x5bdbbdaee0f540dfa0dd0b352b1c6dd6, '3.1.png', '3.1.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x86e6da3bc4644e718b6541d56ac25869, '3.2.png', '3.2.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xed25c736c4fb422bb188a85911c29851, '3.3.png', '3.3.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xda73c1ba794a41d694a95576ba1a43ac, '4.1.png', '4.1.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x9b98d0325b264e25a0f882fd2221eed5, '4.2.png', '4.2.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xd3bc8598b2804d6381a4d116b8179de7, '4.3.png', '4.3.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xa0f1e6f4d4604fee9ddca402a260d898, '4.4.png', '4.4.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0xb0399dc5cab4427aab26981416cec0b4, '5.1.png', '5.1.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x493f34e43dd544cd8666368d522bc4ab, '5.2.png', '5.2.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x9b010f030fce4e3b885ef735422a51ee, '5.3.png', '5.3.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x648c95638f8341be8ebf65ff1040e71a, '5.4.png', '5.4.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x7b7082b6dc5240f4a88d9403ffc47c7d, '5.5.png', '5.5.png');
	// -- INSERT INTO files(`id`, `file_name_uploaded`, `object_key`) VALUES(0x3a37a4e1b27041dea722b6b68ba7edf9, '5.6.png', '5.6.png');

	// import PDFViewer from "../../components/PDFViewer/index.svelte";

	// const scratch0 = "https://www.youtube.com/embed/h0GNlnvaL48";
	const scratch1 = "https://www.youtube.com/embed/RkgI3gPpC4w";
	// const scratch2 = "https://www.youtube.com/embed/HaLB9OvXbN8";

	let data = [];

	FakeFetch("/api/435").then((a) => {
		data = [
			{
				className: "Coding Scratch Jr",
				portfolio: "d8475e8c7bdf11ee9aa006c3bc34e27e",
				from: "2 Aug 2023",
				to: "10 Aug 2023",
				photos: ["704b92e7c10011ee9aa006c3bc34e27e"],
				videos: [
					// scratch0,
					scratch1,
					// scratch2
				],
			},
			{
				className: "Lego Robotics Advanced - EV3",
				portfolio: "d8475e8c7bdf11ee9aa006c3bc34e27e",
				from: "30 June 2023",
				to: "5 July 2023",
				photos: [
					"704b92e7c10011ee9aa006c3bc34e27e",
					"704b92e7c10011ee9aa006c3bc34e27e",
				],
				/*,
                videos: [
                    scratch0,
                    scratch1,
                    scratch2
                ]*/
			},
		];

		data = data.map((dataum) => {
			return {
				...dataum,
				photoGroups: splitArrayToArrayGroups(dataum.photos, 3),
				videoGroups: splitArrayToArrayGroups(dataum.videos, 2),
			};
		});
	});
	
	let location = useLocation();

	let openModal = false;

	let students = [];
	let deals = {};

	$: if (Array.isArray(students) && !!students[activeStudentIdx]) {
		const [ wrappedFetchPromise2, abort ] = WrappedFetch(`/api/student-deals?student-id=${students[activeStudentIdx].id}`)
		wrappedFetchPromise2
		.then(a => {
			deals = a["results"];
		});
	}


	let activeStudentIdx = 0;
	onMount(() => {
		const [ wrappedFetchPromise, abort ] = WrappedFetch("/api/students-to-user")
		wrappedFetchPromise.then(studentsResponse => {
			students = studentsResponse;

			// _
			
		});
	});



	// const currentPath = $location.pathname;
</script>

<!-- <Router>
	<Route path="/">

    </Route>
</Router> -->

<div class="columns">
	<div class="column">
		<div class="content">
			<h4>Student Resources</h4>
		</div>
	</div>
</div>

<div class="tabs">
	<ul>
		{#each students as student, i}
			<li class={i == activeStudentIdx ? "is-active" : ""}><a href={`javascript:void(0)`}>{student.name}</a></li>
		{/each}
	</ul>
</div>

<div class="columns is-multiline is-mobile">
	<!-- <div class="column is-one-third-desktop is-one-third-tablet is-full-mobile">
        <div class="content">
            <div class="box">
                <figure class="image is-128x128">
                    <img src={`https://ec2-43-198-50-165.ap-east-1.compute.amazonaws.com/assets/images/defaultImg.png`} alt="testing">
                </figure>
                <p>
                    Lincoln Leung
                </p>
            </div>
        </div>
    </div> -->
	<!-- <div class="column is-two-third-desktop is-two-third-tablet is-full-mobile"> -->
	<div class="column">
		<div class="content">
			{#if Array.isArray(deals)}
				<Collapsible data={deals}>
					<svelte:fragment slot="header" let:datum>
						{datum["properties"]["new_course_name"]}&nbsp;({datum["properties"]["course_dates"]})
						<input type="hidden" value={datum["properties"]["hs_object_id"]}>
					</svelte:fragment>
					<svelte:fragment slot="content" let:datum>
						<h4>Lesson notes</h4>
						<div class="columns is-multiline is-mobile">
							<div class="column">
								{#each Array(8).fill("testing") as url, i}
									<a href={"https://www.google.com/"} class="is-info" target="_blank">Lesson {i + 1}
										<span class="icon is-small">
											<i class="fa fa-download"></i>
										</span>
									</a>
									<br>
								{/each}
                            </div>
						</div>


						<!-- 
						<div class="columns is-multiline is-mobile">
							<div class="column">
                                <LearningPortfolio/>
                            </div>
						</div> -->

						<DealAttachments dealId={datum["properties"]["hs_object_id"]}/>
					</svelte:fragment>
				</Collapsible>
			{:else}
				<Loading />
			{/if}
		</div>
	</div>
</div>

<Modal
	open={openModal}
	callback={(out) => {
		openModal = out;
	}}
/>
