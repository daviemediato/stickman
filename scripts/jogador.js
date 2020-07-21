// aqui temos a classe do jogador
export default class Jogador {
    constructor(cena) {
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(10, 50, 'jogador');
        this.sprite.body.setSize(25, 45);
        this.sprite.setBounce(0.2)
        this.sprite.setCollideWorldBounds(true);

        // aqui temos as instancias das animações
        cena.anims.create({
            key: 'direita',
            frames: cena.anims.generateFrameNumbers('jogador', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        cena.anims.create({
            key: 'atoa',
            frames: cena.anims.generateFrameNumbers('jogador', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        cena.anims.create({
            key: 'pulando',
            frames: cena.anims.generateFrameNumbers('jogador', { start: 12, end: 12 }),
            frameRate: 20,
            repeat: -1
        });

        cena.anims.create({
            key: 'esquerda',
            frames: cena.anims.generateFrameNumbers('jogador', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

    }
}