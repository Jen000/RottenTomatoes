d3.csv("rotten_tomatoes_movies.csv").then(
    function(dataset){
        
        console.log(dataset)

        var dimensions = {
            width: 1500,
            height: 700,
            margin:{
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }
        var svg = d3.select("#RottenTomatoes")
            .style("width", dimensions.width)
            .style("height", dimensions.height)

        console.log(dataset[9].original_release_date.substring(5, 9))

        var xScale = d3.scaleBand()
            .domain(d3.map(dataset, d => +d.original_release_date.substring(0, 3))) // label by year
            .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])
            .padding([0.3])



        var yScale = d3.scaleLinear()
            .domain([0, 100]) // score is normally on a scale of 0-100
            .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])


        var xAxisGen = d3.axisBottom(xScale)
            // .scale(xScale)
            // .tickValues(xScale.domain().filter(function(d,i){ return !(i%5)})) // xAxis is every 5 years
            // in order to do this the dataset needs to be cleaned up 04/17/1996 instead of 4/17/1996


        var yAxisGen = d3.axisLeft(yScale)
            

        var xAxisValue = "Year"

    svg.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (dimensions.height - dimensions.margin.bottom) + ")")
        .call(xAxisGen)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)")
        
    svg.append("text")
        .attr("y", dimensions.height)
        .attr("x", dimensions.width/2)
        .attr("text-anchor","end")
        .attr("stroke", "black")
        .text(xAxisValue) // CHANGE to by dynamic for x-var type


    svg.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + (dimensions.margin.left) + ",0)")
        .call(yAxisGen)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensions.height/2))
        .attr("y", 8)
        .attr("dy", "-5.1em")
        .attr("text-anchor","end")
        .attr("stroke", "black")
        .text("Rotten Tomatoes Score")

    svg.append("text")
        .attr("x", dimensions.width/2)
        .attr("y", dimensions.margin.top+10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Rotten Tomatoes Score vs. " /*+ some dynamic for X-axis val*/);

        // example of how to dynamically change y axis - I assume x would be similar
        // bars
        // .attr("y", d => yScale(+d.Amanda))
        // .attr("height", d => (dimensions.height-dimensions.margin.bottom) - yScale(+d.Amanda))

    })