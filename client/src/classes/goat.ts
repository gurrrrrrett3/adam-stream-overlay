import Sprite from "./sprite";

export default class Goat extends Sprite {

    public username: string;


    constructor(username: string) {
        super(0, 0, 0, 0, new Image());
        this.username = username;
    }


}