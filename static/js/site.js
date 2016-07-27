function getFortuneFromServer() {
    // Realizando la solicitud get en AJAX
    $.get("/getfortune","", function (data, status) {
        console.log("> " + typeof (data));
        console.log("> Estatus de respuesta: " + status);
        swal({
            title:"¡TU FORTUNA",
            text: data.message,
            imageUrl: "img/buenasuerte.jpg"
        });
    },"json");
    //alert("¡Esta es tu fortuna!");  
}

$(document).ready(function (){
    $('.parallax').parallax();
    console.log("> Parallax Initialized...");
});