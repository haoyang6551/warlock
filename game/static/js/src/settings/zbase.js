class Settings {
    constructor(root) {
        this.root = root;
        this.platform == "WEB";
        if (this.root.gameos) this.platform = "APP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class = "game-settings">
    <div class="game-settings-login">
        <div class="game-settings-title">
            登录
        </div>
        <div class="game-settings-username">
            <div class="game-settings-item">
                <input style="font-size: 1.3vh;" type="text" placeholder="用户名">
            </div>
        </div>
        <div class="game-settings-password">
            <div class="game-settings-item">
                <input style="font-size: 1.3vh;" type="password" placeholder="密码">
            </div>
        </div>
        <div class="game-settings-submit">
            <div class="game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="game-settings-error-message">
        </div>
        <div class="game-settings-option">
            注册
        </div>
    </div>
    <div class="game-settings-register">
        <div class="game-settings-title">
            注册
        </div>
        <div class="game-settings-username">
            <div class="game-settings-item">
                <input style="font-size: 1.3vh;" type="text" placeholder="用户名">
            </div>
        </div>
        <div class="game-settings-password game-settings-password-first">
            <div class="game-settings-item">
                <input style="font-size: 1.3vh;" type="password" placeholder="密码">
            </div>
        </div>
        <div class="game-settings-password game-settings-password-second">
            <div class="game-settings-item">
                <input style="font-size: 1.3vh;" type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="game-settings-submit">
            <div class="game-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="game-settings-error-message">
        </div>
        <div class="game-settings-option">
            登录
        </div>
    </div>
    <div class="IPC">
        <a style="color:white; text-decoration:none;font-size: 1vh;" href="http://beian.miit.gov.cn/" target="_blank">
            <center>蜀ICP备2021029721号</center>
        </a>
    </div>
</div>
`);
        this.$login = this.$settings.find(".game-settings-login");
        this.$login_username = this.$login.find(".game-settings-username input");
        this.$login_password = this.$login.find(".game-settings-password input");
        this.$login_submit = this.$login.find(".game-settings-submit button");
        this.$login_error_message = this.$login.find(".game-settings-error-message");
        this.$login_register = this.$login.find(".game-settings-option");


        this.$login.hide();

        this.$register = this.$settings.find(".game-settings-register");
        this.$register_username = this.$register.find(".game-settings-username input");
        this.$register_password = this.$register.find(".game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".game-settings-password-second input");
        this.$register_submit = this.$register.find(".game-settings-submit button");
        this.$register_error_message = this.$register.find(".game-settings-error-message");
        this.$register_login = this.$register.find(".game-settings-option");


        this.$register.hide();

        this.root.$yh_game_id.append(this.$settings);
        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();

    }

    add_listening_events () {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {     // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();
        $.ajax({
            url: "https://www.wintersun1208.com/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {      //  在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();


        $.ajax({
            url: "https://www.wintersun1208.com/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        })

    }

    logout_on_remote() {    // 在远程服务器上登出
        if (this.platform === "APP") return false;
        $.ajax({
            url: "https://www.wintersun1208.com/settings/logout/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                }
            }
        });
    }

    register() {    // 打开注册界面
        this.$login.hide();
        this.$register.show();

    }

    login() {       // 打开登录界面
        this.$register.hide();
        this.$login.show();

    }

    getinfo() {
        let outer = this;
        $.ajax({
            url: "https://www.wintersun1208.com/settings/getinfo/",
            type: "GET",
            data: {
                platform : outer.platform,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }

        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }

}
