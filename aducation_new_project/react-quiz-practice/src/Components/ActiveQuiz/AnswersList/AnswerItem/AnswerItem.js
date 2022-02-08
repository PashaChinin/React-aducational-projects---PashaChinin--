
import classes from './AnswerItem.module.scss'
import React from "react";

const AnswerItem = props => {
    const styles = [classes.AnswerItem]

if (props.state){
    styles.push(classes[props.state])

}
    return (
        <li
            className={styles.join(' ')}
            onClick={ () => {
                props.onAnswerClick(props.answer.id)
                console.log(props)
            } }
        >
            {props.answer.text}
        </li>
    )
}
export default AnswerItem