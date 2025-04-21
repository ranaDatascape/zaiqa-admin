import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiEdit, FiEdit2, FiTrash2, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";

//internal import

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const ProductTable = ({ products, isCheck, setIsCheck, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { currency, showingTranslateValue, getNumberTwo } = useUtilsFunction();
  const handleClick = (e) => {
    const { id, checked } = e.target;
    // console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // // Handle Update product
  // const handleUpdateProduct = async (id) => {
  //   try {
  //     const response = await axiosPublic.get(`/products/${id}`);
  //     if (response?.status === 200) {
  //       handleUpdate(response?.data?.data);
  //       handleModalOpen();
  //     } else {
  //       notifyError("Failed to fetch product details.");
  //     }
  //   } catch (error) {
  //     notifyError("Error fetching product details.");
  //   }
  // }

  // Handle delete
  const handleDelete = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/products/${id}`);
          if (response?.status === 200) {
            notifySuccess("Product deleted successfully!");
            refetch(); // Refetch the product list after deletion
          } else {
            notifyError("Failed to delete product.");
          }
        } catch (error) {
          notifyError("Error deleting product.");
        }
      }
    });
  };

  return (
    <>
      <TableBody>
        {products?.map((product, i) => (
          <>
            <MainDrawer>
              <ProductDrawer currency={currency} id={serviceId} product={product} />
            </MainDrawer>
            <TableRow key={i + 1}>
              <TableCell className="font-semibold uppercase text-xs">
                {product?.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {product?.image ? (
                    <Avatar
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                      src={BASE_URL + product?.image}
                      alt="product"
                    />
                  ) : (
                    <Avatar
                      src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                      alt="product"
                    />
                  )}
                  <div>
                    <h2
                      className={`text-sm font-medium ${
                        product?.title.length > 30 ? "wrap-long-title" : ""
                      }`}
                    ></h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm">{product?.productName}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-semibold">
                  {product?.purchasePrice}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-semibold">
                  {product?.salesPrice}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">{product?.productQuantity}</span>
              </TableCell>
              <TableCell>
                {product.productQuantity > 0 ? (
                  <Badge type="success">{t("Selling")}</Badge>
                ) : (
                  <Badge type="danger">{t("SoldOut")}</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-8">
                <Button
                  layout="link"
                  size="icon"
                  aria-label="Delete"
                  onClick={toggleDrawer}
                >
                  <FiEdit className="text-green-500 text-2xl" />
                </Button>

                <Button
                  layout="link"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => handleDelete(product?.id)} // Call handleDelete with SweetAlert2
                >
                  <FiTrash2 className="text-red-500 text-2xl" />
                </Button>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
