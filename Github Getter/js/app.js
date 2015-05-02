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
$(function(){
  var list = ['one','two','three','four']
  $('#searchsub').click(function(){
    var blah = $('#search').val();
    console.log(blah)
     $.ajax({
      url: "https://api.github.com/repos/gogojojo/"+blah, 
      success: function(result){
        for (var i = 0; i < list.length; i ++) {
          $("#results").append("<li>"+list[i]+"</li>");
        }
        console.log(result.owner.login)
      },
      error: function(result){
        $("#div1").html('does not exist')
      }
    });
  })
})