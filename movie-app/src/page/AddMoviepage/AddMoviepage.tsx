import { Button, Form, Input, Select, Image } from 'antd';
import { useState } from 'react';
import { uploadMovie } from '../../service/Post';
const { Option } = Select;

type FieldType = {
name: string;
year: number;
imdb: number;
poster: string;
category: string;
};


function AddMoviepage() {
    const [form] = Form.useForm();
    const [url, setUrl] = useState<string>("");

    const onFinished = (value: any) => {
        uploadMovie(value);
        form.resetFields();
        setUrl("");
    }
    
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    autoComplete="off"
    form={form}
    onFinish={onFinished}
  >
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input movie name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Year"
      name="year"
      rules={[{ required: true, message: 'Please input movie year!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="IMDB"
      name="imdb"
      rules={[{ required: true, message: 'Please input movie imdb!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Poster URL"
      name="poster"
      rules={[{ required: true, message: 'Please input movie poster url!' }]}
    >
      <Input onChange={(event) => setUrl(event.target.value)}/>
      </Form.Item>

      {
        url !== "" &&
        (
            <Form.Item style={{display:"flex", justifyContent:"center"}}>
                <Image
                    width={200}
                    src={url}
                    style={{display:"inline-block"}}
                />
            </Form.Item>
        )
      }
    
    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select>
            <Option value="action">Action</Option>
            <Option value="animation">Animation</Option>
            <Option value="comedy">Comedy</Option>
            <Option value="horror">Horror</Option>
            <Option value="romantic">Romantic</Option>
        </Select>
    </Form.Item>

    

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Add Movie
      </Button>
    </Form.Item>
  </Form>
  );
};

export default AddMoviepage;