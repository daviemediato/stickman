import CenaCarregamento from './cenas/cena-carregamento.js';
import CenaJogo from './cenas/cena-jogo.js';
import CenaMenu from './cenas/cena-menu.js';

// aqui temos a config do phaser
const configuracao = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        CenaMenu,
        CenaJogo,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// aqui temos a instancia do jogo
const jogoPhaser = new Phaser.Game(configuracao);