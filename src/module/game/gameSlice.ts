import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListHands, Poker, Suits } from "../basic/type";
import { AppThunk } from "@/store";
import { CommonUtil } from "@/util/CommonUtil";
import { PokerUtil } from "@/util/PokerUtil";

export interface gameState {
    testPokerList: Poker[];
    testListHands: ListHands | null;
    testScoreList: Poker[] | null;
}

const initialState: gameState = {
    testPokerList: [],
    testListHands: null,
    testScoreList: null,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setTestPokerList: (state, action: PayloadAction<Poker[]>) => {
            state.testPokerList = action.payload;
        },
        setTestListHands: (state, action: PayloadAction<ListHands>) => {
            state.testListHands = action.payload;
            if (action.payload.RoyalFlush) {
                state.testScoreList = action.payload.RoyalFlush.scoreList;
            } else if (action.payload.StraightFlush) {
                state.testScoreList = action.payload.StraightFlush.scoreList;
            } else if (action.payload.Four) {
                state.testScoreList = action.payload.Four.scoreList;
            } else if (action.payload.FullHouse) {
                state.testScoreList = action.payload.FullHouse.scoreList;
            } else if (action.payload.Flush) {
                state.testScoreList = action.payload.Flush.scoreList;
            } else if (action.payload.Straight) {
                state.testScoreList = action.payload.Straight.scoreList;
            } else if (action.payload.Three) {
                state.testScoreList = action.payload.Three.scoreList;
            } else if (action.payload.TwoPair) {
                state.testScoreList = action.payload.TwoPair.scoreList;
            } else if (action.payload.Pair) {
                state.testScoreList = action.payload.Pair.scoreList;
            } else if (action.payload.HighCard) {
                state.testScoreList = action.payload.HighCard.scoreList;
            }
        },
    },
});

export const { setTestPokerList, setTestListHands } = gameSlice.actions;

export const generateTestPokers = (): AppThunk => (dispatch, getState) => {
    const { basicDeck } = getState().basic;
    const randomSet = new Set<number>();
    for (let i = 0; i < 7; i++) {
        const currentIndex = CommonUtil.getRandomNum(0, basicDeck.length - 1);
        if (randomSet.has(currentIndex)) {
            i--;
        } else {
            randomSet.add(currentIndex);
        }
    }
    const pokerList: Poker[] = [];
    randomSet.forEach((index) => pokerList.push(basicDeck[index]));
    pokerList.sort((pre, nex) => {
        return nex.face - pre.face || pre.suits - nex.suits;
    });
    const listHands = PokerUtil.getListHands({ pokerList });
    dispatch(setTestPokerList(pokerList));
    dispatch(setTestListHands(listHands));
};

export const testGenerateTestPokers = (): AppThunk => (dispatch, getState) => {
    const pokerList: Poker[] = [
        { id: "1", suits: Suits.Spades, face: 14 },
        { id: "2", suits: Suits.Spades, face: 14 },
        { id: "3", suits: Suits.Clubs, face: 14 },
        { id: "4", suits: Suits.Clubs, face: 5 },
        { id: "5", suits: Suits.Spades, face: 4 },
        { id: "6", suits: Suits.Spades, face: 3 },
        { id: "7", suits: Suits.Spades, face: 2 },
    ];
    const listHands = PokerUtil.getListHands({ pokerList });
    dispatch(setTestPokerList(pokerList));
    dispatch(setTestListHands(listHands));
};

export const gameReducer = gameSlice.reducer;
