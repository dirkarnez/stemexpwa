<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

    enum State {
        Idle,
        Working,
        Failed,
        Successful
    }

	let classes = "";
	let text = "";
	let lastState: State = State.Idle;
    
	export let thenableFunction: <T>() => Promise<T>;

	function handleMessage(event) {
		dispatch(event);
	}

	function __handleClick() {
		text = "Doing";
		lastState = State.Working;
		thenableFunction()
			.then(() => {
				lastState = State.Successful;
				dispatch("success");
			})
			.catch((e) => {
				lastState = State.Failed;
				dispatch("failure");
			})
			.then(
				() =>
					new Promise((res) => {
						setTimeout(res, 2000);
					}),
			)
			.finally(() => {
				lastState = State.Idle;
				text = "Do";
			});
	}
</script>

<button class={classes} on:click={__handleClick}>
	{#if lastState != State.Idle}
		{#if lastState === State.Successful}
			<i class="fa-solid fa-check"></i>
		{:else if lastState === State.Failed}
			<i class="fa-solid fa-x"></i>
		{/if}
		&nbsp;
	{/if}
	{text}
</button>
