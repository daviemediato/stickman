export default class CenaMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaMenu'
        });
    }


    // aqui iremos fazer o menu do jogo com interatividade
    criaMenu() {
        const larguraJogo = this.game.renderer.width;
        const alturaJogo = this.game.renderer.height;

        const imagemMenu = this.add.image(0, 0, 'menu');
        imagemMenu.setOrigin(0, 0).setDepth(0)
        const imagemPlayButton = this.add.image(larguraJogo / 2, alturaJogo / 2, 'play_button').setDepth(1)
        const imagemOptionsButton = this.add.image(larguraJogo / 2, alturaJogo / 2 + 100, 'options_button').setDepth(1)
        const imagemBackButton = this.add.image(700, 570, 'back_button').setDepth(1)
        imagemBackButton.setVisible(false)
        const imagemHover = this.add.image(100, 100, 'hover').setDepth(1)
        imagemHover.setVisible(false)

        imagemBackButton.setInteractive()
        imagemOptionsButton.setInteractive()
        imagemPlayButton.setInteractive()

        // aqui temos as acoes do botao play
        imagemPlayButton.on('pointerover', () => {
            imagemHover.setVisible(true);
            imagemHover.x = imagemPlayButton.x - imagemPlayButton.width;
            imagemHover.y = imagemPlayButton.y;
        })
        imagemPlayButton.on('pointerout', () => {
            imagemHover.setVisible(false);
        })
        imagemPlayButton.on('pointerdown', () => {
            this.scene.start('CenaJogo');
        })

        // aqui temos as acoes do botao button
        imagemOptionsButton.on('pointerover', () => {
            imagemHover.setVisible(true);
            imagemHover.x = imagemOptionsButton.x - imagemOptionsButton.width;
            imagemHover.y = imagemOptionsButton.y;
        })
        imagemOptionsButton.on('pointerout', () => {
            imagemHover.setVisible(false);
        })
        imagemOptionsButton.on('pointerdown', () => {
            const imagemCenaOptions = this.add.image(0, 0, 'options_bg')
            imagemCenaOptions.setOrigin(0, 0)
            imagemCenaOptions.setVisible(true)
            imagemPlayButton.setVisible(false)
            imagemOptionsButton.setVisible(false)
            imagemBackButton.setVisible(true)
        })

        // aqui temos as acoes do botao back
        imagemBackButton.on('pointerover', () => {
            imagemHover.setVisible(true);
            imagemHover.x = imagemBackButton.x - imagemBackButton.width;
            imagemHover.y = imagemBackButton.y;
        })
        imagemBackButton.on('pointerout', () => {
            imagemHover.setVisible(false);
        })
        imagemBackButton.on('pointerdown', () => {
            this.scene.start('CenaMenu')
            imagemHover.setVisible(true)
            imagemPlayButton.setVisible(true)
            imagemOptionsButton.setVisible(true)
        })

    }

    preload() {

    }

    create() {
        this.criaMenu()
    }

    update() {

    }
}