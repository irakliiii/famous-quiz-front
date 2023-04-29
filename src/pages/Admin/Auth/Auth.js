import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "./Auth.css";
import { authenticate } from "../../../helpers/api";
import { AdminAuthContext } from "../../../context/AdminAuthContext";

export const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const authContext = useContext(AdminAuthContext);

  const handleSubmit = (e) => {
    authenticate(
      {
        email: e.email,
        password: e.password,
      },
      authContext,
      navigate
    ).then(() => {console.info('1'); navigate("/admin")}).catch((data) => setError(data));
  };
  useEffect(() => {if (authContext.isAuthenticated) navigate('/admin')}, [authContext]);
  return (
    <div>
      <div className="login-form">
        <h2>{"Log in"}</h2>
        <Form name="normal_login" onFinish={handleSubmit}>
          <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={"Email"}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              prefix={<KeyOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={"Password"}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {"Log in"}
            </Button>
          </Form.Item>
        </Form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};
