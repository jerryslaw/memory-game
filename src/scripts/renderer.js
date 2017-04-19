import cardsData from './cardsData';
import config from '../../config';

const cardBackSrc = `${config.imagesRoute}/card_back.png`;

window.addEventListener('load', () => {
    const gameWrapper = document.getElementById('cardsWrapper');

    const cardElements = cardsData.map(cardData => {
        const cardWrapper = createEl('div').addClass('card-wrapper');
        cardWrapper.attr('data-id', cardData.id);

        const cardElement = createEl('img').addClass('card');
        cardElement.src = cardData.route;

        const cardBack = createEl('img').addClass('card-back');
        cardBack.src = cardBackSrc;

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
        gameWrapper.appendChild(element);
    });

    const event = new Event('cardsRendered');
    document.body.dispatchEvent(event);
});