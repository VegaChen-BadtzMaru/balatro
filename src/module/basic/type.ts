export enum Suits {
    Spades,
    Hearts,
    Clubs,
    Diamonds,
}

export interface Poker {
    id: string;
    suits: Suits;
    face: number;
}

export enum PokerHands { // Sort for compare
    HighCard,
    Pair,
    TwoPair,
    Three,
    Straight,
    Flush,
    FullHouse,
    Four,
    StraightFlush,
    RoyalFlush,
}

export interface HandsItem {
    scoreList: Poker[];
    formList: Poker[];
}

export enum compareResult {
    LeftWin,
    RightWin,
    Draw,
}

export interface ListHands {
    RoyalFlush: HandsItem | null;
    StraightFlush: HandsItem | null;
    Four: HandsItem | null;
    FullHouse: HandsItem | null;
    Flush: HandsItem | null;
    Straight: HandsItem | null;
    Three: HandsItem | null;
    TwoPair: HandsItem | null;
    Pair: HandsItem | null;
    HighCard: HandsItem | null;
    HightestHands: PokerHands;
}
