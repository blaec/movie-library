import React from 'react';

import FileLoader from "./components/FileLoader/FileLoader";
import WishLoader from "./components/WishLoader/WishLoader";
import MyGrid from "../../../../UI/Buttons/MyGrid";

const upload = () => {
    let loaders = [<WishLoader key={1}/>, <FileLoader key={2}/>]
    return (
        <MyGrid>
            {loaders}
        </MyGrid>
    );
};

export default upload;