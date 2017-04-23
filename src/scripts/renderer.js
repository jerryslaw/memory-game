import cardsData from './cardsData';
import { parseTimeToHumanValues, dispatchEvent } from './helpers';
import { AVAILABLE_CARDS } from '../constants/images';
import * as EVENTS from '../constants/events';
import config from '../../config';

let interval;

document.body.addEventListener(EVENTS.GAME_STARTED, () => {
    const cardsWrapper = getEl('#cardsWrapper');
    const timer = getEl('#timer');

    const start = new Date();
    const end = new Date(start.getTime() + config.timePerCardPair * AVAILABLE_CARDS.length);
    const startDiff = end.diff(start);

    timer.innerHTML = parseTimeToHumanValues(new Date(startDiff));

    interval = setInterval(() => {
        const now = new Date();
        const difference = end.diff(now);
        const cards = getElsByClass('card-wrapper');

        if (difference <= 0 && cards.length) {
            clearInterval(interval);
            cards.forEach(card => cardsWrapper.removeChild(card));

            dispatchEvent(EVENTS.GAME_OVER);
        }

        timer.innerHTML = parseTimeToHumanValues(new Date(difference));
    }, 1000);

    const cardElements = cardsData.map(cardData => {
        const cardWrapper = makeEl({
            elName: 'div',
            className: 'card-wrapper',
            attr: {
                name: 'data-id',
                value: cardData.id
            }
        });

        const cardElement = makeEl({
            elName: 'div',
            className: 'card'
        });
        cardElement.style =
            `background-image: url(${config.images.url}${config.images.routes.cards});` +
            `background-position: ${cardData.x}px ${cardData.y}px`;

        const cardBack = makeEl({
            elName: 'div',
            className: 'card-back'
        });

        cardWrapper.onclick = function() {
            const cardWrapperHovered = getEls('.hovering');
            if (cardWrapperHovered.length !== 2) {
                this.toggleClass('hovering');
            }
        };
        cardWrapper.appendChild(cardElement);
        cardWrapper.appendChild(cardBack);

        return cardWrapper;
    });

    cardElements.forEach(element => {
        cardsWrapper.appendChild(element);
    });

    dispatchEvent(EVENTS.CARDS_RENDERED);
});

document.body.addEventListener(EVENTS.USER_WON, () => {
    clearInterval(interval);
    const timer = getEl('#timer');
    timer.innerHTML = 0;
});