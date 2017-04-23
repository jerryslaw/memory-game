import { dispatchEvent } from './helpers';
import * as EVENTS from '../constants/events';

document.body.addEventListener(EVENTS.CARDS_RENDERED, () => {
   const cardsWrapper = getEl('#cardsWrapper');
   const pointsEl = getEl('#points');
   const cardWrappers = getElsByClass('card-wrapper');

   cardsWrapper.addEventListener('click', () => {
       const hoveredCards = getEls('.hovering');

       if (hoveredCards.length === 2) {
           const firstEl = hoveredCards[0];
           const secondEl = hoveredCards[1];

           if (firstEl.attr('data-id') === secondEl.attr('data-id')) {
               setTimeout(() => {
                   firstEl.removeClass('hovering').addClass('hidden');
                   secondEl.removeClass('hovering').addClass('hidden');
                   const points = parseInt(pointsEl.innerHTML);
                   pointsEl.innerHTML = points + 1;

                   dispatchEvent(EVENTS.CARDS_REVEALED);
               }, 800);
           } else {
               setTimeout(() => {
                   cardWrappers.forEach((cardWrapper) => cardWrapper.removeClass('hovering'));
               }, 1200);
           }
       }
   })
});

document.body.addEventListener(EVENTS.CARDS_REVEALED, () => {
    const cardWrappers = getElsByClass('card-wrapper');
    const maybeOver = cardWrappers.every(cardWrapper => cardWrapper.containsClass('hidden'));

    if (maybeOver) {
        dispatchEvent(EVENTS.USER_WON);
    }
});