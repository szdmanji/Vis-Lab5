// Lab Five
d3.csv('coffee-house-chains.csv', d3.autoType).then(data=> { 
    console.log('chains', data);

    const margin = {top: 20, right: 0, bottom: 30, left: 40};
    const width = 750 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(d3.map(data, d=>d.company))
        .rangeRound([0, width])
        .paddingInner(0.1);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.stores))
        .range([height, 0]);

    const xAxis = d3.axisBottom()
        .scale(xScale)
        
    const yAxis = d3.axisLeft()
        .scale(yScale)

    const svg = d3.select('.chart')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .attr("transform", `translate(0, ${height})`); 

    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)
        .attr("transform", `translate(0,0)`); 
    
    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d=>yScale(d.stores))
        .attr('x', d=>xScale(d))
        .attr('y', 0)
        .attr('fill', 'steelblue')
    



});