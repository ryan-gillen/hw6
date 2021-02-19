// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

let db = firebase.firestore()
window.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Construct a URL to get movies playing now from TMDB, fetch
  // data and put the Array of movie Objects in a variable called
  // movies. Write the contents of this array to the JavaScript
  // console to ensure you've got good data
  // ⬇️ ⬇️ ⬇️
  event.preventDefault()
  let apiKey = '8e590f3ea8624335f5cebe334fb0ef49' // <<<< fill in with your api key from step 1 (or the api key we provided)
  let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
  let json = await response.json()
  //console.log(json) 
  let movies = json.results
  //console.log(movies)



  // ⬆️ ⬆️ ⬆️ 
  // End Step 1
  
  // Step 2: 
  // - Loop through the Array called movies and insert HTML
  //   into the existing DOM element with the class name .movies
  // - Include a "watched" button to click for each movie
  // - Give each "movie" a unique class name based on its numeric
  //   ID field.
  // Some HTML that would look pretty good... replace with real values :)
  // <div class="w-1/5 p-4 movie-abcdefg1234567">
  //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
  //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  // </div>
  // ⬇️ ⬇️ ⬇️

  let querySnapshot = await db.collection('movie_watchlist').get()
  let movie_watchlist = querySnapshot.docs
  //console.log(movie_watchlist)


  for (let i=0; i<movies.length; i++) {  
    
    //console.log(movies[i])
    let movieId = movies[i].id
    let movieTitle = movies[i].original_title
    // let postData = posts[i].data()
    // let postUsername = postData.username
    let movieImageUrl = movies[i].poster_path
    
    //let watched = 
      



    //let watchlistData = movie_watchlist[i].data()
    //let watchlistTrue = watchlistData.movieId_watched
    //let watchlistTrue = await db.collection('movie_watchlist').doc(${movieId}).get()
    
    let docRef = await db.collection('movie_watchlist').where('move_watchlist', '==', `${movieId}`).get()
    // console.log(docRef.movieId_watched)
    // let item = docRef.docs.movieId_watched
    // let watchListTest = item[0].data()

    let watchListTrue

    // console.log(watchListTest)
    if(docRef) {
      watchListTrue = 1

    } else {
      watchListTrue = 0
    }

    console.log(watchListTrue)



    //console.log(docRef.docs.movieId_watched) 


    // let watchlistTrue = docRef.movieId_watched
    // console.log(watchlistTrue)

    
    
    //let watchlistTrue = await db.collection('movie_watchlist').doc(`${movieId}`).where('movieId_watched', '==', '1' ).get() 

    //let watchlistTrue = docRef.





    
    if (watchListTrue == 0) {

      document.querySelector('.movies').insertAdjacentHTML('beforeend', `
      <div class="w-1/5 p-4 movie-${movieId}">
        <img src="https://image.tmdb.org/t/p/w500/${movieImageUrl}" class="w-full">
        <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
      </div>
    `)
      

    } else {


          document.querySelector(`.movie-${movieId} .watched-button`).classList.add('opacity-20')


    
    }




  // ⬆️ ⬆️ ⬆️ 
  // End Step 2

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button

  // - ***come back to this extra stuff:
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️

      document.querySelector(`.movie-${movieId} .watched-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        console.log(`${movieTitle} watch button clicked!`)

        watchlistData.add({
          movieId: true
        })
        
        // determine if the wathc button was clicked already?
        // let watchClicked = document.querySelector(`.movie-${movieId} .watched-button`).innerHTML

        document.querySelector(`.movie-${movieId} .watched-button`).classList.add('opacity-20')


    })
  


}

  

  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.



})