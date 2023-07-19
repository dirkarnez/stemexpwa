<script>
    import { Router, Link, Route } from "svelte-routing";
    //import Home from "./routes/Home.svelte";
    // import About from "./routes/About.svelte";
    // import Blog from "./routes/Blog.svelte";
    import AsyncComponent from "./AsyncComponent.svelte";
  
    export let url = "/";
  </script>
  
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">ss</Link>
    </nav>
    <div>
      <!-- <Route path="/blog/:id" component={AsyncComponent} /> -->
      <!-- <Route path="/blog" component={AsyncComponent} /> -->
      <Route path="/about" component={AsyncComponent} />
      <Route path="/"><h1>dsfds</h1></Route>
    </div>
  </Router>