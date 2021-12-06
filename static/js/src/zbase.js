export class Game {
    constructor(id, gameos) {
        this.id = id;
        this.$yh_game_id = $('#' + id);
        this.gameos = gameos;

        this.settings = new Settings(this);
        this.menu = new GameMenu(this);
        this.playground = new GamePlayground(this);
        this.start();
    }

    start() {
    }
}
