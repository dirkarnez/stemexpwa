<script>
    import CollapsibleCard from "./CollapsibleCard.svelte";

    export let data;

    let expanding = NaN;

    const showCollapse = i => {
        i === expanding ? (expanding = NaN) : (expanding = i);
    };
</script>


{#each data as { id, name }, i}
    <CollapsibleCard index={i} expanding={expanding} showCollapse={showCollapse}/>
{/each}     


