import {Circle, Ellipse, Polygon, RamdomFigure, Rectangle} from "./figures";
import * as PIXI from 'pixi.js'
import {ColorOverlayFilter} from '@pixi/filter-color-overlay'

export default class Game  {
    constructor(gravity, renderRate) {
        this.gameWidth = window.innerWidth < 765 ? window.innerWidth -14 : window.innerWidth/2
        this.gameHeight = window.innerHeight/1.5;
        this.app =  new PIXI.Application({
            width: this.gameWidth,
             height: this.gameHeight,
             backgroundColor: 0xffffff,
            });

        this.generatedRate = renderRate
        this.gravity = gravity
        this.currentFigure = null
        this.figurs = []
        this.figuresArea = 0
        this.startTimeStamp = null

        window.onresize = () => {
            window.innerWidth < 765 ? this.gameWidth = window.innerWidth -14 :  this.gameWidth = window.innerWidth/2
           
            this.gameHeight = window.innerHeight/1.5
            this.app.view.width = this.gameWidth
            this.app.view.height = this.gameHeight
        }
    }
   

    createCanvas() {
            this.app.ticker.add(() => this.animate(this.gravity))
            this.app.stage.interactive = true
            this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.gameWidth, this.gameHeight);
           
        document.getElementById('view').appendChild(this.app.view);
       
    }

    createFigure(figure ,x, y) {
        figure.positionX = Math.floor((Math.random() + 0.1) * (this.gameWidth -150))
        this.currentFigure = figure.type
        figure.graphic.figureType = figure.type
        this.app.stage.addChild(figure.generateShape(x, y));
        figure.graphic.on('pointerdown', this.deleteFigure.bind(this))
        this.figurs.push(figure.graphic)
        this.figuresArea += this.calculateArea(figure.graphic)
    }

    deleteFigure(e) {
        e.stopPropagation()
        let color = +e.target.generateColor()
        const colorFilter = new ColorOverlayFilter(color)
        this.figurs.map(item => {
            if(item.figureType === e.target.figureType) {
                item.filters = [colorFilter]
            }
        })
        this.figurs.splice(this.figurs.indexOf(e.target),1)
        this.figuresArea -= this.calculateArea(e.target)
        e.target.destroy()
    }

    incGravity() {
        this.gravity === 4 ? null : this.gravity ++
    }

    decGravity() {
        this.gravity === 1 ? null : this.gravity --
    }

    incRender() {
        this.generatedRate === 4 ? null : this.generatedRate ++
        this.generateFigures()
    }

    calculateArea(obj) {
        let area = this.app.renderer.plugins.extract.pixels(obj).length/4
        return area
    }

    decRender() {
        this.generatedRate === 1 ? null : this.generatedRate --
        this.generateFigures()
    }

    init() {
        this.createCanvas()
        this.createFigure(new Circle(-50,50))
        requestAnimationFrame(this.generateFigures.bind(this))
        
    }
    pointerHandler(e) {
        const pos = e.data.global
        this.createFigure(this.getRndfigure(), pos.x, pos.y)
    }

    getRndfigure() {
        const arr = [
            new Circle(-50, 50),
            new Ellipse(-100, 80, 50),
            new RamdomFigure(),
            new Rectangle(-100, 100,100),
            new Polygon([0,0,0,100,40,80,70,10,30,50,0,0], '5 sides shape'),
            new Polygon([0,0,80,0,45,60], '3 sides shape'),
            new Polygon([25,0,50,0,75,25,75,50,50,75,25,75,0,50,0,25,25,0], '6 sides shape')
        ]
        return arr[Math.floor(Math.random() * (arr.length) )];
      }

    animate(gr) {
        this.figurs.forEach((item,i, arr) => {
            if(item.position.y > this.gameHeight +150) {
                this.figuresArea -= this.calculateArea(item)
                arr.splice(i,1)
                item.destroy()
                return
            }
            item.position.y += gr *2
           
        })
    }

    generateFigures(timeStamp) {
        this.count ++
        if(!this.startTimeStamp) this.startTimeStamp = timeStamp
        let interval = timeStamp - this.startTimeStamp

        if(interval > 1000/this.generatedRate) {
            this.startTimeStamp = timeStamp
            this.createFigure(this.getRndfigure())
        }
        requestAnimationFrame(this.generateFigures.bind(this))
    }

    updateTicker() {
        this.app.ticker.update(this.gravity)
    }

}
