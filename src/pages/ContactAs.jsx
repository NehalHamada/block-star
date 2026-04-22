import { ContactForm, Header, MapIframe } from "../components";
import designImage from "../assets/design-3.jpg";
import { useContactInfo } from "../hooks/queries/useContactInfo.js";
import { useTranslation } from "react-i18next";

export function ContactAs() {
  const { data: contactInfoData } = useContactInfo();

  const { t } = useTranslation();
  const d = contactInfoData?.data;

  const breadcrumbs = [
    { label: t("nav.home"), path: "/" },
    { label: t("contact.breadcrumb"), path: null },
  ];

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex flex-col gap-5 items-center justify-center md:py-5">
          <p className="text-3xl font-bold font-noto">
            {t("contact.heroTitle")}
          </p>
          <p className="max-w-2xl text-center text-lg text-dark-gray">
            {t("contact.heroDesc")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8 w-full md:my-10">
          {/* Contact Info Section */}
          <div className="flex-1 p-8 rounded-2xl">
            <p className="text-2xl underline">{t("contact.contactInfo")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {d?.email && (
                <ContactCard label={t("contact.email")} value={d.email} />
              )}
              {d?.phones?.map((phone, index) => (
                <ContactCard
                  key={index}
                  label={
                    index === 0
                      ? t("contact.phone")
                      : t("contact.phoneN", { n: index + 1 })
                  }
                  value={phone}
                />
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative group overflow-hidden rounded-3xl h-[250px]">
            <img
              src={designImage}
              alt={t("contact.altImg")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Send Message Section */}
      <div className="bg-secondary/5 p-8 my-20 w-full mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-7 justify-center">
            <p className="text-2xl underline">{t("contact.sendMessage")}</p>
            <p className="text-dark-gray max-w-sm">
              {t("contact.sendMessageDesc")}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <MapIframe lat={d?.latitude || 31.9539} lng={d?.longitude || 35.9106} />
      </div>
    </div>
  );
}

const ContactCard = ({ label, value }) => (
  <div className="md:py-6 rounded-xl flex flex-col gap-3">
    <p className="text-dark-gray font-medium">{label}</p>
    <p className="text-lg font-semibold text-primary">{value}</p>
  </div>
);
