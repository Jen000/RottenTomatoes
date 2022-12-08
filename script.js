d3.csv("rotten_tomatoes_movies_rotten_tomatoes_movies.csv").then(
    function(dataset){
        
        console.log(dataset)

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

        var xScale = d3.scaleTime()
            .domain(d3.extent(dataset, function(d) { return parseTime(d.Original_Release_Date); })) // label by year
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


        var yScale = d3.scaleLinear()
            .domain([0, 100]) // score is normally on a scale of 0-100
            .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])


        var xAxisGen = d3.axisBottom(xScale)
             .scale(xScale)
            // .tickValues(xScale.domain().filter(function(d,i){ return !(i%10)}))


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
        // .text("Prototype time"); Title


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

    //wordstrings per genre
    var ActionString;
    aAndaArray.forEach(movie => {
        ActionString+=movie.Critics_Consensus
    });
    var AnimationString;
    animation.forEach(movie => {
        AnimationString+=movie.Critics_Consensus
    });
    var AnimeString;
    aAndM.forEach(movie => {
        AnimeString+=movie.Critics_Consensus
    });
    var ArtString;
    aHAndI.forEach(movie => {
        ArtString+=movie.Critics_Consensus
    });
    var ClassicsString;
    classics.forEach(movie => {
        ClassicsString+=movie.Critics_Consensus
    });
    var ComedyString;
    comedy.forEach(movie => {
        ComedyString+=movie.Critics_Consensus
    });
    var CultString;
    cultMovies.forEach(movie => {
        CultString+=movie.Critics_Consensus
    });
    var DramaString;
    drama.forEach(movie => {
        DramaString+=movie.Critics_Consensus
    });
    var FaithString;
    fAndS.forEach(movie => {
        FaithString+=movie.Critics_Consensus
    });
    var HorrorString;
    horror.forEach(movie => {
        HorrorString+=movie.Critics_Consensus
    });
    var KidsString;
    kAndF.forEach(movie => {
        KidsString+=movie.Critics_Consensus
    });
    var MusicalString;
    mAndPA.forEach(movie => {
        MusicalString+=movie.Critics_Consensus
    });
    var MysteryString;
    mAndS.forEach(movie => {
        MysteryString+=movie.Critics_Consensus
    });
    var RomanceString;
    romance.forEach(movie => {
        RomanceString+=movie.Critics_Consensus
    });
    var ScienceString;
    sfAndF.forEach(movie => {
        ScienceString+=movie.Critics_Consensus
    });
    var SpecialString;
    special.forEach(movie => {
        SpecialString+=movie.Critics_Consensus
    });
    var WesternString;
    western.forEach(movie => {
        WesternString+=movie.Critics_Consensus
    });


        // action
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

    // // Apply these forces to the nodes and update their positions.
    // // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    // simulation
    //     .nodes(dataset)
    //     .on("tick", function(d){
    //     node
    //         .attr("cx", function(d){ return d.xScale; })
    //         .attr("cy", function(d){ return d.yScale; })
    //     });




       // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [dimensions.margin.left,0], [dimensions.width - dimensions.margin.right, dimensions.height-dimensions.margin.bottom ] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", zoomChart)    // Each time the brush selection changes, trigger the 'updateChart' function

        

    // Add the brushing
    svg.append("g")
        .attr("class", "brush")
        .call(brush);


    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    function zoomChart(event) {
        
        var extent = event.selection

        console.log(extent)
    
        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
          if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
          xScale.domain(d3.extent(dataset, parseTime(d.Original_Release_Date)))
        }
        else{
          xScale.domain([ xScale.invert(extent[0]), xScale.invert(extent[1]) ])
          svg.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

        var t = svg.transition()
                    .duration(750);
    
        // Update axis and circle position
        svg.select(".y axis").
            transition(t)
            .call(xAxisGen);

        svg.select(".x axis")
            .transition(t)
            .call(yAxisGen);

        svg.selectAll("dot")
          .transition(t)
          .duration(1000)
          .attr("cx", function (d) { return xScale(parseTime(d.Original_Release_Date)); } )
          .attr("cy", function (d) { return yScale(+d.Tomatometer_Rating); } )
    }




    
    // WORDCLOUD

    var cloudDimensions = {
        width: 300,
        height: 150,
        margin:{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10
        }
    }

    var cloud = d3.select("#RottenTomatoesCloud")
        .append("g")
            .attr("width", cloudDimensions.width + cloudDimensions.margin.left + cloudDimensions.margin.right)
            .attr("height", cloudDimensions.height + cloudDimensions.margin.top + cloudDimensions.margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + cloudDimensions.margin.left + "," + cloudDimensions.margin.top + ")");



    // var wordCounts = {};


    function cloudy(theString, className){

        var wordCounts = {};
        var words = theString.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
        
            // filter to get words longer than 4 in len
            var longWords = words.filter(checkLen);

            function checkLen(lWord) {
                if (lWord.length >= 5)
                    return lWord;
            }

            // create data
            for(var i = 0; i < longWords.length; i++){
                wordCounts[longWords[i].toLowerCase()] = (wordCounts[longWords[i].toLowerCase()] || 0) + 1
            }


            // Create items array
            var items = Object.keys(wordCounts).map(function(key) {
            return [key, wordCounts[key]];
            });

            // Sort the array based on the second element
            items.sort(function(first, second) {
            return second[1] - first[1];
            });

            // organize top 10 data so that it's easy to work with 
            cloudData = [
                {word: items[0][0], size: 50},
                {word: items[1][0], size: 47},
                {word: items[2][0], size: 44},
                {word: items[3][0], size: 35},
                {word: items[4][0], size: 30},
                {word: items[5][0], size: 28},
                {word: items[6][0], size: 23},
                {word: items[7][0], size: 20},
                {word: items[8][0], size: 15},
                {word: items[9][0], size: 10}
            ]


            var layout = d3.layout.cloud()
                .size([cloudDimensions.width, cloudDimensions.height])
                .words(cloudData.map(function(d) { return {text: d.word, size:d.size}; }))
                .padding(3)        //space between words
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .fontSize(function(d) { return d.size; })      // font size of words
                .on("end", draw);
            layout.start();

        function draw(words) {
            cloud
            .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .attr("class" , className)
                .style("fill", myColor(className) )
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }

    cloudy(ActionString, "Action")
    cloudy(AnimationString, "Animation")
    cloudy(AnimeString, "Anime")
    cloudy(ArtString, "Art")
    cloudy(ClassicsString, "Classics")
    cloudy(ComedyString, "Comedy")
    cloudy(CultString, "Cult")
    cloudy(DramaString, "Drama")
    cloudy(FaithString, "Faith")
    cloudy(HorrorString, "Horror")
    cloudy(KidsString, "Kids")
    cloudy(MusicalString, "Musical")
    cloudy(MysteryString, "Mystery")
    cloudy(RomanceString, "Romance")
    cloudy(ScienceString, "Science")
    cloudy(SpecialString, "Special")
    cloudy(WesternString, "Western")


    // lollipop graph data

    sortedData = [aAndaArray, animation, aAndM, aHAndI, classics, comedy, cultMovies, drama, fAndS, horror, kAndF, mAndPA, mAndS, romance, sfAndF, special, western]

    var avgCritGenres = []
    var avgAudGenres = []


    //tomatometer_rating = 14
    var critRating = dataset.columns[18]
    console.log(dataset[0].columns[18])
    var audRating = dataset.columns[3]
    console.log(dataset[0].columns[18])

    sortedData.forEach(genre => {
        var critRatings = []
        var audRatings = []
        genre.forEach(movie => {
            critRatings.push(movie[critRating])
        });
        genre.forEach(movie => {
            audRatings.push(movie[audRating])
        });
        var sumAvgCritGenre = d3.mean(critRatings)
        var sumAvgAudGenre = d3.mean(audRatings)
        avgCritGenres.push(sumAvgCritGenre)
        avgAudGenres.push(sumAvgAudGenre)

    });


    popdata = [
        {genre: 'Action & Adventure', critRanking: avgCritGenres[0], audRanking: avgAudGenres[0]},
        {genre: 'Animation', critRanking: avgCritGenres[1], audRanking: avgAudGenres[1]},
        {genre: 'Anime & Manga', critRanking: avgCritGenres[2], audRanking: avgAudGenres[2]},
        {genre: 'Art House & International', critRanking: avgCritGenres[3], audRanking: avgAudGenres[3]},
        {genre: 'Classics', critRanking: avgCritGenres[4], audRanking: avgAudGenres[4]},
        {genre: 'Comedy', critRanking: avgCritGenres[5], audRanking: avgAudGenres[5]},
        {genre: 'Cult Movies', critRanking: avgCritGenres[6], audRanking: avgAudGenres[6]},
        {genre: 'Drama', critRanking: avgCritGenres[7], audRanking: avgAudGenres[7]},
        {genre: 'Faith & Spirituality', critRanking: avgCritGenres[8], audRanking: avgAudGenres[8]},
        {genre: 'Horror', critRanking: avgCritGenres[9], audRanking: avgAudGenres[9]},
        {genre: 'Kids & Family', critRanking: avgCritGenres[10], audRanking: avgAudGenres[10]},
        {genre: 'Musical & Performing Arts', critRanking: avgCritGenres[11], audRanking: avgAudGenres[11]},
        {genre: 'Mystery & Suspense', critRanking: avgCritGenres[12], audRanking: avgAudGenres[12]},
        {genre: 'Romance', critRanking: avgCritGenres[13], audRanking: avgAudGenres[13]},
        {genre: 'Science Fiction & Fantasy', critRanking: avgCritGenres[14], audRanking: avgAudGenres[14]},
        {genre: 'Special Interest', critRanking: avgCritGenres[15], audRanking: avgAudGenres[15]},
        {genre: 'Western', critRanking: avgCritGenres[16], audRanking: avgAudGenres[16]},
    ]

    console.log(popdata)


    // lollipop grpah

    // set the dimensions and margins of the graph
    var dimensionsLolli = {
        width: 750,
        height: 375,
        margin:{
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    // append the svg object to the body of the page
    var pop = d3.select("#RottenTomatoesPop")
        .append("pop")
            .attr("width", dimensionsLolli.width + dimensionsLolli.margin.left + dimensionsLolli.margin.right)
            .attr("height", dimensionsLolli.height + dimensionsLolli.margin.top + dimensionsLolli.margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + dimensionsLolli.margin.left + "," + dimensionsLolli.margin.top + ")");

    // Add X axis
    var xpop = d3.scaleLinear()
        .domain([0, 100])
        .range([ 0, dimensionsLolli.width]);
    pop.append("g")
        .attr("transform", "translate(0," + dimensionsLolli.height + ")")
        .call(d3.axisBottom(xpop))

    // Y axis
    var ypop = d3.scaleBand()
        .range([ 0, dimensionsLolli.height ])
        .domain(dataset.map(function(d) { return d.genre; }))
        .padding(1);
    pop.append("g")
        .call(d3.axisLeft(ypop))



    ///// update stuff for each graph


    function changeGraph(){
        // For each check box:
      d3.selectAll(".checkbox").each(function(d){
        cb = d3.select(this);
        grp = cb.property("value")

        // If the box is check, I show the group
        if(cb.property("checked")){
            svg.selectAll("."+grp)
                .transition()
                .duration(400)
                .style("opacity", 1)
                .attr("r", 2)

            cloud.selectAll("."+grp)
            .transition()
            .duration(500)
            .style("opacity", 1)

            

        // Otherwise I hide it
        }else{
            svg.selectAll("."+grp)
                .transition()
                .duration(400)
                .style("opacity", 0)
                .attr("r", 0)

            cloud.selectAll("."+grp)
            .transition()
            .duration(500)
            .style("opacity", 0)

        }
      })
    }


    d3.selectAll(".checkbox").on('change', changeGraph )

    changeGraph();


})