import React, {Component} from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick} from "../../store/actions/quiz";


class Quiz extends Component  {






    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
}

    async componentDidMount() {

    this.props.fetchQuizById(this.props.match.params.id)
        console.log(this.props)

    }

    render() {
        return(
    <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>
            {this.props.loading || !this.props.quiz
            ? <Loader/> :
                this.props.isFinished ? <FinishedQuiz
                        results = {this.props.results}
                        quiz={this.props.quiz}
                        onRetry = {this.onRetryHandler}
                    />


                    : <ActiveQuiz
                        answers = {this.props.quiz[this.props.activeQuestion].answers}
                        question = {this.props.quiz[this.props.activeQuestion].question}
                        onAnswerClick = {this.props.quizAnswerClick}
                        quizLength = {this.props.quiz.length}
                        answerNumber = {this.props.activeQuestion + 1}
                        state = {this.props.answerState}

                    />
            }

        </div>
    </div>
        )
    }
}
function mapStateToProps (state){
    return {
        //state.quiz поскольку есть объединение редюсеров, а редюсер quizReducer записан в объекте как поле quiz
        results: state.quiz.results, // {[id]: success/error}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading

    }
}
function mapDispatchToProps (dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)