// math. biblioteca de funciones matematicas (random genera un numero aleatorio) math.floor ayuda a redonderar ese numero decimal

let getRandomNumber = size => {           

    return Math.floor(Math.random() * size); // dentro del tamaño del cuadrado generar un numero aleatorio
}

let getDistance = (e, target) => {

    let diffX = e.offsetX - target.x; 
    let diffY = e.offsetY - target.y; 

    return Math.sqrt((diffX * diffX) + (diffY + diffY)); // teorema de pitagoras

}

let getDistanceHint = (distance) => {

    if(distance < 30){
        return "boiling hot";
    }else if (distance < 40){
        return "really hot";
    }else if (distance < 60){
        return "hot";
    }else if (distance < 100){
        return "warm";
    }else if (distance < 180){
        return "cold";
    }else if (distance < 360){
        return "really cold";
    }else  {
        return "Freezing";
    }
}

