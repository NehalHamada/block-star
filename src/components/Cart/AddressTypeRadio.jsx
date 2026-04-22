import { Radio } from "antd";
import { Controller } from "react-hook-form";

const options = [
  { label: "منزل", value: "home" },
  { label: "عمل", value: "work" },
];

export function AddressTypeRadio({
  control,
  name = "addressType",
  label = "نوع العنوان",
}) {
  return (
    <div className="flex flex-col gap-2 font-cairo">
      <label className="text-sm font-medium text-dark-gray">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue="home"
        render={({ field }) => (
          <Radio.Group {...field} className="w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((option) => {
                const isActive = field.value === option.value;

                return (
                  <label
                    key={option.value}
                    className={`
                    flex items-center justify-between
                    w-full cursor-pointer
                    px-4 py-3 rounded-xl border
                    transition-all
                    ${
                      isActive
                        ? "border-secondary bg-secondary/5"
                        : "border-light-gray hover:border-secondary"
                    }
                  `}
                  >
                    <span
                      className={`text-sm ${
                        isActive ? "text-secondary" : "text-dark-gray"
                      }`}
                    >
                      {option.label}
                    </span>

                    <Radio value={option.value} className="radio-custom" />
                  </label>
                );
              })}
            </div>
          </Radio.Group>
        )}
      />
    </div>
  );
}
