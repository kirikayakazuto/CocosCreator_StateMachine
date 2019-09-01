
const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    fsm = new StateMachine({
 
        transitions: [
            { name: 'start', from: 'none',   to: 'green'  },
            { name: 'warn',  from: 'green',  to: 'yellow' },
            { name: 'panic', from: 'green',  to: 'red'    },
            { name: 'panic', from: 'yellow', to: 'red'    },
            { name: 'calm',  from: 'red',    to: 'yellow' },
            { name: 'clear', from: 'red',    to: 'green'  },
            { name: 'clear', from: 'yellow', to: 'green'  },
        ],
    
        methods: {
            
            onTransition: function(lifecycle) {
                console.log(lifecycle);
                Helloworld.Instance.refrshUI();
            },
        }
    });

    @property(cc.Node)
    ButtonParent: cc.Node = null;
    @property(cc.Node)
    ColorParent: cc.Node = null;

    static Instance: Helloworld = null;
    static setInstance(instance: any) {
        this.Instance = instance;
    }

    onLoad() {
        Helloworld.setInstance(this);
        this.fsm.start();
    }

    start () {
        
        
        
    }

    private refrshUI() {
        
        this.scheduleOnce(() => {
            this.ButtonParent.children[0].getComponent(cc.Button).interactable = this.fsm.can('clear', true);
            this.ButtonParent.children[1].getComponent(cc.Button).interactable = this.fsm.can('calm', true);
            this.ButtonParent.children[2].getComponent(cc.Button).interactable = this.fsm.can('warn', true);
            this.ButtonParent.children[3].getComponent(cc.Button).interactable = this.fsm.can('panic', true);

            for(const node of this.ColorParent.children) {
                node.active = false;        
            }
    
            switch(this.fsm.state) {
                case "green":
                    this.ColorParent.children[0].active = true;
                break;
                case "red":
                    this.ColorParent.children[1].active = true;
                break;
                case "yellow":
                    this.ColorParent.children[2].active = true;
                break;
            }
        }, 0);

        
    }

    buttonclick(e, data) {
        switch(data) {
            case "clear":
               this.fsm.clear();
            break;
            case "calm":
                this.fsm.calm();
            break;
            case "warn":
                this.fsm.warn();
            break;
            case "panic":
                this.fsm.panic();
            break;
        }
    }
}




