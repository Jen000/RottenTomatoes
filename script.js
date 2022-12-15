d3.csv("rotten_tomatoes_movies_rotten_tomatoes_movies.csv").then(
    function(dataset){
        
        console.log(dataset)

        var dimensions = {
            width: 750,
            height: 385,
            margin:{
                top: 30,
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
        
    svg.append("text")
        .attr("y", dimensions.height)
        .attr("x", dimensions.width/2)
        .attr("text-anchor","end")
        .text(xAxisValue) 

    svg.append('g')
        .attr("class", "y axis")
        .attr("transform", "translate(" + (dimensions.margin.left) + ",0)")
        .call(yAxisGen)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensions.height/3))
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor","end")
        .text("Rotten Tomatoes Score")
        .style("font-size", "12px")

    svg.append("text")
        .attr("x", dimensions.width/2)
        .attr("y", dimensions.margin.top - 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("stroke", "black")
        .text("Critc Scores Over Time");

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

    var critRating = dataset.columns[19]
    var audRating = dataset.columns[15]


    var content_rating_G = dataset.filter(function(d){ return d.Content_Rating =="G" })
    var content_rating_PG = dataset.filter(function(d){ return d.Content_Rating =="PG" })
    var content_rating_PG13 = dataset.filter(function(d){ return d.Content_Rating =="PG-13" })
    var content_rating_R = dataset.filter(function(d){ return d.Content_Rating =="R" })
    var content_rating_NR = dataset.filter(function(d){ return d.Content_Rating =="NR" })

    sorted_rating_data = [content_rating_G, content_rating_PG, content_rating_PG13, content_rating_R, content_rating_NR]
    var content_rating_array = ["G", "PG", "PG-13", "R", "NR"]
    ////
    // overall content stuff

    function contentGenreData(array){
        var rating_G = array.filter(function(d){ return d.Content_Rating =="G" })
        var rating_PG = array.filter(function(d){ return d.Content_Rating =="PG" })
        var rating_PG13 = array.filter(function(d){ return d.Content_Rating =="PG-13" })
        var rating_R = array.filter(function(d){ return d.Content_Rating =="R" })
        var rating_NR = array.filter(function(d){ return d.Content_Rating =="NR" })

        rating_data_per_genre = [rating_G, rating_PG, rating_PG13, rating_R, rating_NR]

        the_crit_content_ratings= []
        the_aud_content_ratings= []

        rating_data_per_genre.forEach(c_rating => {
            the_crit_ratings = []
            the_aud_ratings = []
            c_rating.forEach(movie => {
                the_crit_ratings.push(movie[critRating])
                the_aud_ratings.push(movie[audRating])
            })
            var sumAvgCritGenre = d3.mean(the_crit_ratings)
            var sumAvgAudGenre = d3.mean(the_aud_ratings)
            the_crit_content_ratings.push(sumAvgCritGenre)
            the_aud_content_ratings.push(sumAvgAudGenre)
        })


        avg_content_rating_per_genre = [
            {group: "G", critic_score: the_crit_content_ratings[0], audience_score: the_aud_content_ratings[0]},
            {group: "PG", critic_score: the_crit_content_ratings[1], audience_score: the_aud_content_ratings[1]},
            {group: "PG-13", critic_score: the_crit_content_ratings[2], audience_score: the_aud_content_ratings[2]},
            {group: "R", critic_score: the_crit_content_ratings[3], audience_score: the_aud_content_ratings[3]},
            {group: "NR", critic_score: the_crit_content_ratings[4], audience_score: the_aud_content_ratings[4]}
        ]

        return avg_content_rating_per_genre
    }

    
    var overall = contentGenreData(dataset)
    var action_content_data = contentGenreData(aAndaArray)
    var animation_content_data = contentGenreData(animation)
    var anime_content_data = contentGenreData(aAndM)
    var art_content_data = contentGenreData(aHAndI)
    var classics_content_data = contentGenreData(classics)
    var comedy_content_data = contentGenreData(comedy)
    var cult_content_data = contentGenreData(cultMovies)
    var drama_content_data = contentGenreData(drama)
    var faith_content_data = contentGenreData(fAndS)
    var horror_content_data = contentGenreData(horror)
    var kids_content_data = contentGenreData(kAndF)
    var musical_content_data = contentGenreData(mAndPA)
    var mystery_content_data = contentGenreData(mAndS)
    var romance_content_data = contentGenreData(romance)
    var science_content_data = contentGenreData(sfAndF)
    var special_content_data = contentGenreData(special)
    var western_content_data = contentGenreData(western)



    




    //   // Time
    // var dataTime = d3.range(0, 10).map(function(d) {
    //     return new Date(1995 + d, 10, 3);
    // });

    // var sliderTime = d3
    //     .sliderBottom()
    //     .min(d3.min(dataTime))
    //     .max(d3.max(dataTime))
    //     .step(1000 * 60 * 60 * 24 * 365)
    //     .width(300)
    //     .tickFormat(d3.timeFormat('%Y'))
    //     .tickValues(dataTime)
    //     .default(new Date(1998, 10, 3))
    //     .on('onchange', val => {
    //         d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    //     });

    // var gTime = d3
    //     .select('div#slider-time')
    //     .append('svg')
    //     .attr('width', 500)
    //     .attr('height', 100)
    //     .append('g')
    //     .attr('transform', 'translate(30,30)');

    // gTime.call(sliderTime);

    // d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
    // mouse stuff
    var tooltipDot = d3.select("#RottenTomatoesTool")
    .append("div")
        .style("opacity", 0)
        .attr("id", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "2px")
        .style("padding", "0px")
        .style("position", "absolute")


    var mouseoverDot = function(d, i) {
        tooltipDot
            .style("opacity", 1)
        d3.select(this)
            .style("stroke-width", 3)
            
        }
    
    var mousemoveDot = function(d, i) {
        var title = i.Movie_Title
        var year = i.Original_Release_Date
        year = year.slice(0,4)
            tooltipDot
                .html(title + ", " + year)
                .style("top", (document.getElementById("RottenTomatoesTool").offsetTop + "px"))
                .style("left", (document.getElementById("RottenTomatoesTool").offsetLeft + dimensions.width/2 + dimensions.margin.left*2 + "px"))
    }


    var mouseleaveDot = function(d, i) {
    tooltipDot
        .transition()
        .duration(200)
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", ".5px")
    }


    function makeDots(array, className){
        scatter.append('g')
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
            .on("mouseover", mouseoverDot)
            .on("mousemove", mousemoveDot)
            .on("mouseleave", mouseleaveDot)
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

    // // Apply these forces to the nodes and update their positions.
    // // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    // simulation
    //     .nodes(dataset)
    //     .on("tick", function(d){
    //     node
    //         .attr("cx", function(d){ return d.xScale; })
    //         .attr("cy", function(d){ return d.yScale; })
    //     });






    
    // WORDCLOUD

    var cloudDimensions = {
        width: 420,
        height: 210,
        margin:{
            top: 20,
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


// Top Descriptors in the Critics Consensus

    // var wordCounts = {};


    function cloudy(theString, className){

        cloud.selectAll("text")
            .remove()
            .exit()
            .remove()

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

            cloud.append("text")
                .attr("x", cloudDimensions.width/2)
                .attr("y", cloudDimensions.margin.top - 25)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("Top Descriptors")
                .attr("stroke", "black")
        }
    }

    cloudy(ActionString, "Action")



    // lollipop graph data

    sortedData = [aAndaArray, animation, aAndM, aHAndI, classics, comedy, cultMovies, drama, fAndS, horror, kAndF, mAndPA, mAndS, romance, sfAndF, special, western]

    var avgCritGenres = []
    var avgAudGenres = []


    //tomatometer_rating = 19
    //audience_rating = 15



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
        width: 450,
        height: 389,
        margin:{
            top: 35,
            bottom: 50,
            right: 40,
            left: 80
        }
    }

    dimensionsLolli.width = dimensionsLolli.width - dimensionsLolli.margin.left - dimensionsLolli.margin.right
    dimensionsLolli.height = dimensionsLolli.height - dimensionsLolli.margin.top - dimensionsLolli.margin.bottom


    // append the svg object to the body of the page
    var pop = d3.select("#RottenTomatoesPop")
            .style("width", dimensionsLolli.width + dimensionsLolli.margin.left + dimensionsLolli.margin.right)
            .style("height", dimensionsLolli.height + dimensionsLolli.margin.top + dimensionsLolli.margin.bottom)
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
        .range([ 0, dimensionsLolli.height-10 ])
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
        .text("Genre")

    pop.append("text")
        .attr("x", dimensionsLolli.width/2+20)
        .attr("y", dimensionsLolli.height+40)
        .attr("text-anchor", "end")
        .text("Score Scale")

    pop.append("text")
        .attr("x", cloudDimensions.width/2-20)
        .attr("y", cloudDimensions.margin.top - 40)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Critic vs Audience Avg Movie Scores")
        .attr("stroke", "black")

        
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
            .style("top", (parseInt(d3.select(this).attr("cy")) + document.getElementById("RottenTomatoesPopTool").offsetTop) +"px")
            .style("left", (parseInt(d3.select(this).attr("cx"))+ document.getElementById("RottenTomatoesPopTool").offsetLeft + 30) + "px")
        }
        else {
            num = parseFloat(+i.audRanking).toFixed(2);
            tooltip
            .html("Rating: " + (num))
            .style("top", (parseInt(d3.select(this).attr("cy")) + document.getElementById("RottenTomatoesPopTool").offsetTop) +"px")
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

    pop
        .append("circle")
        .attr("cx",230)
        .attr("cy",10)
        .attr("r", 6)
        .style("fill", "#62625d")

    pop
        .append("circle")
        .attr("cx",230)
        .attr("cy",30)
        .attr("r", 6)
        .style("fill", "#cfcfc4")
        
    pop
        .append("text")
        .attr("x", 250)
        .attr("y", 10)
        .text("Critic Score")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")

    pop
        .append("text")
        .attr("x", 250)
        .attr("y", 30)
        .text("Audience Score")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")


    /////////////////////////////////////////////////////////////////////////
    // bar graph
    var dimensionsBar = {
        width: 720,
        height: 280,
        margin:{
            top: 30,
            bottom: 40,
            right: 0,
            left: 40
        }
    }


    // mouse stuff
    var tooltipBar = d3.select("#RottenTomatoesBarTool")
    .append("div")
        .style("opacity", 0)
        .attr("id", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "2px")
        .style("padding", "0px")
        .style("position", "absolute")

    var mouseover2 = function(d, i) {
    tooltipBar
        .style("opacity", 1)
    d3.select(this)
        .style("stroke-width", 3)
        
    }

    var mousemove2 = function(d, i) {
        var cOrA
        if (i.key == "audience_score"){
            cOrA  = "Audience"
        }
        else
            cOrA = "Critic"
        var num = 0
            num = parseFloat(+i.value).toFixed(2);
            tooltipBar
                .html(cOrA + " Score: " + (num))
                .style("top", (document.getElementById("RottenTomatoesBarTool").offsetTop + dimensionsBar.height + dimensionsBar.margin.top + 15 + "px"))
                .style("left", (document.getElementById("RottenTomatoesBarTool").offsetLeft + 550 + "px"))
    }

    var mouseleave2 = function(d, i) {
    tooltipBar
        .transition()
        .duration(200)
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", ".5px")
    }



    dimensionsBar.width = dimensionsBar.width - dimensionsBar.margin.left - dimensionsBar.margin.right
    dimensionsBar.height = dimensionsBar.height - dimensionsBar.margin.top - dimensionsBar.margin.bottom

    var bar = d3.select("#RottenTomatoesBar")
        .style("width", dimensionsBar.width + dimensionsBar.margin.left + dimensionsBar.margin.right)
        .style("height", dimensionsBar.height + dimensionsBar.margin.top + dimensionsBar.margin.bottom)
        .append("g")
            .attr("width", ( dimensionsBar.width + dimensionsBar.margin.left + dimensionsBar.margin.right))
            .attr("height",  ( dimensionsBar.height + dimensionsBar.margin.top + dimensionsBar.margin.bottom))
        .append("g")
            .attr("transform",
                "translate(" + dimensionsBar.margin.left + "," + dimensionsBar.margin.top + ")");



    var groups = []

    overall.forEach ( row => {
        groups.push(row.group)
    })



  // List of groups = species here = value of the first column called group -> I show them on the X axis
    var subgroups = ['critic_score', 'audience_score']



  // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, dimensionsBar.width])
      .padding([0.2])
    bar.append("g")
        .attr("transform", "translate(0," + dimensionsBar.height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ dimensionsBar.height , 0 ]);
    bar.append("g")
        .call(d3.axisLeft(y));

    bar.append('g')
        .call(y)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensionsBar.height/2 - dimensionsBar.margin.bottom))
        .attr("y", - 30)
        // .attr("dy", "-4.1em")
        .attr("text-anchor","end")
        .text("Score Scale")

    bar.append("text")
        .attr("x", dimensionsBar.width/2 + dimensionsBar.margin.left)
        .attr("y", dimensionsBar.height+30)
        .attr("text-anchor", "end")
        .text("Content Rating")

    bar.append("text")
        .attr("x", dimensionsBar.width/2)
        .attr("y", dimensionsBar.margin.top-40)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Critic vs Audience Avg Movie Scores Per Content Rating")
        .attr("stroke", "black")

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#e41a1c", "#fbb4ae"])


    bar.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(action_content_data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter()
        .append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return dimensionsBar.height - y(d.value); })
        .attr("stroke", "black")
        .style("stroke-width", ".5px")
        .attr("fill", function(d) { return color(d.key); })
        .on("mouseover", mouseover2)
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)

        

    // Show the bars
    function updateBarGraph(data, color){

        bar.selectAll("rect")
            .remove()
            .exit()
            .remove()

        console.log("do we make it here too?")
        
        bar.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter()
        .append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return dimensionsBar.height - y(d.value); })
        .attr("stroke", "black")
        .style("stroke-width", ".5px")
        .attr("fill", function(d) { return color(d.key); })
        .on("mouseover", mouseover2)
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)
    }








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


    // var checkbox = document.querySelector("input[name=checkbox]");
    // checkbox.addEventListener('change', function() {
    //     if (this.checked) {
    //         updateBarGraph(overall)
    //     }
    // });


    var myColor = d3.scaleOrdinal()
        .domain(["Action", "Animation", "Anime", "Art", "Classics","Comedy","Cult","Drama","Faith","Horror","Kids","Musical","Mystery","Romance","Science","Special","Western"])
        .range(d3.schemeSet1);
        // ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]

    var lightColor = d3.scaleOrdinal()
        .domain(["Action", "Animation", "Anime", "Art", "Classics","Comedy","Cult","Drama","Faith","Horror","Kids","Musical","Mystery","Romance","Science","Special","Western"])
        .range(d3.schemePastel1)
        //["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]

    var actionColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#e41a1c", "#fbb4ae"])

    var animationColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#377eb8", "#b3cde3"])

    var animeColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#4daf4a", "#ccebc5"])

    var artColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#984ea3", "#decbe4"])

    var classicsColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#ff7f00", "#fed9a6"])

    var comedyColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#ffff33", "#ffffcc"])

    var cultColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#a65628", "#e5d8bd"])

    var dramaColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#f781bf", "#fddaec"])

    var faithColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#999999", "#f2f2f2"])

    var horrorColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#e41a1c", "#fbb4ae"])

    var kidsColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#377eb8", "#b3cde3"])

    var musicalColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#4daf4a", "#ccebc5"])

    var mysteryColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#984ea3", "#decbe4"])

    var romanceColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#ff7f00", "#fed9a6"])

    var scienceColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#ffff33", "#ffffcc"])

    var specialColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#a65628", "#e5d8bd"])

    var westernColorRange = d3.scaleOrdinal()
        .domain(subgroups)
        .range(["#f781bf", "#fddaec"])






    var checkbox = document.querySelector("input[name=check-1]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            console.log("yes i'm here")
            updateBarGraph(action_content_data, actionColorRange)
            cloudy(ActionString, "Action")
        }
        
    });

    checkbox = document.querySelector("input[name=check-2]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(animation_content_data, animationColorRange)
            cloudy(AnimationString, "Animation")
        }
    });

    checkbox = document.querySelector("input[name=check-3]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(anime_content_data, animeColorRange)
            cloudy(AnimeString, "Anime")
        }
    });

    checkbox = document.querySelector("input[name=check-4]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(art_content_data, artColorRange)
            cloudy(ArtString, "Art")
        }
    });

    checkbox = document.querySelector("input[name=check-5]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(classics_content_data, classicsColorRange)
            cloudy(ClassicsString, "Classics")
        }
    });

    checkbox = document.querySelector("input[name=check-6]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(comedy_content_data, comedyColorRange)
            cloudy(ComedyString, "Comedy")
        }
    });

    checkbox = document.querySelector("input[name=check-7]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(cult_content_data, cultColorRange)
            cloudy(CultString, "Cult")
        }
    });

    checkbox = document.querySelector("input[name=check-8]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(drama_content_data, dramaColorRange)
            cloudy(DramaString, "Drama")
        }
    });

    checkbox = document.querySelector("input[name=check-9]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(faith_content_data, faithColorRange)
            cloudy(FaithString, "Faith")
        }
    });

    var checkbox = document.querySelector("input[name=check-10]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(horror_content_data, horrorColorRange)
            cloudy(HorrorString, "Horror")
        }
    });

    var checkbox = document.querySelector("input[name=check-11]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(kids_content_data, kidsColorRange)
            cloudy(KidsString, "Kids")
        }
    });

    var checkbox = document.querySelector("input[name=check-12]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(musical_content_data, musicalColorRange)
            cloudy(MusicalString, "Musical")
        }
    });

    var checkbox = document.querySelector("input[name=check-13]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(mystery_content_data, mysteryColorRange)
            cloudy(MysteryString, "Mystery")
        }
    });

    var checkbox = document.querySelector("input[name=check-14]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(romance_content_data, romanceColorRange)
            cloudy(RomanceString, "Romance")
        }
    });

    var checkbox = document.querySelector("input[name=check-15]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(science_content_data, scienceColorRange)
            cloudy(RomanceString, "Science")
        }
    });

    var checkbox = document.querySelector("input[name=check-16]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(special_content_data, specialColorRange)
            cloudy(RomanceString, "Special")
        }
    });

    var checkbox = document.querySelector("input[name=check-17]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBarGraph(western_content_data, westernColorRange)
            cloudy(RomanceString, "Western")
        }
    });



    changeGraph();


})