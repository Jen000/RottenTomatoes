d3.csv("rotten_tomatoes_movies_rotten_tomatoes_movies.csv").then(
    function(dataset){

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
        xScale = d3.scaleTime().domain(d3.extent(dataset, function(d) { return parseTime(d.Original_Release_Date); })).range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
        yScale = d3.scaleLinear().domain([0, 100]).range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        console.log(x0)

    var xAxis = d3.axisTop(xScale).ticks(12),
        yAxis = d3.axisRight(yScale).ticks(12 * dimensions.height / dimensions.width);

    var brush = d3.brush().on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    // svg.selectAll("dot")
    //     .data(dataset)
    //     .enter().append("circle")
    //         .attr("cx", function(d) { return x(d[0]); })
    //         .attr("cy", function(d) { return y(d[1]); })
    //         .attr("r", 2.5)



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



    var actionCheck = document.getElementById("check_1");  
    var animationCheck = document.getElementById("check-2");
    var animeCheck = document.getElementById("check-3");  
    var artCheck = document.getElementById("check-4");
    var classicsCheck = document.getElementById("check-5");  
    var comedyCheck = document.getElementById("check-6");
    var cultCheck = document.getElementById("check-7");  
    var dramaCheck = document.getElementById("check-8");
    var faithCheck = document.getElementById("check-9");  
    var horrorCheck = document.getElementById("check-10");
    var kidsCheck = document.getElementById("check-11");  
    var musicalCheck = document.getElementById("check-12");
    var mysterCheck = document.getElementById("check-13");  
    var romanceCheck = document.getElementById("check-14");
    var scienceCheck = document.getElementById("check-15");  
    var specialCheck = document.getElementById("check-16");
    var westerCheck = document.getElementById("check-17");


    // action
        console.log("actin check")
    svg.append('g')
        .selectAll("dot")
        .data(aAndaArray)
        .enter()
        .append("circle")
        .attr("class" , "Action")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Action") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // animation
    svg.append('g')
        .selectAll("dot")
        .data(animation)
        .enter()
        .append("circle")
        .attr("class" , "Animation")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Animation") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")


        // anime
    svg.append('g')
        .selectAll("dot")
        .data(aAndM)
        .enter()
        .append("circle")
        .attr("class" , "Anime")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Anime") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")


        // art
    svg.append('g')
        .selectAll("dot")
        .data(aHAndI)
        .enter()
        .append("circle")
        .attr("class" , "Art")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Art") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // classic
    svg.append('g')
        .selectAll("dot")
        .data(classics)
        .enter()
        .append("circle")
        .attr("class" , "Classics")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Classics") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // comedy
    svg.append('g')
        .selectAll("dot")
        .data(comedy)
        .enter()
        .append("circle")
        .attr("class" , "Comedy")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Comedy") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // cult
    svg.append('g')
        .selectAll("dot")
        .data(cultMovies)
        .enter()
        .append("circle")
        .attr("class" , "Cult")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Cult") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // drama
    svg.append('g')
        .selectAll("dot")
        .data(drama)
        .enter()
        .append("circle")
        .attr("class" , "Drama")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Drama") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // faith
    svg.append('g')
        .selectAll("dot")
        .data(fAndS)
        .enter()
        .append("circle")
        .attr("class" , "Faith")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Faith") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // horror
    svg.append('g')
        .selectAll("dot")
        .data(horror)
        .enter()
        .append("circle")
        .attr("class" , "Horror")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Horror") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // kandF
    svg.append('g')
        .selectAll("dot")
        .data(kAndF)
        .enter()
        .append("circle")
        .attr("class" , "Kids")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Kids") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // musical
    svg.append('g')
        .selectAll("dot")
        .data(mAndPA)
        .enter()
        .append("circle")
        .attr("class" , "Musical")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Musical") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // mystery
    svg.append('g')
        .selectAll("dot")
        .data(mAndS)
        .enter()
        .append("circle")
        .attr("class" , "Mystery")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Mystery") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // romance
    svg.append('g')
        .selectAll("dot")
        .data(romance)
        .enter()
        .append("circle")
        .attr("class" , "Romance")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Romance") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // science
    svg.append('g')
        .selectAll("dot")
        .data(sfAndF)
        .enter()
        .append("circle")
        .attr("class" , "Science")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Science") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // special
    svg.append('g')
        .selectAll("dot")
        .data(special)
        .enter()
        .append("circle")
        .attr("class" , "Special")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Special") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")

        // western
    svg.append('g')
        .selectAll("dot")
        .data(western)
        .enter()
        .append("circle")
        .attr("class" , "Western")
        .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
        .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
        .attr("r", 2 )
        .style("fill", myColor("Western") )
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", ".5px")
    


        // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(0.5))
        .force("collide", d3.forceCollide().strength(.1).radius(20).iterations(1)) // Force that avoids circle overlapping


    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (dimensions.height - 10) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis axis--y")
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
        .attr("cx", function(d) { return x(d[0]); })
        .attr("cy", function(d) { return y(d[1]); });
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

    d3.selectAll(".checkbox").on('change', changeGraph )

    changeGraph();
})