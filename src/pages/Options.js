import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Options = () => {
  const appContext = useContext(AppContext);
  const handleClick = (event) => {
    appContext.setType(event.target.value);
    appContext.setShowStart(true);
  };
  return (
    <>
    <h1>Options</h1>
    <div>
        Type of questions<br/><br/>
    </div>
      <label>
        <input
          type="radio"
          name="type"
          value="boolean"
          onClick={handleClick}
          defaultChecked={appContext.type === "boolean"}
        />{" "}
        Yes/No
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="answers"
          onClick={handleClick}
          defaultChecked={appContext.type === "answers"}
        />{" "}
        Answers
      </label>
    </>
  );
};
