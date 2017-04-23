import * as EVENTS from '../constants/events';
import { dispatchEvent } from './helpers';

window.addEventListener('load', () => {
    const modalContent = getEl('#modalContent');
    const modalWrapper = getEl('#modalWrapper');
    const modalCloseButton = getEl('#modalCloseButton');

    modalCloseButton.onclick = () => dispatchEvent(EVENTS.MODAL_CLOSE);

    document.body.addEventListener(EVENTS.MODAL_CLOSE, () => {
        modalWrapper.removeClass('active');
        modalContent.innerHTML = '';
    });

    document.body.addEventListener(EVENTS.USER_WON, () => {
        modalWrapper.addClass('active');
        modalContent.innerHTML = 'Congratulations, you have won!';
    });

    document.body.addEventListener(EVENTS.GAME_OVER, () => {
        modalWrapper.addClass('active');
        modalContent.innerHTML = 'Sorry, you didn\'t manage to reveal every card pairs in given time';
    });
});