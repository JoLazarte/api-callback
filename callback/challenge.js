let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//Llamamos a la dependencia para hacer instancias de callbacks a una api desde JS

let api = 'https://rickandmortyapi.com/api/character/'; //direccion URL de esa api

//DECLARO la función que recibirá la api y establezco el tipo de callback que 
//se ejecutará cuando reciba la respuesta
function fetchData(url_api, myCallback) {

    //Hago una referencia al objeto-dependencia de arriba para iniciar la conección
    let xhttp = new XMLHttpRequest();

    //Ahora vamos a usar el primer referente a el, abriendo un llamado (conección) a una url con .open()
    //el cual nos pide pasar el tipo de petición (la ruta) como primer parámetro (en este caso get)
    //luego la url a la que queremos acceder, como segundo parámetro
    //con el true estoy diciendo que se maneje asincronicamente
    //es un valor por default, por lo que es opcional escribirlo
    xhttp.open('GET', url_api, true) 
   

    //Ahora tengo que "escuchar" un elemento (onreadystatechange), que va a definir lo que va a 
    //hacer esa conección (repuesta) si el cambio de estado del xml sucede:
    //si el proceso de conección se inicia, se ejecutará la siguiente función 
    xhttp.onreadystatechange = function (event) {

        //Ahora hago una validación para saber si voy a ejecutar mi callback
        //El xml tiene 5 estados (ya escribimos dos: open y onready...) empezando a contar desde el 0 (0,1,2,3,4)
        //La 4 sería el estaedo en la que es validado: la conección se completó
        if (xhttp.readyState === 4) {
        
            //readyState es el estado en el que se encuentra
            //Ahora necesito validar el status en el que se encuentra:
            //200: todo bien, 500: hay errores, 400: no se encontró algo
            if (xhttp.status === 200) {

                //Ahora puedo leer mi callback
                //Dentro de node hay un estandar que permite establecer que 
                //el primer valor que le vamos a pasar al callback es el error
                //el segundo es el resultado que se desencadena, en este caso, 
                //el resultado de la llamada a la api
                //ese resultado vendrá en texto (string), por lo que debo parsearlo 
                //a JSON (pasarlo a formato JSON)
                //para poder leerlo mejor

                //null porque no espero errores en esta instancia
                myCallback(null, JSON.parse(xhttp.responseText)); 
            
            } else {

                //hago referencia al posible error y le agrego un texto
                const error = new Error('Error'  + url_api); 

                //en esta instancia espero un error y por ende no espero una respuesta
                return myCallback(error, null) 
            }
        }
    }
    //Finalmente envío el pedido/llamamiento
    xhttp.send(); 
}

//LLAMO la función CON al menos tres peticiones/callbacks:
//Como se definió arriba, el primer parametro de fetchData() siempre será una url y el segundo mi callback
//expando la función myCallback(), definida arriba, para la primera petición, 
//que recibe el error como primer parametro y la respuesta 
//positiva en forma de JSON (objeto) como segundo parámetro

// primera petición: la lista de personajes en la api
fetchData(api, (error1, data1) => {

    // si da error, terminamos el proceso y retornando el error
    if(error1) return console.error(error1);

    // Si la respuesta fue positiva, paso al segundo pedido, usando la info de la 
    //respuesta obtenida (data1)
    
    //La respuesta obtenida (guardada en data1) es un enorme objeto con otos objetos-key dentro 
    //(toda la info de todos los personajes).
    //api es la url donde esta guardado ese gran objeto --> api != data1 TRUE

    //Dentro de esde gran objeto (data1), pido la key-array results, tal cual esta nombrada,
    //Dentro de esa key-array, me dirijo a su primer indice[0], que es un objeto
    //sin nombre, y dentro de ese objeto, pido el VALOR de la key id
    //Este VALOR es un string que usaré para reasignar el primer parametro (una url) 
    //de fetchData()
    
    // segunda petición: el id de Rick
    //expando la función myCallback(), definida arriba, para esta segunda peticion
    fetchData(api + data1.results[0].id, (error2, data2) => {

      // si da error, terminamos el proceso y retornando el error
      if(error2) return console.error(error2);

      //Si la respuesta fue positiva, paso a la tercera petición usando la respuesta obtenida (data2)
      //Nuevamente, la respuesta de este segundo callback (data2), guardada en el segundo parametro de myCallback()
      //es un objeto en formato JSON. 
      //data2 es un objeto con la info del personaje que se identifica con el id 1.
      //la info de dat2 esta guardada en la url api + data1.results[0].id
      //dat2 != api + data1.results[0].id TRUE
      
      //tercera petición: la dimension del personaje
      //Dentro del objeto data2 (donde esta toda la info del personaje de id 1),
      //ya no busco el valor de la key id, sino que ahora busco me meto dentro del key-objeto origin
      //y alli busco el VALOR de la key url
      //Con este VALOR reasigno la url-parametro de fetcData() nuevamente
      
    //expando la función myCallback(), definida arriba, para esta tercera peticion
    //guardo en data3 el objeto JSDON que se halla en la url data2.origin.url
      fetchData(data2.origin.url, (error3, data3) => {

            // si da error, terminamos el proceso y retornando el error
            if(error3) return console.error(error3);
            
            //mostramos los resultados :) 
            console.log(data1.info.count); 
            console.log(data2.name); 
            console.log(data3.dimension);
            
            //rutas de las peticiones en orden
            console.log(api); //https://rickandmortyapi.com/api/character/
            //console.log(data1);//objeto guardado en la url api
            
            console.log(api + data1.results[0].id); //https://rickandmortyapi.com/api/character/1
            //console.log(data2); //objeto guardado en la url api + data1.results[0].id
            
            console.log(data2.origin.url); //https://rickandmortyapi.com/api/location/1
            //console.log(data3); //objeto guardado en la url data2.origin.url
            
           
           
            
      
      });
    });
  });