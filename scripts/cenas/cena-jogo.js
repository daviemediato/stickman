import Jogador from "../jogador.js";

export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaJogo'
        });

        // aqui as variaveis de controle do jogo
        this.pontuacao = 0;
        this.fimJogo = false;
        this.tempo;
        this.index_inimigo = 0;
        this.gerenciaLevel = 0;

        // aqui temos os possiveis grupos de colisoes
        this.grupoPlataformas;
        this.grupoTesouros;
        this.grupoTempos;
        this.grupoInimigos;
        this.plataformaFixa;
        this.plataformaMovimentaH;
        this.plataformaMovimentaV;

        // aqui temos os textos (gambiarra)
        this.pontuacaoTexto;
        this.tempoTexto;
        this.fimJogoTexto;
        this.textoLevel;
        this.levelGeralTexto;
    }


    // aqui gerenciamos o item tempo
    gerenciaItemTempo(jogador, item) {
        item.disableBody(true, true);
        this.tempo += Math.floor(Math.random() * (15) + 5);

        if (this.grupoTempos.countActive(true) === 0) {

            this.time.addEvent({
                delay: Math.random() * (2000) + 5000,
                callback: () => {
                    this.grupoTempos.children.iterate(function (child) {
                        child.x = Math.random() * (500) + 200
                        child.enableBody(true, child.x, 0, true, true);

                    });
                },
                loop: false
            })

        }

    }

    gerenciaPlataformas() {
        if (this.gerenciaLevel % 2 == 1) {
            let x_um = Math.random() * (700) + 100;
            let x_dois = Math.random() * (700) + 100;
            this.grupoPlataformas.create(x_um, 300, 'plataforma');
            this.grupoPlataformas.create(x_dois, 300, 'plataforma');
        }
        else {
            this.grupoPlataformas.children.iterate(function (child) {
                child.disableBody()
                child.setVisible(false)
            });
        }


    }

    // aqui gerenciamos o item de pontuacao
    gerenciaItemPontuacao(jogador, item) {
        item.disableBody(true, true);
        this.pontuacao += 5
        this.pontuacaoTexto.setText('pontuação: ' + this.pontuacao);

        if (this.grupoTesouros.countActive(true) === 0) {

            this.grupoTesouros.children.iterate(function (child) {
                child.x = Math.random() * (700) + 40
                child.enableBody(true, child.x, 0, true, true);
            });

            let x = (jogador.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            let inimigo = this.grupoInimigos.create(x, 16, `inimigo_${this.index_inimigo}`);
            this.index_inimigo++;

            this.gerenciaAtualizaLevel(this.gerenciaLevel)
            this.gerenciaPlataformas(this.gerenciaLevel)

            if (this.index_inimigo == 4) {
                this.index_inimigo = 0;
            }

            inimigo.setBounce(1);
            inimigo.setCollideWorldBounds(true);
            inimigo.setVelocity(Phaser.Math.Between(-200, 200), 20);
            inimigo.allowGravity = false;


        }

    }





    // aqui iremos gerenciar a atualizacao de levels
    gerenciaAtualizaLevel(level) {
        this.textoLevel = this.add.text(400, 230, 'Level ' + level + ' Complete!', { fontSize: '64px', fill: '#ff1493', fontweight: 'bold' });
        this.textoLevel.setVisible(true);
        this.textoLevel.setText('Level ' + level + ' Complete!')
        this.gerenciaLevel++;
        this.levelGeralTexto.setText('level : ' + this.gerenciaLevel)
        this.textoLevel.setOrigin(0.5);
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.textoLevel.setVisible(false);
            },
            loop: false
        })
    }

    // aqui iremos gerenciar o inicio do jogo
    gerenciaIniciaJogo() {
        this.pontuacao = 0;
        this.tempo = 10;
        this.index_inimigo = 0;
        this.gerenciaLevel = 0
        this.fimJogo = false;
    }

    // aqui iremos gerenciar o game over
    gerenciaGameOver(jogador) {
        this.physics.pause();
        jogador.anims.stop()
        this.fimJogo = true;


        this.fimJogoTexto = this.add.text(400, 230, 'Game Over', { fontSize: '84px', fill: '#f00', fontweight: 'bold' });
        this.fimJogoTexto.setOrigin(0.5);
        this.fimJogoTextosetVisible = true;
        const imagemRestartButton = this.add.image(700, 570, 'restart_button').setDepth(1)
        imagemRestartButton.setVisible(true)
        const imagemHover = this.add.image(100, 100, 'hover').setDepth(1)
        imagemHover.setVisible(false)

        imagemRestartButton.setInteractive()

        imagemRestartButton.on('pointerover', () => {
            imagemHover.setVisible(true);
            imagemHover.x = imagemRestartButton.x - imagemRestartButton.width;
            imagemHover.y = imagemRestartButton.y;
        })
        imagemRestartButton.on('pointerout', () => {
            imagemHover.setVisible(false);
        })
        imagemRestartButton.on('pointerdown', () => {
            this.scene.start('CenaMenu')
            this.gerenciaIniciaJogo()
            imagemHover.setVisible(true)
        })

    }

    // aqui adicionamos as plataformas dinamicamente de acordo com o level
    criaPlataformas() {
        this.grupoPlataformas = this.physics.add.staticGroup();

        this.plataformaFixa = this.physics.add.staticGroup();
        this.plataformaFixa.create(0, 477, 'chao').setOrigin(0, 0).refreshBody();

        this.plataformaMovimentaH = this.physics.add.image(400, 400, 'plataforma');
        this.plataformaMovimentaH.setImmovable(true);
        this.plataformaMovimentaH.body.allowGravity = false;
        this.plataformaMovimentaH.setVelocityX(50);

        this.plataformaMovimentaV = this.physics.add.image(100, 200, 'plataforma');
        this.plataformaMovimentaV.setImmovable(true);
        this.plataformaMovimentaV.body.allowGravity = false;
        this.plataformaMovimentaV.setVelocityY(50);

    }

    // aqui criamos os grupos necessarios
    criaGrupoEjogador() {
        this.jogador = new Jogador(this);

        this.grupoTesouros = this.physics.add.group({
            key: 'tesouro',
            repeat: 4,
            setXY: { x: 100, y: 0, stepX: 150 }
            //Math.random() * (max - min) + min
        })

        this.grupoTempos = this.physics.add.group({
            key: 'tempo',
            repeat: 0,
            setXY: { x: 150, y: 0, stepX: 150 }
        })

        this.grupoTesouros.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        this.grupoTempos.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        this.grupoInimigos = this.physics.add.group()
    }

    // aqui adicionamos as fisicas de todos os grupos e jogador criados
    adicionaFisicasEteclado() {
        this.physics.add.collider(this.jogador.sprite, this.plataformaFixa);
        this.physics.add.collider(this.grupoTesouros, this.plataformaFixa);
        this.physics.add.collider(this.grupoTempos, this.plataformaFixa);
        this.physics.add.collider(this.grupoInimigos, this.plataformaFixa);

        this.physics.add.collider(this.jogador.sprite, this.plataformaMovimentaH);
        this.physics.add.collider(this.grupoTesouros, this.plataformaMovimentaH)
        this.physics.add.collider(this.grupoTempos, this.plataformaMovimentaH)
        this.physics.add.collider(this.grupoInimigos, this.plataformaMovimentaH);

        this.physics.add.collider(this.jogador.sprite, this.plataformaMovimentaV);
        this.physics.add.collider(this.grupoTesouros, this.plataformaMovimentaV)
        this.physics.add.collider(this.grupoTempos, this.plataformaMovimentaV)
        this.physics.add.collider(this.grupoInimigos, this.plataformaMovimentaV);

        this.physics.add.collider(this.jogador.sprite, this.grupoPlataformas);
        this.physics.add.collider(this.grupoTesouros, this.grupoPlataformas);
        this.physics.add.collider(this.grupoTempos, this.grupoPlataformas);
        this.physics.add.collider(this.grupoInimigos, this.grupoPlataformas);

        this.physics.add.overlap(this.jogador.sprite, this.grupoTesouros, this.gerenciaItemPontuacao, null, this)
        this.physics.add.overlap(this.jogador.sprite, this.grupoTempos, this.gerenciaItemTempo, null, this)
        this.physics.add.collider(this.jogador.sprite, this.grupoInimigos, this.gerenciaGameOver, null, this);

        this.teclas = this.input.keyboard.createCursorKeys();
    }

    // aqui iremos gerenciar os textos padroes do jogo
    gerenciaTextosJogo() {
        this.tempo = 10
        this.tempoTexto = this.add.text(256, 10, 'tempo: ' + this.tempo, { fontSize: '24px ', fill: '#f00', fontweight: 'bold' })
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.fimJogo) {
                    this.tempo--;
                    this.tempoTexto.setText('tempo: ' + this.tempo);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.levelGeralTexto = this.add.text(156, 16, 'level: ' + this.gerenciaLevel, { fontSize: '12px ', fill: '#ff1493', fontweight: 'bold' });
        this.pontuacaoTexto = this.add.text(16, 16, 'pontuação: 0', { fontSize: '12px ', fill: '#ff1493', fontweight: 'bold' });

    }

    // aqui iremos gerenciar as imagens dispostas no game
    gerenciaImagensJogo() {
        let indice_background = 1
        const imagemFundo = this.add.image(0, 0, `floresta_${indice_background}`).setDepth(0);
        imagemFundo.setOrigin(0, 0);
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if (!this.fimJogo) {
                    imagemFundo.setTexture(`floresta_${indice_background}`);
                    indice_background++;
                    if (indice_background == 7) {
                        indice_background = 1;
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    //  aqui n iremos utilizar, ja que temos uma cena de carregamento
    preload() {

    }

    // aqui criamos os objetos do jogo
    create() {
        this.gerenciaImagensJogo()
        this.gerenciaTextosJogo()
        this.criaGrupoEjogador();
        this.criaPlataformas();
        this.adicionaFisicasEteclado();
    }

    // aqui temos o update de toda a lógica do jogo
    update() {
        const jogador = this.jogador.sprite;


        if (this.tempo == 0) {
            this.gerenciaGameOver(jogador)
        }

        if (!this.fimJogo) {
            if (this.teclas.left.isDown) {
                jogador.setVelocityX(-160);
                jogador.setFlip(true, false)
                jogador.anims.play('esquerda', true);
            } else if (this.teclas.right.isDown) {
                jogador.setVelocityX(160);
                jogador.setFlip(false, false)
                jogador.anims.play('direita', true);
            } else {
                jogador.setVelocityX(0);
                if (jogador.body.touching.down) {
                    jogador.anims.play('atoa');
                }
            }

            if (this.teclas.up.isDown && jogador.body.touching.down) {
                jogador.setVelocityY(-150);
                jogador.anims.play('pulando')
            }
            if (this.plataformaMovimentaH.x >= 500) {
                this.plataformaMovimentaH.setVelocityX(-50);
            }
            else if (this.plataformaMovimentaH.x <= 300) {
                this.plataformaMovimentaH.setVelocityX(50);
            }
            if (this.plataformaMovimentaV.y >= 400) {
                this.plataformaMovimentaV.setVelocityY(-50);
            }
            else if (this.plataformaMovimentaV.y <= 200) {
                this.plataformaMovimentaV.setVelocityY(50);
            }
        }

    }
}