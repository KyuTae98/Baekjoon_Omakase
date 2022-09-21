import { Fragment } from 'react'
import LoginForm from '../components/Login/LoginForm.js'
import BeacjunLabel from '../components/Label/BeacjunLabel.js'
import Recom from "../components/Recomation/Recom.js"
import { useSelector } from 'react-redux'
import './StyledPage.css'


const LoginPage = () => {
    const isInput = useSelector((state) => state.userAuthe)
    const userData = useSelector((state) => state.userData)
    return (
        <div className='Page'>
            <Fragment>
                <BeacjunLabel />
                <ul className='probrem'>
                    {isInput && userData.map(items => (
                        <Recom
                            number={items.number}
                            title={items.title}
                            tier={items.tier}
                            url={items.url}
                        />
                    ))}
                </ul>
                {!isInput && <LoginForm />}
            </Fragment>
        </div>
    )
}

export default LoginPage;