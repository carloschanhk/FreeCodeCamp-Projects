document.addEventListener("DOMContentLoaded", ()=>{
    let tooltip = d3.select("body")
                 .append("div")
                 .attr("id","tooltip")
                 .attr("style","position: absolute; opacity: 0;")
    const req = new XMLHttpRequest();
    req.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",true);
    req.send();
    req.onload = ()=>{
        const json = JSON.parse(req.responseText);
        const data = json.data
        let svg = d3.select(".chartContainer").append("svg")
        svg.selectAll("rect")
           .data(data)
           .enter()
           .append("rect")
           .attr("fill","navy")
           .attr("x", (d,i)=> 50+i*3)
           .attr("y",(d,i)=> 650-d[1]/30)
           .attr("height", (d,i)=>d[1]/30)
           .attr("width", 2.5)
           .attr("class","bar")
           .on("mouseover",(d,i)=>{
               d3.select("#tooltip")
                 .transition()
                 .duration(0)
                 .style("opacity",0.9)
                 .style("height",50 + "px")
                 .style("width", 150 + "px")
                 .text(()=>{
                let date = d[0].split("-")
                let year = date[0]
                let quarter = date[1]==="01"
                             ?"Q1"
                             :date[1]==="04"
                             ?"Q2"
                             :date[1]==="07"
                             ?"Q3"
                             :"Q4"
                return year + " " + quarter + "\n $"+ d[1] + " Billion"
               })
           })
           .on("mousemove",(d,i)=>{
               d3.select("#tooltip")
               .style("left",d3.event.pageX + 20 +"px")
               .style("top", d3.event.pageY - 20 + "px")
           })
           .on("mouseout", ()=>{
               d3.select("#tooltip").transition().duration(200).style("opacity",0)
           })
        xScale = d3.scaleLinear().domain([1947,2015]).range([0,data.length*3])
        xAxis = d3.axisBottom(xScale)
        svg.append("g").attr("transform","translate(50,650)").call(xAxis)
        yScale = d3.scaleLinear().domain([0,d3.max(data,(d)=>d[1])]).range([d3.max(data,(d)=>d[1])/30,0])
        yAxis = d3.axisLeft(yScale)
        svg.append("g").attr("transform","translate(50,48)").call(yAxis)
        svg.append("text")
        .attr("transform","translate(10,40)")
        .text("Gross Domestic Product(Billion)")
    }
})
