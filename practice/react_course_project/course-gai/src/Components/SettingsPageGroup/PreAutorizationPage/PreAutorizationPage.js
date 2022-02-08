
import classes from './PreAuthorizationPage.module.scss'
import { get } from "http";
import axios from "axios";
import { useState } from "react";

const PreAuthorizationPage = (props) => {
    const [login,setLogin] = useState(null)
    const [password,setPassword] = useState(null)

    const onClickLoginHandler = async () => {

        const response = await axios.post("http://localhost:5000/login_check",{login: login, password: password})
        props.getIsLogged(response.data.isLogged)
        console.log(response.data)
    }


    return (
        <div>
        <div className={classes.Message}>Вы не авторизованы в системе! Для доступа в панель управления необходимо авторизация с правами Администратор</div>
            <div className={classes.LoginFormContainer}>
                <div className={classes.Form}>
                    <div className={classes.FormInputs}>
                        <input type={"text"} placeholder={"Фамилия(Логин)"} onChange={event => setLogin(event.target.value)}/>
                        <input type={"password"} placeholder={"Пароль"} onChange={event => setPassword(event.target.value)}/>
                    </div>
                    <div className={classes.FormButtons}>
                        <div><button>Регистрация</button></div>
                        <div><button onClick={onClickLoginHandler}>Вход</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PreAuthorizationPage