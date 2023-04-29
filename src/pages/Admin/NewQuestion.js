import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../helpers/axios";

export const NewQuestion = () => {
  const [type, setType] = useState("boolean");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axiosInstance.post("question", data).then(() => {
      navigate("/admin");
    });
  };
  const handleClick = (event) => {
    setType(event.target.value);
  };

  return (
    <>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        Question:
        <Input placeholder="Question" name="question" required />
        <br />
        Type of question:
        <label>
          <input
            type="radio"
            name="type"
            value="boolean"
            onClick={handleClick}
            defaultChecked={type === "boolean"}
          />{" "}
          Yes/No
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="answers"
            onClick={handleClick}
            defaultChecked={type === "answers"}
          />{" "}
          Answers
        </label>
        <div>
          <br />
          <br />
          {type === "boolean" && (
            <>
              Answer:
              <label>
                <input type="radio" name="correct_answer" value="1" required />{" "}
                Yes
              </label>
              <label>
                <input type="radio" name="correct_answer" value="0" required />{" "}
                No
              </label>
            </>
          )}
          {type === "answers" && (
            <>
              Answers:
              <Input placeholder="Answer" name="answers[]" required />
              <label>
                <input type="radio" name="correct_answer" value="1" required /> Correct
                Answer
              </label>
              <br />
              <br />
              <Input placeholder="Answer" name="answers[]" required />
              <label>
                <input type="radio" name="correct_answer" value="2" required /> Correct
                Answer
              </label>
              <br />
              <br />
              <Input placeholder="Answer" name="answers[]" required />
              <label>
                <input type="radio" name="correct_answer" value="3" required /> Correct
                Answer
              </label>
            </>
          )}
        </div>
        <br />
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </form>
    </>
  );
};
