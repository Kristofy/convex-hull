const padding = 50;
const percent = 0.4;
const num = 500;

let points = [];
let leftMost;
let hull = [];
let current;

function setup(){
    let C = createCanvas(windowWidth,windowHeight);
    // let C = createCanvas(600, 600);
    let nth = 0;
    C.parent("parrent");

    // noise
    
    for(let i = padding; i < width-padding; i++){
        for(let j = padding; j < height-padding; j++){
            let p = noise(i/100,j/100);
            // console.log(p);
            if(p<percent){
                if(nth++%80==0){
                    points.push(createVector(i,j))
                }
            }
        }
    }
   
	
    // full random
/*
    hull = new Array(num);
    for(let i = 0; i < num; i++)
        points.push(createVector(random()*(width-2*padding)+padding, random()*(height-2*padding)+padding));
*/
    points.sort((p1, p2) => p1.x-p2.x );
    leftMost = points.shift();
    hull.push(leftMost);
    frameRate(4);
}

function draw(){
    background(51);
    
    current = 0;
    for(let i = 1; i < points.length; i++){
        if(vectorMinus(points[current], hull[hull.length-1]).cross(vectorMinus(points[i],hull[hull.length-1])).z > 0){
            current = i;
        }
    }

    let next = points.splice(current, 1)[0];

    if(vectorMinus(leftMost, hull[hull.length-1]).cross(vectorMinus(next,hull[hull.length-1])).z<0){
        noLoop();
    }else{
        hull.push(next);
    }


    
    strokeWeight(1);
    fill(255,0,0,100);
    beginShape()
    hull.forEach(p=>{
        vertex(p.x, p.y);
        point(p.x, p.y);
    });
    endShape(CLOSE);
    
    strokeWeight(5);
    fill(0,0,255);
    hull.forEach(p=>{
        point(p.x, p.y);
    });

    strokeWeight(6);
    stroke(0, 255, 0);
    point(leftMost.x, leftMost.y);
   
    strokeWeight(4);
    stroke(255);
    points.forEach(p => {
        point(p.x, p.y);
    });

}

function vectorMinus(v1,v2){
    return v1.copy().add(p5.Vector.mult(v2.copy(),-1));
}