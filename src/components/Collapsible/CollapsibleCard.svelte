<script>
	import { slide } from "svelte/transition";

	export let index;

	export let expanding;
	export let showCollapse;
</script>

<div class="card">
	<header class="card-header">
		<div class="card-header-title">
			<slot name="header">
				No header was provided
			</slot>
		</div>
		<label style="cursor: pointer;" class="card-header-icon">
			<input
				type="checkbox"
				hidden={true}
				class="myCheckbox"
				style={`display: none`}
				aria-label="more options"
				on:change={() => {
					showCollapse(index)
				}}
			/>
			<i class="fas fa-angle-down checkIcon" />
		</label>
	</header>
	{#if expanding == index}
	<div class="card-content" transition:slide>
		<div class="content">
			<slot name="cotent"/>
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
