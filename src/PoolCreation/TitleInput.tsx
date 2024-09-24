import {ChangeEvent, useContext} from "react";
import {PoolCreationContext} from "./PoolCreationContext";

const TitleInput = () => {
    const { setTitle, title } = useContext(PoolCreationContext);
    const handleInput = (e: ChangeEvent) => {
        const text = (e.target as HTMLInputElement).value;
        setTitle(text);
    };

    return (
        <div>
            <span>Pool Title:&nbsp;&nbsp;</span>
            <input maxLength={100} type="text" required onChange={handleInput} value={title} />
        </div>
    )
};

export default TitleInput;