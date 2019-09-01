
const {ccclass, property} = cc._decorator;

@ccclass
export default class GraphicsCtrl extends cc.Component {


    Graphics: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Graphics = this.getComponent(cc.Graphics);
        this.Graphics.lineWidth = 10;
    }

    start () {
        for(const node of this.node.children) {
            this.Graphics.strokeColor = node.color;
            let pos = cc.v2(-(node.width/2 + 5)+node.x, -(node.height/2+5) + node.y);
            this.Graphics.moveTo(pos.x, pos.y);

            pos = cc.v2(-(node.width/2 + 5)+node.x, (node.height/2+5) + node.y);
            this.Graphics.lineTo(pos.x, pos.y);
            pos = cc.v2((node.width/2 + 5)+node.x, (node.height/2+5) + node.y);
            this.Graphics.lineTo(pos.x, pos.y);
            pos = cc.v2((node.width/2 + 5)+node.x, -(node.height/2+5) + node.y);
            this.Graphics.lineTo(pos.x, pos.y);
            pos = cc.v2(-(node.width/2 + 5)+node.x, -(node.height/2+5) + node.y);
            this.Graphics.lineTo(pos.x, pos.y);

            this.Graphics.stroke();
        }
    }

    // update (dt) {}
}
