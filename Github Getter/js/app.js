// note: not using legacy seach because github api suggests using un depreciated version
var searchHistory = {};
(function () {

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
      //if the search term has already been searched for then no need for ajax call
      if (Object.keys(searchHistory).indexOf(search) != -1) {
        // running the function that shows search results
        createlist(search);
      } else {
        $.ajax({
          // Returning the top 25 repositories based on stars
          url: "https://api.github.com/search/repositories?q="+search+"&sort=stars&per_page=25",
          success: function(result){
            searchHistory[search] = result;
            // storing search history object into local storage
            sessionStorage.setItem('localCache', JSON.stringify(searchHistory));
            // running the function that shows search results
            createlist(search);
          },
          error: function(result){
            $("#div1").html('does not exist');
          }
        });
     }
    }

    // function for creating the list of search returns
    function createlist(searchTerm) {
      var searchResults = searchHistory[searchTerm].items;

      $('#results').empty();
      // if the search term doesnt return any results
      if (searchResults.length === 0) {
          $('#results').append("<li> does not match any repositories </li>");
      } else {
        for (var i = 0; i < searchResults.length; i ++) {

          $('#results').append(
            "<li class='result'><div class='primary-result'> Name:"+searchResults[i].name+" Owner:"+searchResults[i].owner.login+" </div>"
              +"<div class='description'> <div>"
                +"<h2> Repository Name:"+searchResults[i].name+"</h2>" 
                +"<h2> Repository Owner:"+searchResults[i].owner.login+"</h2>" 
                +"<a href='"+searchResults[i].html_url+"' target='_blank'>Link to Repository</a>"
                +"<h3> Language: "+searchResults[i].language+"</h3>"
                +"<h3> Follower count: "+searchResults[i].watchers+"</h3>"
                +"<p> <strong> Description </strong> <br>"+searchResults[i].description+"</p> </div> </div> </li>"
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
        console.log(clicked)
      } else {
        $('.description').css('left','-2000px');
        clicked = true;
        console.log(clicked)
      }
    }); 

    $('#submit-overlay').click(function(){
      $('#overlay-container').css({
        'display':'none',
      })
    })


  });
})();