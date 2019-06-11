var gameConf = {
	key: "Game",
	physics: {
		default: 'arcade',
		arcade: {debug: true}
	}
}

var boid;

var debug;



var GameScene = new Phaser.Scene(gameConf);


function wander(body, CIRCLE_DISTANCE, CIRCLE_RADIUS, ANGLE_CHANGE) {
	var circleCenter = new Phaser.Math.Vector2();
	circleCenter = body.velocity.clone();
	circleCenter.normalize();
	circleCenter.scale(CIRCLE_DISTANCE);

	//create a vector with random components (thus random direction)
	var displacement = new Phaser.Math.Vector2(Math.random(), Math.random());
	displacement = Phaser.Math.RotateAround(displacement, body.x, body.y, body.gameObject.angle);
	displacement.scale(CIRCLE_RADIUS);

	var wanderAngle = body.gameObject.angle;
	wanderAngle += Math.random() * ANGLE_CHANGE - ANGLE_CHANGE * .5;

	displacement.scale(wanderAngle);

	var wanderForce = new Phaser.Math.Vector2();
	wanderForce = circleCenter.add(displacement);
	return wanderForce;
}	

//called before the scene is loaded
GameScene.preload = function() {}

//called as soon as the scene is created
GameScene.create = function() {
	centerX = centerY = 120;
	debug = this.add.graphics();
	boid = this.physics.add.image(centerX,centerY,"img_boid");
}


GameScene.update = function() {
	boid.body.velocity.add(wander(boid.body, 0.2, 0.5, 35));

	//cap max speed
	var MAX_SPEED = 15;
	var newSpeed = boid.body.velocity.clone().normalize();
	newSpeed = newSpeed.scale(MAX_SPEED);
	boid.body.velocity = newSpeed;

	//wrap the body around
	Wrap(boid);
}

function Wrap(body)
{
	if (body.x > 240)
		body.x = 0;

	if (body.x < 0)
		body.x = 240;

	if (body.y > 240)
		body.y = 0;

	if (body.y < 0)
		body.y = 240;
}