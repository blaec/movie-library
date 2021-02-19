import React from 'react';
import './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>GALLERY</NavigationItem>
        <NavigationItem link="/update" exact>UPDATE</NavigationItem>
    </ul>
);

export default navigationItems;
