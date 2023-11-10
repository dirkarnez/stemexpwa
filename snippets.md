Snippets
========
```svelte
<script>
  import { onMount } from 'svelte';
  //xport let customProp: boolean;
  

  onMount(() => {
    console.log(`I'm the on create method of the async component c:`)
  })
</script>
<svelte:head>
  <style>
    body {
      background-color: aqua;
    }
  </style>
</svelte:head>
```

### Last minutes offer
```html
<!DOCTYPE html>
<html>
<head>
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap");
*,
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --c-grey-100: #f4f6f8;
  --c-grey-200: #e3e3e3;
  --c-grey-300: #b2b2b2;
  --c-grey-400: #7b7b7b;
  --c-grey-500: #3d3d3d;
  --c-blue-500: #688afd;
}

/* Some basic CSS overrides */
body {
  line-height: 1.5;
  min-height: 100vh;
  font-family: "Outfit", sans-serif;
  padding-top: 20vh;
  padding-bottom: 20vh;
}

button,
input,
select,
textarea {
  font: inherit;
}

a {
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

/* End basic CSS override */
.timeline {
  width: 85%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding: 32px 0 32px 32px;
  border-left: 2px solid var(--c-grey-200);
  font-size: 1.125rem;
}

.timeline-item {
  display: flex;
  gap: 24px;
}
.timeline-item + * {
  margin-top: 24px;
}
.timeline-item + .extra-space {
  margin-top: 48px;
}

.new-comment {
  width: 100%;
}
.new-comment input {
  border: 1px solid var(--c-grey-200);
  border-radius: 6px;
  height: 48px;
  padding: 0 16px;
  width: 100%;
}
.new-comment input::-moz-placeholder {
  color: var(--c-grey-300);
}
.new-comment input:-ms-input-placeholder {
  color: var(--c-grey-300);
}
.new-comment input::placeholder {
  color: var(--c-grey-300);
}
.new-comment input:focus {
  border-color: var(--c-grey-300);
  outline: 0;
  box-shadow: 0 0 0 4px var(--c-grey-100);
}

.timeline-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -52px;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 0 0 6px #fff;
}
.timeline-item-icon svg {
  width: 20px;
  height: 20px;
}
.timeline-item-icon.faded-icon {
  background-color: var(--c-grey-100);
  color: var(--c-grey-400);
}
.timeline-item-icon.filled-icon {
  background-color: var(--c-blue-500);
  color: #fff;
}

.timeline-item-description {
  display: flex;
  padding-top: 6px;
  gap: 8px;
  color: var(--c-grey-400);
}
.timeline-item-description img {
  flex-shrink: 0;
}
.timeline-item-description a {
  color: var(--c-grey-500);
  font-weight: 500;
  text-decoration: none;
}
.timeline-item-description a:hover, .timeline-item-description a:focus {
  outline: 0;
  color: var(--c-blue-500);
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
}
.avatar.small {
  width: 28px;
  height: 28px;
}
.avatar img {
  -o-object-fit: cover;
     object-fit: cover;
}

.comment {
  margin-top: 12px;
  color: var(--c-grey-500);
  border: 1px solid var(--c-grey-200);
  box-shadow: 0 4px 4px 0 var(--c-grey-100);
  border-radius: 6px;
  padding: 16px;
  font-size: 1rem;
}

.button {
  border: 0;
  padding: 0;
  display: inline-flex;
  vertical-align: middle;
  margin-right: 4px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 32px;
  padding: 0 8px;
  background-color: var(--c-grey-100);
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 99em;
}
.button:hover {
  background-color: var(--c-grey-200);
}
.button.square {
  border-radius: 50%;
  color: var(--c-grey-400);
  width: 32px;
  height: 32px;
  padding: 0;
}
.button.square svg {
  width: 24px;
  height: 24px;
}
.button.square:hover {
  background-color: var(--c-grey-200);
  color: var(--c-grey-500);
}

.show-replies {
  color: var(--c-grey-300);
  background-color: transparent;
  border: 0;
  padding: 0;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.show-replies svg {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
.show-replies:hover, .show-replies:focus {
  color: var(--c-grey-500);
}

.avatar-list {
  display: flex;
  align-items: center;
}
.avatar-list > * {
  position: relative;
  box-shadow: 0 0 0 2px #fff;
  margin-right: -8px;
}
</style>
</head>
<body>
<ol class="timeline">

	<li class="timeline-item extra-space">
		<span class="timeline-item-icon | filled-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
				<path fill="none" d="M0 0h24v24H0z" />
				<path fill="currentColor" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
			</svg>
		</span>
		<div class="timeline-item-wrapper">
			<div class="comment">
				<p>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</p>
				<button class="button">👏 2</button>
			</div>
	</li>
    	<li class="timeline-item extra-space">
		<span class="timeline-item-icon | filled-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
				<path fill="none" d="M0 0h24v24H0z" />
				<path fill="currentColor" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
			</svg>
		</span>
		<div class="timeline-item-wrapper">
			<div class="comment">
				<p>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</p>
				<button class="button">👏 2</button>
			</div>
	</li>
    	<li class="timeline-item extra-space">
		<span class="timeline-item-icon | filled-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
				<path fill="none" d="M0 0h24v24H0z" />
				<path fill="currentColor" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
			</svg>
		</span>
		<div class="timeline-item-wrapper">
			<div class="comment">
				<p>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</p>
				<button class="button">👏 2</button>
			</div>
	</li>
</ol>

</body>
</html>
```
