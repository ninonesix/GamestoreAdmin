$("document").ready(function()
{
	$(".search").submit(function(e){
		let value = $(".searchTerm").val();
		console.log(value);
		e.preventDefault();
		$.ajax({
            type: 'get',
			data: $('.searchTerm').serialize(),
            success: function() {
				window.location = '/search?keyword=' + value;
			 }});
	})
})
