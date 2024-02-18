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
