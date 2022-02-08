import classes from "./SocialNetworkButton.module.scss"
import facebook_pic  from "../../images/facebookSVG.svg"
import instagram_pic from "../../images/instagramSVG.svg"

const SocialNetworkButton = (props) => {
    const cls = [classes.SocialNetworkButton, classes[props.type]]

    if (props.type === 'facebook')
    {

        return (
        < div style = {{ backgroundImage: `url(${facebook_pic})`,  width: props.width, height: props.height}} className={cls.join(' ')} >

        < /div>
        )

    }

    else if (props.type === 'instagram')
    {
        return (
        < div style = {{backgroundImage: `url(${instagram_pic})`, backgroundRepeat: "no-repeat" , width: props.width, height: props.height}}  className={cls.join(' ')}>

        < /div>
        )
    }


}
export default SocialNetworkButton