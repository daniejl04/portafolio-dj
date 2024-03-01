const WIDTH = 400;
const HEIGH = 400;

let target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber (HEIGH)
}; 


 let $map = document.getElementById('map');   // llamar elemento creado en el  archivo html
 let $distance = document.getElementById('distance')
let clicks = 0; 

 $map.addEventListener('click', function(e){
    
    clicks++;
    let distance = getDistance(e, target);
    let distanceHing = getDistanceHint(distance);
    $distance.innerHTML = distanceHing;

    if (distance < 10){
        alert(`found the treasure in + ${clicks} clicks`);
        location.reload
    }


 }) 
