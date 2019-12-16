import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";
// 导演类,控制游戏的逻辑
export class Director{
  constructor(){
    this.dataStore = DataStore.getInstance();
  }

  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }
  // 创建水管组的方法
  createPipes(){
    const minTop=this.dataStore.canvas.height/8;
    const maxTop=this.dataStore.canvas.height/2;
    const top = Math.random()*(maxTop-minTop)+minTop;
    this.dataStore.get('pipes').push(new UpPipe(top));
    this.dataStore.get('pipes').push(new DownPipe(top));
  }

  // 程序运行的方法
  run(){
    this.dataStore.get('background').draw();
    this.dataStore.get('land').draw();
    // 获取水管组
    const pipes = this.dataStore.get('pipes');
    // 判断,添加水管
    // 水管超过界面的一半
    if( pipes[0].x<(this.dataStore.canvas.width/2-pipes[0].width) && pipes.length==2 ){
      this.createPipes();
    }
    // 删除过界的水管
    if(pipes[0].x+pipes[0].width<0 && pipes.length==4){
        pipes.shift();
        pipes.shift();
    }

    // 遍历pipes,并画图
    pipes.forEach(p=>{
      p.draw();
    });


    this.id = requestAnimationFrame(()=>this.run());
    // cancelAnimationFrame()
  }
}