import { Button, ConfigProvider, Form, Input, theme } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import "./SignUppage.css";
import { createUser } from "../../service";
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from "../../components";
import { useUserStore } from "../../hook";

export default function SignUppage() {
    const navigate = useNavigate();
    const {clearUser} = useUserStore();

    const onFinish = (values: { username: string, email: string, password: string, passwordConfirm: string }) => {
        if(values.password === values.passwordConfirm){
            createUser(values.username, values.email, values.password, navigate);
            clearUser();
        }
        else{
            alert("Password does not equal password confirm");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="sign-up-page flex justify-end items-center h-screen bg-cover bg-center bg-no-repeat">
            <Logo fontSize="2rem" className="absolute top-4 right-4"/>
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
                    className="sign-up-form w-1/2 flex items-center justify-center flex-col p-8 h-screen"
                >
                    <h1>Sign Up</h1>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
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
                    <Form.Item
                        name="passwordConfirm"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password Confirm"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="login-form-button" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div>
                        Or <Link to={"/log-in"}>login now!</Link>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    );
};