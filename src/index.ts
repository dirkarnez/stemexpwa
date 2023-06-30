import "./styles/index.scss";
import App from "./App.svelte";
// import App from "./Done.svelte";

export default new App({
	target: document.body,
	props: {
		world: "World 🌎"
	}
});