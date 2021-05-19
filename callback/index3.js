function sum(num1, num2) {
    return num1 + num2
}

function calc(num1, num2, myCallback){
    return myCallback(num1, num2);
}

console.log(calc(7,3, sum));

function giveMeDate(myCallback) {
    console.log(new Date); //la que se ejecuta primero
    setTimeout(function () {
        let date = new Date;
        myCallback(date); //la que se ejecuta al final
    }, 5000)
    console.log(new Date);//se ejecuta junto con la primera
};

function showMeDate(dateNow) {
    console.log(dateNow);
}

//Función "callback", que requiere una función como parametro
giveMeDate(showMeDate);
/*
//Se puede ir reemplazando mentalmente en al menos 2 pasos:
//1
giveMeDate(showMeDate(date){console.log(date)}){
    console.log(new Date);
    setTimeout(function () {
        let date = new Date;
        showMeDate(date){
        console.log(date);
        } 
    }, 5000)
    console.log(new Date);
};
*/
/*
//2
giveMeDate(myCallback){
    console.log(new Date);
    setTimeout(function () {
        let date = new Date;
        myCallback = showMeDate(date){
        console.log(date);
        } 
    }, 5000)
    console.log(new Date);
};
//Pero ambos desgloces son sintacticamente incorrectos, solo deben visualizarse
*/