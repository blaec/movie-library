import React, {useState} from 'react';

import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";

const toolbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <MyAppBar onDrawerToggle={handleDrawerToggle}/>
            <MyDrawer open={mobileOpen}
                      onDrawerToggle={handleDrawerToggle}
            />
        </div>
    );
}

export default toolbar;
