import _flatten from 'lodash.flatten';
import _shuffle from 'lodash.shuffle';

import * as IMAGES from '../constants/images';
import config from '../../config';

const cardRoutes = _flatten(IMAGES.AVAILABLE_CARDS.map((card) => {
    const cardsWithRoutes = IMAGES.CARD_SUFFIXES.map((suffix) => {
        return `${config.imagesRoute}/${card}_${suffix}${IMAGES.IMAGES_SUFFIXES.JPG}`;
    });
    return cardsWithRoutes.map((route, i) => ({id: `${card}_${i}`, route}));
}));

export default _shuffle(cardRoutes.concat(cardRoutes));