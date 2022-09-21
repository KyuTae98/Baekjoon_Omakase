import { Fragment } from 'react'
import LoginForm from '../components/Login/LoginForm.js'
import BeacjunLabel from '../components/Label/BeacjunLabel.js'
import Recom from "../components/Recomation/Recom.js"
import Loader from '../components/Loding/Loder.js'
import { useSelector } from 'react-redux'
import './StyledPage.css'


const LoginPage = () => {
    const isInput = useSelector((state) => state.userAuthe)
    const userLoding = useSelector((state) => state.loding)
    const userData = useSelector((state) => state.userData)
    return (
        <div className='Page'>
            <Fragment>
                {(!(isInput === 2)) && <BeacjunLabel />}
                <ul className='probrem'>
                    {(isInput === 3) && userData.map(items => (
                        <Recom
                            number={items.number}
                            title={items.title}
                            tier={items.tier}
                            url={items.url}
                        />
                    ))}
                </ul>
                {(isInput === 1) && <LoginForm />}
                {(isInput === 2) && <Loader />}
            </Fragment>
        </div>
    )
}

export default LoginPage;