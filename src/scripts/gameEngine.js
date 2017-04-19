document.body.addEventListener('cardsRendered', function() {
   const cardsWrapper = getEl('#cardsWrapper');
   const pointsEl = getEl('#points');
   const cardWrappers = getEls('.card-wrapper');

   cardsWrapper.addEventListener('click', function() {
       const hoveredCards = getEls('.hovering');

       if (hoveredCards.length === 2) {
           const firstEl = hoveredCards[0];
           const secondEl = hoveredCards[1];

           if (firstEl.attr('data-id') === secondEl.attr('data-id')) {
               setTimeout(function() {
                   firstEl.removeClass('hovering').addClass('hidden');
                   secondEl.removeClass('hovering').addClass('hidden');
                   const points = parseInt(pointsEl.innerHTML);
                   pointsEl.innerHTML = points + 1;
               }, 800);
           } else {
               setTimeout(function() {
                    for (let i = 0; i < cardWrappers.length; i++) {
                        cardWrappers[i].removeClass('hovering');
                    }
               }, 1200);
           }
       }
   })
});