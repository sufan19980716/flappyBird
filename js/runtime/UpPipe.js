import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";

export class UpPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage('upPipe');
        super(img,top);
    }

    draw(){
        this.y = this.top - this.height;
        super.draw();
    }
}