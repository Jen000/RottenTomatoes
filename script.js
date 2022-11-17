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
        var home = d3.select("#RottenTomatoes")
            .style("width", dimensions.width)
            .style("height", dimensions.height)

        console.log(dataset[9].original_release_date.substring(4, 10))

        var xScale = d3.scaleBand()
            .domain(d3.map(dataset, d => +d.original_release_date.substring(0, 4))) // label by year
            .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])
            .padding([0.3])



        var yScale = d3.scaleLinear()
            .domain([0, 100]) // score is normally on a scale of 0-100
            .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])


        var xAxisGen = d3.axisBottom(xScale)
            .scale(xScale)
            .tickValues(xScale.domain().filter(function(d,i){ return !(i%5)})) // xAxis is every 5 years
            // in order to do this the dataset needs to be cleaned up 04/17/1996 instead of 4/17/1996


        var yAxisGen = d3.axisLeft(yScale)
            

        var xAxisValue = "Year"

    home.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (dimensions.height - dimensions.margin.bottom) + ")")
        .call(xAxisGen)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)")
        
    home.append("text")
        .attr("y", dimensions.height)
        .attr("x", dimensions.width/2)
        .attr("text-anchor","end")
        .attr("stroke", "black")
        .text(xAxisValue) // CHANGE to by dynamic for x-var type


    home.append('g')
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

    home.append("text")
        .attr("x", dimensions.width/2)
        .attr("y", dimensions.margin.top+10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Prototype time");


    function loadScript(url){    
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
        }


    function changeGraph(){
        console.log('yoooo')
        var selected = document.getElementById("filters");
        var value = selected.options[selected.selectedIndex].value;
        if (value == 3){
            console.log('hi')
            home.selectAll("*").remove();
            loadScript('genre-script.js');
        }
        else if (value == 1){
            home.selectAll("*").remove();
            loadScript('script-rating.js');
        }
        else{
            home.selectAll("*").remove();
            loadScript('script.js');
        }
    }    

    d3.select("#filters").on("change", changeGraph )

    })