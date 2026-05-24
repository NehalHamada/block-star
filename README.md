# Block Star - Wooden Platform (منصة ستار - للأخشاب)

Block Star is a premium e-commerce platform specializing in custom wooden frames and artistic boards. It features an AI-driven design studio, dynamic shipping calculations, and a fully responsive, multi-language interface.

##  Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4.
- **State Management**:
  - **Server State**: TanStack Query v5 (React Query).
  - **UI State**: Zustand.
- **Forms & Validation**: React Hook Form, Yup/Zod.
- **Localization**: react-i18next (Full RTL support for Arabic).
- **Icons & Animations**: Lucide React, Framer Motion.
- **Routing**: React Router Dom v6.

##  Key Features

### 1. AI Design Studio
- **AI-Powered Design**: Users can generate unique board designs by entering a simple text description.
- **Real-time Preview**: Users can see their design and customize text, fonts, and colors before ordering.

### 2. Advanced E-Commerce Flow
- **Ready-to-Order Products**: A wide collection of pre-designed boards categorized for easy browsing.
- **Dynamic Cart**: Real-time quantity updates and coupon management.
- **Smart Checkout**:
  - **City-Based Shipping**: Automated shipping cost calculation based on the selected governorate (fetched via API).
  - **Address Management**: Users can save multiple shipping addresses (Headlines) with an easy-to-use dropdown system.

### 3. Authentication & Security
- **Social Login**: Seamless integration with Google.
- **Automatic Token Handling**: Environment-agnostic token consumption from URLs to ensure a smooth login flow regardless of the redirect environment (Localhost/Production).
- **Secure API**: Custom Axios instance with request interceptors for token management and dynamic `Accept-Language` headers.

### 4. User Experience (UX)
- **Multi-language Support**: Fully localized in Arabic and English.
- **Responsive Design**: Mobile-first approach ensuring a premium experience on all devices.
- **RTL Support**: Optimized layout for Arabic users.

### 5. Product Catalog (PDF)
- **Interactive PDF Catalog**: Allows users to view product catalogs (PDF files) directly on the website via a fully-responsive, smooth popup modal (`PdfModal`).
- **One-click Download**: Provides a direct download option for offline viewing.

##  Project Structure

- `src/api`: API service layer and Axios configuration.
- `src/components`: Reusable UI components categorized by feature (Cart, Form, Studio, etc.).
- `src/context`: Global contexts for Authentication and Localization.
- `src/hooks`: Custom hooks for queries (TanStack Query) and logic.
- `src/i18n`: Localization files and configuration.
- `src/pages`: Main application pages and route components.
- `src/schema`: Validation schemas for forms.
- `src/utils`: Helper functions and shared utilities.

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

---
*Developed with precision to deliver a premium wooden art experience.*
*Developed by Ahdaf web company*
