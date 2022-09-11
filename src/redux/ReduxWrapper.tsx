import React from 'react';
import { store } from "./AuthPageReducer";
import { Provider } from "react-redux";

export default ({element}) => (
    <Provider store={store}>{element}</Provider>
)