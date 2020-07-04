import * as PIXI from 'pixi.js'

class Figure {
    constructor() {
        this.positionX =  null
        this.graphic = new PIXI.Graphics();
        this.graphic.interactive = true; 
        this.graphic.buttonMode = true;
        this.graphic.generateColor = this.generateColor

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

export class Circle extends Figure {
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
        return this.graphic
    }
}

export class Ellipse extends Figure {
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
        return this.graphic

    }
}

export class RamdomFigure extends Figure {
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
        container.interactive = true; 
        container.buttonMode = true;
        container.generateColor = this.generateColor
        container.addChild(this.graphic)
        this.graphic = container
        return container
    }
}

export class Rectangle extends Figure {
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
            return this.graphic

    }
   
}

export class Polygon extends Figure {
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
        return this.graphic
    }
}