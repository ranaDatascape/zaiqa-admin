import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiShoppingCart,
  FiPackage,
  FiShoppingBag,
  FiMenu,
  FiCalendar,
  FiCoffee,
  FiImage,
  FiTrendingUp,
  FiBook,
  FiNavigation,
  FiHome,
} from "react-icons/fi";
import { IoFastFoodSharp } from "react-icons/io5";

const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: FiHome,
    name: "Home",
    routes: [
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
        path: "/gallery",
        icon: FiImage,
        name: "Gallery",
      },
    ],
  },
  {
    path: "/about-us",
    icon: FiBook,
    name: "AboutUS",
  },
  {
    path: "/event-catering",
    icon: IoFastFoodSharp,
    name: "Event Catering",
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      // {
      //   path: "/attributes",
      //   name: "Attributes",
      // },
      {
        path: "/categories",
        name: "Categories",
      },
      {
        path: "/products",
        name: "Products",
      },
      // {
      //   path: "/coupons",
      //   name: "Coupons",
      // },
    ],
  },

  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },
  {
    path: "/menus",
    icon: FiMenu,
    name: "Menus",
  },

  {
    path: "/booking",
    icon: FiShoppingCart,
    name: "Booking List",
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
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
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
    path: "/reviews",
    icon: FiTrendingUp,
    name: "Review",
  },
  {
    path: "/testimonials",
    icon: FiNavigation,
    name: "Testimonials",
  },


  // {
  //   path: "/our-staff",
  //   icon: FiUser,
  //   name: "OurStaff",
  // },

  // {
  //   path: "/settings?settingTab=common-settings",
  //   icon: FiSettings,
  //   name: "Settings",
  // },
];

export default sidebar;
