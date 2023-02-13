import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

(async () => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = async function () {
        const scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const model = await BABYLON.SceneLoader.ImportMeshAsync(
            "","./assets/", "model.glb", scene);
        const modelMesh = model.meshes[0];
        modelMesh.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);

        const sixDofDragBehavior = new BABYLON.SixDofDragBehavior();
        modelMesh.addBehavior(sixDofDragBehavior);

        try {
            const xrHelper = await scene.createDefaultXRExperienceAsync();
            const featuresManager = xrHelper.baseExperience.featuresManager;
            featuresManager.enableFeature(BABYLON.WebXRFeatureName.HAND_TRACKING, "latest",
            {
                xrInput: xrHelper.input,
            });
        } catch (e) {
            console.log(e);
        }

        return scene;
    }

    const scene = await createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}) ()