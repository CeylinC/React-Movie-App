import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Image } from 'antd';
import { IColumn } from '../../interface/IColumn';
import { deleteMovie, getMovieList, updateMovie } from '../../service/Post';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: IColumn;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function MovieListpage() {
  const [form] = Form.useForm();
  const [dataList, setDataList] = useState<IColumn[]>([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const getData = async () => {
    const movieList = await getMovieList();
    movieList.forEach((movie, index) => {
        setDataList((prev) => {
        return [...prev, {...movie, key: index.toString()}];
        });
    });
    }
    getData();
}, []);

  const isEditing = (record: IColumn) => record.key === editingKey;

  const edit = (record: Partial<IColumn> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', year: '', imdb: '', categories:'', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const handleDelete = async (key: React.Key) => {
    const newData = dataList.filter((item) => {
      if(item.key !== key){
        return true
      }
      else{
        deleteMovie(item.id);
      }
    });
    setDataList(newData);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IColumn;

      const newData = [...dataList];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataList(newData);
        updateMovie(newData[index]);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataList(newData);
        setEditingKey('');
      }

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: "Poster",
        dataIndex: "poster",
        key: "poster",
        editable: true,
        render: (imgUrl: string) => <Image width={100} src={imgUrl} />
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true
      },
      {
        title: 'IMDB',
        dataIndex: 'imdb',
        key: 'imdb',
        editable: true
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        editable: true
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        editable: true
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: IColumn) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a style={{marginLeft: "5px"}}>Delete</a>
          </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IColumn) => ({
        record,
        inputType: col.dataIndex === 'year' || col.dataIndex === 'imdb' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataList}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default MovieListpage;