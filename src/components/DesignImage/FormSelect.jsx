import { ConfigProvider, Select } from "antd";

// Reusable FormSelect Component using Ant Design
export function FormSelect({
  label,
  value,
  onChange,
  options,
  className = "",
  error,
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DFBC34",
        },
      }}
    >
      <div className={className}>
        <label className="block mb-2 text-sm md:text-base">{label}</label>
        <Select
          value={value}
          onChange={onChange}
          options={options}
          className={`!bg-transparent w-full design-form-select ${error ? "border-red-500" : ""}`}
          size="large"
          placeholder={label}
          style={{ width: "100%" }}
          status={error ? "error" : ""}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </ConfigProvider>
  );
}
