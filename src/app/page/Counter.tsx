import React, { FC } from "react";
import { StyleSheet, Button, SafeAreaView } from "react-native";
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd } from "../../module/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouterParams } from "../router/type";
import Text from "@/widget/Text";

export interface CounterProps extends NativeStackScreenProps<RouterParams, "Counter"> {}

const Counter: FC<CounterProps> = ({ navigation }) => {
    const { value, status } = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView>
            <Text>state: {status}</Text>
            <Text>count: {value}</Text>
            <Button title="Increment value" onPress={() => dispatch(increment())} />
            <Button title="IncrementByAmount 2 value" onPress={() => dispatch(incrementByAmount(2))} />
            <Button title="Decrement value" onPress={() => dispatch(decrement())} />
            <Button title="IncrementAsync" onPress={() => dispatch(incrementAsync())} />
            <Button title="incrementIfOdd" onPress={() => dispatch(incrementIfOdd(2))} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Counter;
