import _cloneDeep from 'lodash.clonedeep';
import _flatten from 'lodash.flatten';
import _shuffle from 'lodash.shuffle';

import * as IMAGES from '../constants/images';

const cardRoutes = _flatten(IMAGES.AVAILABLE_CARDS.map((card) => {
    return IMAGES.CARD_SUFFIXES.map((suffix) => {
        return {
            id: `${card.name}_${suffix.name}`,
            x: card.x,
            y: suffix.y
        }
    });
}));

export default _shuffle(cardRoutes.concat(_cloneDeep(cardRoutes)));
