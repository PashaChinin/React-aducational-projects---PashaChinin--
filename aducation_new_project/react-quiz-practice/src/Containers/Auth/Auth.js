import React from "react";
import classes from './Auth.module.scss';
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import axios from "axios";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный E-mail',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный Пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAMLlnYATZLwEY5a-pd_RxVT_8_u1Dq_I', authData)
            console.log(response.data)
        }

        catch (error){
            console.log(error)
        }
    }



    registerHandler = async () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAMLlnYATZLwEY5a-pd_RxVT_8_u1Dq_I', authData)
        console.log(response.data)
        }

    catch (error){
            console.log(error)
        }
    }
    submitHandler = (event) => {
        event.preventDefault()
    }
    validateControl (value,validation){
    if (!validation){ //Если не передали Validation то вернуть true
        return true
    }
    let isValid = true

        if (validation.required) {
            isValid = value.trim() !=='' &&isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
}
    onChangeHandler = (event, controlName) => {
        //console.log(`${controlName}: `, event.target.value)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation) // Получаем измененное значения

        formControls[controlName] = control // Поэтому здесь меняем локальный state

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map( (controlIName, index) => {
            const control = this.state.formControls[controlIName]

            return (
                <Input
                    key={controlIName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={ (event) => {this.onChangeHandler(event,controlIName)}}
                />
            )
        })
    }

    render() {


        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Аутентификация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }

}
