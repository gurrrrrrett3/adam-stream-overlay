export default class Sprite {

    public readonly id = Math.random().toString(36).substr(2, 9);
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public image: HTMLImageElement;

    constructor(x: number, y: number, width: number, height: number, image: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    public isColliding(sprite: Sprite) {
        return this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y;
    }

    public isPointInside(x: number, y: number) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }

    public setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public setImage(image: HTMLImageElement) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    public moveTo(x: number, y: number, time: number) {
        const angle = Math.atan2(y - this.y, x - this.x);
        const distance = Math.hypot(x - this.x, y - this.y);
        const speed = distance / time;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const interval = setInterval(() => {
            this.x += dx;
            this.y += dy;
            if (Math.hypot(x - this.x, y - this.y) < speed) {
                clearInterval(interval);
                this.x = x;
                this.y = y;
            }
        }, 1000 / 60);
    }

}