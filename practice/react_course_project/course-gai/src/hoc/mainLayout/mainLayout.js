import React from "react";
import Header from "../../headerGroup/Header/Header";
import NavigationBlock from "../../NavigationLineGroup/NavigationBlock";
import Footer from '../../Components/LayoutGroup/FooterGroup/Footer/Footer'
import classes from './mainLayout.module.scss'
import {Route} from 'react-router-dom'


class MainLayout extends React.Component {




    render() {
        return (
            <div className={classes.LayoutBody}>
                <div className={classes.LayoutHeader}>
                    <Header/>
                    <NavigationBlock/>
                </div>
                <div className={classes.MainSection}>
                    <main>{this.props.children}</main>


                </div>
                <div className={classes.LayoutFooter}>
                    <Footer/>
                </div>

            </div>

        )
    }


}


export default MainLayout