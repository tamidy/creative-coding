var cenX, cenY;
var sunX, sunY; //final position of the sun
var moonX, moonY; //final position of the moon
var r = 104; //r value of the sky's daytime color 
var g = 210; //g value of the sky's daytime color
var counter1, counter2, counter3, counter4, counter5, counter6; //Counters for each of the 6 clouds 

function setup() {
	createCanvas(windowWidth, windowHeight);
	cenX = windowWidth/2;
	cenY = windowHeight/2;
	sunX = cenX/2;
	sunY = cenY;
	moonX = (cenX*3)/2;
	moonY = cenY;
	
	//Initializing the counters at the clouds' starting points	
	counter1 = windowWidth; 
	counter2 = cenX;
	counter3 = 0;	
	counter4 = (cenX*3)/2;
	counter5 = cenX/2;
	counter6 = -cenX/2;
	
	slider = createSlider(0, windowHeight, 0);
	slider.position(cenX-150,20);
	slider.size(300,10);
}

function draw() {	
	background(r-slider.value(), g-slider.value(), 255-slider.value());
	
	//STARS 
	drawStars();
	
	//CLOUDS
	counter1+=.8; //Making the clouds move over time 
	counter2+=.8;
	counter3+=.8;
	counter4+=.8;
	counter5+=.8;
	counter6+=.8;
	if (counter1>windowWidth+(cenX/2)) { counter1 = -cenX/2; } //Once they reach a certain point they start back at the left
	if (counter2>windowWidth+(cenX/2)) { counter2 = -cenX/2; }	
	if (counter3>windowWidth+(cenX/2)) { counter3 = -cenX/2; }	
	if (counter4>windowWidth+(cenX/2)) { counter4 = -cenX/2; }	
	if (counter5>windowWidth+(cenX/2)) { counter5 = -cenX/2; }	
	if (counter6>windowWidth+(cenX/2)) { counter6 = -cenX/2; }	
	drawCloud(counter1, cenY/2);
	drawCloud(counter2, cenY/2);
	drawCloud(counter3, cenY/2); 
	drawCloud(counter4, (cenY*3)/2);
	drawCloud(counter5, (cenY*3)/2);
	drawCloud(counter6, (cenY*3)/2);
		
	//SUN 
	drawSun();
	//MOON
	drawMoon();
}

function drawStars() {
	fill(r+slider.value(), g+slider.value(), 255, slider.value()); //Fourth number is the transparency
	noStroke();

	for (var i=0; i<windowWidth; i+=50) {
		for (var j=0; j<windowHeight; j+=50) {
			ellipse(i*4, j*4, 10, 10);
		}
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
	ellipse(sunX-30, (sunY-40)+slider.value(), 45, 45);
	ellipse(sunX+30, (sunY-40)+slider.value(), 45, 45);
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
	stroke(0);
	fill(255); //White 
	ellipse(moonX-30, ((moonY-40)-slider.value())+windowHeight, 45, 45);
	ellipse(moonX+30, ((moonY-40)-slider.value())+windowHeight, 45, 45);
	fill(0); //Black 
	ellipse(moonX-30, ((moonY-40)-slider.value())+windowHeight, 15, 15);
	ellipse(moonX+30, ((moonY-40)-slider.value())+windowHeight, 15, 15);
	
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
