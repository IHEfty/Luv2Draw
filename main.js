    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    const orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;

    const ambient = new THREE.AmbientLight(0xffffff, 1);  
    scene.add(ambient);

    const fillMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const wireMat = new THREE.LineBasicMaterial({ color: 0x000000 });

    const group = new THREE.Group();
    scene.add(group);

    let sphereMesh, face, equator, vertical, tilt;
    let cubeMesh;

    function makeCircle(radius, segments, axis = 'y') {
      const pts = [];
      for(let i = 0; i <= segments; i++){
        const a = (i / segments) * Math.PI * 2;
        if(axis === 'y') pts.push(new THREE.Vector3(Math.cos(a)*radius, 0, Math.sin(a)*radius));
        else if(axis === 'x') pts.push(new THREE.Vector3(0, Math.cos(a)*radius, Math.sin(a)*radius));
        else pts.push(new THREE.Vector3(Math.cos(a)*radius, Math.sin(a)*radius, 0));
      }
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), wireMat);
    }

    function makeLoomisHead(){
      sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), fillMat);

      face = new THREE.Mesh(
        new THREE.CircleGeometry(0.98, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: fillMat.opacity })
      );
      face.position.x = 0.97;
      face.rotation.y = Math.PI/2;

      equator = makeCircle(1.001, 64, 'y');
      vertical = makeCircle(1.001, 64, 'z');
      tilt = makeCircle(1.001, 64, 'x');

      group.add(sphereMesh, face, equator, vertical, tilt);
    }

    function makeCube(){
      cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), fillMat);
      const boxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(2,2,2));
      const edgeLines = new THREE.LineSegments(boxEdges, wireMat);
      group.add(cubeMesh, edgeLines);
    }

    function clearSceneGroup(){
      while(group.children.length){
        group.remove(group.children[0]);
      }
    }

    function refreshShape(){
      clearSceneGroup();
      const selected = document.getElementById("shapeSelect").value;
      if(selected === 'loomis') makeLoomisHead();
      else makeCube();
    }

    function applyOpacity(){
      const val = parseFloat(document.getElementById("opacity").value);
      fillMat.opacity = val;
      if(face) face.material.opacity = val;
      if(cubeMesh) cubeMesh.material.opacity = val;
    }

    function applyRotation(){
      const x = parseFloat(document.getElementById("rotX").value) * Math.PI / 180;
      const y = parseFloat(document.getElementById("rotY").value) * Math.PI / 180;
      const z = parseFloat(document.getElementById("rotZ").value) * Math.PI / 180;
      group.rotation.set(x, y, z);
    }

    const bgImg = document.getElementById("bgImg");

    function moveBgImage(){
      const scl = parseFloat(document.getElementById("imgScale").value);
      const offsetX = parseFloat(document.getElementById("imgPosX").value);
      const offsetY = parseFloat(document.getElementById("imgPosY").value);
      bgImg.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scl})`;
    }

    function resizeBgImage(){
      const w = parseFloat(document.getElementById("imgWidth").value);
      const h = parseFloat(document.getElementById("imgHeight").value);
      bgImg.style.width = w + "px";
      bgImg.style.height = h > 0 ? h + "px" : "auto";
      moveBgImage();  
    }

    document.getElementById("bgInput").addEventListener("change", function(evt){
      const file = evt.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(e){
        bgImg.src = e.target.result;
        resizeBgImage();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("imgWidth").oninput = resizeBgImage;
    document.getElementById("imgHeight").oninput = resizeBgImage;
    document.getElementById("imgScale").oninput = moveBgImage;
    document.getElementById("imgPosX").oninput = moveBgImage;
    document.getElementById("imgPosY").oninput = moveBgImage;

    document.getElementById("shapeSelect").onchange = () => {
      refreshShape();
      applyOpacity();
      applyRotation();
    };
    document.getElementById("opacity").oninput = applyOpacity;
    document.getElementById("rotX").oninput = applyRotation;
    document.getElementById("rotY").oninput = applyRotation;
    document.getElementById("rotZ").oninput = applyRotation;

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.getElementById("toggle-controls").addEventListener("click", () => {
      const panel = document.getElementById("controls");
      panel.classList.toggle("collapsed");
      const collapsed = panel.classList.contains("collapsed");
      document.getElementById("toggle-controls").innerHTML = collapsed
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"></path></svg> `
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"></path></svg> `;
    });

    refreshShape();
    applyOpacity();
    applyRotation();
    resizeBgImage();

    function animate(){
      requestAnimationFrame(animate);
      orbit.update();  
      renderer.render(scene, camera);
    }
    animate();
