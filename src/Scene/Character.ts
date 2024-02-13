import { Mesh, Object3D } from "three";
import { SceneManager } from "./SceneManager";
import { Keypress } from "../InputEvents/Keypress";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { IAnimatedObject } from "./IAnimatedObject";
import { IKeypressItem } from "../InputEvents/IKeypressItem";

export class Character implements IAnimatedObject, IKeypressItem {
    private sceneManager: SceneManager;
    private object: Object3D | undefined;
    private loading: boolean = true;
    public readonly keypress: Keypress;

    constructor(sceneManager: SceneManager, keypress: Keypress) {
        this.sceneManager = sceneManager;
        this.keypress = keypress
        this.init();
    }

    private init() {
        SceneManager.GLTF_LOADER.load('/character.gltf', (gltf: GLTF) => {
            this.object = gltf.scene.children[0] as Object3D;
            this.object.rotateZ(Math.PI / 2);

            this.object.traverse((child: any) => {
                if ((child as Mesh).isMesh) {
                    (child as Mesh).castShadow = true;
                    (child as Mesh).receiveShadow = true;
                }
            });

            this.sceneManager.getScene().add(this.object);
            this.loading = false;
        }, undefined, (error: ErrorEvent) => {
            throw new Error(error.message);
        });
    }

    public animate(): void {
        this.move();
    }

    private move() {
        if (this.loading) {
            return;
        }

        if (!this.object) {
            throw new Error('Character not found!');
        }

        if (this.keypress.isKeyPressed(Keypress.ARROW_UP)) {
            this.object.position.x -= 0.1;
        }

        if (this.keypress.isKeyPressed(Keypress.ARROW_RIGHT)) {
            this.object.position.z -= 0.1;
        }

        if (this.keypress.isKeyPressed(Keypress.ARROW_DOWN)) {
            this.object.position.x += 0.1;
        }

        if (this.keypress.isKeyPressed(Keypress.ARROW_LEFT)) {
            this.object.position.z += 0.1;
        }
    }

    public getObject(): Object3D | undefined {
        return this.object;
    }
}