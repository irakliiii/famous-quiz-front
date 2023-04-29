import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { axiosInstance } from "../../helpers/axios";

export const Stats = () => {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const authContext = useContext(AdminAuthContext);
  const authData = authContext.data;

  useEffect(() => {
    if (authData?.token) {
      axiosInstance("/stats-detailed", {
        headers: { Authorization: `Bearer ${authData?.token}` },
      }).then(({ data }) => {
        setData(data);
      });
    }
  }, [authContext]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
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
      {state?.success && `Your success rate ${state.success}%`}
      {data.map((item) => (
        <div>
          {item.title} {item.value}
        </div>
      ))}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
