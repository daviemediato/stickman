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
            barraDeProgresso.lineStyle(4, 0xffff00, 1);
            barraDeProgresso.strokeRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra, 20);
        });

        // aqui apos fazer o load iremos para a cena do jogo
        this.load.on('complete', () => {
            this.scene.start('CenaJogo');
        });

        // aqui carregamos todos os assets
        this.load.image('floresta', 'imgs/background.png');
        this.load.image('chao', 'imgs/chao.png');
        this.load.image('plataforma', 'imgs/platform.png');
        this.load.image('inimigo', 'imgs/inrainbows.jpg');
        this.load.spritesheet('tesouro', 'imgs/treasure-chests.png', { frameWidth: 36, frameHeight: 26 })
        this.load.spritesheet('jogador', 'imgs/stick-man.png', { frameWidth: 35, frameHeight: 53 });
    }

    create() {

    }

    update() {

    }
}