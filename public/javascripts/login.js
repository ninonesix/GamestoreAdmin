$('document').ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/login",
            type: "POST",
            data: $("#loginForm").serialize(),
            success: function (data) {
                if(data.respond) {
                    window.location.href = "/";
                } else {
                    $("#loginError").addClass("loginFailed").html("Incorrect username or password. Please try again.");
                }
            }
        })
    })
})