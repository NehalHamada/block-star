import React from "react";
import { CompanyOrderForm, Header, SuccessModal } from "../components";
import { BuildingIcon, Palette, Layers, CheckSquare, Tag } from "lucide-react";
import Lottie from "lottie-react";
import successAnimation from "../assets/lottie/application-completed.json";
import { useGetPartnersData } from "../hooks/queries/useCompanyOrders.js";
import { useTranslation } from "react-i18next";

export function CompanyOrders() {
  const [open, setOpen] = React.useState(false);
  const { data: partnersData } = useGetPartnersData();
  const { t, i18n } = useTranslation();
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="relative mb-10 pb-2 border-b border-secondary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary font-cairo">
            {t("companyOrders.whatWeOffer")}
          </h2>
          <div
            className={`absolute bottom-0 w-24 h-1 bg-primary rounded-full ${
              i18n.language === "en" ? "left-0" : "right-0"
            }`}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            {partners?.feature?.points?.map((point, i) => (
              <ServiceItem key={i} title={point} index={i} />
            ))}
          </div>
          <div className="relative aspect-4/3 w-full max-w-xl mx-auto group overflow-hidden rounded-2xl shadow-lg border border-secondary/10">
            <img
              src={partners?.feature?.image_url}
              alt="company features preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/35 to-transparent pointer-events-none" />
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

const getFeatureIcon = (index) => {
  switch (index) {
    case 0:
      return <Palette className="w-6 h-6 text-primary" />;
    case 1:
      return <Layers className="w-6 h-6 text-primary" />;
    case 2:
      return <CheckSquare className="w-6 h-6 text-primary" />;
    case 3:
      return <Tag className="w-6 h-6 text-primary" />;
    default:
      return <BuildingIcon className="w-6 h-6 text-primary" />;
  }
};

const ServiceItem = ({ title, index }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-secondary/5 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 w-full">
    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
      {getFeatureIcon(index)}
    </div>
    <div className="flex flex-col gap-1 text-start">
      <span className="text-xs font-bold text-primary font-cairo">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-lg font-bold text-secondary leading-snug font-cairo">{title}</p>
    </div>
  </div>
);
