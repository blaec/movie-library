import React from 'react';

import FileLoader from "./components/FileLoader/FileLoader";
import WishLoader from "./components/WishLoader/WishLoader";
import MyGrid from "../../../../UI/Buttons/MyGrid";

const upload = () => {
    let loaders = [<WishLoader/>, <FileLoader/>]
    return (
        <MyGrid>
            {loaders}
        </MyGrid>
    );
};

export default upload;