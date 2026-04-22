import { ConfigProvider, Input } from "antd";
import { GiBrightExplosion } from "react-icons/gi";

const { TextArea } = Input;

// Reusable FormInput Component using Ant Design
export function FormInput({
  label = "",
  value,
  onChange,
  placeholder,
  maxLength,
  showCounter = false,
  className = "",
  multiline = false,
  prefix = null,
}) {
  const InputComponent = multiline ? TextArea : Input;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base font-medium text-gray-700">{label}</label>
      )}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#DFBC34",
            borderRadius: 8,
          },
        }}
      >
        {multiline && prefix ? (
          <div className="relative">
            <span className="absolute top-3 right-3 text-xl text-light-gray z-10">
              {prefix}
            </span>
            <TextArea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              showCount={showCounter && maxLength}
              size="large"
              rows={4}
              style={{ width: "100%", paddingRight: "40px" }}
              className="!bg-transparent "
            />
          </div>
        ) : (
          <InputComponent
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            showCount={showCounter && maxLength}
            size="large"
            prefix={!multiline ? prefix : undefined}
            rows={multiline ? 4 : undefined}
            style={{ width: "100%" }}
            className="!bg-transparent"
          />
        )}
      </ConfigProvider>
    </div>
  );
}
