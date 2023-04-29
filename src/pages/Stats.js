import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";

export const Stats = () => {
  const { state } = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance("/stats").then(({ data }) => {
      setData(data);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Elapsed Time",
      dataIndex: "elapsed_time",
      key: "elapsed_time",
    },
  ];

  return (
    <div>
      <h1>Statistics</h1>
      {state?.success && (
        <>
          Your success rate {state.success}% Your score {state.score}
          {state?.unanswered && `Unanswered questions ${state?.unanswered}`}
          <Link to="/">Restart</Link>
        </>
      )}
      {data.map((item) => (
        <div>
          {item.title} {item.value}
        </div>
      ))}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
