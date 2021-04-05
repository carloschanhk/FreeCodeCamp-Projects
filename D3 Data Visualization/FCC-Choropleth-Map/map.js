let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let EducationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
let countyData;
let educationData;
let stateData;

let mapping = () => {
    let svg = d3.select(".svg").attr("width",1000).attr("height",600)
    let tooltip = d3.select("body")
                    .append("div")
                    .attr("style","opacity:0;position:absolute;")
                    .attr("id","tooltip")
    let colorArr = ["#deebf7",
                    "#c6dbef",
                    "#9ecae1",
                    "#6baed6",
                    "#4292c6",
                    "#2171b5",
                    "#084594"]
    let ticks = [10,20,30,40,50,60]
    let legendScale = d3.scaleLinear().domain([0,70]).range([0,300])
    let legendAxis = d3.axisTop(legendScale)
                    .tickSize(20)
                    .tickValues(ticks)
                    .tickFormat((d)=>{
                        return d + "%"
                    })
    let legend = svg.append("g").attr("transform","translate(500,50)").style("font-size",12);

    legend.call(legendAxis);

    legend.selectAll("rect")
    .data([0,...ticks])
    .enter()
    .append("rect")
    .attr("x",(d)=> legendScale(d)+0.5)
    .attr("y",-20)
    .attr("height", 20)
    .attr("width",300/7)
    .attr("fill",(d,i)=> colorArr[i])
    .attr("style","stroke:black;stroke-width:1px;")


    svg.selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d",d3.geoPath())
    .attr("class","county")
    .attr("fill",(d)=>{
        for (var i=0; i<educationData.length;i++){
            if (educationData[i].fips === d.id){
                if (educationData[i].bachelorsOrHigher<10) {
                    return colorArr[0]
                } else if (educationData[i].bachelorsOrHigher<20) {
                    return colorArr[1]
                } else if (educationData[i].bachelorsOrHigher<30) {
                    return colorArr[2]
                } else if (educationData[i].bachelorsOrHigher<40) {
                    return colorArr[3]
                } else if (educationData[i].bachelorsOrHigher<50) {
                    return colorArr[4]
                } else if (educationData[i].bachelorsOrHigher<60) {
                    return colorArr[5]
                } else {
                    return colorArr[6]
                } 
            }
        }
    })
    .on("mouseover",(d)=>{
        d3.select("#tooltip")
        .transition()
        .duration(100)
        .style("opacity",0.8)
        .text(()=>{
            for (var i=0; i<educationData.length;i++){
                if (educationData[i].fips === d.id){
                    return educationData[i].area_name + ", " + educationData[i].state + ": " + educationData[i].bachelorsOrHigher + "%"
                }
            }    
        })
    })
    .on("mousemove",()=>{
        d3.select("#tooltip")
        .style("left",d3.event.pageX + 20 + "px")
        .style("top",d3.event.pageY - 40 + "px")
    })
    .on("mouseout",()=>{
        d3.select("#tooltip")
        .transition()
        .duration(100)
        .style("opacity", 0)
    })
    console.log()
    svg.append("path")
    .datum(stateData)
    .attr("d",d3.geoPath())
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .attr("fill","none")
}

d3.json(countyURL).then(
    (data,error)=>{
        if (error){
            console.log(error)
        } else {
            countyData = topojson.feature(data, data.objects.counties).features
            stateData = topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })
            d3.json(EducationURL).then(
                (data,error)=>{
                    if (error){
                        console.log(error)
                    } else {
                        educationData = data
                        mapping()
                    }
                }
            )
        }
    }
)