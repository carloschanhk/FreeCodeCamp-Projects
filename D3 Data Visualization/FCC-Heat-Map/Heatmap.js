document.addEventListener("DOMContentLoaded",()=>{
    const req = new XMLHttpRequest();
    req.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",true)
    req.send();
    req.onload = () =>{
        const data = JSON.parse(req.responseText);
        const baseTemp = data.baseTemperature;
        const monthlyData = data.monthlyVariance;
        const width = 1500;
        const height = 700;
        const padding = 100;
        xScale = d3.scaleLinear()
                .domain([d3.min(monthlyData,(d)=> d.year),d3.max(monthlyData,(d)=> d.year)+1])
                .range([padding,width-padding])
        yScale = d3.scaleLinear()
                .domain([12,0])
                .range([height-150,0])
        const svg = d3.select(".container").append("svg").attr("width",width).attr("height",height)
        const tooltip = d3.select("body").append("div").attr("style","opacity:0;position:absolute;").attr("id","tooltip")
        svg.selectAll("rect")
        .data(monthlyData)
        .enter()
        .append("rect")
        .attr("x",(d)=> xScale(d.year))
        .attr("y",(d)=> yScale(d.month)-(height-150)/12)
        .attr("width", (width-padding*2)/263)
        .attr("height", (height-150)/12)
        .attr("class","bar")
        .attr("fill",(d)=> {
            const temp = baseTemp + d.variance
            if (temp < 3.9){
                return '#4575b4'
            } else if (temp < 5){
                return '#74add1'
            } else if (temp < 6.1){
                return '#abd9e9'
            } else if (temp < 7.2){
                return '#e0f3f8'            
            } else if (temp < 8.3){
                return '#ffffbf'
            }else if (temp < 9.4){
                return '#fee090'
            }else if (temp < 10.5){
                return '#fdae61'
            }else if (temp < 11.6){
                return '#f46d43'
            } else {
                return '#d73027'
            }
        })
        .on("mouseover",(d)=>{
            const year = d.year
            let monthArr = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"] 
            const month = monthArr[d.month-1]
            const variance = (d.variance).toFixed(2)
            const temp = (baseTemp+d.variance).toFixed(2)
            d3.select("#tooltip")
                .transition()
                .duration(100)
                .style("opacity",0.7)
                .text(()=>{
                    return year + " - " + month + "\n" + temp + "℃\n" + variance + "℃"
                })
        })
        .on("mousemove",()=>{
            d3.select("#tooltip")
            .style("left",d3.event.pageX -50 + "px")
            .style("top", d3.event.pageY -100+ "px")
        })
        .on("mouseout", ()=>{
            d3.select("#tooltip").transition().duration(100).style("opacity",0)
            })
        
        let xAxis = d3.axisBottom(xScale);
        svg.append("g")
        .attr("transform","translate(0,550)")
        .style("font-size",14)
        .call(xAxis)
        .append("text")
        .text("Year")
        .attr("fill","black")
        .attr("transform","translate(750,50)")
        let yAxis = d3.axisLeft(yScale);
        let monthArr = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
        yAxis.tickValues([0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5,10.5,11.5]).tickFormat((d)=> monthArr[d-0.5])
        svg.append("g")
            .attr("transform","translate(100,0)")
            .style("font-size",16)
            .call(yAxis)
            .append("text")
            .text("Month")
            .style('text-anchor', 'middle')
            .attr("fill","black")
            .attr("transform","translate(-70,275) rotate(-90)")
        let legendScale = d3.scaleLinear()
                            .domain([1.7,13.8])
                            .range([0,440])
        let ticksArr = [2.8,3.9,5.0,6.1,7.2,8.3,9.4,10.5,11.6]
        let legendAxis = d3.axisBottom(legendScale)
                           .tickValues([...ticksArr,12.7])
                           .tickFormat((d)=> d);
        let colorArr = ['#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9', '#74add1','#4575b4'].reverse()
        let legend = svg.append("g")
                        .attr("transform","translate(100,600)")
        legend.selectAll("rect")
        .data(ticksArr)
        .enter()
        .append("rect")
        .attr("width", 40)
        .attr("height",15)
        .attr("x",(d)=> legendScale(d))
        .attr("fill",(d,i)=>colorArr[i])
        .attr("class","legendbar")
        legend.append("g").attr("transform","translate(0,15)").style("font-size",16).call(legendAxis)
    }
})
