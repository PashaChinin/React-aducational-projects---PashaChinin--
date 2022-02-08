import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_ACTION
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {

            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
              quizes.push({
                  id: key,
                  name: `Тест №${index+1}`
              })
           })

            dispatch(fetchQuizesSuccess(quizes))
        }
        catch (error){
            fetchQuizesError(error)
        }
    }
}
export function fetchQuizById(quizId){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            console.log(response.data)
            console.log('FROM ACTION')
            dispatch(fetchQuizSuccess(quiz))
        }
        catch (error)
        {
            dispatch(fetchQuizesError(error))
        }

    }


}
export function fetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz

    }
}
export function quizAnswerClick(answerID){
    return  (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState) // Шерение универсального получения ключа для алгоритма, при 1 единственной записи
            if (state.answerState[key] === 'success') {
                return
            }
        }
        console.log('state в AnswerClick ')
        console.log(state)
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success'

            }
            dispatch(quizSetState({[answerID]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                window.clearTimeout(timeout)

            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerID]: 'error'}, results))
        }
    }
}
export function finishQuiz(){
return {
    type: FINISH_QUIZ
    }
}
export function quizNextQuestion(questionNumber) {
    return {
        type: QUIZ_NEXT_ACTION,
        questionNumber
    }
}
export function fetchQuizesStart() {

    return {
        type: FETCH_QUIZES_START
    }
}
function isQuizFinished(state) {

        return state.activeQuestion + 1 === state.quiz.length

}
export function fetchQuizesSuccess(quizes){
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }

}
export function fetchQuizesError(error){
return {
    type: FETCH_QUIZES_ERROR,
    error: error
}
}
export function quizSetState(answerState,results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}
