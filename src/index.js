import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import theme from "./theme";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);