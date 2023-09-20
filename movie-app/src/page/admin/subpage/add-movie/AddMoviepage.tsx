import { Button, Form, Input, Select, Image } from "antd";
import { useState } from "react";
import { uploadMovie } from "../../../../service";
import { Category } from "../../../../model";
import { capitalize } from "../../../../util";
const { Option } = Select;

type FieldType = {
  name: string;
  year: number;
  imdb: number;
  poster: string;
  category: string;
  stars: string;
  duration: string;
  directors: string;
  writers: string;
  background: string;
  description: string;
};

export default function AddMoviepage() {
  const [form] = Form.useForm();
  const [url, setUrl] = useState<{ poster: string; background: string }>({
    poster: "",
    background: "",
  });
  const categories = Object.keys(Category);

  const onFinished = (value: any) => {
    uploadMovie(value);
    form.resetFields();
    setUrl({ poster: "", background: "" });
  };

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
        rules={[{ required: true, message: "Please input movie name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Year"
        name="year"
        rules={[{ required: true, message: "Please input movie year!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="IMDB"
        name="imdb"
        rules={[{ required: true, message: "Please input movie imdb!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Directors"
        name="directors"
        rules={[{ required: true, message: "Please input movie director!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Writers"
        name="writers"
        rules={[{ required: true, message: "Please input movie writer!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Stars"
        name="stars"
        rules={[{ required: true, message: "Please input movie stars!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Please input movie duration!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input movie description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Poster URL"
        name="poster"
        rules={[{ required: true, message: "Please input movie poster url!" }]}
      >
        <Input
          onChange={(event) =>
            setUrl((prev) => ({ ...prev, poster: event.target.value }))
          }
        />
      </Form.Item>

      {url.poster !== "" && (
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={200}
            src={url.poster}
            style={{ display: "inline-block" }}
          />
        </Form.Item>
      )}

      <Form.Item<FieldType>
        label="Background URL"
        name="background"
        rules={[
          { required: true, message: "Please input movie background url!" },
        ]}
      >
        <Input
          onChange={(event) =>
            setUrl((prev) => ({ ...prev, background: event.target.value }))
          }
        />
      </Form.Item>

      {url.background !== "" && (
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={300}
            src={url.background}
            style={{ display: "inline-block" }}
          />
        </Form.Item>
      )}

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select>
          {categories.map((item) => (
            <Option value={item}>{capitalize(item)}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Movie
        </Button>
      </Form.Item>
    </Form>
  );
}
