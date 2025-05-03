import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "../preloader/Loading";
import CustomModal from "../ui/CustomModal";
import ProductUpdateModal from "../ProductUpdateModal";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const ProductTable = ({ products, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  console.log(products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await axiosPublic.delete(
            `${BASE_URL}/products/${id}`
          );
          if (response.status === 200) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was a problem deleting the product.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading) {
    return (
      <>
        <Loading
          loading={loading}
        />
      </>
    );
  }

  return (
    <>
    <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProduct && (
          <ProductUpdateModal
            product={selectedProduct}
            onClose={handleCloseModal}
            refetch={refetch}
          />
        )}
      </CustomModal>
      <TableBody>
        {products?.map((product, i) => (
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
                aria-label="Edit"
                onClick={() => handleUpdate(product)}
              >
                <FiEdit className="text-green-500 text-2xl" />
              </Button>

              <Button
                layout="link"
                size="icon"
                aria-label="Delete"
                onClick={() => handleDelete(product?.id)}
              >
                <FiTrash2 className="text-red-500 text-2xl" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
