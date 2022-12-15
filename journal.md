
# Rotten Tomatoes Journal

## 09/25/2022
We explored using a few different data sets:

[Food prices in the US](https://www.kaggle.com/datasets/csafrit2/food-prices-in-us-cities)

Possible questions:
 - How have food deserts shifted over time?
 - How has the cost of living shifted over time?
 - Which states are the most expensive?
[Spotify top charts](https://www.kaggle.com/datasets/sveta151/spotify-top-chart-songs-2022)

Possible questions:
 - What genres perform the best over time?
 - Which artists perform the best over time? 
 - How common are one hit wonders?
[Youtube videos](https://www.kaggle.com/datasets/advaypatil/youtube-statistics)

Possible questions:
 - How well do videos with different categories perform?
 - What categories receive the most positive comments and sentiment?


## 09/26/2022
We decided to use a set of data that has statistics and attributes of [youtube videos](https://www.kaggle.com/datasets/advaypatil/youtube-statistics). This has two data sets. The first set is data relating to videos. It contains the title, publishing date, views, likes, and keywords associated with the video. The second set has information about comments on each video, linked by a video ID. This set contains sentiment analysis.

One problem we expect to run into with this data set is that it is very small(only about 4 Mb). This may affect what visualizations we are able to do, or lead to weird outliers we may have to deal with

## 9/27/2022
Because of a lot of people using Youtube datasets/visualizations, we decided to change our project’s dataset because we don’t want to create too similar a visualization, and since we had other datasets in mind that we could use

We decided to switch to a [dataset of Rotten Tomatoes](https://www.kaggle.com/datasets/stefanoleone992/rotten-tomatoes-movies-and-critic-reviews-dataset?resource=download) movie reviews

From this dataset we came up with another series of possible questions:
 - What genres perform the best?
 - How do different genres perform over time?
 - How do the audience and critics score compared to one another?
 - Does content rating have an effect on the critic's score?

These questions were all interesting and seemed to hold our attention, but we knew there would be a good bit of calculation considering the 17 thousand data points in our dataset.


## 10/05/2022
We spent a lot of time looking at our dataset and seeing where it fell short. There were certain columns where 15% of the data was not there. We had to take the time to decide whether or not to keep those data points or shrink our dataset.
Once we decided to keep all of the data and exclude missing data from calculations we looked at what type of calculations we needed. We knew that we needed to be able to find averages for genres ratings, genre ratings over time, audience review scores, and critic review scores. Luckily d3 has a mean function that ignores undefined values.
We then moved on into deciding how to structure our code. We talked through having one working script or having separate. We ended up deciding on separate script files so we could work at the same time and not interfere with one another's code.


## 10/15/2022
We started working on what our final design looked like, we ended up coming up with a model that would allow the user to toggle between different data and x - axises. We knew this meant really finalizing what types of calculations needed to be done. For the most part they weren’t too difficult at first, just code heavy. 

## 10/25/2022
We continued working on making our script files, making our main goal to have each script working independently, and then put them together later.
We ran into issues with the amount of calculations we had to do, which in some cases required the construction of a new dataset from the original.


## 11/02/2022
We decided to use several different views to display all the data we wanted to.

Our different views hold score/rating as a constant on the y axis, and change values on the x-axis based on what the user wants to view
We chose this because our data set has a lot of different attributes, but we didn’t want to use too many channels to display them. In order to keep the visualization simple, but also use all the data effectively, we decided to use different views
The views we want to include are:
 - Genre/genre combinations vs score
 - Difference in audience score and critic score
 - content rating vs score

These different views are also best displayed using different types of visualizations, which we feels adds to the appeal of the visualization
We ran into another problem with this dataset that we didn’t initially expect: movies that have multiple, sometimes up to 7, genres.
 - We wanted to take the primary or “top 2” genres, but this information was not provided in the data set, genres were listed in alphabetical order. So we decided that the movie with more than one genre would count as an additional movie for every additional genre it was in.
  - Some movies also didn’t have a genre listed. These were thrown out:
Some movies were missing a couple data points. 
 - This data was also not considered



## 11/15/2022
When trying to create a visualization for our 2nd question, we quickly realized that it would be nearly impossible to filter down the amount of movies we have to create a legible visualization. We decided to instead show 50 random movies, and allow the user to refresh.


## 11/16/2022
The popular genre script has almost been completed. After looking at a very bare dot chart we decided to add an additional attribute and interaction so that when a user rolls onto a dot it is highlighted and the size is increased based on the percentage of movies that fall into that genre category. This couldn’t have been done outright because some of the data points were less than a percent leaving dots invisible. So this had to be an interaction. Overall this was a great idea to add another element. This design does have a few negatives overall, there are significantly different data on different genres. For example, half of the movies in the dataset fall into the genre “Drama” whereas less than a percent fall into “Anime & Manga", and that can cause the genre ratings to be skewed. We could find no way to overcome this. We simply did not have equal data for all genres. We are looking into normalized scores to make this data more accurate, as we didn’t think about it beforehand. Offhand this may not work as the percentages equal 200% instead of 100% since we decided to count movies multiple times if they were in multiple genres.

Working to complete the script for content rating vs. tomatometer score, ideally we would want to present all of the movies as dots in a scatter plot to show the distribution of scores in each given content rating of a movie.



## 11/17/2022
The genre over time script was a different story from the popular genre question. Genres over time required the data points to be input in a different format so that the genre was holding the data together, but not attached to the X - axis. This will be a continued goal for the final delivery.

Creating a floating bar chart is harder than expected, since all the examples we have used so far have had data attached to the bottom of the x-axis. This made creating a chart to display the data challenging.

In relation to the content rating visualization, there have been some issues pertaining to having multiple movies in a content rating with the same score, so we are trying to find solutions to the problem.  A possible solution could be to involve collision forces in the script to have the points on the scatter plot sit next to one another, and we will try to implement that for the time being.


## 11/23/2022

I split from Group 7 and worked alone as group 23.

I immedaately started to redesign my project, as I didn't want to turn in the same thing as group 7. Espcially since I wanted them to be able to keep the work that was already done. I first decided that I wanted to display different types of information on the one screen using multiple types of graphs.

I decided that I still wanted to be able to answer the key questions that were originally discussed in the creation of this project. So I would need to show the movies over time per genre. So this was the first graph I planned out. I wanted to make a scatter plot with different colors per genre and have a brush so that it could be zoomable. I then decided I wanted to showcase the audience scorse vs the critic scores, the critic concesnus, and a bit of information on the content rating.



## 11/24/2022

I continued to buff out some ideas for the new design, this dataset had so many points of information I didn't know what as most important to show. Or what points a user would be most interested in. I decided to keep it simple and not go into too much detail on items that the average movie watcher wouldn't care about. So the previous points stood.


## 11/28/2022

I started building the scatter plot of movies over time. I was able to get the scatter plot up and running with conditional logic per genre with html checkboxes.


## 11/29/2022

I started to implement a brush to be able to zoom into the scatter plot so users could see movie data in detail. I found some reference material online, but unfortunately it was written for a previous version of d3, and does not function the same on the most recent version that I'm working with. However, the logic should be similar so I'll work more on that tomorrow.


## 12/01/2022
I continued to work on making the brush work, I was able to get the screen points per brush selection, so in theory I can get it to work, but my axes are not updating



## 12/02/2022
I continued to work on making the brush work, but was unable to get my axes to update. I decided to take a break and start working on a different part of my system. I wanted to implement something that may help describe or give the viewer some idea of how the critics felt about a genre in relation to words instead of a number. I decide to create a word cloud. I've always loved seeing them in my teachers classes growing up, and thought if they're good enough to teach students with, they're good enough to teach someone about specific data.

I had to pull the critic consensus per movie from each genre and then concatenate them. Once that was done I could find the most used words from each string and use them in the word cloud. I did have to make some changes so that the words couldn't be shorter than 5 characters. I have everything returning correctly with console log, now I just need to append the text and make the formatting look like a word cloud


## 12/03/2022

I was able to add the fromatting to the wordcloud, but right now each genre's word cloud lays on top of each other. For now I need to move on if I want to be done in time, so for now this is a "deal with later" problem.



## 12/06/2022

I circled back to look at the scatter plots brush issue. I thought instead of allowing for a brush to zoom I could have a range slider. That idea was quickly found to be a bust as I would want the viewer to be able to select their start and end time period. I'm going to backlog this again while I work on other data to put into this system.


## 12/08/2022

I started working on adding a lollipop graph to compare the average audience score vs the average critic score per genre. It took me a while to get the framing right with my html grid, but I eventually got it. I continued to use the color scheme I used with the scatter plot, however I used a lighter color of each to show the audidence score.


## 12/09/2022

I was able to add a tooltip to the lollipop graph so that a user could hover over each circle and see was the exact average was. This wasn't too hard to implement, there was a lot of reference material around this.



## 12/11/2022

I started working on another graph to add information to the system. Next I wanted to show the viewer how the content ratings tend to score per genre as well. I took the average per genre of each content rating and created a bar graph that would dynamically change per genre checkbox selected. I couldn't get the bar chart to change with an animation but was able to delete and add the elements based on event listeners.


## 12/12/2022

I decided to take the same logic I used with the bar chart of deleteing and adding elements to the word cloud so that they didn't continue to overlay with each other. This makes it easier to read. I didn't like that the bottom half of the system was solely genre specific information, as I wanted viewers to compare at a glance, but with it being so close to the due date I decided to continue with what I had.

## 12/13/2022

I took one last shot at trying to get the brush action to work on the scatter plot. It didn't work. At this point I decided to call it a "wont fix" and removed the brush code from the script.js file. And decided that later I would implement a tooltip to show the movie name and the year it was released.


## 12/14/2022

I implemented a tooltip for the barchart to show the exact score of each bar and a tooltip to the scatter plot to show the name of a movie and the year it was released. In a perfect world I could get this to zoom so the year and score information would be easily visible, but the world is not perfect. Then I decided that I needed to add titles, and axis titles as well so it was clear what each graph displayed.


## 12/15/2022

It's the day the project is due and it's not exactly what I wanted but it's all I could do with the time I had.
If I had time I would love to implement more functionality so that the bar graph and word cloud would change dynamically. I would want the user to be able to see all of that information at once. I would want the word cloud to show a percentage of top words from the critics concensus of each genre selected instead of just one at a time. I would like to implement the bar graph in a way that it would how two to three genres in one graph instead of just one so that the user is easily able to compare the information. Finally, I would love to take some time to get the brushing functionality to work on the scatter plot. This is the largest miss in this project, but without putting this on the back burner the lollipop graph and the bar graph wouldn't have been completed.

Overall this was a great learning experience. If I were to take another go at it, I would use a data base that had less individual rows, so that I could so more detailed inforamtion on those fewer points, instead of only being able to show a few pieces of information on a bunch of points. 