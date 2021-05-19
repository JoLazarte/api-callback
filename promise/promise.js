/*
 Aqui la promesa se ejecuta al cargar el archivo

const somethingWillHapped = new Promise( (resolve, reject) => {
    if (true) {
        console.log('Hey dude!');
        resolve('Hey!');
    } else {
        reject('Whoops!');
    }
});


 Aqui la promesa no se ejecuta hasta que se llame a la funcion
*/
const somethingWillHappen = () => {
    return new Promise( (resolve, reject) => {
        if (true) {
            //console.log('Hey dude!'); //No hace falta porque el console.log()
            //se lo aplico cuando llame a la funcion somethingWillHapped()
            //y expanda la función resolve() reasignandola como then()
            resolve('Hey!');
        } else {
            reject('Whoops!');
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err));
/*
const somethingWillHappen2 = () => {
        // retuornamos la promesa
        return new Promise((resolve, reject) => {
            // Si es verdadero, devolvemos True en 2 segundos
            if(true) {
                setTimeout(() => {
                    resolve('True 3 second later')
                }, 3000)
            } 
            // Si no entonces devolvemos el error
            // De esta forma "new Error" podemos debbugear mejor
            else {
                const error = new Error('Whoppps!')
                // Error que nos permite ver en consola más detalles del error
                reject(error)
            }
        })
};
*/

const error = new Error('Woops!!'); 
// Error que nos permite ver en consola más detalles del error
//Y en este caso, que utilizo el operador ternario, lo defino antes.

const somethingWillHappen2 = () => new Promise((resolve, reject) => true ? setTimeout(() => resolve('True después de 4 segundos'), 4000) : reject(error)
);
/*
//ejecutamos la Funcion 2
somethingWillHappen2()
        //Si obtenemos un resolve
    .then(response => console.log(response))
    .then(()=> console.log('Soy la segunda promesa resuelta, en una cadena de promesas'))

        //si obtenemos un reject
    .catch(err => console.error(err));

*/
// Para correr todas las promesas tenemos el método Promise.all() que nos 
//retornara un array con la respuesta de todas las promesas que pasemos 
//como parametro.

Promise.all([somethingWillHappen(),somethingWillHappen2()])
//Si obtenemos un resolve
.then(response => {
    console.log('Array of results', response);
})
//Si obtenemos un reject
.catch(err => {
    console.error(err)
});
