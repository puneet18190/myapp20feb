$(window).on("load", function(){
    $(".loader").css({
        opacity: 0
    });

    $(".content img").addClass("move-up");

    setTimeout(function () {
        $(".content h1").addClass("move-up")

    },190);

    setTimeout(function () {
        $(".btn1").addClass("move-up")
    },570);

    setTimeout(function () {
        $(".btn2").addClass("move-up")
    },770);

    $(".bg-img").addClass("bg-animation")
});

$(window).on("load", function () {

    $(window).on("scroll", function() {
        if($(document).scrollTop() > 10){
            $(".nav-logo").css({
                opacity: "1"
            })
        } else {
            $(".nav-logo").css({
                opacity: "0"
            })
        }
    });

});


'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WHITE = {
    mainColor: 0x229922,
    mainEmissive: 0,
    secondaryColor: 0xffffff,
    secondaryEmissive: 0,
    detailColor: 0xfc5931,
    detailEmissive: 0
};

var ParticleSystem = function () {
    function ParticleSystem() {
        _classCallCheck(this, ParticleSystem);

        this.time = 0.0;
        var triangles = 1;
        var instances = 7000;
        var geometry = new THREE.InstancedBufferGeometry();

        var vertices = new THREE.BufferAttribute(new Float32Array(triangles * 3 * 3), 3);
        var unit = 0.055;
        vertices.setXYZ(0, unit, -unit, 0);
        vertices.setXYZ(1, -unit, unit, 0);
        vertices.setXYZ(2, 0, 0, unit);
        geometry.addAttribute('position', vertices);

        var offsets = new THREE.InstancedBufferAttribute(new Float32Array(instances * 3), 3, 1);
        var dist = 180;
        for (var i = 0, ul = offsets.count; i < ul; i++) {
            offsets.setXYZ(i, (Math.random() - 0.5) * dist, (Math.random() - 0.5) * dist, (Math.random() - 0.5) * dist);
        }
        geometry.addAttribute('offset', offsets);

        var colors = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);

        var threeColor = new THREE.Color();
        for (var i = 0, ul = colors.count; i < ul; i++) {
            var c = threeColor.setHex(WHITE.mainColor);
            colors.setXYZW(i, c.r, c.g, c.b, 1);
        }
        geometry.addAttribute('color', colors);

        var timeOffsets = new THREE.InstancedBufferAttribute(new Float32Array(instances * 1), 1, 1);

        for (var i = 0, ul = timeOffsets.count; i < ul; i++) {
            timeOffsets.setX(i, Math.random());
        }
        geometry.addAttribute('timeOffset', timeOffsets);

        var vector = new THREE.Vector4();
        var orientationsStart = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
        for (var i = 0, ul = orientationsStart.count; i < ul; i++) {
            vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vector.normalize();
            orientationsStart.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
        }
        geometry.addAttribute('orientationStart', orientationsStart);

        var orientationsEnd = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
        for (var i = 0, ul = orientationsEnd.count; i < ul; i++) {
            vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vector.normalize();
            orientationsEnd.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
        }
        geometry.addAttribute('orientationEnd', orientationsEnd);

        var material = new THREE.RawShaderMaterial({
            uniforms: {
                time: { value: 1.0 },
                sineTime: { value: 1.0 }
            },
            vertexShader: '\n        precision highp float;\n        uniform float time;\n        uniform mat4 modelViewMatrix;\n        uniform mat4 projectionMatrix;\n        attribute vec3 position;\n        attribute vec3 offset;\n        attribute vec4 color;\n        attribute vec4 orientationStart;\n        attribute vec4 orientationEnd;\n        attribute float timeOffset;\n        varying vec4 vColor;\n        varying float lifeProgress;\n\n        void main(){\n\n          vec3 vPosition = offset;\n\n          lifeProgress = mod(time+timeOffset,1.0);\n\n          vPosition = offset * lifeProgress + position;\n          vec4 orientation = normalize(mix(orientationStart, orientationEnd, lifeProgress));\n          vec3 vcV = cross(orientation.xyz, vPosition);\n          //orientation.w *= time*5.0;\n          vPosition = vcV * (2.0 * orientation.w) + (cross(orientation.xyz, vcV) * 2.0 + vPosition);\n          vColor = color;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );\n        }\n        ',
            fragmentShader: '\n      precision highp float;\n      uniform float time;\n      varying vec4 vColor;\n      varying float lifeProgress;\n\n      void main() {\n        float depth = gl_FragCoord.z / gl_FragCoord.w / 5.0;\n        float opacity = clamp(0.2, 1.0, depth);\n        vec4 color = vColor;\n        color.a = sin(lifeProgress*100.0)*opacity;\n        gl_FragColor = color;\n      }\n      ',
            side: THREE.DoubleSide,
            transparent: true
        });

        var mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        this.mesh = mesh;
    }

    ParticleSystem.prototype.update = function update(dt) {
        this.time += 0.0001;
        this.mesh.material.uniforms.time.value = Math.sin(this.time);
    };

    return ParticleSystem;
}();

/// INIT

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;

// Create the scene
var scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x2e2e2e, 2, 10);

// Create the camera
var aspectRatio = WIDTH / HEIGHT;
var fieldOfView = 60;
var nearPlane = 0.1;
var farPlane = 30;
var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

// Create the renderer
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x151515, 1);
renderer.setSize(WIDTH, HEIGHT);
document.getElementById("background").appendChild(renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);


function handleWindowResize() {
    // update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

var render = function render() {
    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();
    particles.update(delta);
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
};

//////////
// INIT
//////////
window.addEventListener('resize', handleWindowResize, false);

//set camera at eyes height
camera.position.y = 1.7;
camera.position.z = 0.5;

// create particles
var particles = new ParticleSystem();
particles.mesh.position.y = 4;
scene.add(particles.mesh);

// start render
var clock = new THREE.Clock();
render();