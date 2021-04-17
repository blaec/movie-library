import React from 'react';
import './Layout.css';

import Toolbar from "../../component/Toolbar/Toolbar";

const layout = props => {
    const {children} = props;

    return (
        <React.Fragment>
            <Toolbar />
            <main className="Children">
                {children}
            </main>
        </React.Fragment>
    );
};

export default layout;