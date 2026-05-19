import { useEffect } from "react";

/**
 * Custom hook to dynamically manage page-specific SEO document metadata.
 *
 * @param {string} title - The title of the page
 * @param {string} description - The description of the page
 */
export const useDocumentMetadata = (title, description) => {
  useEffect(() => {
    if (title) {
      const fullTitle = `${title} | Block Star`;
      document.title = fullTitle;
      
      // Update Open Graph & Twitter Title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", fullTitle);
      
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute("content", fullTitle);
    }

    if (description) {
      // Update Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);

      // Update Open Graph & Twitter Description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);

      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute("content", description);
    }
  }, [title, description]);
};
