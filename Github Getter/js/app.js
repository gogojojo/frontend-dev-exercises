/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/
var searchHistory = {}
var blah

$(function(){
  $('#searchsub').click(function(){
    searchTerm = $('#search').val();
    // if the search term has already been searched for
    if (Object.keys(searchHistory).indexOf(searchTerm) != -1) {
      console.log('searched already')

    } else {
      $.ajax({
        url: "https://api.github.com/legacy/repos/search/"+searchTerm, 
        success: function(result){
          searchHistory[searchTerm] = result
          var searchResults = searchHistory[searchTerm].repositories
          // clear out all list items in ul
          $('#results').empty();
          // if the search term doesnt return any results
          if (searchResults.length === 0) {
            $('#results').append("<li> does not match any repositories </li>")
          } else {
            for (var i = 0; i < searchResults.length; i ++) {
              $('#results').append(
                "<li class='result'> <h1> Name:"+searchResults[i].name+" Owner:"+searchResults[i].owner+"</h1>"
                +"<h2>"+searchResults[i].description+" "+searchResults[i].url+"</h2> </li>"
                )
            }
          }
        },
        error: function(result){
          $("#div1").html('does not exist')
        }
      });
   }
  })
  // making sure click elements are applied to appended elements

  $(document).on('click', 'li', function(){ 
    $(this).children('h2').css('display','block')
  }); 

});