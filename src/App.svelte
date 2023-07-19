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
		src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" ✂prettier:content✂="Cgk=">{}</script>	<script
		src="https://simonbengtsson.github.io/jsPDF-AutoTable/dist/jspdf.plugin.autotable.min.js" ✂prettier:content✂="Cgk=">{}</script></svelte:head> -->
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

<div class="card">
	<div class="card-content">
		<div class="content">
			<div class="field">
				<label class="label" for="a">Name</label>
				<div class="control">
				  <input id="a" class="input" type="text" placeholder="Text input">
				</div>
			  </div>
			  
			  <div class="field">
				<label class="label" for="b">Username</label>
				<div class="control has-icons-left has-icons-right">
				  <input id="b" class="input is-success" type="text" placeholder="Text input" value="bulma">
				  <span class="icon is-small is-left">
					<i class="fas fa-user"></i>
				  </span>
				  <span class="icon is-small is-right">
					<i class="fas fa-check"></i>
				  </span>
				</div>
				<p class="help is-success">This username is available</p>
			  </div>
			  
			  <div class="field">
				<label class="label"  for="c">Email</label>
				<div class="control has-icons-left has-icons-right">
				  <input  id="c" class="input is-danger" type="email" placeholder="Email input" value="hello@">
				  <span class="icon is-small is-left">
					<i class="fas fa-envelope"></i>
				  </span>
				  <span class="icon is-small is-right">
					<i class="fas fa-exclamation-triangle"></i>
				  </span>
				</div>
				<p class="help is-danger">This email is invalid</p>
			  </div>
			  
			  <div class="field">
				<label class="label"  for="d">Subject</label>
				<div class="control">
				  <div class="select">
					<select id="d">
					  <option>Select dropdown</option>
					  <option>With options</option>
					</select>
				  </div>
				</div>
			  </div>
			  
			  <!-- <div class="field">
				<label class="label">Message</label>
				<div class="control">
				  <textarea class="textarea" placeholder="Textarea"></textarea>
				</div>
			  </div>
			  
			  <div class="field">
				<div class="control">
				  <label class="checkbox">
					<input type="checkbox">
					I agree to the <a href="google.com">terms and conditions</a>
				  </label>
				</div>
			  </div>
			  
			  <div class="field">
				<div class="control">
				  <label class="radio">
					<input type="radio" name="question">
					Yes
				  </label>
				  <label class="radio">
					<input type="radio" name="question">
					No
				  </label>
				</div>
			  </div>
			  
			  <div class="field is-grouped">
				<div class="control">
				  <button class="button is-link">Submit</button>
				</div>
				<div class="control">
				  <button class="button is-link is-light">Cancel</button>
				</div>
			  </div> -->
		</div>
	</div>
</div>
