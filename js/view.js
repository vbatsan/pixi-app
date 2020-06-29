class View {
    constructor() {
        this.$gravity = document.getElementById('gr')
        this.$renderSpeed = document.getElementById('spd')
        this.$incGravityBtn = document.getElementById('inc-gr')
        this.$decGravityBtn = document.getElementById('dec-gr')
        this.$incRenderSpeedBtn = document.getElementById('inc-spd')
        this.$decRenderSpeedBtn = document.getElementById('dec-spd')
        this.$curentElement = document.getElementById('element-type')
        this.$figuresArea = this.getDomElement('#element-sq')
    }
   
    
    getDomElement(selector) {
        const element = document.querySelector(selector)
        return element
    }

    setValue(element, value) {
        element.textContent = value
    }

}
