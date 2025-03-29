
const canvas = document.querySelector(".cnv");
const funcIn = document.getElementById("func");
const funcForm = document.getElementById("frm");
 let  context = canvas.getContext("2d");
let range;

function drawMap() {
   context.beginPath();
   context.strokeStyle = "black";
   context.moveTo(150,0);
   context.lineTo(150,250);
   context.stroke();
  
   context.beginPath();
   context.strokeStyle = "black";
   context.moveTo(0,75);
   context.lineTo(300,75);
   context.stroke();  
}

drawMap();
 
 function drawDot(posX,posY) {
    context.beginPath();
    context.fillStyle = "blue";
    context.arc(posX,posY,0.5,0,2*Math.PI);
    context.fill();
 }

 const org ={
    x : 150,
    y : 75
 }

 function putDot(x,y){
    let posX ,posY;
        posX = org.x + x;
        posY = org.y - y;
    
    drawDot(posX,posY);

 }
 function drawFunction() {
   let y;
context.beginPath();
context.strokeStyle = "red";
let precX = org.x;
let precY = org.y;
for(var x=1; x<1500; x+=0.5){
    context.moveTo(precX,precY);
    if(range!=null ){
      y = range[x];
    }
    else{
      y = 0.5*x+1;
    }
    precX = org.x + x;
    precY = org.y - y;
    context.lineTo((org.x + x),(org.y -y));
    context.stroke();
    putDot(x,y);

    console.log(`x = ${x} y = ${y}`)
}
 }

 drawFunction();

 funcForm.addEventListener("submit",(event)=>{

   console.log(funcIn.value);
   let func = String(funcIn.value);
   let req  = {eq : func};

   event.preventDefault();
   fetch("http://localhost:3030/equation",{
         
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(req)
   }
   )
   .then(response => response.json())
   .then(data => range = data)
   .catch(error => console.error("Error:",error)
   );
   context.clearRect(0,0,300,300)
   drawMap();
   drawFunction();
   
 })