import Sprite from "./sprite";

export default class SpriteManager {

    public static sprites: Record<string, Sprite> = {};

    public static addSprite(sprite: Sprite) {
        this.sprites[sprite.id] = sprite;
    }

    public static removeSprite(id: string) {
        delete this.sprites[id];
    }

    public static drawSprites(ctx: CanvasRenderingContext2D) {
        for (const id in this.sprites) {
            this.sprites[id].draw(ctx);
        }
    }

    public static getSpriteAt(x: number, y: number) {
        for (const id in this.sprites) {
            if (this.sprites[id].isPointInside(x, y)) {
                return this.sprites[id];
            }
        }
        return null;
    }

    public static getCollidingSprite(sprite: Sprite) {
        for (const id in this.sprites) {
            if (this.sprites[id].isColliding(sprite)) {
                return this.sprites[id];
            }
        }
        return null;
    }

    public static getCollidingSprites(sprite: Sprite) {
        const collidingSprites: Sprite[] = [];
        for (const id in this.sprites) {
            if (this.sprites[id].isColliding(sprite)) {
                collidingSprites.push(this.sprites[id]);
            }
        }
        return collidingSprites;
    }

    public static getSpriteById(id: string) {
        return this.sprites[id];
    }
}