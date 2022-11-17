d3.csv("rotten_tomatoes_movies.csv").then(
    function(dataset){
        
        console.log(dataset)

        var dimensions = {
            width: 1500,
            height: 700,
            margin:{
                top: 10,
                bottom: 120,
                right: 10,
                left: 50
            }
        }
    var svg = d3.select("#RottenTomatoes")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

            
    // create array of ratings per genre
    var aAndaArray = dataset.filter(function(d){ return d.genres.includes("Action & Adventure") })
    var animation = dataset.filter(function(d){ return d.genres.includes("Animation") })
    var aAndM = dataset.filter(function(d){ return d.genres.includes("Anime & Manga") })
    var aHAndI = dataset.filter(function(d){ return d.genres.includes("Art House & International") })
    var classics = dataset.filter(function(d){ return d.genres.includes("Classics") })
    var comedy = dataset.filter(function(d){ return d.genres.includes("Comedy") })
    var cultMovies = dataset.filter(function(d){ return d.genres.includes("Cult Movies") })
    var drama = dataset.filter(function(d){ return d.genres.includes("Drama") })
    var fAndR = dataset.filter(function(d){ return d.genres.includes("Faith & Spirituality") })
    var horror = dataset.filter(function(d){ return d.genres.includes("Horror") })
    var kAndF = dataset.filter(function(d){ return d.genres.includes("Kids & Family") })
    var mAndPA = dataset.filter(function(d){ return d.genres.includes("Musical & Performing Arts") })
    var mAndS = dataset.filter(function(d){ return d.genres.includes("Mystery & Suspense") })
    var romance = dataset.filter(function(d){ return d.genres.includes("Romance") })
    var sfAndF = dataset.filter(function(d){ return d.genres.includes("Science Fiction & Fantasy") })
    var special = dataset.filter(function(d){ return d.genres.includes("Special Interest") })
    var western = dataset.filter(function(d){ return d.genres.includes("Western") })

    sortedData = [aAndaArray, animation, aAndM, aHAndI, classics, comedy, cultMovies, drama, fAndR, horror, kAndF, mAndPA, mAndS, romance, sfAndF, special, western]


    console.log(sortedData)
        // var based on drop down type
        //var selected = d3.select('input[type="type"]:checked').property("value");
    var avgGenres = []

    //tomatometer_rating = 14
    var keyRating = dataset.columns[14]
    
    console.log(sortedData[0][0][keyRating])

    sortedData.forEach(genre => {
        var ratings = []
        genre.forEach(movie => {
            ratings.push(movie[keyRating])
        });
        var sumAvgGenre = d3.mean(ratings)
        console.log("sum avg: " + sumAvgGenre)
        avgGenres.push(sumAvgGenre)

    });

    newdata = [
        {genre: 'Action & Adventure', ranking: avgGenres[0]},
        {genre: 'Animation', ranking: avgGenres[1]},
        {genre: 'Anime & Manga', ranking: avgGenres[2]},
        {genre: 'Art House & International', ranking: avgGenres[3]},
        {genre: 'Classics', ranking: avgGenres[4]},
        {genre: 'Comedy', ranking: avgGenres[5]},
        {genre: 'Cult Movies', ranking: avgGenres[6]},
        {genre: 'Drama', ranking: avgGenres[7]},
        {genre: 'Faith & Spirituality', ranking: avgGenres[8]},
        {genre: 'Horror', ranking: avgGenres[9]},
        {genre: 'Kids & Family', ranking: avgGenres[10]},
        {genre: 'Musical & Performing Arts', ranking: avgGenres[11]},
        {genre: 'Mystery & Suspense', ranking: avgGenres[12]},
        {genre: 'Romance', ranking: avgGenres[13]},
        {genre: 'Science Fiction & Fantasy', ranking: avgGenres[14]},
        {genre: 'Special Interest', ranking: avgGenres[15]},
        {genre: 'Western', ranking: avgGenres[16]},
        // {genre: ['Action & adventure','Animation','Anime & Manga', 'Art House & International', 'Classics', 'Comedy', 'Cult Movies', 'Drama', 'Faith & Spirituality', 'Horror', 'Kids & Family', 'Musical &  Performing Arts', 'Mystery & Suspense', 'Romance', 'Science Fiction & Fantasy', 'Special Interest', 'Western']},
        // {ranking: [avgGenres[0], avgGenres[1], avgGenres[2], avgGenres[3], avgGenres[4], avgGenres[5], avgGenres[6], avgGenres[7], avgGenres[8], avgGenres[9], avgGenres[10], avgGenres[11], avgGenres[12], avgGenres[13], avgGenres[14], avgGenres[15], avgGenres[16]]}
    ]

    console.log(newdata)


        var xScale = d3.scalePoint()
            .domain(d3.map(newdata, d => d.genre)) // label by year
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
            .padding([0.3])

        var yScale = d3.scaleLinear()
            .domain([0, 100]) // score is normally on a scale of 0-100
            .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        var xAxisGen = d3.axisBottom(xScale)
            .scale(xScale)

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
        .text("Rotten Tomatoes Score vs. Genre" /*+ some dynamic for X-axis val*/)


    var dots = svg.append("g")
                    .selectAll("circle")
                    .data(newdata)
                    .enter()
                    .append("circle")
                    .attr("cx", d => xScale(d.genre))
                    .attr("cy", d => yScale(+d.ranking))
                    .attr("r", 3)
                    .attr("fill", "black")
    })
