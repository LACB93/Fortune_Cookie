// 1. Cargando el driver de Mongodb que
// me permitira conectarme a la base de datos
var mongo = require("mongodb");
// 2. cargo al cliente de driver
var mongoClient = mongo.MongoClient;

module.exports = {
    "getFortune": function (cb) {
        // Conectando al cliente en la base de datos fortune
        var connectionString = "mongodb://LACB:Luisangelcruz93@ds028679.mlab.com:28679/fortune";
        mongoClient.connect(connectionString,
            function (err, db) {
                if (err) {
                    console.log("> ERROR al conectarse a" +
                        "la base de datos:"+
                         connectionString);
                    var fortunePaper = {
                        "message":
                        "La honestidad es un regalo caro no lo esperes de gente barata"
                    };
                    // Convirtiendo el fortunePaper de objecto a su version de string
 
                    var fortunePaperResponse = JSON.stringify(fortunePaper);
                    //Ejecuto el callback (cb) pasandole
                    //como parametro el fortunepaper stringify
                    cb(fortunePaperResponse);
                }else{
                    // Obtengo la colección con las que quiero trabajar
                    var papersCollection = db.collection("papers");

                    // Consulto todos los documentos de mi colección 
                    var objetoResultado = papersCollection.find({});

                    // Parseo el objeto resultado en un arreglo
                    objetoResultado.toArray(function (err, papers) {
                        var randomIndex = 
                        getRandomArbitrary(0, papers.length);
                        console.log("> RandomIndex calculated: "+ randomIndex);
                        var fortunePaperResponse = JSON.stringify(papers[randomIndex]);
                        // Cerrar la conexión entre el cliente
                        // y la base de datos 
                        db.close()
                        // Invoco al cb pasandole como parametro
                        // la respuesta
                        cb(fortunePaperResponse);
                    });
                }
            });

    }
};

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
