<script>
	import { slide } from "svelte/transition";

	export let index;



	export let expanding;
	export let showCollapse;
</script>

<div class="card">
	<header class="card-header">
		<p class="card-header-title">Component</p>
		<div>
			<label style="cursor: pointer;">
				<input
					type="checkbox"
					class="myCheckbox card-header-icon"
					aria-label="more options"
					on:change={() => {
						showCollapse(index)
					}}
				/>
				<i class="fas fa-angle-down checkIcon" />
			</label>
		</div>
	</header>
	{#if expanding == index}
	<div class="card-content" transition:slide>
		<div class="content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
			iaculis mauris.
			<a href={`javascript:void(0)`}>@bulmaio</a>.
			<a href={`javascript:void(0)`}>#css</a>
			<a href={`javascript:void(0)`}>#responsive</a>
			<br />
			<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
		</div>
	</div>
	{/if}
</div>

<style>
	@keyframes rotate180 {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(180deg);
		}
	}

	@keyframes rotate0 {
		0% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.checkIcon {
		transition: transform 0.3s;
	}

	input[type="checkbox"]:checked ~ .checkIcon {
		animation: rotate180 0.3s forwards;
	}

	input[type="checkbox"]:not(:checked) ~ .checkIcon {
		animation: rotate0 0.3s forwards;
	}
</style>
