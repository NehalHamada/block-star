import React from "react";
import { CompanyOrderForm, Header, SuccessModal } from "../components";
import { BuildingIcon } from "lucide-react";
import Lottie from "lottie-react";
import successAnimation from "../assets/lottie/application-completed.json";
import { useGetPartnersData } from "../hooks/queries/useCompanyOrders.js";
import { useTranslation } from "react-i18next";

export function CompanyOrders() {
  const [open, setOpen] = React.useState(false);
  const { data: partnersData } = useGetPartnersData();
  const { t } = useTranslation();
  const partners = partnersData?.data;

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("companyOrders.breadcrumb"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center gap-5 mb-10">
          <p className="font-noto text-2xl">{partners?.title}</p>
          <p className="text-dark-gray text-lg max-w-xl text-center">
            {partners?.description}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-xl font-medium underline">
            {t("companyOrders.whoIsIt")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {partners?.services.map((service, i) => (
              <ServicePlaceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-xl font-medium underline">
          {t("companyOrders.whatWeOffer")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col p-5 gap-6">
            {partners?.feature.points.map((point, i) => (
              <div
                key={i}
                className={`flex ${i % 2 !== 0 ? "justify-center" : "justify-start"}`}
              >
                <ServiceItem title={point} index={i} />
              </div>
            ))}
          </div>
          <div className="aspect-square h-full w-full md:h-[80%] md:w-[80%] mx-auto">
            <img
              src={partners?.feature?.image_url}
              alt="company"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <CompanyOrderForm
          handleSuccess={setOpen}
          services={partners?.services}
        />
      </div>
      <SuccessModal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center gap-4 text-center p-5">
          <Lottie animationData={successAnimation} loop={true} />
          <h2 className="text-xl font-medium text-white font-cairo">
            {t("companyOrders.successMsg")}
          </h2>
        </div>
      </SuccessModal>
    </div>
  );
}

const ServicePlaceCard = ({ Icon, title, image_url }) => {
  const IconComponent = Icon || BuildingIcon;
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer h-52 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background */}
      {image_url ? (
        <img
          src={image_url}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary flex items-center justify-center">
          <IconComponent size={48} color="white" className="opacity-70" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-base font-semibold text-center drop-shadow-md">
          {title}
        </p>
      </div>
    </div>
  );
};

const ServiceItem = ({ title, index }) => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg">
      {index + 1}
    </div>
    <p className="text-xl">{title}</p>
  </div>
);
