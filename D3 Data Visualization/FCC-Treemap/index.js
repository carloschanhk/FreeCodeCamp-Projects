d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json")
.then((data,error)=>{
    if (error) {
        console.log(error)
    } else {
        let width = 1500
        let height = 800
        svg = d3.select(".svg")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
        let root = d3.hierarchy(data)
                    .sum((d)=>d.value)
                    .sort(function (a, b) {  //sorting the data with highest value go first
                        return b.value - a.value;
                     });
        let treemap = d3.treemap().size([width,height-200]).padding(1)
        treemap(root)
        let tooltip = d3.select("body")
                        .append("div")
                        .attr("style","opacity:0;position:absolute")
                        .attr("id","tooltip")
        //making a platform array without duplicates
        let platforms = root.leaves().map((e)=> e.data.category)
        let platformArr = [... new Set(platforms)]
        let colorArr = ["#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#ffff99",
            "#b15928",
            "#8dd3c7",
            "#585555a6",
            "#bebada",
            "#fb8072",
            "#80b1d3",
            "#fdb462"]
        svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x",(d)=> d.x0)
        .attr("y",(d)=> d.y0)
        .attr("width",(d)=>d.x1-d.x0)
        .attr("height",(d)=>d.y1-d.y0)
        .attr("fill",(d=>{
            return colorArr[platformArr.indexOf(d.data.category)]
        }))
        .on("mouseover",(d)=>{
            d3.select("#tooltip")
            .transition()
            .duration(100)
            .style("opacity",0.8)
            .text(()=>{
                return "Name: " + d.data.name + "\nCategory: " + d.data.category + "\nValue: " + d.data.value
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
            .style("opacity",0)
        })

        svg.selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform",(d)=>"translate("+d.x0 +","+ d.y0 +")")
        .attr("fill","black")
        .append("text")
        .attr("width",(d)=>d.x1-d.x0)
        .attr("height",(d)=>d.y1-d.y0)
        .attr("class","text")
        .selectAll("tspan")
        .data((d)=>d.data.name.split(/(?=[A-Z]\w+)/g))
        .enter()
        .append("tspan")
        .attr("x",0)
        .attr("dy","0.6rem")
        .text((d)=> d)

        let legend = svg.append("g")
                        .attr("transform","translate(100,600)")
        legend.selectAll("rect")
            .data(platformArr)
            .enter()
            .append("rect")
            .attr("width",20)
            .attr("height",20)
            .attr("x",(d,i)=> {
                return i%6*100
            })
            .attr("y",(d,i)=>{
                if (i<6){
                    return 30
                } else if (i<12){
                    return 60
                } else {
                    return 90
                }
            })
            .attr("fill",(d,i)=>{
                return colorArr[i]
            });
        legend.selectAll("text")
            .data(platformArr)
            .enter()
            .append("text")
            .attr("x",(d,i)=> {
                return i%6*100 + 30
            })
            .attr("y",(d,i)=>{
                if (i<6){
                    return 45
                } else if (i<12){
                    return 75
                } else {
                    return 105
                }
            })
            .text((d)=>d)


    }
})