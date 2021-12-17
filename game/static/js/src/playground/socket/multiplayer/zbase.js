class MultiPlayerSocker {
    constructor(playground) {
        this.playground = playground;

        this.ws = new WebSocket("wss://www.wintersun1208.com/wss/multiplayer/");
        this.start();
    }

    start() {

    }
}
