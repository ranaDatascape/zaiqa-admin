import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifySuccess } from "@/utils/toast";

const ProductUpdateModal = ({ product, onClose, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      productName: "",
      purchasePrice: "",
      salesPrice: "",
      productQuantity: "",
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName,
        purchasePrice: product.purchasePrice,
        salesPrice: product.salesPrice,
        productQuantity: product.productQuantity,
        description: product.description || "",
      });
      setPreview(product.image);
    }
  }, [product, reset]);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("purchasePrice", data.purchasePrice);
    formData.append("salesPrice", data.salesPrice);
    formData.append("productQuantity", data.productQuantity);
    formData.append("description", data.description || "");

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await axiosPublic.patch(`/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        notifySuccess("Product updated successfully!");
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };




  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Alignments
      [{ color: [] }, { background: [] }], // Text color & background color
      ["blockquote", "code-block"], // Blockquote & Code block
      ["link", "image", "video"], // Media tools
      ["clean"], // Remove formatting
      ["custom-check"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "align",
    "color",
    "background",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <div className="p-4 bg-white rounded shadow-md ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Update Product</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              placeholder="Product Name"
              className="w-full p-2 border rounded"
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName.message}</p>
            )}
            <input
              type="number"
              {...register("purchasePrice", {
                required: "Purchase price is required",
              })}
              placeholder="Purchase Price"
              className="w-full p-2 border rounded"
            />
            {errors.purchasePrice && (
              <p className="text-red-500">{errors.purchasePrice.message}</p>
            )}

            <input
              type="number"
              {...register("salesPrice", {
                required: "Sales price is required",
              })}
              placeholder="Sales Price"
              className="w-full p-2 border rounded"
            />
            {errors.salesPrice && (
              <p className="text-red-500">{errors.salesPrice.message}</p>
            )}

            <input
              type="number"
              {...register("productQuantity", {
                required: "Quantity is required",
              })}
              placeholder="Product Quantity"
              className="w-full p-2 border rounded"
            />
            {errors.productQuantity && (
              <p className="text-red-500">{errors.productQuantity.message}</p>
            )}

            <textarea
              {...register("description")}
              placeholder="Description (optional)"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Image upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full p-2 border rounded"
            />
            {preview && (
              <img
                src={
                  typeof preview === "string"
                    ? preview
                    : URL.createObjectURL(preview)
                }
                alt="preview"
                className="w-32 h-32 object-cover mt-2 rounded border"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductUpdateModal;
