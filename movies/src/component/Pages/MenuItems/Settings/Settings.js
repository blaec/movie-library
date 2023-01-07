import React from 'react';

import LanguagePicker from "./components/LanguagePicker";
import FileLoader from "./components/FileLoader/FileLoader";
import WishLoader from "./components/WishLoader/WishLoader";
import MyGrid from "../../../../UI/Buttons/MyGrid";
import MyFullWidthGrid from "../../../../UI/Buttons/MyFullWidthGrid";
import PageSlider from "./components/PageSlider/PageSlider";

const settings = () => {
    let fullWidthBlocks = [<LanguagePicker key={1}/>, <PageSlider key={2}/>]
    let loaders = [<WishLoader key={1}/>, <FileLoader key={2}/>]
    return (
        <React.Fragment>
            <MyFullWidthGrid>
                {fullWidthBlocks}
            </MyFullWidthGrid>
            <MyGrid>
                {loaders}
            </MyGrid>
        </React.Fragment>
    );
};

export default settings;