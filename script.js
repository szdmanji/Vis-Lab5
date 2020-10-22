// Lab Five

// CHART INIT-------------------------

const margin = {top: 20, right: 0, bottom: 30, left: 40};
const width = 750 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('.chart')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

const yScale = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom()
    .scale(xScale)
    
const yAxis = d3.axisLeft()
    .scale(yScale)

svg.append('g')
    .attr('class', 'axis x-axis')
    .attr("transform", `translate(0, ${height})`); 

svg.append('g')
    .attr('class', 'axis y-axis')
    .attr("transform", `translate(0,0)`); 


let type = document.querySelector("#group-by").value;
let data = null;
let direction = true;

//chart update function---------------------------
function update(data, type){
    type = document.querySelector("#group-by").value;

    if (direction == true){
        data = data.sort((a, b)=>b[type] - a[type]);
        }
    else {
        data = data.sort((a, b)=>a[type] - b[type]);
    }

    xScale.domain(data.map(d => d.company))

    yScale.domain([0, d3.max(data,d=>d[type])])

    const bars = svg.selectAll('rect')
        .data(data, d => {
        return d.company;
        });

    bars
        .enter()
        .append('rect')
        .merge(bars)
        .transition()
        .duration(1000) 
        .attr('width', xScale.bandwidth())
        .attr('height', d=> height - yScale(d[type]))
        .attr('x', d => xScale(d.company))
        .attr('y', d => yScale(d[type]))
        .attr('fill', 'steelblue')

    bars.exit()
        .remove();
    svg.exit()
        .remove();

    svg.select('.x-axis')
        .transition()
        .duration(1000) 
        .call(xAxis)

    svg.select('.y-axis')
        .transition()
        .duration(750)
        .transition()
        .duration(1000)
        .call(yAxis)

    if (type === "stores"){
        svg.select('.axis-title')
        .text('Stores')
    } else {
        svg.select('.axis-title')
        .text('Revenue in US Billions')
    }

    svg.append("text")
        .transition()
        .duration(250)
        .attr('class', 'axis-title')
        .attr('x', -20)
        .attr('y', -5)
        .attr("font-size", "14px")
}

//chart updates--------------------
d3.csv('coffee-house-chains.csv', d3.autoType).then(data=> { 
    console.log('chains', data);
    update(data,type)
    document.querySelector("#sort")
    .addEventListener('click', (event) => {
        if (direction == true){
            direction = false;
        } else {
            direction = true;
        }
        update(data, type)
    })
    document.querySelector("#group-by").addEventListener('change', (event) => {
    update(data, event.target.value)})
});