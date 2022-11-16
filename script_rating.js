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

        var groups = ["G","PG","PG-13","R","NC-17","NR"]
//d3.map(dataset, d=>d.content_rating)
        var xScale = d3.scaleBand()
            .domain(d3.map(dataset, d=>d.content_rating)) // label by Rating
            .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])
            .padding([0.3])
        console.log(xScale.domain())

        var yScale = d3.scaleLinear()
            .domain([0, 100]) // score is normally on a scale of 0-100
            .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        var xAxisGen = d3.axisBottom(xScale)
                         .scale(xScale)
        var yAxisGen = d3.axisLeft(yScale)
   
        var xAxisValue = "Content Rating"

    xAxis = svg.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (dimensions.height - dimensions.margin.bottom) + ")")
        .call(xAxisGen)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(0)")
        
    svg.append("text")
        .attr("y", dimensions.height-15)
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

    var dots = svg.append("g")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.content_rating) + 80)
        .attr("cy",  d => yScale(+d.tomatometer_rating))
        .attr("r", 2.5)
        .attr("fill", "black")
    console.log(dots)

    svg.append("text")
        .attr("x", dimensions.width/2)
        .attr("y", dimensions.margin.top+10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Rotten Tomatoes Score vs. Content Rating");

    function rating_to_int(d){
        switch (d){
            case "G":
                return 0;
            case "PG":
                return 1;
            case "PG-13":
                return 2;
            case "R":
                return 3;
            case "NC-17":
                return 4;
            case "NR":
                return 5;
            default:
                break;
        }
    }
})