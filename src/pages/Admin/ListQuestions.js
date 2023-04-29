import { Button, Collapse } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { logout } from "../../helpers/api";
import { axiosInstance } from "../../helpers/axios";
const { Panel } = Collapse;

export const ListQuestions = () => {
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const authContext = useContext(AdminAuthContext);
  const authData = authContext.data;

  useEffect(() => {
    if (authData?.token) {
      axiosInstance("/questions", {
        headers: { Authorization: `Bearer ${authData?.token}` },
      }).then(({ data }) => {
        setData(data);
      });
    }
  }, [authContext]);

  const _logout = () => {
    logout(authContext, nav);
  };

  return (
    <div>
      <Button onClick={_logout}>Logout</Button>
      <h1>Question List</h1>
      <Button type="primary" onClick={() => nav("/admin/new")}>
        New
      </Button>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Collapse>
              <Panel header={item.question} key="1">
                {item.type === "answers" &&
                  item.answers.map((answersItem) => (
                    <p key={answersItem.id}>
                      {answersItem.answer}{" "}
                      {answersItem.id === item.correct_answer && " - correct"}
                    </p>
                  ))}
                {item.type === "boolean" &&
                  "correct answer - " + (item.correct_answer ? "yes" : "no")}
              </Panel>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};
