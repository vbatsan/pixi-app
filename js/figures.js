window.innerWidth < 765 ? window.gameWidth = window.innerWidth :  window.gameWidth = window.innerWidth/2
window.gameHeight = window.innerHeight/2;
window.figurs = []

class Figure {
    constructor() {
        this.areaX = gameWidth - 150
        this.positionX =  Math.floor((Math.random() + 0.1)* this.areaX)
        this.graphic = new PIXI.Graphics(); 
        this.graphic.on('pointerdown', app.clearFigure.bind(app))
        this.graphic.interactive = true; 
        this.graphic.buttonMode = true;
    }

    generateColor() {
        const symbols = "0123456789ABCDEF"; 
        let color = '0x'; 
  
         for (var i = 0; i < 6; i++) {
            color += symbols[(Math.floor(Math.random() * 16))]; 
         }
         return color
      
    }

    
}

class Circle extends Figure {
    constructor( positionY, radius) {
        super(positionY, radius)
        this.positionY = positionY
        this.radius = radius
        this.type  = 'circle'
    }

    generateShape(x=this.positionX, y=-100) {
        this.graphic.lineStyle(0); 
        this.graphic.beginFill(this.generateColor()); 
        this.graphic.drawCircle(x, y, this.radius); 
        this.graphic.endFill();
        figurs.push(this.graphic) 
        return this.graphic
    }
}

class Ellipse extends Figure {
    constructor(positionY, width, height) {
        super(positionY, width, height)
        this.positionY = positionY
        this.width = width
        this.height = height
        this.type = 'ellipce'
       
    }

    generateShape(x=this.positionX, y=-100) {
        this.graphic.lineStyle(0)
        this.graphic.beginFill(this.generateColor());
        this.graphic.drawEllipse(x, y, this.width, this.height);
        this.graphic.endFill();
        figurs.push(this.graphic) 
        return this.graphic

    }
}

class RamdomFigure extends Figure {
    constructor() {
        super()
        this.type  = 'random'
    }

    generateShape(x=this.positionX, y=-100) {
        const container = new PIXI.Container()
        container.x = x
        container.y = y
        const color = this.generateColor()
        this.graphic.lineStyle(0)
        this.graphic.beginFill(color)
        this.graphic.drawCircle(Math.floor(Math.random() * (40-30))+30, Math.floor(Math.random() * 30), 50)
        this.graphic.endFill()
        this.graphic.beginFill(color)
        this.graphic.drawCircle(Math.floor(Math.random() * (50-30))+30, 10, Math.floor(Math.random() * (40-30))+30)
        this.graphic.endFill()
        this.graphic.beginFill(color)
        this.graphic.drawCircle(70,Math.floor(Math.random() * 30), 50)
        this.graphic.endFill()
        this.graphic.beginFill(color)
        this.graphic.drawCircle(Math.floor(Math.random() * 70), 60, 50)
        this.graphic.endFill()
        this.graphic.interactive = false
        container.on('pointerdown', app.clearFigure.bind(app))
        container.interactive = true; 
        container.buttonMode = true;
        container.addChild(this.graphic)
        figurs.push(container)
        return container
    }
}

class Rectangle extends Figure {
    constructor( positionY,width, height) {
        super( positionY,width, height)
        this.positionY = positionY
        this.width = width
        this.height  = height
        this.type = 'Rectangle'
    }

    generateShape(x=this.positionX, y=-100) {
        this.graphic.lineStyle(0)
        this.graphic.beginFill(this.generateColor())
        this.graphic.drawRect(x, y, this.width, this.height)
        this.graphic.endFill()
            figurs.push(this.graphic) 
            return this.graphic

    }
   
}

class Polygon extends Figure {
    constructor(path, type) {
        super(path)
        this.path = path
        this.type = type
    }

    generateShape(x=this.positionX, y=-100) {
        this.graphic.lineStyle(0)
        this.graphic.beginFill(this.generateColor())
        this.graphic.drawPolygon(this.path)
        this.graphic.x = x
        this.graphic.y  = y
        this.graphic.endFill()
        figurs.push(this.graphic) 
        return this.graphic
    }
}