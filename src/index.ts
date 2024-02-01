import "./styles/index.scss";
import App from "./App.svelte";
// import App from "./Done.svelte";

export default new App<SvelteComponent>({
	target: document.body,
});