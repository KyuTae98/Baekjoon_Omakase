import LoginForm from '../components/Login/LoginForm.js'
import BeacjunLabel from '../components/Label/BeacjunLabel.js'

import './StyledPage.css'

const LoginPage = () => {
    return (
        <div className='Page'>
            <BeacjunLabel />
            <LoginForm />

        </div>
    )
}

export default LoginPage;