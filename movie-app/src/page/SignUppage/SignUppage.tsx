import { Button, ConfigProvider, Form, Input, theme } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import "./SignUppage.css";
import { createUser } from "../../service/Auth";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../state/User";

function SignUppage() {
    const navigate = useNavigate();
    const {setUser} = useUserStore();

    const onFinish = (values: { username: string, email: string, password: string, passwordConfirm: string }) => {
        console.log('Success:', values);
        if(values.password === values.passwordConfirm){
            createUser(values.username, values.email, values.password, navigate, setUser);
        }
        else{
            alert("Password does not equal password confirm");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="sign-up-page">
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
                    className="sign-up-form"
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
                        Or <a href="">login now!</a>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default SignUppage;