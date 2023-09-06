import { Button, ConfigProvider, Form, Input, theme } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import "./LogInpage.css";
import { loginUser } from "../../service/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/User";

function LogInpage() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    const onFinish = (values: {email: string, password: string}) => {
        console.log('Success:', values);
        loginUser(values.email, values.password, navigate, setUser);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="sign-in-page">
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    components: {
                        Input: {
                            colorPrimary: '#FFD369',
                            algorithm: true,
                            colorBorder: "transparent",
                        },
                        Button: {
                            colorBgContainer: '#FFD369',
                            colorPrimaryHover: "#FFF5E0"
                        },
                    }
                }}
            >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="sign-in-form"
                >
                    <h1>Log In</h1>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="login-form-button" block>
                            Log in
                        </Button>
                    </Form.Item>
                    <div>
                        Or <Link to={"/sign-up"}>register now!</Link>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default LogInpage;