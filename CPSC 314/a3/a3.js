/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2018
//  Assignment 3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('hello world');

a=5;
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

var animation1 = true;
var animation2 = false;
var stopMotion = true;

var myboxMotion = new Motion(myboxSetMatrices);
var handMotion = new Motion(handSetMatrices);
var alienMotion = new Motion(alienSetMatrices);
var alienMotion2 = new Motion(alienSetMatrices);
var link1, link2, link3, link4, link5;
var linkFrame1, linkFrame2, linkFrame3, linkFrame4, linkFrame5;

var alienFrame1, alienFrame2, alienFrame3, alienFrame4, alienFrame5, alienFrame6;
var alienFrame7 ,alienFrame8, alienFrame9, alienFrame10, alienFrame11, alienFrame12;
var alienLink1, alienLink2, alienLink3, alienLink4, alienLink5, alienLink6;
var alienLink7, alienLink8, alienLink9, alienLink10, alienLink11, alienLink12;

var meshes = {};
var RESOURCES_LOADED = false;

// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(0xd0f0d0);     // set background colour
var color = new THREE.Color(getRandomColor());
renderer.setClearColor(color);     // set background colour
canvas.appendChild(renderer.domElement);

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function initCamera() {
    var cameraFov = 30;     // initial camera vertical field of view, in degrees

    // set up M_proj    (internally:  camera.projectionMatrix )
    camera = new THREE.PerspectiveCamera(cameraFov,1,0.1,1000);
      // view angle, aspect ratio, near, far

    // set up M_view:   (internally:  camera.matrixWorldInverse )
    camera.position.set(0,12,20);
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(0,0,0);
    scene.add(camera);

      // SETUP ORBIT CONTROLS OF THE CAMERA
    var controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////////////
// init():  setup up scene
////////////////////////////////////////////////////////////////////////

function init() {
    console.log('init called');

    initCamera();
    initMotions();
    initLights();
    initObjects();
    initHand();
    initFileObjects();
    initAlien();

    window.addEventListener('resize',resize);
    resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() {

      // keyframes for the mybox animated motion:   name, time, [x, y, z]
    myboxMotion.addKeyFrame(new Keyframe('rest pose',0.0, [0,1.9,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',1.0, [1,1.9,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',2.0, [1,8,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',3.0, [0,8,0]));
    myboxMotion.addKeyFrame(new Keyframe('rest pose',4.0, [0,1.9,0]));

      // basic interpolation test
    myboxMotion.currTime = 0.1;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=0.1
    myboxMotion.currTime = 2.9;
    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=2.9

      // keyframes for hand:    name, time, [x, y, theta1, theta2, theta3, theta4, theta5]
    handMotion.addKeyFrame(new Keyframe('straight',         0.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('right finger curl',1.0, [2, 3,   0, -120, -120, 0,0]));
    handMotion.addKeyFrame(new Keyframe('straight',         2.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('left finger curl', 3.0, [2, 3,   0, 0, 0, -90,-90]));
    handMotion.addKeyFrame(new Keyframe('straight',         4.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('left finger curl', 5.0, [2, 3,   0, -90, -90, -90,-90]));
    handMotion.addKeyFrame(new Keyframe('straight',         6.0, [2, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('straight move',    7.0,  [3, 3,    0, 0, 0, 0, 0]));
    handMotion.addKeyFrame(new Keyframe('straight'     ,    8.0,  [2, 3,    0, 0, 0, 0, 0]));

    alienMotion.addKeyFrame(new Keyframe('normal',          0.0, [2, 4, -5,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    alienMotion.addKeyFrame(new Keyframe('dance',           0.5, [1, 4, -5,   0, 0, 0, 0, 0, 0, 90, 90, 0, 0, 0, 0]));
    alienMotion.addKeyFrame(new Keyframe('dance',           1.5, [3, 4, -5,   0, 0, 0, 0, 0, 0, -90, -90, 0, 0, 0, 0]));
    alienMotion.addKeyFrame(new Keyframe('dance',           2  , [2, 4, -5,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    alienMotion2.addKeyFrame(new Keyframe('normal',          0.0, [2, 4, -5,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('dance',           1, [1, 4, -5,   90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('dance',           2  , [3, 4, -5,   180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('dance',           3, [2, 4, -5, 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    alienMotion2.addKeyFrame(new Keyframe('dance',           4  , [2, 4, -5,  360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

}

///////////////////////////////////////////////////////////////////////////////////////
// myboxSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function myboxSetMatrices(avars) {
    mybox.matrixAutoUpdate = false;     // tell three.js not to over-write our updates
    mybox.matrix.identity();
    mybox.matrix.multiply(new THREE.Matrix4().makeTranslation(avars[0], avars[1], avars[2]));
    mybox.matrix.multiply(new THREE.Matrix4().makeRotationY(-Math.PI/2));
    mybox.matrix.multiply(new THREE.Matrix4().makeScale(1.5,1.5,1.5));
    mybox.updateMatrixWorld();
}

///////////////////////////////////////////////////////////////////////////////////////
// handSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function handSetMatrices(avars) {
    var deg2rad = Math.PI/180;

    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;
    var theta5 = avars[6]*deg2rad;

      ////////////// link1
    linkFrame1.matrix.identity();
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,0));
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
    linkFrame1.matrix.multiply(new THREE.Matrix4().makeScale(2,1,2));//scale x and z by 2
      // Frame 1 has been established
    link1.matrix.copy(linkFrame1.matrix);
    link1.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));
    link1.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));

      ////////////// link2
    linkFrame2.matrix.copy(linkFrame1.matrix);      // start with parent frame
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,1));
    linkFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));
      // Frame 2 has been established
    link2.matrix.copy(linkFrame2.matrix);
    link2.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));
    link2.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));

      ///////////////  link3
    linkFrame3.matrix.copy(linkFrame2.matrix);
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0));
    linkFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));
      // Frame 3 has been established
    link3.matrix.copy(linkFrame3.matrix);
    link3.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));
    link3.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));

      /////////////// link4
    linkFrame4.matrix.copy(linkFrame1.matrix);
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,-1));
    linkFrame4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));
      // Frame 4 has been established
    link4.matrix.copy(linkFrame4.matrix);
    link4.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));
    link4.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));

      // link5
    linkFrame5.matrix.copy(linkFrame4.matrix);
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeTranslation(4,0,0));
    linkFrame5.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
      // Frame 5 has been established
    link5.matrix.copy(linkFrame5.matrix);
    link5.matrix.multiply(new THREE.Matrix4().makeTranslation(2,0,0));
    link5.matrix.multiply(new THREE.Matrix4().makeScale(4,1,1));

    link1.updateMatrixWorld();
    link2.updateMatrixWorld();
    link3.updateMatrixWorld();
    link4.updateMatrixWorld();
    link5.updateMatrixWorld();

    linkFrame1.updateMatrixWorld();
    linkFrame2.updateMatrixWorld();
    linkFrame3.updateMatrixWorld();
    linkFrame4.updateMatrixWorld();
    linkFrame5.updateMatrixWorld();
}

function alienSetMatrices(avars)
{
  var deg2rad = Math.PI/180;

  var xPosition = avars[0];
  var yPosition = avars[1];
  var zPosition = avars[2];
  var theta1 = avars[3]*deg2rad;
  var theta2 = avars[4]*deg2rad;
  var theta3 = avars[5]*deg2rad;
  var theta4 = avars[6]*deg2rad;
  var theta5 = avars[7]*deg2rad;
  var theta6 = avars[8]*deg2rad;
  var theta7 = avars[9]*deg2rad;
  var theta8 = avars[10]*deg2rad;
  var theta9 = avars[11]*deg2rad;
  var theta10 = avars[12]*deg2rad;
  var theta11 = avars[13]*deg2rad;
  var theta12 = avars[14]*deg2rad;
  //BODY
  alienFrame1.matrix.identity();
  alienFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,zPosition));
  alienFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
    // Frame 1 has been established
  alienLink1.matrix.copy(alienFrame1.matrix);
  alienLink1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
  alienLink1.matrix.multiply(new THREE.Matrix4().makeScale(1,5,1));

    ////////////// link2 HEAD
  alienFrame2.matrix.copy(alienFrame1.matrix);      // start with parent frame
  alienFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,2,0));
  alienFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));
    // Frame 2 has been established
  alienLink2.matrix.copy(alienFrame2.matrix);
  alienLink2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,1,0));
  alienLink2.matrix.multiply(new THREE.Matrix4().makeScale(1,1,1));

    ///////////////  link3 LUA
  alienFrame3.matrix.copy(alienFrame1.matrix);
  alienFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,2,0));
  alienFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));
    // Frame 3 has been established
  alienLink3.matrix.copy(alienFrame3.matrix);
  alienLink3.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.5,0,0));
  alienLink3.matrix.multiply(new THREE.Matrix4().makeScale(-2,1,1));

    ///////////// link4 RUA
  alienFrame4.matrix.copy(alienFrame1.matrix);
  alienFrame4.matrix.multiply(new THREE.Matrix4().makeTranslation(1,2,0));
  alienFrame4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));
    // Frame 4 has been established
  alienLink4.matrix.copy(alienFrame4.matrix);
  alienLink4.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5,0,0));
  alienLink4.matrix.multiply(new THREE.Matrix4().makeScale(2,1,1));

    // link5 LUL
  alienFrame5.matrix.copy(alienFrame1.matrix);
  alienFrame5.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,-2,0));
  alienFrame5.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
    // Frame 5 has been established
  alienLink5.matrix.copy(alienFrame5.matrix);
  alienLink5.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-2,0));
  alienLink5.matrix.multiply(new THREE.Matrix4().makeScale(1,2,1));

    ////////////// link2 RUL
  alienFrame6.matrix.copy(alienFrame1.matrix);      // start with parent frame
  alienFrame6.matrix.multiply(new THREE.Matrix4().makeTranslation(1,-2,0));
  alienFrame6.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta6));
    // Frame 2 has been established
  alienLink6.matrix.copy(alienFrame6.matrix);
  alienLink6.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-2,0));
  alienLink6.matrix.multiply(new THREE.Matrix4().makeScale(1,2,1));

    ///////////////  link3 LLA
  alienFrame7.matrix.copy(alienFrame3.matrix);
  alienFrame7.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,0,0));
  alienFrame7.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta7));
    // Frame 3 has been established
  alienLink7.matrix.copy(alienFrame7.matrix);
  alienLink7.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1.5,0));
  alienLink7.matrix.multiply(new THREE.Matrix4().makeScale(1,-2,1));

    ///////////// link4 RLA
  alienFrame8.matrix.copy(alienFrame4.matrix);
  alienFrame8.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));
  alienFrame8.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta8));
    // Frame 4 has been established
  alienLink8.matrix.copy(alienFrame8.matrix);
  alienLink8.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1.5,0));
  alienLink8.matrix.multiply(new THREE.Matrix4().makeScale(1,-2,1));

    // link5 LLL
  alienFrame9.matrix.copy(alienFrame5.matrix);
  alienFrame9.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1,0));
  alienFrame9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta9));
    // Frame 5 has been established
  alienLink9.matrix.copy(alienFrame9.matrix);
  alienLink9.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
  alienLink9.matrix.multiply(new THREE.Matrix4().makeScale(1,-1.5,1));
  // link5 RLL
  alienFrame10.matrix.copy(alienFrame6.matrix);
  alienFrame10.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1,0));
  alienFrame10.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta10));
    // Frame 5 has been established
  alienLink10.matrix.copy(alienFrame10.matrix);
  alienLink10.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
  alienLink10.matrix.multiply(new THREE.Matrix4().makeScale(1,-1.5,1));

    // link5 LF
  alienFrame11.matrix.copy(alienFrame9.matrix);
  alienFrame11.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,0,0));
  alienFrame11.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta11));
    // Frame 5 has been established
  alienLink11.matrix.copy(alienFrame11.matrix);
  alienLink11.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1.5,0));
  alienLink11.matrix.multiply(new THREE.Matrix4().makeScale(1,1,1));

  // link5 RF
  alienFrame12.matrix.copy(alienFrame10.matrix);
  alienFrame12.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0,0));
  alienFrame12.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta12));
  // Frame 5 has been established
  alienLink12.matrix.copy(alienFrame12.matrix);
  alienLink12.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1.5,0));
  alienLink12.matrix.multiply(new THREE.Matrix4().makeScale(1,1,1));


  alienLink1.updateMatrixWorld();
  alienLink2.updateMatrixWorld();
  alienLink3.updateMatrixWorld();
  alienLink4.updateMatrixWorld();
  alienLink5.updateMatrixWorld();
  alienLink6.updateMatrixWorld();
  alienLink7.updateMatrixWorld();
  alienLink8.updateMatrixWorld();
  alienLink9.updateMatrixWorld();
  alienLink10.updateMatrixWorld();
  alienLink11.updateMatrixWorld();
  alienLink12.updateMatrixWorld();

  alienFrame1.updateMatrixWorld();
  alienFrame2.updateMatrixWorld();
  alienFrame3.updateMatrixWorld();
  alienFrame4.updateMatrixWorld();
  alienFrame5.updateMatrixWorld();
  alienFrame6.updateMatrixWorld();
  alienFrame7.updateMatrixWorld();
  alienFrame8.updateMatrixWorld();
  alienFrame9.updateMatrixWorld();
  alienFrame10.updateMatrixWorld();
  alienFrame11.updateMatrixWorld();
  alienFrame12.updateMatrixWorld();

}
/////////////////////////////////////
// initLights():  SETUP LIGHTS
/////////////////////////////////////

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,4,2);
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
}

/////////////////////////////////////
// MATERIALS
/////////////////////////////////////

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

/////////////////////////////////////
// initObjects():  setup objects in the scene
/////////////////////////////////////

function initObjects() {
    worldFrame = new THREE.AxesHelper(5) ;
    scene.add(worldFrame);

    // mybox
    myboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    mybox = new THREE.Mesh( myboxGeometry, diffuseMaterial );
    scene.add( mybox );

    // textured floor
    floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1.1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // sphere, located at light position
    sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
    sphere.position.set(0,4,2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(sphere);

    // box
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    box = new THREE.Mesh( boxGeometry, diffuseMaterial );
    box.position.set(-4, 0, 0);
    scene.add( box );

    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html]
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z),
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(-2,0,0);
    scene.add( mcc );

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(2, 0, 0);
    scene.add( cylinder );

    // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
    coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
    cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
    cone.position.set(4, 0, 0);
    scene.add( cone);

    // torus:   parameters -- radius, diameter, radialSegments, torusSegments
    torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
    torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
    torus.position.set(6, 0, 0);   // translation
    torus.rotation.set(0,0,0);     // rotation about x,y,z axes
    scene.add( torus );

    // custom object
    var geom = new THREE.Geometry();
    var v0 = new THREE.Vector3(0,0,0);
    var v1 = new THREE.Vector3(3,0,0);
    var v2 = new THREE.Vector3(0,3,0);
    var v3 = new THREE.Vector3(3,3,0);
    geom.vertices.push(v0);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
    geom.computeFaceNormals();
    customObject = new THREE.Mesh( geom, diffuseMaterial2 );
    customObject.position.set(0, 0, -2);
    scene.add(customObject);
}

/////////////////////////////////////////////////////////////////////////////////////
//  initHand():  define all geometry associated with the hand
/////////////////////////////////////////////////////////////////////////////////////

function initHand() {
    handMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth

    link1 = new THREE.Mesh( boxGeometry, handMaterial );  scene.add( link1 );
    linkFrame1   = new THREE.AxesHelper(1) ;   scene.add(linkFrame1);
    link2 = new THREE.Mesh( boxGeometry, handMaterial );  scene.add( link2 );
    linkFrame2   = new THREE.AxesHelper(1) ;   scene.add(linkFrame2);
    link3 = new THREE.Mesh( boxGeometry, handMaterial );  scene.add( link3 );
    linkFrame3   = new THREE.AxesHelper(1) ;   scene.add(linkFrame3);
    link4 = new THREE.Mesh( boxGeometry, handMaterial );  scene.add( link4 );
    linkFrame4   = new THREE.AxesHelper(1) ;   scene.add(linkFrame4);
    link5 = new THREE.Mesh( boxGeometry, handMaterial );  scene.add( link5 );
    linkFrame5   = new THREE.AxesHelper(1) ;   scene.add(linkFrame5);

    link1.matrixAutoUpdate = false;
    link2.matrixAutoUpdate = false;
    link3.matrixAutoUpdate = false;
    link4.matrixAutoUpdate = false;
    link5.matrixAutoUpdate = false;
    linkFrame1.matrixAutoUpdate = false;
    linkFrame2.matrixAutoUpdate = false;
    linkFrame3.matrixAutoUpdate = false;
    linkFrame4.matrixAutoUpdate = false;
    linkFrame5.matrixAutoUpdate = false;
}

function initAlien()
{
  alienMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth

  alienLink1 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink1 );
  alienFrame1   = new THREE.AxesHelper(1) ;   scene.add(alienFrame1);
  alienLink2 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink2 );
  alienFrame2   = new THREE.AxesHelper(1) ;   scene.add(alienFrame2);
  alienLink3 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink3 );
  alienFrame3   = new THREE.AxesHelper(1) ;   scene.add(alienFrame3);
  alienLink4 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink4 );
  alienFrame4   = new THREE.AxesHelper(1) ;   scene.add(alienFrame4);
  alienLink5 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink5 );
  alienFrame5   = new THREE.AxesHelper(1) ;   scene.add(alienFrame5);
  alienLink6 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink6 );
  alienFrame6   = new THREE.AxesHelper(1) ;   scene.add(alienFrame6);
  alienLink7 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink7 );
  alienFrame7   = new THREE.AxesHelper(1) ;   scene.add(alienFrame7);
  alienLink8 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink8 );
  alienFrame8   = new THREE.AxesHelper(1) ;   scene.add(alienFrame8);
  alienLink9 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink9 );
  alienFrame9   = new THREE.AxesHelper(1) ;   scene.add(alienFrame9);
  alienLink10 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink10 );
  alienFrame10   = new THREE.AxesHelper(1) ;   scene.add(alienFrame10);
  alienLink11 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink11 );
  alienFrame11   = new THREE.AxesHelper(1) ;   scene.add(alienFrame11);
  alienLink12 = new THREE.Mesh( boxGeometry, alienMaterial );  scene.add( alienLink12 );
  alienFrame12   = new THREE.AxesHelper(1) ;   scene.add(alienFrame12);


  alienLink1.matrixAutoUpdate = false;
  alienLink2.matrixAutoUpdate = false;
  alienLink3.matrixAutoUpdate = false;
  alienLink4.matrixAutoUpdate = false;
  alienLink5.matrixAutoUpdate = false;
  alienLink6.matrixAutoUpdate = false;
  alienLink7.matrixAutoUpdate = false;
  alienLink8.matrixAutoUpdate = false;
  alienLink9.matrixAutoUpdate = false;
  alienLink10.matrixAutoUpdate = false;
  alienLink11.matrixAutoUpdate = false;
  alienLink12.matrixAutoUpdate = false;

  alienFrame1.matrixAutoUpdate = false;
  alienFrame2.matrixAutoUpdate = false;
  alienFrame3.matrixAutoUpdate = false;
  alienFrame4.matrixAutoUpdate = false;
  alienFrame5.matrixAutoUpdate = false;
  alienFrame6.matrixAutoUpdate = false;
  alienFrame7.matrixAutoUpdate = false;
  alienFrame8.matrixAutoUpdate = false;
  alienFrame9.matrixAutoUpdate = false;
  alienFrame10.matrixAutoUpdate = false;
  alienFrame11.matrixAutoUpdate = false;
  alienFrame12.matrixAutoUpdate = false;


}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

////////////////////////////////////////////////////////////////////////
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////

function initFileObjects() {
        // list of OBJ files that we want to load, and their material
    models = {
//	bunny:     {obj:"obj/bunny.obj", mtl: diffuseMaterial, mesh: null},
//	horse:     {obj:"obj/horse.obj", mtl: diffuseMaterial, mesh: null },
//	minicooper:{obj:"obj/minicooper.obj", mtl: diffuseMaterial, mesh: null },
//	trex:      { obj:"obj/trex.obj", mtl: normalShaderMaterial, mesh: null },
	teapot:    {obj:"obj/teapot.obj", mtl: customShaderMaterial, mesh: null	},
	armadillo: {obj:"obj/armadillo.obj", mtl: customShaderMaterial, mesh: null },
	dragon:    {obj:"obj/dragon.obj", mtl: customShaderMaterial, mesh: null }
    };

    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
	onResourcesLoaded();
    }
    var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
	    var percentComplete = xhr.loaded / xhr.total * 100;
	    console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
    };
    var onError = function ( xhr ) {
    };

    // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
    for( var _key in models ){
	console.log('Key:', _key);
	(function(key){
	    var objLoader = new THREE.OBJLoader( manager );
	    objLoader.load( models[key].obj, function ( object ) {
		object.traverse( function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
			child.material = models[key].mtl;
			child.material.shading = THREE.SmoothShading;
		    }	} );
		models[key].mesh = object;
//		scene.add( object );
	    }, onProgress, onError );
	})(_key);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded(){

 // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
 //                             i.e., creates references to the geometry, and not full copies ]
    meshes["armadillo1"] = models.armadillo.mesh.clone();
    meshes["armadillo2"] = models.armadillo.mesh.clone();
    meshes["dragon1"] = models.dragon.mesh.clone();
    meshes["dragon2"] = models.dragon.mesh.clone();
    meshes["teapot1"] = models.teapot.mesh.clone();

    // position the object instances and parent them to the scene, i.e., WCS

    meshes["armadillo1"].position.set(-6, 1.5, 2);
    meshes["armadillo1"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo1"].scale.set(1,1,1);
    scene.add(meshes["armadillo1"]);

    meshes["armadillo2"].position.set(-3, 1.5, 2);
    meshes["armadillo2"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo2"].scale.set(1,1,1);
    scene.add(meshes["armadillo2"]);

    meshes["dragon1"].position.set(-5, 0.2, 4);
    meshes["dragon1"].rotation.set(0, Math.PI, 0);
    meshes["dragon1"].scale.set(0.3,0.3,0.3);
    scene.add(meshes["dragon1"]);

    meshes["dragon2"].position.set(-5, 0.2, -4);
    meshes["dragon2"].rotation.set(0, Math.PI, 0);
    meshes["dragon2"].scale.set(0.3,0.3,0.3);
    scene.add(meshes["dragon2"]);

    meshes["teapot1"].position.set(3, 0, 3);
    meshes["teapot1"].scale.set(0.5, 0.5, 0.5);
    scene.add(meshes["teapot1"]);
}


///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W"))
    light.position.y += 0.1;
  else if (keyboard.pressed("S"))
    light.position.y -= 0.1;
  else if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;
  else if (keyboard.pressed("I"))
    light.position.z -= 0.1;
  else if (keyboard.pressed("K"))
    light.position.z += 0.1;
  else if (keyboard.pressed("F")){
    animation2 = false;
    animation1 = true;
  }
  else if(keyboard.pressed("G")){
    animation1 = false;
    animation2 = true;
  }
  else if(keyboard.pressed("H"))
    stopMotion = !stopMotion;
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
    var dt=0.02;
    checkKeyboard();
    if(stopMotion){
    if (animation1) {
	  // advance the motion of all the animated objects
	myboxMotion.timestep(dt);
	handMotion.timestep(dt);
  alienMotion.timestep(dt);
    }
    if(animation2)
    {
      myboxMotion.timestep(dt);
      handMotion.timestep(dt);
      alienMotion2.timestep(dt);
    }
  }

    sphere.position.set(light.position.x, light.position.y, light.position.z);
    requestAnimationFrame(update);      // requests the next update call;  this creates a loop
    renderer.render(scene, camera);
}

init();
update();
