import { lazy } from "react";
// use lazy for better code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Banners = lazy(() => import("@/pages/Banners"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Gallery = lazy(() => import("@/pages/Gallery"))
const SliderImages = lazy(() => import("@/pages/SliderImages"));
const Attributes = lazy(() => import("@/pages/Attributes"));
const ChildAttributes = lazy(() => import("@/pages/ChildAttributes"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const MappingPackage = lazy(() => import("@/pages/MappingPackage"));
const Category = lazy(() => import("@/pages/Category"));
const Menus = lazy(() => import("@/pages/Menus"));
const OfferZone = lazy(() => import("@/pages/OfferZone"));
const ChildCategory = lazy(() => import("@/pages/ChildCategory"));
const Staff = lazy(() => import("@/pages/Staff"));
const Customers = lazy(() => import("@/pages/Customers"));
const CustomerOrder = lazy(() => import("@/pages/CustomerOrder"));
const Orders = lazy(() => import("@/pages/Orders"));
const Booking = lazy(() => import("@/pages/Booking"));
const Packages = lazy(() => import("@/pages/Packages"));
const DailyDeals = lazy(() => import("@/pages/DailyDeals"));
const OrderInvoice = lazy(() => import("@/pages/OrderInvoice"));
const Review = lazy(() => import("@/pages/Review"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Coupons = lazy(() => import("@/pages/Coupons"));
// const Setting = lazy(() => import("@/pages/Setting"));
const Page404 = lazy(() => import("@/pages/404"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const Languages = lazy(() => import("@/pages/Languages"));
const Currencies = lazy(() => import("@/pages/Currencies"));
const Setting = lazy(() => import("@/pages/Setting"));
const StoreHome = lazy(() => import("@/pages/StoreHome"));
const StoreSetting = lazy(() => import("@/pages/StoreSetting"));
const Notifications = lazy(() => import("@/pages/Notifications"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/banners",
    component: Banners,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/gallery",
    component: Gallery,
  },
  {
    path: "/slider-images",
    component: SliderImages,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/attributes",
    component: Attributes,
  },
  {
    path: "/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/languages",
    component: Languages,
  },
  {
    path: "/currencies",
    component: Currencies,
  },

  {
    path: "/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/booking",
    component: Booking,
  },
  {
    path: "/packages",
    component: Packages,
  },
  {
    path: "/mapping-packages",
    component: MappingPackage,
  },
  {
    path: "/offer-zone",
    component: OfferZone,
  },
  {
    path: "/daily-deals",
    component: DailyDeals,
  },
  {
    path: "/reviews",
    component: Review,
  },
  {
    path: "/testimonials",
    component: Testimonials,
  },
  {
    path: "/menus",
    component: Menus,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/settings", component: Setting },
  {
    path: "/store/customization",
    component: StoreHome,
  },
  {
    path: "/store/store-settings",
    component: StoreSetting,
  },
  // {
  //   path: "/404",
  //   component: Page404,
  // },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/notifications",
    component: Notifications,
  },
];

const routeAccessList = [
  // {
  //   label: "Root",
  //   value: "/",
  // },
  { label: "Dashboard", value: "dashboard" },
  { label: "Banners", value: "banners" },
  { label: "Gallery", value: "gallery" },
  { label: "Slider Images", value: "slider-images" },
  { label: "Products", value: "products" },
  {label : "Packages", value: "packages"},
  { label: "Categories", value: "categories" },
  { label: "Booking", value: "booking" },
  { label: "Daily Deals", value: "daily-deals" },
  { label: "Offer Zone", value: "offer-zone" },
  { label: "Review" , value: "review"},
  { label: "Testimonials", value: "testimonials" },
  { label: "Menus", value: "menus" },
  { label: "Attributes", value: "attributes" },
  { label: "Coupons", value: "coupons" },
  { label: "Customers", value: "customers" },
  { label: "Orders", value: "orders" },
  { label: "Staff", value: "our-staff" },
  { label: "Settings", value: "settings" },
  { label: "Languages", value: "languages" },
  { label: "Currencies", value: "currencies" },
  { label: "ViewStore", value: "store" },
  { label: "StoreCustomization", value: "customization" },
  { label: "StoreSettings", value: "store-settings" },
  { label: "Product Details", value: "product" },
  { label: "Order Invoice", value: "order" },
  { label: "Edit Profile", value: "edit-profile" },
  {
    label: "Customer Order",
    value: "customer-order",
  },
  { label: "Notification", value: "notifications" },
  { label: "Coming Soon", value: "coming-soon" },
];

export { routeAccessList, routes };
