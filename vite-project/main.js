import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mongo } from 'mongoose';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(5);

renderer.render(scene,camera);

//torus
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0x2452f3, metalness: 0.5});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)



//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//light helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,200);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [ x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('stwrspace.jpg');
scene.background = spaceTexture;


const vedTexture = new THREE.TextureLoader().load('photo.jpg');
const normalTexture = new THREE.TextureLoader().load('dsnormal.jpg');
const ved = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({
    map: vedTexture,
    normalMap: normalTexture
  })
);




const deathStarTexture = new THREE.TextureLoader().load('deathstarmap.jpg');
const deathStar = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map: deathStarTexture})
);
 
scene.add(ved, deathStar);

deathStar.position.z = 30;
deathStar.position.setX(-35);
deathStar.position.setY(17);



function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  deathStar.rotation.x += 0.05;
  deathStar.rotation.y += 0.075;
  deathStar.rotation.z += 0.05;

  ved.rotation.y += 0.01;
  ved.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * 0.008;
  camera.position.y = t * -0.005;
}

document.body.onscroll = moveCamera;


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()



// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
