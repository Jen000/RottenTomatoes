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
        .attr("x", -(dimensions.height/3))
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

          // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", dimensions.width )
        .attr("height", dimensions.height )
        .attr("x", 0)
        .attr("y", 0);

    var scatter = svg.append('g')
        .attr("clip-path", "url(#clip)")

    var myColor = d3.scaleOrdinal()
        .domain(["Action", "Animation", "Anime", "Art", "Classics","Comedy","Cult","Drama","Faith","Horror","Kids","Musical","Mystery","Romance","Science","Special","Western"])
        .range(d3.schemeSet1);

    var lightColor = d3.scaleOrdinal()
        .domain(["Action", "Animation", "Anime", "Art", "Classics","Comedy","Cult","Drama","Faith","Horror","Kids","Musical","Mystery","Romance","Science","Special","Western"])
        .range(d3.schemePastel1)

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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
        scatter.append('g')
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
    // var simulation = d3.forceSimulation()
    //     .force("charge", d3.forceManyBody().strength(0.5))
    //     .force("collide", d3.forceCollide().strength(.1).radius(20).iterations(1)) // Force that avoids circle overlapping

    // // Apply these forces to the nodes and update their positions.
    // // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    // simulation
    //     .nodes(dataset)
    //     .on("tick", function(d){
    //     node
    //         .attr("cx", function(d){ return d.xScale; })
    //         .attr("cy", function(d){ return d.yScale; })
    //     });

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom

    svg.call(d3.zoom()
        .extent([ [dimensions.margin.left,0], [dimensions.width - dimensions.margin.right, dimensions.height-dimensions.margin.bottom ] ])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));

    function zoomed({transform}) {
        g.attr("transform", transform);
    }

    
    // WORDCLOUD

    var cloudDimensions = {
        width: 420,
        height: 190,
        margin:{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10
        }
    }

    var cloud = d3.select("#RottenTomatoesCloud")
        .attr("width", cloudDimensions.width + cloudDimensions.margin.left + cloudDimensions.margin.right)
        .attr("height", cloudDimensions.height + cloudDimensions.margin.top + cloudDimensions.margin.bottom)
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
                {word: items[0][0], size: 60},
                {word: items[1][0], size: 57},
                {word: items[2][0], size: 54},
                {word: items[3][0], size: 45},
                {word: items[4][0], size: 40},
                {word: items[5][0], size: 38},
                {word: items[6][0], size: 33},
                {word: items[7][0], size: 30},
                {word: items[8][0], size: 25},
                {word: items[9][0], size: 20}
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
                .attr("stroke", "black")
                .style("stroke-width", "1px")
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


    //tomatometer_rating = 19
    //audience_rating = 15
    var critRating = dataset.columns[19]
    var audRating = dataset.columns[15]


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

    popdataC = [
        {genre: 'Action & Adventure', critRanking: avgCritGenres[0]},
        {genre: 'Animation', critRanking: avgCritGenres[1]},
        {genre: 'Anime & Manga', critRanking: avgCritGenres[2]},
        {genre: 'Art House & International', critRanking: avgCritGenres[3]},
        {genre: 'Classics', critRanking: avgCritGenres[4]},
        {genre: 'Comedy', critRanking: avgCritGenres[5]},
        {genre: 'Cult Movies', critRanking: avgCritGenres[6]},
        {genre: 'Drama', critRanking: avgCritGenres[7]},
        {genre: 'Faith & Spirituality', critRanking: avgCritGenres[8]},
        {genre: 'Horror', critRanking: avgCritGenres[9]},
        {genre: 'Kids & Family', critRanking: avgCritGenres[10]},
        {genre: 'Musical & Performing Arts', critRanking: avgCritGenres[11]},
        {genre: 'Mystery & Suspense', critRanking: avgCritGenres[12]},
        {genre: 'Romance', critRanking: avgCritGenres[13]},
        {genre: 'Science Fiction & Fantasy', critRanking: avgCritGenres[14]},
        {genre: 'Special Interest', critRanking: avgCritGenres[15]},
        {genre: 'Western', critRanking: avgCritGenres[16]},
    ]

    console.log(popdata)


    // lollipop grpah

    // set the dimensions and margins of the graph
    var dimensionsLolli = {
        width: 400,
        height: 379,
        margin:{
            top: 10,
            bottom: 50,
            right: 0,
            left: 80
        }
    }

    dimensionsLolli.width = dimensionsLolli.width - dimensionsLolli.margin.left - dimensionsLolli.margin.right
    dimensionsLolli.height = dimensionsLolli.height - dimensionsLolli.margin.top - dimensionsLolli.margin.bottom


    // append the svg object to the body of the page
    var pop = d3.select("#RottenTomatoesPop")
            .style("width", dimensions.width)
            .style("height", dimensions.height)
        .append("g")
            .attr("width", dimensionsLolli.width + dimensionsLolli.margin.left + dimensionsLolli.margin.right)
            .attr("height", dimensionsLolli.height + dimensionsLolli.margin.top + dimensionsLolli.margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + dimensionsLolli.margin.left + "," + dimensionsLolli.margin.top + ")");

    // Add X axis
    var xpop = d3.scaleLinear()
        .domain([50, 90])
        .range([ 0, dimensionsLolli.width]);
    pop.append("g")
        .attr("transform", "translate(0," + dimensionsLolli.height + ")")
        .call(d3.axisBottom(xpop))

    // Y axis
    var ypop = d3.scaleBand()
        .range([ 0, dimensionsLolli.height ])
        .domain(popdata.map(function(d) { 
            var string = d.genre.split(' ')
            return string[0]; }))
        .padding(1);
    pop.append("g")
        .call(d3.axisLeft(ypop))

    pop.append('g')
        .call(ypop)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensionsLolli.height/2))
        .attr("y", 6)
        .attr("dy", "-4.1em")
        .attr("text-anchor","end")
        .attr("stroke", "black")
        .text("Genre")

    pop.append("text")
        .attr("x", dimensionsLolli.width/2+20)
        .attr("y", dimensionsLolli.height+40)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Score Scale")

        
    // mouse stuff
    var tooltip = d3.select("#RottenTomatoesPopTool")
        .append("div")
            .style("opacity", 0)
            .attr("id", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "2px")
            .style("padding", "0px")
            .style("position", "absolute")

    var mouseover1 = function(d, i) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke-width", 3)
            
    }

    var mousemove1 = function(d, i) {
        var num = 0
        if (Object.keys(i).length === 2){
            num = parseFloat(+i.critRanking).toFixed(2);
            tooltip
            .html("Rating: " + (num))
            .style("top", (parseInt(d3.select(this).attr("cy")) + document.getElementById("RottenTomatoesPopTool").offsetTop - 30) +"px")
            .style("left", (parseInt(d3.select(this).attr("cx"))+ document.getElementById("RottenTomatoesPopTool").offsetLeft + 30) + "px")
        }
        else {
            num = parseFloat(+i.audRanking).toFixed(2);
            tooltip
            .html("Rating: " + (num))
            .style("top", (parseInt(d3.select(this).attr("cy")) + document.getElementById("RottenTomatoesPopTool").offsetTop - 30) +"px")
            .style("left", (parseInt(d3.select(this).attr("cx"))+ document.getElementById("RottenTomatoesPopTool").offsetLeft + 30) + "px")
        }
    }

    var mouseleave1 = function(d, i) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 0)
    }

    function mousedowned1(d, i) {
        d3.select(this).transition()
            .attr("fill", "black")
            .attr("r", radius * 2)
          .transition()
            .attr("fill", d3.interpolateRainbow(i / 360))
      }
    
    
    
    function lollipopstuff(gen, gen1, className){
        // Lines
        pop.selectAll("myline")
            .data(gen)
            .enter()
            .append("line")
                .attr("x1", function(d) { return xpop(d.critRanking); })
                .attr("x2", function(d) { return xpop(d.audRanking); })
                .attr("y1", function(d) { var string = d.genre.split(' ')
                return ypop(string[0]); })
                .attr("y2", function(d) { var string = d.genre.split(' ')
                return ypop(string[0]); })
                .attr("stroke", "grey")
                .attr("stroke-width", "1px")
                .attr("class" , className)

        // Circles of variable 1
        pop.append("g")
            .selectAll("mycircle")
            .data(gen1)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return xpop(d.critRanking); })
                .attr("cy", function(d) { var string = d.genre.split(' ')
                return ypop(string[0]); })
                .attr("r", "6")
                .attr("class" , className )
                .style("fill", myColor(className))
            .on("mouseover", mouseover1)
            .on("mousemove", mousemove1)
            .on("mouseleave", mouseleave1)

        // Circles of variable 2
        pop.append("g")
            .selectAll("mycircle")
            .data(gen)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return xpop(d.audRanking); })
                .attr("cy", function(d) { var string = d.genre.split(' ')
                return ypop(string[0]); })
                .attr("r", "6")
                .attr("class" , className)
                .style("fill", lightColor(className))
            .on("mouseover", mouseover1)
            .on("mousemove", mousemove1)
            .on("mouseleave", mouseleave1)
    }

    console.log(popdata[1])
    lollipopstuff([popdata[0]], [popdataC[0]], "Action")
    lollipopstuff([popdata[1]], [popdataC[1]], "Animation")
    lollipopstuff([popdata[2]], [popdataC[2]], "Anime")
    lollipopstuff([popdata[3]], [popdataC[3]], "Art")
    lollipopstuff([popdata[4]], [popdataC[4]], "Classics")
    lollipopstuff([popdata[5]], [popdataC[5]], "Comedy")
    lollipopstuff([popdata[6]], [popdataC[6]], "Cult")
    lollipopstuff([popdata[7]], [popdataC[7]], "Drama")
    lollipopstuff([popdata[8]], [popdataC[8]], "Faith")
    lollipopstuff([popdata[9]], [popdataC[9]], "Horror")
    lollipopstuff([popdata[10]], [popdataC[10]], "Kids")
    lollipopstuff([popdata[11]], [popdataC[11]], "Musical")
    lollipopstuff([popdata[12]], [popdataC[12]], "Mystery")
    lollipopstuff([popdata[13]], [popdataC[12]], "Romance")
    lollipopstuff([popdata[14]], [popdataC[14]], "Science")
    lollipopstuff([popdata[15]], [popdataC[15]], "Special")
    lollipopstuff([popdata[16]], [popdataC[16]], "Western")

    pop.append("circle").attr("cx",230).attr("cy",10).attr("r", 6).style("fill", "#62625d")
    pop.append("circle").attr("cx",230).attr("cy",30).attr("r", 6).style("fill", "#cfcfc4")
    pop.append("text").attr("x", 250).attr("y", 10).text("Critic Score").style("font-size", "15px").attr("alignment-baseline","middle")
    pop.append("text").attr("x", 250).attr("y", 30).text("Audience Score").style("font-size", "15px").attr("alignment-baseline","middle")


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

            pop.selectAll("."+grp)
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

            pop.selectAll("."+grp)
                .transition()
                .duration(500)
                .style("opacity", 0)
                

        }
      })
    }


    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
          this.parentNode.appendChild(this);
        });
      };



    d3.selectAll(".checkbox").on('change', changeGraph )

    changeGraph();

    // initZoom();

})