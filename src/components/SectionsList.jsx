import { SectionCard } from "./SectionCard";
import designByYourSelfImage from "../assets/sectionImage3.jpg";

import { useTranslation } from "react-i18next";

export const SectionsList = ({ categories }) => {
  const { t } = useTranslation();

  const category = {
    id: 3,
    name: t("sectionsList.designYourself"),
    subtitle: t("sectionsList.startDesign"),
    description: t("sectionsList.startDesign"),
    image: designByYourSelfImage,
    isCTA: true,
    subsections: [],
  };

  const allCategories = [...(categories || []), category];

  return (
    <section className="max-w-6xl mx-auto px-4">
      {allCategories.map((cat, index) => (
        <SectionCard key={cat.id || index} category={cat} />
      ))}
    </section>
  );
};
