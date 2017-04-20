import cardsData from './cardsData';
import config from '../../config';

window.addEventListener('load', () => {
    const gameWrapper = document.getElementById('cardsWrapper');

    const cardElements = cardsData.map(cardData => {
        const cardWrapper = createEl('div').addClass('card-wrapper');
        cardWrapper.attr('data-id', cardData.id);

        const cardElement = createEl('div').addClass('card');
        cardElement.style =
            `background-image: url(${config.images.url}${config.images.routes.cards});` +
            `background-position: ${cardData.x}px ${cardData.y}px`;

        const cardBack = createEl('div').addClass('card-back');

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