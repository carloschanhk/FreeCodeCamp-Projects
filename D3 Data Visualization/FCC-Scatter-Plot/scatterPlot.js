document.addEventListener("DOMContentLoaded",()=>{
    const req = new XMLHttpRequest();
    req.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",true);
    req.send()
    req.onload = ()=>{
        let width = 900;
        let height = 600;
        let svg = d3.select(".container").append("svg").attr("width",width).attr("height",height)
        const data = JSON.parse(req.responseText)
        let xScale = d3.scaleLinear()
                       .domain([d3.min(data,(d)=> d["Year"])-1,d3.max(data,(d)=> d["Year"])+1])
                       .range([50,width-50])
        let yScale = d3.scaleLinear()
                       .domain([d3.max(data,(d)=> d["Seconds"])+5,d3.min(data,(d)=> d["Seconds"])-5])
                       .range([height-50,50])
        let tooltip = d3.select("body")
                        .append("div")
                        .attr("style","position:absolute;opacity:0;")
                        .attr("id","tooltip")
        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r","7")
        .attr("cx",(d)=> xScale(d["Year"]))
        .attr("cy",(d)=> yScale(d["Seconds"]))
        .attr("fill",(d)=>{
            if (d.Doping){
                return "blue"
            } else {
                return "orange"
            }
        })
        .on("mouseover",(d)=>{
            d3.select("#tooltip")
              .style("opacity", 0.9)
              .text(()=>{
                let name = d["Name"]
                let nationality = d.Nationality
                let year = d.Year
                let time = Math.floor(d.Seconds/60) + ":" + d.Seconds % 60
                let doping = d.Doping
                return name + ": " + nationality + "\nYear: " + year + "\nTime: " + time + "\n" + doping
              })
        })
        .on("mousemove",()=>{
            d3.select("#tooltip")
              .style("left", d3.event.pageX+ 20 + "px")
              .style("top", d3.event.pageY + "px")
        })
        .on("mouseout",()=>{
            d3.select("#tooltip")
              .style("opacity", 0)
        });
        let xAxis = d3.axisBottom(xScale);
        svg.append("g")
           .attr("transform","translate(0,550)")
           .call(xAxis)
        let yAxis = d3.axisLeft(yScale);    
        yAxis.tickFormat((d)=> Math.floor(d/60) + ":" + d % 60);
        svg.append("g")
           .attr("transform","translate(50,0)")
           .call(yAxis)
        svg.append("text")
           .attr("id","doping")
           .attr("transform","translate(650,250)")
           .text("Riders with doping allegations")
        svg.append("text")
           .attr("id","nondoping")
           .attr("transform","translate(650,270)")
           .text("No doping allegations")
        svg.append("rect")
           .attr("fill","blue")
           .attr("transform","translate(630,239)")
           .attr("height",12)
           .attr("width",12)
        svg.append("rect")
           .attr("fill","orange")
           .attr("transform","translate(630,259)")
           .attr("height",12)
           .attr("width",12)
        svg.append("text")
           .attr("id","nondoping")
           .attr("transform","translate(10,40)")
           .text("Time in Minutes")

        
    } 
})

