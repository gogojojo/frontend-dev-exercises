var searchHistory = {};

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
      var searchResults = searchHistory[searchTerm].items;
      // clear out all list items in ul
      $('#results').empty();
          // if the search term doesnt return any results
      if (searchResults.length === 0) {
        $('#results').append("<li> does not match any repositories </li>");
      } else {
        for (var i = 0; i < searchResults.length; i ++) {
          $('#results').append(
            "<li class='result'> <h1> Name:"+searchResults[i].name+" Owner:"+searchResults[i].owner.login+"</h1>"
            +"<h2>"+searchResults[i].description+" "+searchResults[i].url+"</h2> </li>"
          );
        }
      }

    } else {
      $.ajax({
        // note: not using legacy seach because github api suggests using un depreciated version
        // Returning the top 25 repositories based on stars
        url: "https://api.github.com/search/repositories?q="+searchTerm+"&sort=stars&per_page=25",
        success: function(result){
          searchHistory[searchTerm] = result;
          // storing search history object into local storage
          localStorage.setItem('localCache', JSON.stringify(searchHistory));
          var searchResults = searchHistory[searchTerm].items;
          // clear out all list items in ul
          $('#results').empty();
          // if the search term doesnt return any results
          if (searchResults.length === 0) {
            $('#results').append("<li> does not match any repositories </li>");
          } else {
            for (var i = 0; i < searchResults.length; i ++) {
              $('#results').append(
                "<li class='result'> <h1> Name:"+searchResults[i].name+" Owner:"+searchResults[i].owner.login+"</h1>"
                +"<h2>"+searchResults[i].description+" "+searchResults[i].url+"</h2> </li>"
              );
            }
          }
        },
        error: function(result){
          $("#div1").html('does not exist');
        }
      });
   }
  });

  // making sure click functions are applied to appended list elements
  $(document).on('click', 'li', function(){ 
    $(this).children('h2').css('display','block');
  }); 

});