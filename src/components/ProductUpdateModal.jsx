import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { notifySuccess } from "@/utils/toast";
import ReactQuill from "react-quill";
import LabelArea from "./form/selectOption/LabelArea";


const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL


const ProductUpdateModal = ({ product, onClose, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      productName: "",
      title: "",
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
        title: product.title,
        purchasePrice: product.purchasePrice,
        salesPrice: product.salesPrice,
        productQuantity: product.productQuantity,
        description: product.description || "",
      });
      setPreview(BASE_URL + product.image);
      setDescription(product.description)
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
  
    formData.append("productName", data.productName?.toString() || "");
    formData.append("title", data.title?.toString() || "");
    formData.append("purchasePrice", data.purchasePrice?.toString() || "");
    formData.append("salesPrice", data.salesPrice?.toString() || "");
    formData.append("productQuantity", data.productQuantity?.toString() || "");
    formData.append("description", data.description?.toString() || "");
  
    // ✅ Append new image file if selected
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
  
    console.log("Submitting product update:", data);
  
    try {
      setLoading(true);
      const res = await axiosPublic.patch(`/products/${product.id}?type=products`, formData, {
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
    } finally {
      setLoading(false);
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
      // ["blockquote", "code-block"], // Blockquote & Code block
      ["link", "image", "video"], // Media tools
      // ["clean"], // Remove formatting
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
    // "blockquote",
    // "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white rounded shadow-md p-6 max-h-[90vh] overflow-y-auto">
          {/* ✅ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
          >
            &times;
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Update Product</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <LabelArea label={"Product Name"} />
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
              </div>

              <div>
                <LabelArea label={"Product Title"} />
                <input
                  {...register("title", {
                    required: "Product title is required",
                  })}
                  placeholder="Product Title"
                  className="w-full p-2 border rounded"
                />
                {errors.productName && (
                  <p className="text-red-500">{errors.productName.message}</p>
                )}
              </div>

              <div>
                <LabelArea label={"Purchase Price"} />
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
              </div>

              <div>
                <LabelArea label={"Sales Price"} />
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
              </div>

              <div>
                <div>
                  <LabelArea label={"Product Quantity"} />
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
                </div>
                {/* Image upload */}
                <div className="mt-12">
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
              </div>
              <div>
                <LabelArea label={"Product Description"} />
                {/* ReactQuill Editor */}
                <ReactQuill
                  value={description}
                  modules={modules}
                  formats={formats}
                  onChange={(content) => {
                    setDescription(content);
                    setValue("description", content); // Update form value
                  }}
                  placeholder="Write something..."
                  className="h-[300px] mb-20"
                />
                {/* Hidden Input for React Hook Form */}
                <input
                  type="hidden"
                  {...register("description")}
                  value={description}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? "Updateing..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductUpdateModal;
