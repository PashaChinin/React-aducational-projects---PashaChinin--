import {NavLink} from 'react-router-dom'
import classes from './NavigationLine.module.scss'

const NavigationLine = () => {

    return (
       <div className={classes.NavBarContainer}>
           <nav className={classes.NavBar}>
               <ul className={classes.List}>
                   <li>
                       <NavLink to={'/'}>Главная</NavLink>
                   </li>
                   <li>
                       <NavLink to={'/contacts'}>Контакты</NavLink>
                   </li>
                   <li>
                       <NavLink to={'/help'}>Справка</NavLink>
                   </li>
                   <li>
                       <NavLink to={'/settings'}>Управление</NavLink>
                   </li>
               </ul>
           </nav>
       </div>
    )
}
export default NavigationLine