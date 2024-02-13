export class Keypress {
    public static readonly ARROW_LEFT = 'ArrowLeft';
    public static readonly ARROW_UP = 'ArrowUp';
    public static readonly ARROW_RIGHT = 'ArrowRight';
    public static readonly ARROW_DOWN = 'ArrowDown';

    private keyMap: Map<string, boolean>;

    constructor() {
        this.keyMap = new Map();
        this.init();
    }

    private init() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyMap.set(event.key, true);
        });

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            this.keyMap.set(event.key, false);
        });
    }

    public isKeyPressed(key: string): boolean {
        return this.keyMap.get(key) || false;
    }
}