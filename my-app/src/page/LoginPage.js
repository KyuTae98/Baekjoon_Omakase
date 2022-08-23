import LoginForm from '../components/Login/LoginForm.js'
import BeacjunLabel from '../components/Label/BeacjunLabel.js'
import Recom from "../components/Recomation/Recom.js"
import './StyledPage.css'

const LoginPage = () => {
    return (
        <div className='Page'>
            <BeacjunLabel />
            <LoginForm />
            <Recom />
        </div>
    )
}

export default LoginPage;