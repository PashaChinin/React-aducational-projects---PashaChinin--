import React from "react";
import classes from './QuizCreator.module.scss'
import Button from "../../Components/UI/Button/Button";
import Select from "../../Components/UI/Select/Select";
import {createControl, validate, validateForm} from "../../Form/FormFramework";
import Input from "../../Components/UI/Input/Input";
import axios from '../../axios/axios-quiz';

function createOptionControl(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage:'Варинат не может быть пустым',
            id: number
        },{required:true}
    )
}


function createFormControls () {

    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage:'Вопрос не корректной формы'
        },{required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}


export default class QuizCreator extends React.Component {
    state = {
        isFormValid: false,
        quiz: [],
        rightAnswerId:1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {

        event.preventDefault()
        const  quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question,option1,option2,option3,option4} = this.state.formControls

        const questionItem = {
            question: this.state.formControls.question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]

        }
        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    createQuizHandler = async event => {
        event.preventDefault()
            try {
            await axios.post('quizes.json',this.state.quiz)

                this.setState({
                    quiz: [],
                    isFormValid: false,
                    rightAnswerId: 1,
                    formControls: createFormControls()
                })
        }

            catch (e) {
            console.log(e)
            }

        // axios.post('https://react-quiz-44278-default-rtdb.europe-west1.firebasedatabase.app/quizes.json',this.state.quiz)
        //     .then( response => {
        //         console.log(response)
        //     } ).catch(error => console.log(error))

    }


    renderControls = () => {
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                    <React.Fragment>
                <Input
                label={control.label}
                value={control.value}
                shouldValidate={!!control.validation}
                touched={control.touched}
                valid={control.valid}
                errorMessage={control.errorMessage}
                onChange={event => this.onChangeHandler(event.target.value,controlName)}
                key={index}
                />
                        {index === 0 ? <hr/> : null}
                        </React.Fragment>
            )
        })
    }
    onChangeHandler = (value, controlName) => {
        //console.log(value, controlName)
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        //console.log(this.state.formControls.option1.value)
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
        //console.log(this.state.formControls[controlName])
        console.log(this.state.isFormValid)
    }


    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }



    render() {

        const select = <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
        ]}
        />

        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        {select}
                        <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}

                        >
                            Создать тест
                        </Button>
                        </form>

                </div>
            </div>
        )
    }

}