export default class CenaCarregamento extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaCarregamento'
        });
    }

    // aqui fazemos o pre carregamento de todos os "assets"
    // em que é "chamada" no inicio
    preload() {
        const larguraJogo = this.sys.canvas.width;
        const barraDeProgresso = this.add.graphics();

        // aqui atualizamos a barra de progresso
        const larguraBarra = 0.8 * larguraJogo;
        this.load.on('progress', (value) => {
            barraDeProgresso.clear();
            barraDeProgresso.fillStyle(0xffffff, 1);
            barraDeProgresso.fillRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra * value, 20);
            barraDeProgresso.lineStyle(4, 0xffffff, 1);
            barraDeProgresso.strokeRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra, 20);
        });

        // aqui apos fazer o load iremos para a cena do jogo
        this.load.on('complete', () => {
            this.scene.start('CenaMenu');
        });

        // aqui temos os assets de funcionabilidade
        this.load.image('menu', 'imgs/menu.png');
        this.load.image('play_button', 'imgs/play_button.png');
        this.load.image('options_button', 'imgs/options_button.png');
        this.load.image('options_bg', 'imgs/options.png')
        this.load.image('restart_button', 'imgs/restart_button.png')
        this.load.image('back_button', 'imgs/back_button.png')
        this.load.image('hover', 'imgs/hover.png');

        // aqui temos os assets do ambiente
        this.load.image('floresta_1', 'imgs/background_1.png');
        this.load.image('floresta_2', 'imgs/background_2.png');
        this.load.image('floresta_3', 'imgs/background_3.png');
        this.load.image('floresta_4', 'imgs/background_4.png');
        this.load.image('floresta_5', 'imgs/background_5.png');
        this.load.image('floresta_6', 'imgs/background_6.png');
        this.load.image('chao', 'imgs/chao.png');
        this.load.image('plataforma', 'imgs/platform.png');

        // aqui temos os assets dos personagems
        this.load.image('inimigo_0', 'imgs/inrainbows.jpg');
        this.load.image('inimigo_1', 'imgs/okcomputer.jpg');
        this.load.image('inimigo_2', 'imgs/kida.jpg');
        this.load.image('inimigo_3', 'imgs/moon.jpg');
        this.load.spritesheet('jogador', 'imgs/stick-man.png', { frameWidth: 35, frameHeight: 53 });

        // aqui temos os assets de itens
        this.load.image('tesouro', 'imgs/gold.png')
        this.load.image('tempo', 'imgs/tempo.png')

    }

    create() {

    }

    update() {

    }
}