class Controller {
    constructor(view, model) {
        this.view = view
        this.model = model

        view.$incGravityBtn.addEventListener('click', this.incGravity.bind(this))
        view.$decGravityBtn.addEventListener('click', this.decGravity.bind(this))
        view.$incRenderSpeedBtn.addEventListener('click', this.incRender.bind(this))
        view.$decRenderSpeedBtn.addEventListener('click', this.decRender.bind(this))
        this.model.app.stage.on('pointerdown', this.model.pointerHandler.bind(this.model))
        setInterval(() => {
            this.currentFigureListener()
            this.view.setValue(this.view.$figuresArea, this.model.figuresArea)
            
        },100)

    }

    start() {
        this.model.init()
        this.view.getDomElement('.container').classList.remove('hidden')
        this.view.setValue(this.view.$gravity, this.model.gravity)
        this.view.setValue(this.view.$renderSpeed, this.model.generatedRate)
        this.view.setValue(this.view.$curentElement, this.model.currentFigure)
    }

    currentFigureListener() {
        this.view.$curentElement.value != this.model.currentFigure ? this.view.setValue(this.view.$curentElement, this.model.currentFigure) : null
    }

    clearFigure(e) {
        e.stopPropagation()
         e.target.parent.removeChild(e.target)
         figurs.splice(figurs.indexOf(e.target),1)
        this.model.figuresArea -= this.model.calculateArea(e.target)
      
    }

    incGravity() {
        this.model.incGravity()
        this.reRender()
    }

    incRender() {
        this.model.incRender()
        this.reRender()
    }

    decRender() {
        this.model.decRender()
        this.reRender()
    }

    decGravity() {
        this.model.decGravity()
        this.reRender()
    }

    reRender() {
        this.view.setValue(view.$gravity, this.model.gravity)
        this.view.setValue(view.$renderSpeed, this.model.generatedRate)
        this.view.setValue(this.view.$curentElement, this.model.currentFigure)
        this.model.updateTicker()
    }


}