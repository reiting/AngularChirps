var users = [];


$(document).ready(function () {

    $.get("http://localhost:3000/api/users", function (data) {
        for (var i = 0; i < data.length; i++) {
            var opt = $("<option value='" + data[i].UserID + "'>" + data[i].Name + "</option>");
            $("#user-selector").append(opt);
            users.push(data[i].Name);
        }

        $.get("http://localhost:3000/api/chirps", function (data) {
            //ITERATE THROUGH EACH OF THE CHIRPS WE GOT AND PUT THEM IN OUR HTML
            for (var i = 0; i < data.length; i++) {
                createDiv(data[i], data[i].id);
            }
        });
    });

    //disable button on page load
    $('button').prop('disabled', true);
    //when input field has text in it, enable the button
    $("#createChirp").keypress(function () {
        $('button').prop('disabled', false);
    });

    //on  button click, empty the input field and disable the button
    $("#btn").click(function () {
        postData();
        $('#createChirp').val('');
        $('button').prop('disabled', true);
    })

    function createDiv(chirp) {
        var chirpLOC = window.location.pathname + "/" + chirp.id;
        console.log(chirpLOC);
        var a = $("<a href ='" + chirpLOC +"'><h3>" + users[chirp.UserID - 5] + "</h3></a>");
        var div = $("<div class='results'></div>");
        div.attr('id', chirp.id);
        // var h3 = $("<h3>" +  + "</h3>");
        var h4 = $('<h4 id="message">' + chirp.message + "</h4>");
        div.append(h4);
        div.append(a);
        $("#posts").append(div);
    }
    
    function postData() {
        var newChirp = {
            message: $('#createChirp').val(),
            UserID: $("#user-selector").val()
        }
        $.ajax({
            method: "POST",
            url: 'http://localhost:3000/api/chirps',
            contentType: 'application/json',
            data: JSON.stringify(newChirp)
        })
            .then(function (success) {
                console.log("APPENDING");
                createDiv(newChirp);
            })
            .fail(function (xhr, status, error) {
                console.log('failing');
                console.log(xhr);
                console.log(status);
                console.log(error);
            });
    }
});

