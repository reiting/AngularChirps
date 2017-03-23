$(document).ready(function () {
    var locID = window.location.pathname.split('/')[2];
    $.get("http://localhost:3000/api/chirps/" + locID, function (data) {
        $("#usr").text("User: " + data.UserName);
        $("#msg").val(data.message);
    });

    $("#updatebtn").click(function (){
        updateChirp(locID);
        window.location.replace("http://localhost:3000/chirps/" + locID);
    });

    function updateChirp(locID) {
        var updatedChirp = {
         message: $("#msg").val(),
         userID: locID
        }
        $.ajax({
            method: "PUT",
            url: "http://localhost:3000/api/chirps/" + locID,
            contentType: 'application/json',
            data: JSON.stringify(updatedChirp)
        }).then (function (success) {
            console.log(success);
            
        })
    }
});