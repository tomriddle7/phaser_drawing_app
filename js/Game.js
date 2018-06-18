
var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pencil', 'assets/img/pencil.png');
    game.load.image('eraser', 'assets/img/eraser.png');
    game.load.image('white', 'assets/img/white.png');

    //game.load.spritesheet('button', 'assets/buttons/flixel-button.png', 80, 20);

    //game.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia16black.png', 'assets/fonts/bitmapFonts/nokia16black.xml');

    //game.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');

}


var currentColour = 0x000000;  // Color now painting
var material = "Brush";   // painting material
var bmd;
var bitmapsprite;
var PreX;
var PreY;
var radius;

function create() {
    game.stage.backgroundColor = '#FFFFFF';

	bmd = game.make.bitmapData(game.width, game.height);
	bmd.dirty = true;
	bitmapsprite = game.add.image(0, 0, bmd);
	bitmapsprite.inputEnabled = true;
	
	bitmapsprite.events.onInputDown.add(startDrawing, this);
    bitmapsprite.events.onInputUp.add(stopDrawing, this);

    var Brush = game.add.sprite(100, 1000, "pencil");
    Brush.inputEnabled = true;
    Brush.events.onInputDown.add(function(){
        //this['material'];
        eval(material + ".tint = 0xFFFFFF");
        Brush.tint = 0x808080;
        material = "Brush";
    }, this);

    var Eraser = game.add.sprite(500, 1000, "eraser");
    Eraser.inputEnabled = true;
    Eraser.events.onInputUp.add(function(){
        eval(material + ".tint = 0xFFFFFF");
        Eraser.tint = 0x808080;
        material = "Eraser";
    }, this);
}

function startDrawing(pointer, x, y) {
    switch(material) {
        case "Brush":
            PreX = x;
            PreY = y;
            game.input.addMoveCallback(onDraw, this);
            break;
        case "Eraser":
            game.input.addMoveCallback(onDraw, this);
            break;
        case "Stamp_circle":
            //var Stamp = MG.game.make.sprite(0, 0, "Color_circle");
            //Stamp.anchor.set(0.5);
            //Stamp.tint = this.currentColour;
            //this.bitmaps[this.visibleGraphics].draw(Stamp, MG.game.input.x, MG.game.input.y);
            //break;
    }
}

function onDraw(pointer, x, y) {
    // 그림 영역 지정
    //if(MG.game.input.x<615 || MG.game.input.x>1275) return;
    //if(MG.game.input.y<290 || MG.game.input.y>980) return;

    switch(material){
        case "Brush":
            // size of brush
            radius = 10;
            // When pointer moves in slow, line is rough.
            bmd.line(PreX, PreY, x, y, Phaser.Color.getWebRGB(currentColour), radius);
            // When pointer moves in fast, line is cut.
            bmd.circle(x, y, radius/2, Phaser.Color.getWebRGB(currentColour));
            // So we combine line and dot to draw smooth line.
            bmd.dirty = true;
            PreX = x;
            PreY = y;
            break;
        case "Eraser":
            radius = 60;
            bmd.blendDestinationOut();
            //this.bitmaps[this.visibleGraphics].line(this.PreX, this.PreY, x, y, 'rgba(0, 0, 0, 255)', radius);
            bmd.circle(x, y, radius/2, 'rgba(0, 0, 0, 255)');
            bmd.blendReset();
            bmd.dirty = true;
            break;
    }
}

function stopDrawing() {
	game.input.deleteMoveCallback(onDraw, this);
}

function update() {

}