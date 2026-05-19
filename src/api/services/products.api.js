import axiosInstance from "../axiosInstance.js";

// RATIONALE: Translate product details and lookup arrays dynamically in the frontend to fix backend data quality and missing translation fallbacks.
const DICTIONARY = {
  ar: {
    category: {
      1: { name: "غرف المعيشة الفاخرة", description: "تشكيلة متميزة من أثاث غرف المعيشة" },
      18: { name: "غرف المعيشة", description: "تصاميم غرف معيشة أنيقة وبراويز خشبية مخصصة." },
      19: { name: "أثاث منزلي", description: "تشكيلة واسعة من الأثاث المنزلي الخشبي الجاهز والمخصص." },
      20: { name: "أثاث مكتبي", description: "مكاتب خشبية فاخرة، رفوف، وإطارات مكتبية احترافية." },
      21: { name: "أثاث خارجي", description: "أثاث خشبي خارجي متين ومقاوم للعوامل الجوية." },
      22: { name: "الإكسسوارات", description: "إكسسوارات خشبية مكملة وإطارات ديكور مميزة." },
    },
    subcategory: {
      1: { name: "براويز كلاسيكية محدثة" },
      2: { name: "لوحات مودرن" },
      3: { name: "لوحات غرف الأطفال" },
    },
    productType: {
      1: { name: "كرسي" },
      2: { name: "طاولة" },
      3: { name: "سرير" },
      5: { name: "رف" },
      6: { name: "مكتبة" },
      8: { name: "صينية" },
      9: { name: "مرآة" },
      10: { name: "لوحة فنية" },
    },
    woodType: {
      1: { name: "خشب الزان" },
      2: { name: "خشب البلوط" },
      3: { name: "خشب الماهوجني" },
      4: { name: "خشب الصنوبر" },
      5: { name: "خشب الجوز" },
      6: { name: "خشب الأكاسيا" },
      7: { name: "خشب الأرز" },
      8: { name: "خشب البتولا" },
      9: { name: "خشب الخيزران" },
      10: { name: "خشب MDF" },
    },
    product: {
      2: { name: "لوحة خشبية هندسية", description: "لوحة خشبية بتصميم هندسي مميز يعطي طابعاً عصرياً للمكان." },
      3: { name: "إطار الأرنب الضاحك", description: "إطار رسمة أرنب ضاحك لغرف الأطفال مبهج وجميل." },
      27: { name: "كرسي زان فاخر", description: "كرسي مصنوع من خشب الزان الفاخر بتصميم مريح وعصري." },
      29: { name: "إكسسوار غرفة معيشة", description: "إكسسوار خشبي أنيق لإضافة لمسة جمالية لغرفة المعيشة." },
      30: { name: "إكسسوار غرفة نوم", description: "إكسسوار خشبي لغرفة النوم يضيف طابعاً دافئاً ومميزاً." },
      31: { name: "إكسسوار غرفة نوم", description: "إكسسوار خشبي لغرفة النوم يضيف طابعاً دافئاً ومميزاً." },
      32: { name: "كرسي زان فاخر", description: "كرسي مصنوع من خشب الزان الفاخر بتصميم مريح وعصري." },
      44: { name: "كرسي زان فاخر", description: "كرسي مصنوع من خشب الزان الفاخر بتصميم مريح وعصري." },
      45: { name: "كرسي زان فاخر", description: "كرسي مصنوع من خشب الزان الفاخر بتصميم مريح وعصري." },
      48: { name: "كرسي بتولا تجريبي", description: "كرسي مصنوع من خشب البتولا للتجربة والاختبار." },
      49: { name: "منتج تجريبي", description: "وصف منتج تجريبي للتأكد من عمل الأنظمة." },
      50: { name: "منتج تجريبي", description: "وصف منتج تجريبي للتأكد من عمل الأنظمة." },
      51: { name: "منتج تجريبي معدل", description: "وصف منتج تجريبي معدل للتأكد من عمل الأنظمة." },
      52: { name: "منتج تجريبي معدل", description: "وصف منتج تجريبي معدل للتأكد من عمل الأنظمة." },
      53: { name: "منتج تجريبي معدل", description: "وصف منتج تجريبي معدل للتأكد من عمل الأنظمة." },
      54: { name: "منتج تجريبي معدل", description: "وصف منتج تجريبي معدل للتأكد من عمل الأنظمة." },
      55: { name: "رف خشبي مودرن", description: "رف خشبي يعلق على الجدار بتصميم أنيق لتنظيم وتزيين الغرفة." },
    }
  },
  en: {
    category: {
      1: { name: "Luxury Living Rooms", description: "Premium selection of living room furniture." },
      18: { name: "Living Rooms", description: "Elegant living room designs and custom wooden frames." },
      19: { name: "Home Furniture", description: "A wide selection of ready-made and custom home wooden furniture." },
      20: { name: "Office Furniture", description: "Premium wooden desks, shelves, and professional office frames." },
      21: { name: "Outdoor Furniture", description: "Durable and weather-resistant outdoor wooden furniture." },
      22: { name: "Accessories", description: "Complementary wooden accessories and decorative frames." },
    },
    subcategory: {
      1: { name: "Classic Frames" },
      2: { name: "Modern Paintings" },
      3: { name: "Kids Room Paintings" },
    },
    productType: {
      1: { name: "Chair" },
      2: { name: "Table" },
      3: { name: "Bed" },
      5: { name: "Shelf" },
      6: { name: "Bookcase" },
      8: { name: "Tray" },
      9: { name: "Mirror" },
      10: { name: "Painting" },
    },
    woodType: {
      1: { name: "Beech Wood" },
      2: { name: "Oak Wood" },
      3: { name: "Mahogany Wood" },
      4: { name: "Pine Wood" },
      5: { name: "Walnut Wood" },
      6: { name: "Acacia Wood" },
      7: { name: "Cedar Wood" },
      8: { name: "Birch Wood" },
      9: { name: "Bamboo Wood" },
      10: { name: "MDF Wood" },
    },
    product: {
      2: { name: "Geometric Wooden Panel", description: "Explore our collection of premium wooden designs and furniture." },
      3: { name: "Laughing Rabbit Frame", description: "Beautiful laughing rabbit frame for kids room." },
      27: { name: "Premium Beech Chair", description: "Luxurious chair made from premium beech wood with a comfortable design." },
      29: { name: "Living Room Accessory", description: "Elegant wooden accessory to add a beautiful touch to your living room." },
      30: { name: "Bedroom Accessory", description: "Wooden bedroom accessory adding a warm and distinctive character." },
      31: { name: "Bedroom Accessory", description: "Wooden bedroom accessory adding a warm and distinctive character." },
      32: { name: "Premium Beech Chair", description: "Luxurious chair made from premium beech wood with a comfortable design." },
      44: { name: "Premium Beech Chair", description: "Luxurious chair made from premium beech wood with a comfortable design." },
      45: { name: "Premium Beech Chair", description: "Luxurious chair made from premium beech wood with a comfortable design." },
      48: { name: "Test Birch Chair", description: "Test chair made from birch wood for experimentation." },
      49: { name: "Test Product", description: "Test product description to verify features." },
      50: { name: "Test Product", description: "Test product description to verify features." },
      51: { name: "Modified Test Product", description: "Modified test product description to verify features." },
      52: { name: "Modified Test Product", description: "Modified test product description to verify features." },
      53: { name: "Modified Test Product", description: "Modified test product description to verify features." },
      54: { name: "Modified Test Product", description: "Modified test product description to verify features." },
      55: { name: "Modern Wooden Shelf", description: "Wall-mounted wooden shelf with a sleek design to organize and decorate rooms." },
    }
  }
};

const colorTranslations = {
  en: {
    "بني فاتح": "Light Brown",
    "بني غامق": "Dark Brown",
    "اسود": "Black",
    "ابيض": "White",
    "روز": "Rose",
    "رمادي": "Gray",
    "احمر": "Red",
    "ازرق": "Blue",
    "اخضر": "Green",
    "اصفر": "Yellow",
    "ذهبي": "Gold",
    "فضي": "Silver",
    "وردي": "Pink"
  },
  ar: {
    "Light Brown": "بني فاتح",
    "Dark Brown": "بني غامق",
    "Black": "اسود",
    "White": "ابيض",
    "Rose": "روز",
    "Gray": "رمادي",
    "Red": "احمر",
    "Blue": "ازرق",
    "Green": "اخضر",
    "Yellow": "اصفر",
    "Gold": "ذهبي",
    "Silver": "فضي",
    "Pink": "وردي"
  }
};

function translateSize(size, lang) {
  if (!size) return size;
  if (lang === "en") {
    return size.replace(/سم/g, "cm");
  } else {
    return size.replace(/cm/g, "سم");
  }
}

export function translateProduct(product, lang = "ar") {
  if (!product) return product;

  const id = product.id;
  let translatedName = product.name;
  let translatedDescription = product.description;

  if (DICTIONARY[lang]?.product?.[id]) {
    translatedName = DICTIONARY[lang].product[id].name;
    translatedDescription = DICTIONARY[lang].product[id].description || product.description;
  } else {
    if (lang === "en") {
      if (product.name && /[\u0600-\u06FF]/.test(product.name)) {
        if (product.name.includes("كرسي زان")) translatedName = "Premium Beech Chair";
        else if (product.name === "تست" || product.name === "test") translatedName = "Test Product";
        else if (product.name === "تست تعديل") translatedName = "Modified Test Product";
      }
    } else if (lang === "ar") {
      if (product.name && !/[\u0600-\u06FF]/.test(product.name)) {
        if (product.name.includes("Beech Chair")) translatedName = "كرسي زان فاخر";
      }
    }
  }

  const productType = product.product_type ? {
    ...product.product_type,
    name: DICTIONARY[lang]?.productType?.[product.product_type.id]?.name || product.product_type.name
  } : null;

  const woodType = product.wood_type ? {
    ...product.wood_type,
    name: DICTIONARY[lang]?.woodType?.[product.wood_type.id]?.name || product.wood_type.name
  } : null;

  const subcategory = product.subcategory ? {
    ...product.subcategory,
    name: DICTIONARY[lang]?.subcategory?.[product.subcategory.id]?.name || product.subcategory.name,
    category: product.subcategory.category ? {
      ...product.subcategory.category,
      name: DICTIONARY[lang]?.category?.[product.subcategory.category.id]?.name || product.subcategory.category.name
    } : null
  } : null;

  const colors = product.colors?.map(color => {
    const colorName = color.name || "";
    const translatedColorName = colorTranslations[lang]?.[colorName] || colorName;
    return {
      ...color,
      name: translatedColorName
    };
  }) || [];

  return {
    ...product,
    name: translatedName,
    description: translatedDescription,
    product_type: productType,
    wood_type: woodType,
    subcategory: subcategory,
    colors
  };
}

/**
 * Fetch all products (optionally filtered by params).
 */
export const getAllProducts = async (lang = "en", params = {}) => {
  const response = await axiosInstance.get(`/products?lang=${lang}`, {
    params,
  });
  if (response.data && response.data.data) {
    if (response.data.data.data) {
      response.data.data.data = response.data.data.data.map(p => translateProduct(p, lang));
    } else if (Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map(p => translateProduct(p, lang));
    }
  }
  return response.data;
};

export const getProductFilters = async (lang = "en") => {
  const response = await axiosInstance.get(`/products/filter?lang=${lang}`);
  if (response.data && response.data.data) {
    const data = response.data.data;
    if (data.product_types) {
      data.product_types = data.product_types.map(t => ({
        ...t,
        name: DICTIONARY[lang]?.productType?.[t.id]?.name || t.name
      }));
    }
    if (data.wood_types) {
      data.wood_types = data.wood_types.map(t => ({
        ...t,
        name: DICTIONARY[lang]?.woodType?.[t.id]?.name || t.name
      }));
    }
    if (data.subcategories) {
      data.subcategories = data.subcategories.map(s => ({
        ...s,
        name: DICTIONARY[lang]?.subcategory?.[s.id]?.name || s.name
      }));
    }
    if (data.colors) {
      data.colors = data.colors.map(c => {
        const cName = c.name || c;
        if (typeof c === "object" && c !== null) {
          return {
            ...c,
            name: colorTranslations[lang]?.[cName] || cName
          };
        }
        return colorTranslations[lang]?.[cName] || cName;
      });
    }
    if (data.sizes) {
      data.sizes = data.sizes.map(s => translateSize(s, lang));
    }
  }
  return response.data;
};

export const getProductsBySubcategory = async (
  subcategoryId,
  lang = "en",
  params = {},
) => {
  const response = await axiosInstance.get(`/products?lang=${lang}`, {
    params: { subcategory_id: subcategoryId, ...params },
  });
  if (response.data && response.data.data) {
    if (response.data.data.data) {
      response.data.data.data = response.data.data.data.map(p => translateProduct(p, lang));
    } else if (Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map(p => translateProduct(p, lang));
    }
  }
  return response.data;
};

export const getProductById = async (id, lang = "en") => {
  const response = await axiosInstance.get(`/products/${id}?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = translateProduct(response.data.data, lang);
  }
  return response.data;
};

export const getProductTypes = async (lang = "en") => {
  const response = await axiosInstance.get(`/product-types?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = response.data.data.map(t => ({
      ...t,
      name: DICTIONARY[lang]?.productType?.[t.id]?.name || t.name
    }));
  }
  return response.data;
};

export const getWoodTypes = async (lang = "en") => {
  const response = await axiosInstance.get(`/wood-types?lang=${lang}`);
  if (response.data && response.data.data) {
    response.data.data = response.data.data.map(t => ({
      ...t,
      name: DICTIONARY[lang]?.woodType?.[t.id]?.name || t.name
    }));
  }
  return response.data;
};
