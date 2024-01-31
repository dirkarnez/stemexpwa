<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

    const fakeFetch = Promise.resolve([{
        name: "knowledge",
        count: 13
    }, {
        name: "skill",
        count: 14
    }, {
        name: "attitude",
        count: 15
    }]);

    const w = 200;
    const h = 200;
    const r = 100;

    let svg;

	onMount(() => {
        fakeFetch
        .then(data => {
            const width = 928;
            const height = 500;
            const marginTop = 20;
            const marginRight = 0;
            const marginBottom = 30;
            const marginLeft = 40;

            const x = d3.scaleBand()
                .domain(d3.sort(data, d => -d.count).map(d => d.name))
                .range([marginLeft, width - marginRight])
                .padding(0.1);
            const xAxis = d3.axisBottom(x).tickSizeOuter(0);
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.count)]).nice()
                .range([height - marginBottom, marginTop]);

            //var target = d3.select(`#here`);
            svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("width", width)
                .attr("height", height)
                .attr("style", "max-width: 100%; height: auto;")
            svg.append("g")
                .attr("class", "bars")
                .attr("fill", "steelblue")
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.count))
                .attr("height", d => y(0) - y(d.count))
                .attr("width", x.bandwidth());

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(xAxis);

            svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", `translate(${marginLeft},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove());
        });
    });
</script>

{#if !!svg}
    {@html svg.node().outerHTML}
    <a href={URL.createObjectURL(new Blob([svg.node().outerHTML], { type: "image/svg+xml;charset=utf-8" }))} target="_blank">download</a>
{/if}
