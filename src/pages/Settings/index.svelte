<script>
	import { onMount } from "svelte";
	import { useLocation, Link, Route, Router, link } from "svelte-routing";
	import { FakeFetch } from "../../utils/fetch";
	import { getResourcesAPIByID } from "../../utils/api"

	let items = [];

	FakeFetch("/api/settings", [
		{
			title: "Where can I find my child's student portfolio?",
			content: "You can access your child’s student portfolio by tapping on the top left button on your screen. Next, click on “Student Portfolio”, and a new page will pop up where you can access your child’s portfolio.",
			photos: [
				"b80a924961bb466e90de73288e5046c2",
				"2be39cea2cab4a529be17d41c8035858",
				"e7d0d94e62c844bfb91d1e21eaa3efa1"
			]
		},
		{
			title: "Where can I find my child's booked classes?",
			content: "You can access your child’s booked classes by tapping on the top left button on your screen. You will find an option called “Booked Class”. Tap on that and you can access all your child’s booked classes.",
			photos: [
				"ff282a002c994ea8a58cfa9acebabedd",
				"a0f8a0e10eeb4056a0212e3a1f44ff73",
				"fedc89a1bda9411992fc8cb9b8107fcf"
			]
		},
		{
			title: "How can I have my child's laptop ready for his/her class?",
			content: "You can have your child’s laptop ready for his or her class by tapping on the top left button on your screen. Tap on the option called “Installation”, and a new page will pop up showing all of the courses we offer. You can select the course which your child is taking and follow through the installation instructions. A guide video will also be provided for you. Your child would be well prepared for his class by doing this.",
			photos: [
				"5bdbbdaee0f540dfa0dd0b352b1c6dd6",
				"86e6da3bc4644e718b6541d56ac25869",
				"ed25c736c4fb422bb188a85911c29851"
			]
		},
		{
			title: "Where can I find my zoom link for online class?",
			content: "Login and then go to your Booked class after that click on the course you are attending, then click on the course name after that you will see join my class.It will automatically redirect you to the class and you can join the class with the information provided by us.",
			photos: [
				"da73c1ba794a41d694a95576ba1a43ac",
				"9b98d0325b264e25a0f882fd2221eed5",
				"d3bc8598b2804d6381a4d116b8179de7",
				"a0f1e6f4d4604fee9ddca402a260d898"
			]
		},
		{
			title: "Where can I find course information?",
			content: "If you are looking for courses to enroll in and want to know information about our courses, then you can click on the Upcoming Schedule Button, you will see the available courses that we offer. You can click on the courses to know more about the levels of the courses and details of it. If you are interested in the course you can click the enroll button to enroll in the course.",
			photos: [
				"b0399dc5cab4427aab26981416cec0b4",
				"493f34e43dd544cd8666368d522bc4ab",
				"9b010f030fce4e3b885ef735422a51ee",
				"648c95638f8341be8ebf65ff1040e71a",
				"7b7082b6dc5240f4a88d9403ffc47c7d",
				"3a37a4e1b27041dea722b6b68ba7edf9"
			]
		},
		{
			title: "What should I do if my booked courses are not showing up?",
			content: "The easiest way to fix this is by refreshing your page. Scroll down until you see the refresh sign, release your finger and the page will be refreshed or press F5 on your laptop/PC to refresh the page.",
		},
		{
			title: "Where can I contact STEMex for further inquiries?",
			content: "Feel free to contact us on any of the three platforms we have for your service.\nPhone : +852 3462 2018\nWhatsApp : +852 5285 9113\nEmail : info@stemex.org",
		}
	])
	.then(data => {
		items = data;
	})
</script>

<Router>
    <!-- {#if Array.isArray(guidelines) && guidelines.length > 0}
        {#each guidelines as { name, id } }
            <Route path={`/${stringToURLPart(name)}/*`}>
                Will be available
            </Route>
        {/each}
    {/if} -->
    <Route path="/">
        <div class="columns">
            <div class="column">
                <div class="content">
                    <h4>Settings</h4>
					<p>Change language setting on top right corner</p>
                </div>
            </div>
        </div>
		<div class="columns">
            <div class="column">
                <div class="content is-flex is-align-items-center is-justify-content-center">
					<a class="button is-link" style="padding: 35px 100px; font-size: 1.2rem" href={`https://web.whatsapp.com/send?phone=85256318262&text=Hi%20STEMex%2C%20I%20have%20a%20problem`} target="_blank">Contact Us</a>
                </div>
            </div>
        </div>
		<div class="columns">
            <div class="column">
                <div class="content">
                    <h4>Frequently Asked Questions:</h4>
					{#if Array.isArray(items) && items.length > 0}
						{#each items as { title, content, photos }, index}
							<div class="card">
								<div class="card-content">
									<div class="content" style="white-space: pre-wrap; word-break: break-word;"><h3>{index + 1}.&nbsp;&nbsp;{title}</h3>
										{@html content}
										{#each (photos || []) as photo}
											<img src={`${getResourcesAPIByID(photo)}`} style="width: 100%" alt="testing">
										{/each}
									</div>
								</div>
							</div>
							<br>
						{/each}
					{:else}
						<p>Loading...</p>
					{/if}
                </div>
            </div>
        </div>
	</Route>
</Router>