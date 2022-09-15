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
                {isInput && userData.map(items => {
                    <Recom
                        number={items.name}
                        title={items.name}
                        tier={items.name}
                        url={items.name}
                    />
                })}
                {!isInput && <LoginForm />}
            </Fragment>
        </div>
    )
}

export default LoginPage;