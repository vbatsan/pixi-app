import Game from './model';
import View from './view';
import Controller from './controller'
import '../style/main.scss'

const model = new Game(1,1)
const view = new View()
const app = new Controller(view, model)

app.start()