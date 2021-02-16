import React from 'react';
import './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Gallery</NavigationItem>
        <NavigationItem link="/update" exact>Update</NavigationItem>
    </ul>
);

export default navigationItems;
