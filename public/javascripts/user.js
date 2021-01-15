$("document").ready(function(){
    let id = window.location.pathname;
    id = id.replace("/user/","");
    $("#blockBtn").click(function(){
        $.ajax({
            url: "/user/block/" + id,
            type: "POST",
            data: "",
            success: function(data) {
                if(data.respond) {
                    $("#blockBtn").html("Unblock");
                    $("#blocked").html("true");
                } else {
                    $("#blockBtn").html("Block");
                    $("#blocked").html("false");
                }
            }
        })
    })
})