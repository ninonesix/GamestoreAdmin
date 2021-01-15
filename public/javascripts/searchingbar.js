$("document").ready(function()
{
	$(".search").submit(function(e){
		let value = $(".searchTerm").val();
		e.preventDefault();
		window.location = '/search?keyword=' + value;
	})
})
