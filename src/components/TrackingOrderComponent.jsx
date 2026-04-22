import { ConfigProvider, Steps } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const TrackingOrderComponent = ({ currentStep = 0 }) => {
  const { t } = useTranslation();

  const trackingSteps = [
    { title: t("orderTrack.steps.pending") },    // pending    → 0
    { title: t("orderTrack.steps.confirmed") },  // confirmed  → 1
    { title: t("orderTrack.steps.processing") }, // processing → 2
    { title: t("orderTrack.steps.ready") },      // ready      → 3
    { title: t("orderTrack.steps.shipped") },    // shipped    → 4
    { title: t("orderTrack.steps.delivered") },  // delivered  → 5
  ];

  const items = trackingSteps.map((step) => ({
    title: (
      <span className="text-sm sm:text-base font-medium text-center font-cairo">
        {step.title}
      </span>
    ),
    icon: <CheckCircleFilled style={{ fontSize: "32px" }} />,
  }));

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DFBC34",
          fontSize: 14,
        },
      }}
    >
      <div className="w-full mx-auto py-8 px-4">
        <Steps
          current={currentStep}
          titlePlacement="vertical"
          items={items}
          size="default"
          responsive={true}
          className="custom-tracking-steps"
        />
      </div>
    </ConfigProvider>
  );
};
