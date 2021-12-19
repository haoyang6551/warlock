let GAME_OBJECTS = [];

class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);
        this.has_called_start = false;          // 是否执行过start函数
        this.timedelta = 0;                     // 当前帧距离上一帧的时间间隔，单位是ms
        this.uuid = this.create_uuid();

        console.log(this.uuid);
    }

    create_uuid() {
        let res = "";
        for (let i = 0; i < 16; i ++) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
    }

    start() {                                   // 只会在第一帧执行一次

    }

    update() {                                  // 每一帧均会执行一次，除了第一帧外

    }

    on_destroy() {                              // 在被销毁前执行一次

    }

    destroy() {                                 // 删除该物体
        this.on_destroy();

        for (let i = 0; i < GAME_OBJECTS.length; i ++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}


let last_timestamp;
let GAME_ANIMATION = function(timestamp) {

    for (let i = 0; i < GAME_OBJECTS.length; i ++) {
        let obj = GAME_OBJECTS[i];
        if (!obj.has_called_start)
        {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(GAME_ANIMATION);
}

requestAnimationFrame(GAME_ANIMATION);

