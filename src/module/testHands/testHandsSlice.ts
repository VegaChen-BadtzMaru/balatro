import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListHands, Poker } from "../basic/type";
import { AppThunk } from "@/store";
import { PokerUtil } from "@/util/PokerUtil";

export interface testHandsState {
    pokerList: Poker[];
    scoreList: Poker[] | null;
    listHands: ListHands | null;
}

const initialState: testHandsState = {
    pokerList: [],
    scoreList: null,
    listHands: null,
};

export const testHandsSlice = createSlice({
    name: "testHands",
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState;
        },
        setPokerList: (state, action: PayloadAction<Poker[]>) => {
            state.pokerList = action.payload;
        },
        setListHands: (state, action: PayloadAction<ListHands>) => {
            state.listHands = action.payload;
            if (action.payload.RoyalFlush) {
                state.scoreList = action.payload.RoyalFlush.scoreList;
            } else if (action.payload.StraightFlush) {
                state.scoreList = action.payload.StraightFlush.scoreList;
            } else if (action.payload.Four) {
                state.scoreList = action.payload.Four.scoreList;
            } else if (action.payload.FullHouse) {
                state.scoreList = action.payload.FullHouse.scoreList;
            } else if (action.payload.Flush) {
                state.scoreList = action.payload.Flush.scoreList;
            } else if (action.payload.Straight) {
                state.scoreList = action.payload.Straight.scoreList;
            } else if (action.payload.Three) {
                state.scoreList = action.payload.Three.scoreList;
            } else if (action.payload.TwoPair) {
                state.scoreList = action.payload.TwoPair.scoreList;
            } else if (action.payload.Pair) {
                state.scoreList = action.payload.Pair.scoreList;
            } else if (action.payload.HighCard) {
                state.scoreList = action.payload.HighCard.scoreList;
            }
        },
    },
});

const { setInitialState, setPokerList, setListHands } = testHandsSlice.actions;

export const generateTestHands =
    (pokerList: Poker[]): AppThunk =>
    (dispatch, getState) => {
        dispatch(setPokerList(pokerList));
        dispatch(setListHands(PokerUtil.getListHands({ pokerList: PokerUtil.sortPokerList(pokerList, "face") })));
    };

export const resetTestHandsState = (): AppThunk => (dispatch, getState) => {
    dispatch(setInitialState());
};

export const testHandsReducer = testHandsSlice.reducer;
