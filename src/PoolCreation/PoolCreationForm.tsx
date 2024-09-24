import ImageUpload from "./ImageUpload";
import CreatePoolButton from "./CreatePoolButton";
import React from "react";
import {PoolCreationContextProvider} from "./PoolCreationContext";
import TitleInput from "./TitleInput";
import DescriptionTextarea from "./DescriptionTextarea";

const PoolCreationForm = () => {
    return (
        <PoolCreationContextProvider>
            <form>
                <TitleInput/>
                <br/>
                <DescriptionTextarea />
                <br />
                <ImageUpload/>
                <br/>
                <CreatePoolButton/>
            </form>
        </PoolCreationContextProvider>
    )
};

export default PoolCreationForm;