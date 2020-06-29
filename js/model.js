class Game  {
    constructor(gravity, renderRate) {
        this.app =  new PIXI.Application({
            width: gameWidth,
             height: gameHeight,
             backgroundColor: 0xffffff,
            });

        this.generatedRate = renderRate
        this.gravity = gravity
        this.time = null
        this.currentFigure = null
        this.figuresArea = 0

        window.onresize = () => {
            window.innerWidth < 765 ? gameWidth = window.innerWidth -14 :  gameWidth = window.innerWidth/2
           
            gameHeight = window.innerHeight/1.5
            this.app.view.width = gameWidth
            this.app.view.height = gameHeight
        }
    }
   

    createCanvas() {
            this.app.ticker.add(() => this.animate(this.gravity))
            this.app.stage.interactive = true
            this.app.stage.hitArea = new PIXI.Rectangle(0, 0, gameWidth, gameHeight);
           
        document.getElementById('view').appendChild(this.app.view);
       
    }

    createFigure(figure ,x, y) {
        this.currentFigure = figure.type
        this.app.stage.addChild(figure.generateShape(x, y));
        this.figuresArea += this.calculateArea(figure.graphic)
    }

    incGravity() {
        this.gravity === 4 ? null : this.gravity ++
    }

    decGravity() {
        this.gravity === 1 ? null : this.gravity --
    }

    incRender() {
        this.generatedRate === 4 ? null : this.generatedRate ++
        clearTimeout(this.timer)
        this.generateFirures()
    }

    calculateArea(obj) {
        // let result = 0
        // figurs.forEach(item => {
        //    let area =  this.app.renderer.plugins.extract.pixels(item).length/4
        //    result += area
        // })
        // this.figuresArea = result
        let area = this.app.renderer.plugins.extract.pixels(obj).length/4
        return area
    }

    decRender() {
        this.generatedRate === 1 ? null : this.generatedRate --
        clearTimeout(this.timer)
        this.generateFirures()
    }

    init() {
        this.createCanvas()
        this.createFigure(new Circle(-50,50))
        this.generateFirures()
        
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
        return arr[Math.floor(Math.random() * (arr.length - 0) ) + 0];
      }

    animate(gr) {
        figurs.forEach((item,i, arr) => {
            if(item.position.y > gameHeight +200) {
                this.figuresArea -= this.calculateArea(item)
                arr.splice(i,1)
                item.parent.removeChild(item)
            }
            item.position.y += gr *2
           
        })
    }

    generateFirures() {
       this.timer =  setInterval(() => {
            this.createFigure(this.getRndfigure())
        },1000/this.generatedRate)
    }

    updateTicker() {
        this.app.ticker.update(this.gravity)
    }

}
