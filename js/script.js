$(document).ready(function() {
   $(document).on("pageshow", "[data-role='page']", function() {
   	  if ($($(this)).hasClass("header_default")) {
   	  	$('<header data-theme="b" data-role="header"><h1></h1><a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-notext ui-icon-back" data-rel="back">Back</a><a href="#" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-notext ui-icon-info">Info</a></header>')
   	  	  .prependTo( $(this) )
   	  	  .toolbar({ position: "fixed" });
   	  	$("[data-role='header'] h1").text($(this).jqmData("title"));
   	  } //if header_default
   	  $.mobile.resetActivePageHeight();

   	  if ($($(this)).hasClass("footer_default")) {
   	  	$('<footer data-theme="b" data-role="footer" data-position="fixed"><nav data-role="navbar"><ul><li><a href="#home" class="ui-btn ui-icon-home ui-btn-icon-top">Home</a></li><li><a href="#blog" class="ui-btn ui-icon-edit ui-btn-icon-top">Blog</a></li><li><a href="#videos" class="ui-btn ui-icon-video ui-btn-icon-top">Videos</a></li><li><a href="#photos" class="ui-btn ui-icon-camera ui-btn-icon-top">Photos</a></li><li><a href="#tweets" class="ui-btn ui-icon-comment ui-btn-icon-top">Tweets</a></li></ul></nav></footer>')
   	  	  .appendTo($(this))
   	  	  .toolbar({position: "fixed"});
   	  } //if footer_default

   	  var current = $(".ui-page-active").attr('id');

   	  $("[data-role='footer'] a.ui-btn-active").removeClass("ui-btn-active");
   	  $("[data-role='footer'] a").each(function() {
   	  	if ($(this).attr('href') === '#' + current) {
   	  	  $(this).addClass("ui-btn-active");
   	    }
   	  });

   }); //show_page
});//document.ready


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