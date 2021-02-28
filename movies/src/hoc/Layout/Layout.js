import React from 'react';
import './Layout.css';
import Toolbar from "../../component/Navigation/Toolbar/Toolbar";

const layout = props => {
    return (
        <React.Fragment>
            <Toolbar />
            <main className="Children">
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default layout;