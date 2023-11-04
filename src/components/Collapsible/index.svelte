<script>
    import CollapsibleCard from "./CollapsibleCard.svelte";
    import { getResourcesAPIByID } from "../../utils/api";

    export let data = [];
    

    let expanding = NaN;

    const showCollapse = i => {
        i === expanding ? (expanding = NaN) : (expanding = i);
    };
</script>


{#each data as datum, i}
    <CollapsibleCard index={i} expanding={expanding} showCollapse={showCollapse}>
        <!-- <figure class="image is-128x128">
            <img src={`${getResourcesAPIByID(photos)}`} alt="testing">
        </figure>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        <slot name="header" slot="header" datum={datum}>
        </slot>
        <slot name="cotent" slot="cotent" datum={datum}/>
    </CollapsibleCard>
    <br>
{/each}     


