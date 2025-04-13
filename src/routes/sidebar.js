import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiShoppingCart,
  FiPackage,
  FiShoppingBag,
  FiMenu,
  FiCalendar,
  FiCoffee,
  FiImage,
  FiTrendingUp,
  FiBook,
  FiWatch,
  FiNavigation
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/banners",
    icon: FiShoppingBag,
    name: "Banners",
  },
  {
    path: "/slider-images",
    icon: FiImage,
    name: "Slider Images",
  },
  {
    path: '/gallery',
    icon: FiImage,
    name: 'Gallery',
  },
  {
    path: "/about-us",
    icon: FiBook,
    name: "AboutUS",
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      {
        path: "/attributes",
        name: "Attributes",
      },
      {
        path: "/categories",
        name: "Categories",
      },
      {
        path: "/products",
        name: "Products",
      },   
      {
        path: "/coupons",
        name: "Coupons",
      },
    ],
  },

  {
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
  },
  {
    path: "/booking",
    icon: FiShoppingCart,
    name: "Booking List",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },

  {
    path: "/packages",
    icon: FiPackage,
    name: "Packages",
  },

  {
    path: "/mapping-packages",
    icon: FiPackage,
    name: "Mapping Packages",
  },

  {
    path: "/daily-deals",
    icon: FiCalendar,
    name: "Daily Deals",
  },

  {
    path: "/offer-zone",
    icon: FiCoffee,
    name: "Offer Zone",
  },
  {
    path: "/reviews",
    icon: FiTrendingUp,
    name: "Review"
  },
  {
    path: '/testimonials',
    icon: FiNavigation,
    name: 'Testimonials',
  },
  {
    path: "/menus",
    icon: FiMenu,
    name: "Menus",
  },

  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
  },

  {
    path: "/settings?settingTab=common-settings",
    icon: FiSettings,
    name: "Settings",
  },
  // {
  //   icon: FiGlobe,
  //   name: "International",
  //   routes: [
  //     {
  //       path: "/languages",
  //       name: "Languages",
  //     },
  //     {
  //       path: "/currencies",
  //       name: "Currencies",
  //     },
  //   ],
  // },
  // {
  //   icon: FiTarget,
  //   name: "OnlineStore",
  //   routes: [
  //     {
  //       name: "ViewStore",
  //       path: "/store",
  //       outside: "store",
  //     },

  //     {
  //       path: "/store/customization",
  //       name: "StoreCustomization",
  //     },
  //     {
  //       path: "/store/store-settings",
  //       name: "StoreSettings",
  //     },
  //   ],
  // },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
];

export default sidebar;
