import Jogador from "../jogador.js";

export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaJogo'
        });
        this.pontuacao = 0;
        this.pontuacaoTexto;
        this.fimJogo = false;
        this.grupoTesouros;
        this.grupoInimigos;
    }



    coletaTesouro(jogador, tesouro) {
        tesouro.disableBody(true, true);
        this.pontuacao += 5
        this.pontuacaoTexto.setText('pontuação: ' + this.pontuacao);

        if (this.grupoTesouros.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.grupoTesouros.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            let x = (jogador.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            let inimigo = this.grupoInimigos.create(x, 16, 'inimigo');
            inimigo.setBounce(1);
            inimigo.setCollideWorldBounds(true);
            inimigo.setVelocity(Phaser.Math.Between(-200, 200), 20);
            inimigo.allowGravity = false;

        }
    }

    colideInimigo(jogador) {
        this.physics.pause();

        jogador.setTint(0xff0000);

        //player.anims.play('turn');

        this.fimJogo = true;
    }



    preload() {

    }

    // aqui criamos os objetos do jogo
    create() {


        const imagemFundo = this.add.image(0, 0, 'floresta');
        //imagemFundo.scaleX = imagemFundo.scaleY;
        // aqui temos um set origin para mudarmos o inicio da imagem
        // que por padrao do phaser é no centro
        imagemFundo.setOrigin(0, 0);

        this.pontuacaoTexto = this.add.text(16, 16, 'pontuação: 0', { fontSize: '12px', fill: '#000', fontweight: 'bold' });

        // aqui adicionanmos as plataformas no grupo de physics estático
        const plataformas = this.physics.add.staticGroup();
        plataformas.create(0, 250, 'chao').setOrigin(0, 0).refreshBody();
        plataformas.create(300, 70, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(500, 150, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(700, 70, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(900, 150, 'plataforma').setOrigin(0, 0).refreshBody();

        // aqui instanciamos o jogador e adicionamos nas physics 
        // que por padrão é dinamico onde controlaremos pelas setas
        this.jogador = new Jogador(this);

        // aqui iremos criar outro grupo de tesouros
        this.grupoTesouros = this.physics.add.group({
            key: 'tesouro',
            repeat: 4,
            setXY: { x: 100, y: 0, stepX: 200 }
        })

        this.grupoTesouros.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        // aqui o objeto collider monitora todas as colisoes
        this.physics.add.collider(this.jogador.sprite, plataformas);
        this.physics.add.collider(this.grupoTesouros, plataformas)
        this.physics.add.overlap(this.jogador.sprite, this.grupoTesouros, this.coletaTesouro, null, this)

        // aqui iremos criar o grupo de inimigos
        this.grupoInimigos = this.physics.add.group()
        this.physics.add.collider(this.grupoInimigos, plataformas);
        this.physics.add.collider(this.jogador.sprite, this.grupoInimigos, this.colideInimigo, null, this);


        // aqui iremos gerenciador de inputs do teclado
        this.teclas = this.input.keyboard.createCursorKeys();
    }

    // aqui temos o update de toda a lógica do jogo
    update() {
        const jogador = this.jogador.sprite;

        if (this.fimJogo) {
            alert("RIP")
        }

        // aqui as setas da esquerda, direita, ou "idle"
        if (this.teclas.left.isDown) {
            jogador.setVelocityX(-160);
            jogador.setFlip(true, false)
            jogador.anims.play('esquerda', true);
        }
        else if (this.teclas.right.isDown) {
            jogador.setVelocityX(160);
            jogador.setFlip(false, false)
            jogador.anims.play('direita', true);
        } else {
            jogador.setVelocityX(0);
            if (jogador.body.touching.down) {
                jogador.anims.play('atoa');
            }
        }

        // aqui a seta para cima quando o jogador está tocando o chão
        if (this.teclas.up.isDown && jogador.body.touching.down) {
            jogador.setVelocityY(-150);
            jogador.anims.play('pulando')
        }
    }
}


