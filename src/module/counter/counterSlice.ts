import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";
import { AppThunk } from "../../store";

export interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
};

export const incrementAsync = createAsyncThunk("counter/fetchCount", async () => {
    const response = await fetchCount();
    return response.data;
});

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.value += action.payload;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementIfOdd =
    (amount: number): AppThunk =>
    (dispatch, getState) => {
        const currentValue = getState().counter.value;
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount));
        }
    };

export const counterReducer = counterSlice.reducer;
