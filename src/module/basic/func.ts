import { Poker, Suits } from "./type";
import { v4 as uuidv4 } from "uuid";

export const getBasicDeck = () => {
    const deck: Poker[] = [];
    const suitsList = [Suits.Spades, Suits.Hearts, Suits.Clubs, Suits.Diamonds];
    suitsList.forEach((suits) => {
        for (let i = 2; i <= 14; i++) {
            deck.push({
                id: uuidv4(),
                suits,
                face: i,
            });
        }
    });

    return deck;
};

export const getSuitsType = (suitsValue: string | number) => {
    const numSuitsValue = Number(suitsValue);
    if (numSuitsValue === 0) {
        return Suits.Spades;
    } else if (numSuitsValue === 1) {
        return Suits.Hearts;
    } else if (numSuitsValue === 2) {
        return Suits.Clubs;
    } else if (numSuitsValue === 3) {
        return Suits.Diamonds;
    }
    return null;
};
