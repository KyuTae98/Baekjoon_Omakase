import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from "./App.js"
import store from './store/index.js';
import './index.css';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        < App />
    </Provider>
);