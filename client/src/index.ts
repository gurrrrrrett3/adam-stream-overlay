import io from 'socket.io-client';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import SpriteManager from './classes/spriteManager';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const socket = io();


export default class Main {

    public static lastFrameTime = 0;
    public static fps = 0;

    public static socket = socket;
    public static status = 'disconnected';

    public static resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public static animate(frame: number) {

        Main.fps = 1000 / (frame - Main.lastFrameTime);
        Main.lastFrameTime = frame;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.fillText(`${Main.fps.toFixed(0)} fps`, 10, 10);
        ctx.fillStyle = Main.status === 'connected' ? 'green' : 'red';
        ctx.fillText(Main.status, 10, 20);

        SpriteManager.drawSprites(ctx);

        requestAnimationFrame(Main.animate);
    }
}

Main.resizeCanvas();
Main.animate(0);

window.addEventListener('resize', Main.resizeCanvas);

socket.on('connect', () => {
    Main.status = 'connected';
    console.log('connected');
});

socket.on('disconnect', () => {
    Main.status = 'disconnected';
    console.log('disconnected');
});
