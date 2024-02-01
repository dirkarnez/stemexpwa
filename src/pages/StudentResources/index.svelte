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
		<li class="is-active"><a href={`javascript:void(0)`}>Lincoln Leung</a></li>
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
			{#if Array.isArray(data) && data.length > 0}
				<Collapsible {data}>
					<svelte:fragment slot="header" let:datum>
						{datum.className}&nbsp;(Joined at&nbsp{datum.from}&nbsp;to&nbsp;{datum.to})
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


						<h4>Learning Portfolio</h4>
						<div class="columns is-multiline is-mobile">
							<div class="column">
                                <LearningPortfolio/>
                            </div>
						</div>

						<h4>Class videos</h4>
						<div class="columns is-multiline is-mobile">
							{#if Array.isArray(datum.videoGroups) && datum.videoGroups.length > 0 && datum.videoGroups.some((videoGroup) => Array.isArray(videoGroup) && videoGroup.length > 0)}
								{#each datum.videoGroups as videoGroup}
									<div
										class="column is-half-desktop is-half-tablet is-full-mobile"
									>
										{#each videoGroup as video}
											<!-- <button on:click={() => {openModal = true}} style="border: none; margin-bottom: 0.75rem;background-color: white;">
                                                    <img src={`${video}`} style="width: 100%;"  alt="random img">
                                                </button> -->
											<!-- <div
												class="overflow: hidden; padding-top: 56.25%; position: relative;"
											>
												<iframe
													src={video}
													title="YouTube video player"
													frameborder="0"
													style="border: none; width: 100%; height: 400px;"
												></iframe>
												
											</div> -->
											<VideoPlayer/>
										{/each}
									</div>
								{/each}
							{:else}
								<div
									class="column is-half-desktop is-half-tablet is-full-mobile"
								>
									None
								</div>
							{/if}
						</div>
						<h4>Class photos</h4>
						<div class="columns is-multiline is-mobile">
							{#if Array.isArray(datum.photoGroups) && datum.photoGroups.length > 0 && datum.photoGroups.some((photoGroup) => Array.isArray(photoGroup) && photoGroup.length > 0)}
								{#each datum.photoGroups as photoGroup}
									<div
										class="column is-one-third-desktop is-half-tablet is-full-mobile"
									>
										{#each photoGroup as photo}
											<button
												on:click={() => {
													openModal = true;
												}}
												style="border: none; margin-bottom: 0.75rem;background-color: white;"
											>
												<img
													src={getResourcesAPIByID(photo)}
													style="width: 100%;"
													alt="random img"
												/>
											</button>
										{/each}
									</div>
								{/each}
							{:else}
								<div
									class="column is-one-third-desktop is-half-tablet is-full-mobile"
								>
									None
								</div>
							{/if}
						</div>
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
