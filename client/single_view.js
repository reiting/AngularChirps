$(document).ready(function () {
        var id = window.location.pathname.split('/')[2];
        console.log(id);
        $.get("http://localhost:3000/api/chirps/" + id, function (data) {
                console.log(data);
                console.log(data);
                var newDiv = $("<div class='results'></div>");
                var h3 = $("<h3>" + data.UserName + "</h3>");
                var h4 = $("<h4>" + data.message + "</h4>");
                newDiv.append(h3);
                newDiv.append(h4);
                $('#chirpContainer').append(newDiv);
        })
        //delete button function stuff
        $('#delbtn').click(function () {
                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                        deleteChirp(id);
                        window.location.replace("http://localhost:3000/chirps");
                }
        });
        //takes to page to update message of chirp
        $('#editbtn').click(function (){
                 var update = window.location.pathname + '/update/';
                $('#edit').attr('href', update);
        })

        function deleteChirp(id) {
                $.ajax({
                        method: 'DELETE',
                        url: 'http://localhost:3000/api/chirps/' + id
                }).then(function (success) {
                        console.log(success);
                })
        }
});
