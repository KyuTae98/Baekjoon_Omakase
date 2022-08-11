import { createRoot } from 'react-dom/client'
import Loginpage from './Loginpage.js'
import './index.css';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Loginpage />);