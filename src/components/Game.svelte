<script lang="ts">
    import { loop_guard } from "svelte/internal";
    import { playerImage } from "../stores/playerImage";
    import * as Phaser from "phaser";
    import Resizer from "./Resizer.svelte";
    import highscores from "../stores/highscores";
    import type HighScore from "../domain/highscore";
    import player1 from "../stores/player1";
    // import resizeImage from "../utils/resizeImage";
    const imgURL: string = $playerImage;
    console.log(imgURL);

    //  console.log(imgURL);
    var config = {
        type: Phaser.AUTO,
        width: 1800,
        height: 1000,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };
    var player;
    // var imgURL;
    
    var platforms;
    var cursors;
    var stars;
    var score = 0;
    var scoreText;
    var highScoreText;
    var bombs;
    var game = new Phaser.Game(config);

    function preload() {
        // console.log(`preload `+ {playerImage})
        this.load.image("sky", "./sky.png");
        this.load.image("ground", "./platform.png");
        this.load.image("star", "./star.png");
        this.load.image("bomb", "./bomb.png");
        this.load.spritesheet("dude", imgURL, {
            frameWidth: 280,
            frameHeight: 366,
        });
        // this.load.Image("dude", $playerImage);
        // { frameWidth: 32, frameHeight: 48 }
        // console.log(`${$playerImage}playerImage`);
        // console.log($playerImage)
    }

    function create() {
        // console.log(`create `);
        // // console.log({playerImage})
        // imgURL = $playerImage;
        this.add.image(400, 300, "sky").setScale(4);

        platforms = this.physics.add.staticGroup();

        platforms.create(900, 1000, "ground").setScale(4).refreshBody();

        platforms.create(50, 670, "ground");
        platforms.create(1050, 250, "ground");
        platforms.create(750, 420, "ground");
        scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            fill: "#000",
        });
        highScoreText = this.add.text(16, 48, "High score: 0", {
            fontSize: "32px",
            fill: "#000",
        });

        // this.load.Image("dude", imgURL);
        player = this.physics.add.sprite(100, 450, "dude");

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [
                {
                    key: "dude",
                    frame: 4,
                },
            ],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        // player.body.setGravityY(400); this did not override default gravity
        // this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
    }

    function hitBomb(player, bomb) {
        console.log(score)
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        let currentScore:HighScore ={
                token: $player1.tokenAddress,
                imageURL: $player1.imageURL,
                score: score,
            }
            highscores.set(currentScore)
            console.log(currentScore)
            console.log($highscores)
        if (score > $highscores.score){
         
                 
            console.log("High score!")
            console.log(score, " noice.")
            //insert to the top of the array and say yay!

        }
        else{
            console.log("Nope")
            //push to the end then sort or not lol
        }
        let gameOver = true;
    }

    function collectStar(player, star) {
        star.disableBody(true, true);

        
        score += 10;
        scoreText.setText("Score: " + score);
        highScoreText.setText("High Score: " + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });
            var x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    function update() {
        // console.log(`update ${$playerImage}`);
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-430);
        }
    }
</script>

<!-- <Resizer /> -->
{console.log("after resizer")}
{console.log($playerImage)}
