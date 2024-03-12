import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { basicReducer } from "@/module/basic/basicSlice";
import { gameReducer } from "@/module/game/gameSlice";
import { testHandsReducer } from "@/module/testHands/testHandsSlice";

export const store = configureStore({
    reducer: {
        basic: basicReducer,
        game: gameReducer,
        testHands: testHandsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
