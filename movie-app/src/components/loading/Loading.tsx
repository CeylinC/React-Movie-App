import { ConfigProvider, Spin } from "antd";
import "./Loading.css";

interface IProp {
  height: string;
}

export function Loading({ height }: IProp) {
  return (
    <div className="loading" style={{ height: height }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFD369",
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
}
