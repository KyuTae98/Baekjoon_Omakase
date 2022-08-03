import Header from './Header.js'
import Login from './Login.js'
import Recom from './Recom.js'
import "./index.css"

const App = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-[#0c4a6e] w-full h-64 flex justify-center items-center"><Header /></div>
            <div className="pt-14"><Login /></div>
            <div><Recom /></div>
        </div >
    )
}

export default App;