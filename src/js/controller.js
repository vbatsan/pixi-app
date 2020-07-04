export default class Controller {
    constructor(view, model) {
        this.view = view
        this.model = model

    }

    start() {
        this.model.init()
        this.view.getDomElement('.container').classList.remove('hidden')
        this.view.setValue(this.view.$gravity, this.model.gravity)
        this.view.setValue(this.view.$renderSpeed, this.model.generatedRate)
        this.view.setValue(this.view.$curentElement, this.model.currentFigure)
        this.view.$incGravityBtn.addEventListener('click', this.incGravity.bind(this))
        this.view.$decGravityBtn.addEventListener('click', this.decGravity.bind(this))
        this.view.$incRenderSpeedBtn.addEventListener('click', this.incRender.bind(this))
        this.view.$decRenderSpeedBtn.addEventListener('click', this.decRender.bind(this))
        this.model.app.stage.on('pointerdown', this.model.pointerHandler.bind(this.model))

        //this function updates info block every 100ms
        this.updateInfo()
    }

    currentFigureListener() {
        this.view.$curentElement.value != this.model.currentFigure ? this.view.setValue(this.view.$curentElement, this.model.currentFigure) : null
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
        this.view.setValue(this.view.$gravity, this.model.gravity)
        this.view.setValue(this.view.$renderSpeed, this.model.generatedRate)
        this.view.setValue(this.view.$curentElement, this.model.currentFigure)
        this.model.updateTicker()
    }
    updateInfo() {
        setInterval(() => {
            this.currentFigureListener()
            this.view.setValue(this.view.$figuresArea, this.model.figuresArea)
            this.view.setValue(this.view.$figureCounter, this.model.figurs.length)

        },100)
    }


}