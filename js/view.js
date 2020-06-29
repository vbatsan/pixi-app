class View {
    constructor() {
        this.$gravity = this.getDomElement('#gr')
        this.$renderSpeed = this.getDomElement('#spd')
        this.$incGravityBtn = this.getDomElement('#inc-gr')
        this.$decGravityBtn = this.getDomElement('#dec-gr')
        this.$incRenderSpeedBtn = this.getDomElement('#inc-spd')
        this.$decRenderSpeedBtn = this.getDomElement('#dec-spd')
        this.$curentElement = this.getDomElement('#element-type')
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
