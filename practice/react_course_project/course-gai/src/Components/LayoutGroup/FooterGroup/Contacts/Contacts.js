import classes from './Contacts.module.scss'
import PhoneLogo from '../../../../images/phone-icon.svg'
const Contacts = () => (

    <div className={classes.ContactsContainer}>
        <div className={classes.IconContacts}>
            <img src={PhoneLogo} style={{width: 20}} />
        </div>

        <div className={classes.Contacts}>
            <a href='tel: +375336339323'>+375336339323</a>
            <a href='tel: +375336339323'>+375336339323</a>
        </div>

    </div>
)
export default Contacts