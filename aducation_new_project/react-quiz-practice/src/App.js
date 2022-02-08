import Layout from "./hoc/Layout/Layout";
import QuizList from "./Containers/QuizList/QuizList";
import QuizCreator from "./Containers/QuizCreator/QuizCreator";
import Auth from "./Containers/Auth/Auth";
import Quiz from "./Containers/Quiz/Quiz";
import React, {Component} from "react";
import {Route,Switch} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/' component={QuizList}/>
                </Switch>
            </Layout>
        );
    }


}

export default App;
