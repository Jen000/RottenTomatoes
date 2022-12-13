d3.csv("rotten_tomatoes_movies_rotten_tomatoes_movies.csv").then(
    function(dataset){

        console.log(d3)

    var dimensions = {
        width: 750,
        height: 375,
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


    var parseTime = d3.timeParse("%Y-%m-%d");

    var k = dimensions.height / dimensions.width,
        x0 = d3.extent(dataset, function(d) { return parseTime(d.Original_Release_Date); }),
        y0 = [-4.5 * k, 4.5 * k],
        xScale = d3.scaleTime().domain(d3.extent(dataset, function(d) { return parseTime(d.Original_Release_Date); })).range([dimensions.margin.left, dimensions.width - dimensions.margin.right]),
        yScale = d3.scaleLinear().domain([0, 100]).range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        console.log(x0)

    var xAxis = d3.axisTop(xScale).ticks(12),
        yAxis = d3.axisRight(yScale).ticks(12 * dimensions.height / dimensions.width);

    var brush = d3.brush().on("end", brushended),
        idleTimeout,
        idleDelay = 350;



    var myColor = d3.scaleOrdinal()
        .domain(["Action", "Animation", "Anime", "Art", "Classics","Comedy","Cult","Drama","Faith","Horror","Kids","Musical","Mystery","Romance","Science","Special","Western"])
        .range(d3.schemeSet1);

        // create array of ratings per genre
    var aAndaArray = dataset.filter(function(d){ return d.Genres.includes("Action & Adventure") })
    var animation = dataset.filter(function(d){ return d.Genres.includes("Animation") })
    var aAndM = dataset.filter(function(d){ return d.Genres.includes("Anime & Manga") })
    var aHAndI = dataset.filter(function(d){ return d.Genres.includes("Art House & International") })
    var classics = dataset.filter(function(d){ return d.Genres.includes("Classics") })
    var comedy = dataset.filter(function(d){ return d.Genres.includes("Comedy") })
    var cultMovies = dataset.filter(function(d){ return d.Genres.includes("Cult Movies") })
    var drama = dataset.filter(function(d){ return d.Genres.includes("Drama") })
    var fAndS = dataset.filter(function(d){ return d.Genres.includes("Faith & Spirituality") })
    var horror = dataset.filter(function(d){ return d.Genres.includes("Horror") })
    var kAndF = dataset.filter(function(d){ return d.Genres.includes("Kids & Family") })
    var mAndPA = dataset.filter(function(d){ return d.Genres.includes("Musical & Performing Arts") })
    var mAndS = dataset.filter(function(d){ return d.Genres.includes("Mystery & Suspense") })
    var romance = dataset.filter(function(d){ return d.Genres.includes("Romance") })
    var sfAndF = dataset.filter(function(d){ return d.Genres.includes("Science Fiction & Fantasy") })
    var special = dataset.filter(function(d){ return d.Genres.includes("Special Interest") })
    var western = dataset.filter(function(d){ return d.Genres.includes("Western") })



    // action
    function makeDots(array, className){
    svg.append('g')
        .selectAll("dot")
        .data(array)
        .enter()
        .append("circle")
        .attr("class" , className)
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor(className) )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")
    }

    makeDots(aAndaArray, "Action")
    makeDots(animation, "Animation")
    makeDots(aAndM, "Anime")
    makeDots(aHAndI, "Art")
    makeDots(classics, "Classics")
    makeDots(comedy, "Comedy")
    makeDots(cultMovies, "Cult")
    makeDots(drama, "Drama")
    makeDots(fAndS, "Faith")
    makeDots(horror, "Horror")
    makeDots(kAndF, "Kids")
    makeDots(mAndPA, "Musical")
    makeDots(mAndS, "Mystery")
    makeDots(romance, "Romance")
    makeDots(sfAndF, "Science")
    makeDots(special, "Special")
    makeDots(western, "Western")

    


        // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(0.5))
        .force("collide", d3.forceCollide().strength(.1).radius(20).iterations(1)) // Force that avoids circle overlapping


    svg.append("g")
        .attr("class", "axis--x")
        .attr("transform", "translate(0," + (dimensions.height - 10) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis--y")
        .attr("transform", "translate(10,0)")
        .call(yAxis);

    svg.selectAll(".domain")
        .style("display", "none");

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushended() {
    var s = d3.event.selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            xScale.domain(x0);
            y.domain(y0);
        } else {
            xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
            yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
            svg.select(".brush").call(brush.move, null);
        }
    zoom();
    }

    function idled() {
        idleTimeout = null;
    }

    function zoom() {
        var t = svg.transition().duration(750);
        svg.select(".axis--x").transition(t).call(xAxis);
        svg.select(".axis--y").transition(t).call(yAxis);
        svg.selectAll("circle").transition(t)
            .attr("cx", function(d) { return xScale(parseTime(d.Original_Release_Date)); })
            .attr("cy", function(d) { return yScale(+d.Tomatometer_Rating); });
    }


    function changeGraph(){
        // For each check box:
      d3.selectAll(".checkbox").each(function(d){
        cb = d3.select(this);
        grp = cb.property("value")

        // If the box is check, I show the group
        if(cb.property("checked")){
          svg.selectAll("."+grp)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("r", 2)

        // Otherwise I hide it
        }else{
          svg.selectAll("."+grp)
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .attr("r", 0)
        }
      })
    }

      // A function that update the plot for a given xlim value
  function updatePlot() {

    // Get the value of the button
    xless = this.value
    xlim = this.value

    // Update X axis
    x.domain([xless , xlim])
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Update chart

    makeDots(aAndaArray, "Action")
    makeDots(animation, "Animation")
    makeDots(aAndM, "Anime")
    makeDots(aHAndI, "Art")
    makeDots(classics, "Classics")
    makeDots(comedy, "Comedy")
    makeDots(cultMovies, "Cult")
    makeDots(drama, "Drama")
    makeDots(fAndS, "Faith")
    makeDots(horror, "Horror")
    makeDots(kAndF, "Kids")
    makeDots(mAndPA, "Musical")
    makeDots(mAndS, "Mystery")
    makeDots(romance, "Romance")
    makeDots(sfAndF, "Science")
    makeDots(special, "Special")
    makeDots(western, "Western")
    
  }

  // Add an event listener to the button created in the html part
    d3.select("#buttonXlim").on("input", updatePlot )

    d3.selectAll(".checkbox").on('change', changeGraph )

    changeGraph();
})