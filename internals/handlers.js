// Manejadores de rutas virtuales
var fortune = require("./fortune");

var fechaDeNacimiento = new Date(1993, 10, 23, 1, 45);
module.exports = {
    "/edad/luis-cruz": function (req, res) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        // Calculo la edad
        var hoy = new Date();
        var age =
            Math.ceil((hoy - fechaDeNacimiento) / (1000 * 3600 * 24 * 365))
        // Armando el json
        var objetoRespuesta = {
            "edad": age
        };
        var jsonResponse =
            JSON.stringify(objetoRespuesta);
        // Envio la respuesta al cliente
        res.end(jsonResponse);

    },
    "/getfortune": function(req, res) {
        console.log("> Se solicita fortuna...");
        // // Se obtiene el mensaje de la suerte
        // var fortunePaper = {
        //     "mensaje" : 
        //     "La honestidad es un regalo caro, no lo esperes de gente barata"
        // };
        // // Parseando a string el objetoRespuesta
        // // de respuesta
        // var jsonResponse = JSON.stringify(fortunePaper);
        fortune.getFortune(function (fortunePaper) {
            // Se configura el encabezado de respuesta
            // HTTP
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            console.log("Contestando: " + fortunePaper);
            // Respondemos el Objeto
            res.end(fortunePaper);
        });
    }
};
