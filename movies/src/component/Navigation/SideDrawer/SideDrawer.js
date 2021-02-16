import React from 'react';
import "./SideDrawer.css";
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from "../../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open}
                      clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}
                 onClick={props.closed}>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;
