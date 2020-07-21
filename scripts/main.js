import CenaCarregamento from './cenas/cena-carregamento.js';
import CenaJogo from './cenas/cena-jogo.js';

// aqui temos a config do phaser
const configuracao = {
    type: Phaser.AUTO,
    width: 1000,
    height: 300,
    parent: 'jogo-stick-man',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 100
            },
            debug: false
        }
    },
    scene: [
        CenaCarregamento,
        CenaJogo
    ]
};

// aqui temos a instancia do jogo
const jogoPhaser = new Phaser.Game(configuracao);