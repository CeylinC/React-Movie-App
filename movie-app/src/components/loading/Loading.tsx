import { ConfigProvider, Spin } from "antd";

interface IProp {
  height: string;
}

export function Loading({ height }: IProp) {
  return (
    <div
      className="loading w-full flex content-center justify-center"
      style={{ height: height }}
    >
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
