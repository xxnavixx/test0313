console.log('main.js');
let bound,m1,m2;
let gacc;
let stopBtn;
let textA;
function createStopButton() {
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{noLoop();console.log('stopped');})
	// stopBtn.add
}

function setup() {
	createCanvas(600,400);
	createStopButton();
	textA = createP();
	bound =new Boundary(0,0,600,400);
	m1= new MyMass(100,100);
	m2= new MyMass(100,200,3);
	m3= new MyMass(100,300,2);
	gacc = new createVector(1,1);
}

function draw() {
	background('khaki');
	// fill('tomato');
	// rect(0,0,100,100);
	if(m1.speed.x < 5){
		m1.applyForce(gacc);
		m2.applyForce(gacc);
		m3.applyForce(gacc);
	}
	
	
	
	m1.update()
	bound.centerEdge(m1);
	m1.draw();
	m2.update()
	bound.centerEdge(m2);
	m2.draw();
	m3.update()
	bound.centerEdge(m3);
	m3.draw();
	textA.html(`m1 x:${m1.locat.x} y${m1.locat.y} dx:${m1.speed.x} dy${m1.speed.y}` );
}

function MyVector(x=0,y=0) {
	Object.defineProperty(this,'x',{
		get:function(){
				return this._x;
			},
		set:function(val){
				this._magReady = false;
				this._angleReady = false;
				if(isNaN(val)) {console.log('x is not number');return false;}
				else {this._x = val;return true;}
			}
	});
	Object.defineProperty(this,'y',{
		get:function(){
				return this._y;
			},
		set:function(val){
				this._magReady = false;
				this._angleReady = false;
				if(isNaN(val)) {console.log('y is not number');return false;}
				else {this._y = val;return true;}
			}
	});
	
	this.set(x,y);
}

MyVector.prototype.set = function(x,y) {
	this.x = x;
	this.y = y;
	return this;}

MyVector.prototype.add = function(obj) {
	// if(!(obj instanceof MyVector)) {console.log('add() : not type of MyVector');return;}
	this.x += obj.x
	this.y += obj.y;
	// else console.log('add() : error');
	return this;	
}

MyVector.prototype.sub = function(obj) {
	this.x -= obj.x;
	this.y -= obj.y;
	return this;	
}

MyVector.prototype.mult = function(obj) {
	this.x *= obj.x;
	this.y *= obj.y;
	return this;
}
MyVector.prototype.div = function(obj) {
	this.x /= obj.x;
	this.y /= obj.y;
	return this;
}

MyVector.prototype.mag = function() {
	if(this._magReady) return this._mag;
	return this._mag = Math.sqrt(this.x*this.x + this.y*this.y);
}

MyVector.prototype.angle = function() {
	if(this._angleReady) return this._angle;
	// console.log(this._angle);
	if(this.x>=0) this._angle = Math.asin(this.y/this.mag());
	else this._angle = Math.PI - Math.asin(this.y/this.mag());
	// console.log(this._angle);
	return this._angle;
	
}

class MyMass {
	constructor(x=0,y=0,mass = 1,color='tomato') {
		this.locat = createVector(x,y);
		this.speed = createVector(0,0);
		this.acc = createVector(0,0);
		this.mass = mass;
		this.color = color;
		this.r = this.mass * 5;
	}
	
	applyForce(vector) {
		if(isNaN(vector.x) || isNaN(vector.y)) {
			console.log('applyForce(): error x,y value must be number');
			return this;	}
		this.acc.add(vector.copy().div(this.mass));
		return this;
	}
	
	update() {
		this.speed.add(this.acc);
		this.acc.set(0,0);
		this.locat.add(this.speed);
		return this;
	}
	
	draw() {
		fill(this.color);
		ellipse(this.locat.x,this.locat.y,this.r*2);
		return this;
	}
}

class Boundary {
	constructor(x,y,w,h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.x2 = this.x + this.w;
		this.y2 = this.y + this.h;
	}
	
	centerEdge(obj) {
		if(obj.locat.x > this.x2) obj.speed.x = -Math.abs(obj.speed.x);
		else if(obj.locat.x < this.x) obj.speed.x = Math.abs(obj.speed.x);
		if(obj.locat.y > this.y2) obj.speed.y = -Math.abs(obj.speed.y);
		else if(obj.locat.y < this.y) obj.speed.y = Math.abs(obj.speed.y);
	}
}












