<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
    import * as pdfmake from 'pdfmake';
    
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

    function a() {

        var fontDescriptors = {
            // download default Roboto font from cdnjs.com
            Balsamiq: {
                normal: 'https://db.onlinewebfonts.com/t/6fa8408b1af234380e3d6860b3d7f417.ttf'
                //  ,
                //  bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
                //  italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
                //  bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
            }
        };

 
        var docDefinition = {
	content: [
			{
			style: 'tableExample',
			layout: {
			     hLineColor: function (i) {
                  return '#676767';
                },
                vLineColor: function (i) {
                  return '#676767';
                }
			},
			table: {
				widths: ['*', 'auto'],
				body: [
					['This is a star-sized column. The next column over, an auto-sized column, will wrap to accomodate all the text in this cell.',{/*image: 'sampleImage.jpg',fit: [100, 100]*/}],
					[
						'row 3',
						{
						    
						    svg: `${svg.node().outerHTML}`,
                            fit: [100, 100]
						}
					]
				]
			}
		}
	],
	 defaultStyle: {
        font:   "Balsamiq",
        color: "#676767"
      }
};
        var pdfKitDoc = pdfmake.createPdf(docDefinition, {}, fontDescriptors);
        pdfKitDoc.download();

    }
</script>

{#if !!svg}
    {@html svg.node().outerHTML}
    <br>
    <button class="button is-link" on:click={a}><i class="fa fa-download" aria-hidden="true"></i>Download portfolio as PDF</button>
{/if}
