import { Color, Mesh, MeshPhongMaterial, PlaneGeometry, Scene } from "three";
import { LightManager } from "../Light/LightManager";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Character } from "./Character";
import { Keypress } from "../InputEvents/Keypress";

export class SceneManager {
  private keypress: Keypress = new Keypress();
  public static readonly GLTF_LOADER: GLTFLoader = new GLTFLoader();
  private scene: Scene;
  private character: Character;

  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color("#7EC2F0");

    const lightManger = new LightManager();
    lightManger.render(this.scene);

    this.createPlane();
    this.character = new Character(this, this.keypress);
  }

  private createPlane() {
    const planeGeometry = new PlaneGeometry(20, 20);
    const plane = new Mesh(planeGeometry, new MeshPhongMaterial({ color: 0xbababa }));
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  public getKeypress(): Keypress {
    return this.keypress;
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getCharacter(): Character {
    return this.character
  }
}