let cenX, cenY;
let sunX, sunY; //final position of the sun
let moonX, moonY; //final position of the moon

let r = 104; //r value of the sky's daytime color 
let g = 210; //g value of the sky's daytime color

let counters = []; //Counters for each of the 6 clouds 

let starX = []; //x positions of the stars
let starY = []; //y positions of the stars
let starSize = []; //sizes of the stars 
let starOp = []; //opacities of the stars 
let num = 100; //# of stars

function setup() {
	createCanvas(windowWidth, windowHeight);
	cenX = windowWidth/2;
	cenY = windowHeight/2;
	sunX = cenX/2;
	sunY = cenY;
	moonX = (cenX*3)/2;
	moonY = cenY;
	
	//Setting up the stars 
	for (let i=0; i<num; i++) {
		starX[i] = random(windowWidth); 
		starY[i] = random(windowHeight);
		starSize[i] = random(1, 10);
		starOp[i] = random(255);
	}
	
	//Initializing the counters at the clouds' starting points
	counters[0] = windowWidth; 
	counters[1] = cenX;
	counters[2] = 0;	
	counters[3] = (cenX*3)/2;
	counters[4] = cenX/2;
	counters[5] = -cenX/2;
	
	slider = createSlider(0, windowHeight, 0);
	slider.position(cenX-150,20);
	slider.size(300,10);
}

function draw() {	
	background(r-slider.value(), g-slider.value(), 255-slider.value());
	
	//STARS 
	drawStars();
	
	//CLOUDS		
	for (let i=0; i<6; i++) {
		//Making the clouds move over time 
		counters[i] += 0.8; 
		
		if (counters[i]>windowWidth+(cenX/2)) { 
			//Once they reach a certain point they start back at the left
			counters[i] = -cenX/2; 
		}
		
		let tempY;		
		if (i>=0 && i<3) {
			tempY = cenY/2; 
		} else {
			tempY = (cenY*3)/2;
		}
		drawCloud(counters[i], tempY);
	}
	
	//SUN 
	drawSun();
	//MOON
	drawMoon();
}

function drawStars() {
	fill(r+slider.value(), g+slider.value(), 255, slider.value()); //Fourth number is the transparency
	noStroke();

	for (let j=0; j<num; j++) {
		ellipse(starX[j], starY[j], starSize[j], starSize[j]); 
	}	
}

function drawCloud(x, y) {
	//Changing the clouds' color between day and night
	if (slider.value()>=100) { fill(100); }
	else { fill(255); }
	
	noStroke();
	ellipse(x, y, 100, 100);
	ellipse(x-100, y, 100, 100);
	ellipse(x+100, y, 100, 100);
	ellipse(x+50, y-50, 100, 100);
	ellipse(x-50, y-50, 100, 100);
	ellipse(x-50, y+50, 100, 100);
	ellipse(x+50, y+50, 100, 100);
	ellipse(x, y-75, 75, 75);
	ellipse(x, y+75, 75, 75);
	ellipse(x-100, y-35, 75, 75);
	ellipse(x+100, y+35, 75, 75);
}

function drawSun() {
	noStroke();
	fill(255, 255, 0); //Yellow 
	ellipse(sunX, sunY+slider.value(), 200, 200);
	
	//Sunglasses 
	fill(0); //Black 
	ellipse(sunX-30, (sunY-40)+slider.value(), 50, 50);
	ellipse(sunX+30, (sunY-40)+slider.value(), 50, 50);
	stroke(0); //Black, specifically for lines 
	strokeWeight(5); //Thickness of the line 
	line(sunX-90, (sunY-40)+slider.value(), sunX+90, (sunY-40)+slider.value());
	
	//Smile
	noFill();
	bezier(sunX-50, (sunY+20)+slider.value(), 
				 sunX-25, (sunY+50)+slider.value(), 
				 sunX+25, (sunY+50)+slider.value(), 
				 sunX+50, (sunY+20)+slider.value()); //Curve
}

function drawMoon() {
	noStroke();
	fill(194, 236, 255); //Blue
	ellipse(moonX, (moonY-slider.value())+windowHeight, 200, 200);
	
	//Eyes
	fill(255); //White 
	ellipse(moonX-30, ((moonY-40)-slider.value())+windowHeight, 45, 45);
	ellipse(moonX+30, ((moonY-40)-slider.value())+windowHeight, 45, 45);
	fill(0); //Black 
	ellipse(moonX-30, ((moonY-43)-slider.value())+windowHeight, 25, 25);
	ellipse(moonX+30, ((moonY-43)-slider.value())+windowHeight, 25, 25);
	
	//Smile
	stroke(0); //Black, specifically for lines 
	strokeWeight(5); //Thickness of the line 
	noFill();
	bezier(moonX-50, ((moonY+20)-slider.value())+windowHeight, 
				 moonX-25, ((moonY+50)-slider.value())+windowHeight, 
				 moonX+25, ((moonY+50)-slider.value())+windowHeight, 
				 moonX+50, ((moonY+20)-slider.value())+windowHeight); //Curve 
	
	//Craters
	noStroke();
	fill(105, 169, 232);
	ellipse(moonX-60, ((moonY+50)-slider.value())+windowHeight, 20, 20);
	ellipse(moonX+70, ((moonY+30)-slider.value())+windowHeight, 20, 20);
	ellipse(moonX-60, ((moonY)-slider.value())+windowHeight, 10, 10);
	ellipse(moonX+65, ((moonY-50)-slider.value())+windowHeight, 10, 10);	
	ellipse(moonX-30, ((moonY-80)-slider.value())+windowHeight, 10, 10);
	ellipse(moonX+20, ((moonY+60)-slider.value())+windowHeight, 10, 10);
}
