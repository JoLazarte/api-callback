// importamos la funcion
const fetchData = require('./../utils/fetchData');
// declaramos la ruta de la api
const API = 'https://rickandmortyapi.com/api/character/';

const anotherFunction = async (url_api) => {
    try {
        const data = await fetchData(url_api); //espera a que esta petición se cumpla, luego la ejecutas
        const character = await fetchData(`${API}${data.results[0].id}`)
        const origin = await fetchData(character.origin.url);
     
    //Instalando: npm i node-fetch
    //const data = await fetch(url_api).then((res) => res.json());
    //const character = await fetch(`${url_api}${data.results[0].id}`)
    //    .then((res) => res.json());
    //const origin = await fetch(`${character.origin.url}`)
    //    .then((res) => res.json()
    //);



        console.log((data.info.count))
        console.log(character.name)
        console.log(origin.dimension)

    } catch (error) {
        console.error(error)
    }
}

console.log('Before')
anotherFunction(API)
console.log('After')