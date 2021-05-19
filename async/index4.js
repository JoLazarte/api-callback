//función que tiene mi promesa
const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            //? setTimeout(() => resolve('Do Something Async'), 0)
            //? resolve('Do Something Async')
            
            //Con cualquiera de los dos spans de tiempo (3000 o 0) 
            //o sin setTimeout() se ejecuta primero
            //el programa principal, afuera de esta función
            //Before
            //After
            //Do something Async
            ? setTimeout(() => resolve('Do Something Async'), 3000)
            : reject(new Error('Test Error'))
    })
}

//funcion que aplica el async await a la función que tiene mi promesa
const doSomething = async () =>{
    const Something = await doSomethingAsync();
    console.log(Something);
}

console.log('Before');
doSomething();
console.log('After');

//Como captar y presentar errores de la función que tiene mi promesa
const anotherFunction = async () =>{
    //Con try escribimos el codigo que esperamos que se ejecute
    try{
        const something = await doSomethingAsync();
        //await va a pausar el siguiente bloque de codigo hasta que se cumpla la promesa
        console.log(something);

    //en caso contrario, el catch será el que se ejecutara
    }catch (error){
        console.error(error);
    }
}

console.log('Before 1');
anotherFunction();
console.log('After 1');

//sigue devolviendo
/*
Before
After
Before 1
After 1
Do Something Async
Do Something Async
*/ 
