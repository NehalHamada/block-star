import axiosInstance from "../axiosInstance.js";

// RATIONALE: Translate category details dynamically in the frontend to fix backend data quality and missing translation fallbacks.
const translations = {
  18: {
    en: {
      name: "Living Rooms",
      description: "Elegant living room designs and custom wooden frames."
    },
    ar: {
      name: "غرف المعيشة",
      description: "تصاميم غرف معيشة أنيقة وبراويز خشبية مخصصة."
    }
  },
  19: {
    en: {
      name: "Home Furniture",
      description: "A wide selection of ready-made and custom home wooden furniture."
    },
    ar: {
      name: "أثاث منزلي",
      description: "تشكيلة واسعة من الأثاث المنزلي الخشبي الجاهز والمخصص."
    }
  },
  20: {
    en: {
      name: "Office Furniture",
      description: "Premium wooden desks, shelves, and professional office frames."
    },
    ar: {
      name: "أثاث مكتبي",
      description: "مكاتب خشبية فاخرة، رفوف، وإطارات مكتبية احترافية."
    }
  },
  21: {
    en: {
      name: "Outdoor Furniture",
      description: "Durable and weather-resistant outdoor wooden furniture."
    },
    ar: {
      name: "أثاث خارجي",
      description: "أثاث خشبي خارجي متين ومقاوم للعوامل الجوية."
    }
  },
  22: {
    en: {
      name: "Accessories",
      description: "Complementary wooden accessories and decorative frames."
    },
    ar: {
      name: "الإكسسوارات",
      description: "إكسسوارات خشبية مكملة وإطارات ديكور مميزة."
    }
  }
};

export function translateCategory(category, lang = "ar") {
  if (!category) return category;
  const id = category.id;
  if (translations[id] && translations[id][lang]) {
    return {
      ...category,
      name: translations[id][lang].name,
      description: translations[id][lang].description,
    };
  }

  if (lang === "en" && category.description && /[\u0600-\u06FF]/.test(category.description)) {
    if (category.description.includes("غرف معيشه")) {
      return {
        ...category,
        name: category.name === "rooms" ? "Living Rooms" : category.name,
        description: "Elegant living room designs and custom wooden frames.",
      };
    }
  }

  return category;
}

export const getAllCategories = async (lang = "en") => {
  const response = await axiosInstance.get(`/categories?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = response.data.data.map(cat => translateCategory(cat, lang));
  }
  return response.data;
};

export const getCategoryById = async (id, lang = "en") => {
  const response = await axiosInstance.get(`/categories/${id}?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = translateCategory(response.data.data, lang);
  }
  return response.data;
};

export const getSubCategories = async (id, lang = "en") => {
  const response = await axiosInstance.get(
    `/categories/${id}/subcategories?lang=${lang}`,
  );
  if (response.data && response.data.data) {
    response.data.data = response.data.data.map(sub => ({
      ...sub,
      name: translations[sub.id]?.[lang]?.name || sub.name
    }));
  }
  return response.data;
};

export const getAllSubCategories = async (lang = "en") => {
  const response = await axiosInstance.get(`/subcategories?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = response.data.data.map(sub => ({
      ...sub,
      name: translations[sub.id]?.[lang]?.name || sub.name
    }));
  }
  return response.data;
};
