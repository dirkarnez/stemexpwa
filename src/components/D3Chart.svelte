<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	export let data ;
	
	let el;

    
    function getDaysInBetween(startInclusive, endInclusive) {
        //new Date("2023-09-20")
        const _startInclusive = new Date(startInclusive);
        const _endInclusive = new Date(endInclusive);
        _startInclusive.setHours(0, 0, 0, 0);
        _endInclusive.setHours(0, 0, 0, 0);

        return Array(calculateDaysApart(_startInclusive, _endInclusive) + 1)
        .fill(_startInclusive.getTime()).map((time, i) => new Date(time + (i * (24 * 60 * 60 * 1000))));
    }

    function calculateDaysApart(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);

        // Set the time portion of the dates to 00:00:00
        firstDate.setHours(0, 0, 0, 0);
        secondDate.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds between the two dates
        const diffMilliseconds = Math.abs(firstDate - secondDate);

        // Convert the difference to days
        const diffDays = Math.floor(diffMilliseconds / oneDay);

        return diffDays;
    }

    const onlyYYYYMMDD = date => {
        const temp = new Date(date);
        temp.setHours(0, 0, 0, 0);
        return temp;
    }

	onMount(() => {
        const _data = data.map(item => ({ ...item, login_at: !!item.login_at ? onlyYYYYMMDD(item.login_at) : undefined }));
        
        const start = Math.min(..._data.filter(o => !!o.login_at).map(o => o.login_at));
        const end = Math.max(..._data.filter(o => !!o.login_at).map(o => o.login_at));
        debugger;

        const all_user_name = [...new Set(_data.map(item => item.user_name))];
            
        const s = getDaysInBetween(onlyYYYYMMDD(start), onlyYYYYMMDD(end));

        const __data = s.reduce((p, c) => {
                const c_trimmed = onlyYYYYMMDD(c);

                const userActivitySameDay = _data.filter(userActivity => {
                    if (!userActivity.login_at) {
                        return false;
                    }

                    const a_trimmed = onlyYYYYMMDD(userActivity.login_at);
                    return a_trimmed.getTime() == c_trimmed.getTime();
                });

                // const s = new Date("2023-09-15");
                // s.setHours(0, 0, 0, 0);
                // if (c_trimmed.getTime() == s.getTime()) {
                //     debugger;
                // }
                
                return [
                    ...p, 
                    ...userActivitySameDay, 
                    ...all_user_name
                        .filter(u => !userActivitySameDay
                            .map(b => b.user_name).
                            includes(u))
                        .map(user => (
                            {
                                count: 0, 
                                user_name: user, 
                                login_at: c_trimmed
                            }
                        ))
                    ];
                


                
                //if trimmed.getTime() == 
                
            
                // if (p.length == 0) {
                //     return [...p, c];
                // }

            
                //const daysApart = calculateDaysApart(c.date, p[p.length - 1].date);

            
            }, []);

            __data.sort((a, b) => (
                !!a.login_at ? a.login_at.getTime() : 0) - (!!b.login_at ? b.login_at.getTime() : 0
            ));

        const width = 928;
        const height = 500;
        const marginTop = 30;
        const marginRight = 50;
        const marginBottom = 30;
        const marginLeft = 30;
  
            // Create the horizontal, vertical and color scales.
            const x = d3.scaleTime()
                .domain([__data[0].login_at, __data[__data.length - 1].login_at])
                .range([marginLeft, width - marginRight]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(__data, d => d.count)])
                .range([height - marginBottom, marginTop]);

            const color = d3.scaleOrdinal()
                .domain(__data.map(d => d.user_name))
                .range(d3.schemeCategory10);

            // Create the SVG container.
            const svg = d3
                .select(el)
                .append("svg:svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

            svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

            // Add a container for each series.
            const serie = svg.append("g")
                .selectAll()
                .data(d3.group(__data, d => d.user_name))
                .join("g");

            // Draw the lines.
            serie.append("path")
                .attr("fill", "none")
                .attr("stroke", d => color(d[0]))
                .attr("stroke-width", 1.5)
                .attr("d", d => d3.line()
                    .x(d => x(d.login_at))
                    .y(d => y(d.count))(d[1]));

            // Append the labels.
            serie.append("g")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("text-anchor", "middle")
                .selectAll()
                .data(d => d[1])
                .join("text")
                .text(d => d.count)
                .attr("dy", "0.35em")
                .attr("x", d => x(d.login_at))
                .attr("y", d => y(d.count))
                .call(text => text.filter((d, i, data) => i === data.length - 1)
                    .append("tspan")
                    .attr("font-weight", "bold")
                    .text(d => ` ${d.user_name}`))
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 6);
	});
</script>

<div bind:this={el}></div>