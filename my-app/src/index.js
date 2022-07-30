import ReactDOM from 'react-dom'
import Header from './Header.js'
import Login from './Login.js'

const Index = () => {
    return (<div>
        <Header />
        <Login />
    </div>)
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);