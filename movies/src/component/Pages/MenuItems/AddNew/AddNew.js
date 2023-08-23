import React from 'react';

import FileLoader from "./components/FileLoader/FileLoader";
import WishLoader from "./components/WishLoader/WishLoader";
import MyGrid from "../../../../UI/Buttons/MyGrid";

const addNew = () => {
    let loaders = [<WishLoader key={1}/>, <FileLoader key={2}/>]
    return (
        <React.Fragment>
            <MyGrid>
                {loaders}
            </MyGrid>
        </React.Fragment>
    );
};

export default addNew;