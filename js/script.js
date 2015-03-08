function listPosts(data) {
	var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';

	output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';

	$.each(data.posts, function(key, val){

	  var tempDiv = document.createElement("tempDiv");
	  tempDiv.innerHTML = val.excerpt;
	  $("a", tempDiv).remove();
	  var excerpt = tempDiv.innerHTML;

	  output += '<li>';
	  output += '<a href="#blogpost" onclick = "showPost(' + val.id + ')">';
	  output += (val.thumbnail) ?
	    '<img src="' + val.thumbnail + '" alt="' + val.title + '">':
	    '<img src="images/viewsourcelogo.png" alt="View Source Logo">';
	  output += '<h3>' + val.title + "</h3";
	  output += '<p>' + excerpt + "</p";
	  output += '</a>';
      output += '</li>';
	}); //go through each post
	output += "</ul>"
	$('#postlist').html(output);
} // listPosts

function showPost (id) {
	$.getJSON('http://iviewsource.com/?json=get_post&post_id=' + id + '&callback=?', function(data) {
		var output = '<h3>' + data.post.title + '</h3>';
		output += data.post.content;
		$('#mypost').html(output);
	});
}