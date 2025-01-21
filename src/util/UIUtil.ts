import { HandsListObject, Suits, PokerHands } from "@/module/basic/type";

export class UIUtil {
    static getSuitsTxt = (suits: Suits, showAbbr = true) => {
        if (showAbbr) {
            switch (suits) {
                case Suits.Spades:
                    return "Sp";
                case Suits.Hearts:
                    return "He";
                case Suits.Clubs:
                    return "Cl";
                case Suits.Diamonds:
                    return "Di";
            }
        } else {
            switch (suits) {
                case Suits.Spades:
                    return "♠";
                case Suits.Hearts:
                    return "♥";
                case Suits.Clubs:
                    return "♣";
                case Suits.Diamonds:
                    return "♦";
            }
        }
    };
    static getSuitsColor = (suits: Suits) => {
        switch (suits) {
            case Suits.Spades:
                return "black";
            case Suits.Hearts:
                return "red";
            case Suits.Clubs:
                return "black";
            case Suits.Diamonds:
                return "red";
        }
    };
    static getFaceTxt = (face: number) => {
        if (face === 14) {
            return "A";
        } else if (face === 13) {
            return "K";
        } else if (face === 12) {
            return "Q";
        } else if (face === 11) {
            return "J";
        }
        return face;
    };
    static getHandsListObjectHightestHandsText = (listHands: HandsListObject | null) => {
        if (!listHands) {
            return "null";
        }
        return UIUtil.getHandsTxt(listHands.HightestHands);
    };
    static getHandsTxt = (hands: PokerHands) => {
        switch (hands) {
            case PokerHands.RoyalFlush:
                return "RoyalFlush";
            case PokerHands.StraightFlush:
                return "StraightFlush";
            case PokerHands.Four:
                return "Four";
            case PokerHands.FullHouse:
                return "FullHouse";
            case PokerHands.Flush:
                return "Flush";
            case PokerHands.Straight:
                return "Straight";
            case PokerHands.Three:
                return "Three";
            case PokerHands.TwoPair:
                return "TwoPair";
            case PokerHands.Pair:
                return "Pair";
            case PokerHands.HighCard:
                return "HighCard";
        }
    };
}
