
document.addEventListener('DOMContentLoaded', (event) => {
    // Variables to keep track of counts
    let headsCount = 0;
    let tailsCount = 0;

    // Event listener for classical probability coin flip
    document.getElementById('coinFlipButton').addEventListener('click', () => {
        let result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        document.getElementById('coinResult').textContent = result;
        if (result === 'Heads') {
            headsCount++;
            document.getElementById('headsCount').textContent = headsCount;
        } else {
            tailsCount++;
            document.getElementById('tailsCount').textContent = tailsCount;
        }
    });

    
// Event listener for checking the probability of drawing an Ace
document.getElementById('checkAceProbability').addEventListener('click', () => {
    const userEstimate = parseFloat(document.getElementById('aceProbability').value);
    const actualProbability = 4 / 52;  // 4 Aces in a deck of 52 cards

    // Display the results
    if (!isNaN(userEstimate) && userEstimate >= 0 && userEstimate <= 1) {
        document.getElementById('actualAceProbability').textContent = actualProbability.toFixed(3);
        document.getElementById('yourAceProbability').textContent = userEstimate.toFixed(3);
    } else {
        alert('Please enter a valid probability estimate between 0 and 1.');
    }
});


// Event listener for relative frequency coin flips
    document.getElementById('multiCoinFlipButton').addEventListener('click', () => {
        let multiHeadsCount = 0;
        let multiTailsCount = 0;

        // Flip the coin 100 times
        for (let i = 0; i < 100; i++) {
            let result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            if (result === 'Heads') {
                multiHeadsCount++;
            } else {
                multiTailsCount++;
            }
        }

        // Calculate and display frequencies
        document.getElementById('headsFrequency').textContent = multiHeadsCount + "%";
        document.getElementById('tailsFrequency').textContent = multiTailsCount + "%";
    });
});

// Event listener for subjective probability estimation
document.getElementById('submitEstimate').addEventListener('click', () => {
    let estimate = document.getElementById('rainProbability').value;
    if (estimate >= 0 && estimate <= 100) {
        if (estimate >= 70) {
            document.getElementById('feedbackMessage').textContent = 
                "You believe there's a high chance of rain! Always good to carry an umbrella in such cases.";
        } else if (estimate >= 40) {
            document.getElementById('feedbackMessage').textContent = 
                "You're unsure about the weather. It might rain, but it might not.";
        } else {
            document.getElementById('feedbackMessage').textContent = 
                "You believe it's unlikely to rain. Looks like a clear day ahead!";
        }
    } else {
        document.getElementById('feedbackMessage').textContent = 
            "Please enter a valid probability between 0 and 100.";
    }
});

// Event listener for subjective probability estimate submission
document.getElementById('submitEstimate').addEventListener('click', () => {
    let userEstimate = parseInt(document.getElementById('userEstimate').value);
    if (isNaN(userEstimate) || userEstimate < 0 || userEstimate > 100) {
        document.getElementById('comparison').textContent = "Please enter a valid estimate between 0 and 100.";
    } else {
        let expertEstimate = 60; // This is our fictional expert estimate for the example
        if (userEstimate === expertEstimate) {
            document.getElementById('comparison').textContent = "Your estimate matches the expert estimate!";
        } else if (userEstimate < expertEstimate) {
            document.getElementById('comparison').textContent = `Your estimate is lower than the expert estimate by ${expertEstimate - userEstimate}%.`;
        } else {
            document.getElementById('comparison').textContent = `Your estimate is higher than the expert estimate by ${userEstimate - expertEstimate}%.`;
        }
    }
});

// Event listener for drawing a card
document.getElementById('drawCardButton').addEventListener('click', () => {
    if (deck.length === 0) {
        createDeck();
    }

    // Draw a card and display it
    let drawnCardIndex = Math.floor(Math.random() * deck.length);
    let drawnCard = deck[drawnCardIndex];
    document.getElementById('lastCard').textContent = drawnCard;
    
    // Remove the drawn card from the deck
    deck.splice(drawnCardIndex, 1);

    // Calculate and display conditional probability if an Ace was drawn
    let acesInDeck = deck.filter(card => card.includes('Ace')).length;
    let kingsInDeck = deck.filter(card => card.includes('King')).length;

    let marginalProbabilityAce = (acesInDeck / (deck.length)) * 100;
    let marginalProbabilityKing = (kingsInDeck / (deck.length)) * 100;

    document.getElementById('marginalProbability').textContent = `Ace: ${marginalProbabilityAce.toFixed(2)}%, King: ${marginalProbabilityKing.toFixed(2)}%`;

    if (drawnCard.includes('Ace')) {
        let conditionalProbability = (kingsInDeck / (deck.length)) * 100;
        document.getElementById('conditionalProbability').textContent = `King (given Ace was drawn): ${conditionalProbability.toFixed(2)}%`;
    } else if (drawnCard.includes('King')) {
        let conditionalProbability = (acesInDeck / (deck.length)) * 100;
        document.getElementById('conditionalProbability').textContent = `Ace (given King was drawn): ${conditionalProbability.toFixed(2)}%`;
    } else {
        document.getElementById('conditionalProbability').textContent = 'Draw an Ace or King to see conditional probabilities.';
    }
});

// Event listener for Bayesian update calculation
document.getElementById('calculatePosterior').addEventListener('click', () => {
    let priorBelief = parseFloat(document.getElementById('priorBelief').value);

    if (isNaN(priorBelief) || priorBelief < 0 || priorBelief > 1) {
        document.getElementById('posteriorProbability').textContent = "Please enter a valid prior belief between 0 and 1.";
        return;
    }

    // Test accuracies
    let probabilityPositiveGivenDisease = 0.99;
    let probabilityPositiveGivenNoDisease = 0.01;

    // Applying Bayes' theorem
    let numerator = probabilityPositiveGivenDisease * priorBelief;
    let denominator = numerator + probabilityPositiveGivenNoDisease * (1 - priorBelief);
    let posteriorProbability = numerator / denominator;

    document.getElementById('posteriorProbability').textContent = (posteriorProbability * 100).toFixed(2) + "%";
});

// Event listener for drawing two cards in sequence
document.getElementById('drawTwoCardsButton').addEventListener('click', () => {
    if (deck.length < 2) {
        createDeck();
    }

    // Draw the first card and display it
    let firstCardIndex = Math.floor(Math.random() * deck.length);
    let firstCard = deck[firstCardIndex];
    document.getElementById('firstCard').textContent = firstCard;

    // Remove the first drawn card from the deck
    deck.splice(firstCardIndex, 1);

    // Draw the second card and display it
    let secondCardIndex = Math.floor(Math.random() * deck.length);
    let secondCard = deck[secondCardIndex];
    document.getElementById('secondCard').textContent = secondCard;

    // Calculate and display joint probability
    let jointProbability = (1 / 52) * (1 / 51) * 100;  // Because we're drawing without replacement
    document.getElementById('jointProbabilityResult').textContent = jointProbability.toFixed(2) + "%";
});
