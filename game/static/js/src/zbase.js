class Game {
    constructor(id) {
        this.id = id;
        this.$yh_game_id = $('#' + id);
        this.menu = new GameMenu(this);
        this.playground = new GamePlayground(this);

        this.start();
    }

    start() {

    }

}
