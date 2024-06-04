<script>
    import { getResourcesAPIByID } from "../../utils/api";

    export let iconId = "";
    export let color = "";
    export let description = "";
</script>
<div class="box m-0 p-0" style={`background-color: ${color}; height: 96px; width: 100%;`}>
    <div class="columns is-mobile m-0 p-0" style={`height: 100%`}>
        <div class="column is-narrow m-0 p-0" style={`height: 100%`}>
            <img src={getResourcesAPIByID(iconId)} style={`height: 100%; max-width: 96px; border-top-left-radius: 6px; border-bottom-left-radius: 6px; object-fit: cover; `} alt="">
        </div>
        <div class={`column is-flex is-align-items-center is-justify-content-center has-text-white`}>
            <p>{description}</p>
        </div>
    </div>
</div>