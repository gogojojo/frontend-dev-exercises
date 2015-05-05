// note: not using legacy seach because github api suggests using un depreciated version

(function () {
  var searchHistory = {};

  $(function(){

    // do not retreive data if this is your first search 
    // session storage is used for caching
    if (sessionStorage.getItem('sessionCache') !== null ) {
      searchHistory = sessionStorage.getItem('sessionCache');
      searchHistory = JSON.parse(searchHistory);
    }
    // search inputs for both the overlay and the standard
    $('#submit-overlay').click(function(){
      var searchTerm = $('#search-overlay').val();
      searchGithub(searchTerm);
    });
    $('#submit').click(function(){
      var searchTerm = $('#search').val();
      searchGithub(searchTerm);
    });

    // function for searching github
    function searchGithub(search) {
      // empty out dom elements
      $("#error").empty();
      $('#results').empty();
      //if the search term has already been searched for then no need for ajax call
      if (Object.keys(searchHistory).indexOf(search) != -1) {
        // running the function that shows search results
        createlist(search);
      } else {
        $.ajax({
          // Returning the top 30 repositories based on stars
          url: "https://api.github.com/search/repositories?q="+search+"&sort=stars&per_page=30",
          success: function(result){
            searchHistory[search] = result;
            // storing search history object into local storage
            sessionStorage.setItem('localCache', JSON.stringify(searchHistory));
            // running the function that shows search results
            createlist(search);
          },
          error: function(result){
            $("#error").html('invalid search, try again');
          }
        });
     }
    }

    // function for creating the list of search returns
    function createlist(searchTerm) {
      var searchResults = searchHistory[searchTerm].items;

      // if the search term doesnt return any results
      if (searchResults.length === 0) {
          $("#error").html('no repositories found');
      } else {
        for (var i = 0; i < searchResults.length; i ++) {

          $('#results').append(
            "<li class='result'><div class='primary-result'><strong> Repo:</strong> "+searchResults[i].name+"  <strong>Owner:</strong> "+searchResults[i].owner.login+" </div>"
              +"<div class='description'> <div class='description-container'>"
                +"<h2> Repo Name: "+searchResults[i].name+"</h2>" 
                +"<h2> Repo Owner: "+searchResults[i].owner.login+"</h2>" 
                +"<a href='"+searchResults[i].html_url+"' target='_blank'>Link to Repository</a>"
                +"<h3> Language: "+searchResults[i].language+"</h3>"
                +"<h3> Follower count: "+searchResults[i].watchers+"</h3>"
                +"<p> <strong> Description </strong> <br>"+searchResults[i].description+"</p> <div id='close'> X </div> </div> </div> </li>"
          );

        }

      }

    };
    // jQUERY CSS CHANGES

    // making sure click actions are applied to appended list elements
    var clicked = true
    $(document).on('click', 'li', function(){ 
      if (clicked === true) {
        $(this).children('.description').css({
          'left':'0'
          });
        clicked = false;
      } else {
        $('.description').css('left','-2000px');
        clicked = true;
      }
    }); 

    $('#submit-overlay').click(function(){
      $('#overlay-container').css({
        'display':'none',
      })
    })


  });
})();