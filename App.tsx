import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Counter from "./src/app/page/Counter";

const App: FC = () => {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
};

export default App;
