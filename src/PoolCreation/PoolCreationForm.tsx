import { useContext } from "react";
import ImageUpload from "./ImageUpload";
import CreatePoolButton from "./CreatePoolButton";
import { PoolCreationContext } from "./PoolCreationContext";
import TitleInput from "./TitleInput";
import DescriptionTextarea from "./DescriptionTextarea";

const PoolCreationForm = () => {
  const { isSubmitting } = useContext(PoolCreationContext);

  return (
    <form>
      <fieldset
        disabled={isSubmitting}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <TitleInput />
        <br />
        <DescriptionTextarea />
        <br />
        <ImageUpload />
        <br />
        <CreatePoolButton />
      </fieldset>
    </form>
  );
};

export default PoolCreationForm;
