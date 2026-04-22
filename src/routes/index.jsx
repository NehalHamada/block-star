import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthLayout from "../layout/AuthLayout.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import { PageLoader, ProtectedRoute } from "../components";
import SocialLoginSuccess from "../pages/SocialLoginSuccess.jsx";

// Lazy load all page components for code splitting
const Home = lazy(() =>
  import("../pages/Home.jsx").then((module) => ({ default: module.Home })),
);
const LogIn = lazy(() =>
  import("../pages/LogIn.jsx").then((module) => ({ default: module.LogIn })),
);
const Register = lazy(() =>
  import("../pages/Register.jsx").then((module) => ({
    default: module.Register,
  })),
);
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword.jsx").then((module) => ({
    default: module.ForgotPassword,
  })),
);
const ResetPassword = lazy(() =>
  import("../pages/ResetPassword.jsx").then((module) => ({
    default: module.ResetPassword,
  })),
);
const Verify = lazy(() =>
  import("../pages/Verify.jsx").then((module) => ({ default: module.Verify })),
);
const ContactAs = lazy(() =>
  import("../pages/ContactAs.jsx").then((module) => ({
    default: module.ContactAs,
  })),
);
const Categories = lazy(() =>
  import("../pages/Categories.jsx").then((module) => ({
    default: module.Categories,
  })),
);
const Studio = lazy(() =>
  import("../pages/Studio.jsx").then((module) => ({ default: module.Studio })),
);
const About = lazy(() =>
  import("../pages/About.jsx").then((module) => ({ default: module.About })),
);
const CategoryDetail = lazy(() =>
  import("../pages/CategoryDetail.jsx").then((module) => ({
    default: module.CategoryDetail,
  })),
);
const ProductDetail = lazy(() =>
  import("../pages/ProductDetail.jsx").then((module) => ({
    default: module.ProductDetail,
  })),
);
const Cart = lazy(() =>
  import("../pages/Cart.jsx").then((module) => ({ default: module.Cart })),
);
const Profile = lazy(() =>
  import("../pages/Profile.jsx").then((module) => ({
    default: module.Profile,
  })),
);
const SavedDesigns = lazy(() =>
  import("../pages/SavedDesigns.jsx").then((module) => ({
    default: module.SavedDesigns,
  })),
);
const Orders = lazy(() =>
  import("../pages/Orders.jsx").then((module) => ({ default: module.Orders })),
);
const CompanyOrders = lazy(() =>
  import("../pages/CompanyOrders.jsx").then((module) => ({
    default: module.CompanyOrders,
  })),
);
const OrderDetails = lazy(() =>
  import("../pages/OrderDetails.jsx").then((module) => ({
    default: module.OrderDetails,
  })),
);
const Headlines = lazy(() =>
  import("../pages/Headlines.jsx").then((module) => ({
    default: module.Headlines,
  })),
);
const AddNewHeadlines = lazy(() =>
  import("../pages/AddNewHeadlines.jsx").then((module) => ({
    default: module.AddNewHeadlines,
  })),
);
const AddComment = lazy(() =>
  import("../pages/AddComment.jsx").then((module) => ({
    default: module.AddComment,
  })),
);
const NotFound = lazy(() =>
  import("../pages/NotFound.jsx").then((module) => ({
    default: module.NotFound,
  })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactAs />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/categories/:categoryName",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoryDetail />
          </Suspense>
        ),
      },
      {
        path: "/studio",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Studio />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-comment",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <AddComment />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/headlines",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Headlines />
          </Suspense>
        ),
      },
      {
        path: "/add-new-headlines",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddNewHeadlines />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "productsdetails/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
        children: [
          { index: true, element: null },
          { path: "shipping", element: null },
          { path: "payment-success", element: null },
        ],
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "saved-designs",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <SavedDesigns />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "orders/:orderId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrderDetails />
          </Suspense>
        ),
      },
      {
        path: "company-orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompanyOrders />
          </Suspense>
        ),
      },
      {
        path: "/social-login-success",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SocialLoginSuccess />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LogIn />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "verify",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Verify />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
