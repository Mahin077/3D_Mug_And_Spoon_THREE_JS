// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 6);

// create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create the mug geometry
const mugGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32, 1, true);
const mugMaterial = new THREE.MeshPhongMaterial({
  color: 0xB22222,
  shininess: 200,
  side: THREE.DoubleSide,
});

// create the handle geometry
const handleGeometry = new THREE.TorusGeometry(0.9, 0.125, 16);
const handleMaterial = new THREE.MeshPhongMaterial({
  color: 0xB22222,
  shininess: 200,
  side: THREE.DoubleSide,
});

// create the spoon geometry
var spoonGeometry = new THREE.CylinderGeometry(0.15, 0.01, 2.2, 32);
var spoonMaterial = new THREE.MeshPhongMaterial({
    color: 0x999999,
    shininess: 500,
});
// create the mug mesh
const mugMesh = new THREE.Mesh(mugGeometry, mugMaterial);
scene.add(mugMesh);

// create the handle mesh
const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
handleMesh.position.x = -1.5;
mugMesh.add(handleMesh);

// create the spoon mesh
var spoonMesh = new THREE.Mesh(spoonGeometry, spoonMaterial);
spoonMesh.position.set(1.2, 1.5, 0);
scene.add(spoonMesh);

// add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0.8, 0.5, 1);
scene.add(directionalLight);

// Define a function to handle the camera movement
function animate() {
  requestAnimationFrame(animate);
  //mugMesh.rotation.y += 0.01;
  camera.position.x = 5 * Math.sin(Date.now() * 0.001);
  camera.position.z = 5 * Math.cos(Date.now() * 0.001);
  camera.lookAt(mugMesh.position);
  renderer.render(scene, camera);
}
animate();

// add keyboard interaction to stir spoon in the mug
document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
      case 37: // left arrow
        if(spoonMesh.position.x>-0.125)
        {
          spoonMesh.position.x-=0.08;
          spoonMesh.position.z+=0.02;
        }
        if(spoonMesh.position.x<-0.125 && spoonMesh.position.x>-0.13)
        {
          spoonMesh.position.x-=0.08;
        }
        if(spoonMesh.position.x<-0.13 && spoonMesh.position.x>-1.2)
        {
          spoonMesh.position.x-=0.08;
          spoonMesh.position.z-=0.02;
        }
        break;
      case 39: // right arrow
          if(spoonMesh.position.x<1.2 && spoonMesh.position.x > -0.125)
          {
            spoonMesh.position.x += 0.08;
            spoonMesh.position.z += 0.02;
          }
          if(spoonMesh.position.x<-0.125 && spoonMesh.position.x>-0.13)
          {
            spoonMesh.position.x+=0.08;
          }
          if (spoonMesh.position.x < -0.125) {
            spoonMesh.position.x += 0.08;
            spoonMesh.position.z -= 0.02;
          }
          break;

  }
});

var click = 0;
// add mouse interaction to change the mug color
function onClick(event) {
  if (click < 5)
              click += 1;
          else
              click = 1;

          switch (click) {
              case 1:
                mugMaterial.color.set(0x0000ff); // blue
                handleMaterial.color.set(0x0000ff);
                break;
              
              case 2:
                mugMaterial.color.set(0x808080); // gray
                handleMaterial.color.set(0x808080);
                break;
              case 3:
                mugMaterial.color.set(0x008000); // green
                handleMaterial.color.set(0x008000);
                break;
              case 4:
                mugMaterial.color.set(0xFF0000); // red
                handleMaterial.color.set(0xFF0000);
                break;
              case 5:
                mugMaterial.color.set(0xB22222); // FireBrick
                handleMaterial.color.set(0xB22222);
                break;
              
          }
}
window.addEventListener('click', onClick);