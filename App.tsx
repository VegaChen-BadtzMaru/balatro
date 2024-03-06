import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Router from "./src/app/router/Router";

const App: FC = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
