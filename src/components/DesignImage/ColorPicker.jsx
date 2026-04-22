import { ConfigProvider, ColorPicker as AntColorPicker, Input } from "antd";

// Reusable ColorPicker Component using Ant Design
export function ColorPicker({ label, value, onChange, className = "" }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DFBC34",
        },
      }}
    >
      <div className={`${className} design-color-picker`}>
        <label className="block mb-2 text-sm md:text-base">{label}</label>
        <div className="flex gap-2">
          <AntColorPicker
            value={value || "#ffffff"}
            onChange={(color) => onChange(color.toHexString())}
            size="large"
            style={{ width: "auto" }}
            className="!bg-transparent"
          />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#ffffff"
            size="large"
            style={{ flex: 1 }}
            className="!bg-transparent"
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
