import { GAME_STARTED } from '../constants/events';
import { dispatchEvent } from './helpers';

window.addEventListener('load', () => {
    const startButton = getEl('#startButton');
    startButton.onclick = function() {
        dispatchEvent(GAME_STARTED);
        this.style = "display:none;";
    }
});