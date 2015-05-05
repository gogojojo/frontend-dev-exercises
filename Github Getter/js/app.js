// note: not using legacy seach because github api suggests using un depreciated version
var searchHistory = {};
(function () {


  $(function(){
    // do not retreive data if this is your first search 
    // local storage is used for caching
    if (localStorage.getItem('localCache') !== null ) {
      searchHistory = localStorage.getItem('localCache');
      searchHistory = JSON.parse(searchHistory);
    }
    $('#searchsub').click(function(){
      var searchTerm = $('#search').val();
      //if the search term has already been searched for then no need for ajax call
      if (Object.keys(searchHistory).indexOf(searchTerm) != -1) {
        // running the function that shows search results
        createlist(searchTerm);
      } else {
        $.ajax({
          // Returning the top 25 repositories based on stars
          url: "https://api.github.com/search/repositories?q="+searchTerm+"&sort=stars&per_page=25",
          success: function(result){
            searchHistory[searchTerm] = result;
            // storing search history object into local storage
            localStorage.setItem('localCache', JSON.stringify(searchHistory));
            // running the function that shows search results
            createlist(searchTerm);
          },
          error: function(result){
            $("#div1").html('does not exist');
          }
        });
     }
    });

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


  });
})();