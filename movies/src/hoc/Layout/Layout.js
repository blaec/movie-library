import React, {useState} from 'react';
import './Layout.css';
import Toolbar from "../../component/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../component/Navigation/SideDrawer/SideDrawer";

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
        console.log(`sideDrawerClosedHandler - sideDrawerIsVisible ${sideDrawerIsVisible}`)
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
        console.log(`sideDrawerToggleHandler - sideDrawerIsVisible ${sideDrawerIsVisible}`)
    };

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={sideDrawerIsVisible}
                        closed={sideDrawerClosedHandler}/>
            <main className="Children">
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default layout;