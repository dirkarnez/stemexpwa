
<script>
	//import * as gdsf from 'canvg/dist/index';
	import { jsPDF } from "jspdf";

	import "jspdf-autotable";
	let name = "world";
	

	// import confetti from 'https://cdn.skypack.dev/canvas-confetti';

	// confetti();

	function generate() {
		var doc = new jsPDF({
			unit: "pt", // points, pixels won't work properly
			orientation: "portrait",
			format: "a4"
		});

		doc.autoTable({
			startY: 60,
			showHead: false,
			body: [
				[
					{
						content: "Student",
						colSpan: 3
					}
				],
				[
					{
						content: "Instructor Name: sdfsdfsd",
						colSpan: 1
					},
					{
						content: "Date of Completion:",
						colSpan: 2
					}
				],
				[
					{
						content: "Course & Level :",
						colSpan: 3
					}
				],
				[
					{
						content: "Knowledge",
						colSpan: 3,
						styles: { fillColor: "#d9d9d9" }
					}
				],
				["Understanding of the course content"],
				["Abilty to apply knowledge to daily life"],
				["Remembers keywords"],
				[
					{
						content: "Skills",
						colSpan: 3,
						styles: { fillColor: "#d9d9d9" }
					}
				],
				[
					"Ability to find solutions to problems during class",
					"",
					Array(50)
						.fill(" ")
						.join("")
				],
				["Show capability to try out solutions"],
				["Ability to evaluate outcome of improvements made"]
			],
			theme: "grid"
		});

		doc.save("table.pdf");


	}
</script>

<!-- <svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js">
	</script>
	<script
		src="https://simonbengtsson.github.io/jsPDF-AutoTable/dist/jspdf.plugin.autotable.min.js">
	</script>
</svelte:head> -->
<h1 class="title">Hello {name}!</h1>

<p class="subtitle">
	Modern CSS framework based on
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
		Flexbox
	</a>
</p>

<div class="field">
	<div class="control">
		<input class="input" type="text" placeholder="Input" />
	</div>
</div>

<div class="field">
	<p class="control">
		<span class="select">
			<select>
				<option>Select dropdown</option>
			</select>
		</span>
	</p>
</div>

<div class="buttons">
	<a class="button is-primary" href="/">Primary</a>
	<a class="button is-link" href="/">Link</a>
</div>

<button on:click={generate}>dsf</button>
