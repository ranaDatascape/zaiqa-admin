import ReactTagInput from "@pathofdev/react-tag-input";
import { Input, Textarea } from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "react-responsive-modal/styles.css";
import { useTranslation } from "react-i18next";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//internal import
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputValue from "@/components/form/input/InputValue";
import useProductSubmit from "@/hooks/useProductSubmit";
import InputValueFive from "@/components/form/input/InputValueFive";
import useGetDatas from "@/hooks/useGetDatas";
import { notifyError, notifySuccess } from "@/utils/toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import DrawerButton from "../form/button/DrawerButton";
import { useForm } from "react-hook-form";
import { SidebarContext } from "@/context/SidebarContext";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import Loading from "../preloader/Loading";
//internal import

const ProductDrawer = ({ id, productsrefetch }) => {
  const { t } = useTranslation();

  const { tag, setTag, slug, tapValue, handleProductSlug } =
    useProductSubmit(id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: category, isLoading } = useGetDatas(
    "/category/parent",
    "category"
  );
  const {
    data: subcategory,
    isError,
    error,
    refetch,
  } = useGetDatas("/category", "subCategory");
  const { data: menus } = useGetDatas("/menus", "menus");
  const { closeDrawer } = useContext(SidebarContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  const axiosPublic = useAxiosPublic();

  // ✅ Correct File Change Handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // ✅ Validate image size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      notifyError("Image size must be less than 5MB.");
      setFile(null);
      setPreview(null);
      return;
    }
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };


  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image" && data.image?.[0]) {
        formData.append("image", data.image[0]);
      }
      else if (key === "menuId") {
        const menuId = data.menuId;
        if (menuId && !isNaN(menuId) && Number(menuId) > 0) {
          formData.append("menuId", menuId);
        }
        // else skip appending menuId (so backend defaults it to null)
      }
      else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.post(
        "/products/add?type=products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200 || res.status === 201) {
        notifySuccess("Product Added Successfully");
        closeDrawer();
        productsrefetch();
        reset();
      }
    } catch (error) {
      console.error("Upload error:", error);
      notifyError("Failed to add product.");
    }
  };










  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   // Append other fields
  //   for (const key in data) {
  //     if (key === "image" && data.image?.[0]) {
  //       formData.append("image", data.image[0]);
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  //   // Append the file separately
  //   formData.append("menuId", Array.isArray(data.menuId) ? data.menuId.find(id => id && !isNaN(id)) || "" : data.menuId || "");
  //   formData.append("lunchIndex", Array.isArray(data.lunchIndex) ? data.lunchIndex.find(id => id && !isNaN(id)) || "" : data.lunchIndex || "");

  //   formData.append("slug", data.productName?.toLowerCase().split(" ").join("-"));
  //   formData.append("tag", tag || "");
  //   console.log("Form Data:", formData);
  //   try {
  //     const res = await axiosPublic.post("/products/add?type=products", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (res.status === 200 || res.status === 201) {
  //       notifySuccess("Product Added Successfully");
  //       closeDrawer();
  //       productsrefetch();
  //       reset();
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     notifyError("Failed to add product.");
  //   }
  // };




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

  if (isLoading) {
    return (
      <>
        <Loading loading={isLoading} />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl mt-5">Add Product</h1>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Category *")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <select
                      {...register("categories", {
                        required: "Category is required!",
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a Category</option>
                      {category?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Sub Category")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <select
                      {...register("subCategory", {})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a Sub Category</option>
                      {subcategory?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Menus")} />
                <div className="col-span-8 sm:col-span-4">
                  {isLoading ? (
                    <p>Loading menus...</p>
                  ) : (
                    <select
                      {...register("menuId", {})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a menus</option>
                      {menus?.map((menu) => (
                        <option key={menu?.id} value={menu?.id}>
                          {menu?.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Lunch Index")} />
                <div className="col-span-4 sm:col-span-4">
                  <select
                    {...register("lunchIndex", { required: "Please select Lunch Index (Yes or No)" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">-- Select an option --</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  {errors.lunchIndex && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.lunchIndex.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Product Name *")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`productName`, {
                      required: "Product name is required!",
                    })}
                    name="productName"
                    type="text"
                    placeholder={t("ProductName")}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Product Code")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`productCode`, {})}
                    name="productCode"
                    type="text"
                    placeholder={t("ProductCode")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.productCode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTitleName *")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "TItle is required!",
                    })}
                    name="title"
                    type="text"
                    placeholder={t("ProductTitleName")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage *")} />
                <div className="col-span-6 sm:col-span-4">
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-lg p-2 block w-full cursor-pointer"
                  />
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Purchase Price *" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    maxValue={2000}
                    minValue={1}
                    label="Purchase Price"
                    name="purchasePrice"
                    type="number"
                    placeholder="OriginalPrice"
                    defaultValue={0.0}
                    required={true}
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Sale Price *")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    minValue={0}
                    defaultValue={0.0}
                    required={true}
                    label="salesPrice"
                    name="salesPrice"
                    type="number"
                    placeholder="Sale price"
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={t("Product Quantity *")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Quantity"
                    name="productQuantity"
                    type="number"
                    placeholder={t("ProductQuantity")}
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-20">
                <LabelArea label={t("ProductDescription")} />
                <div className="col-span-8 sm:col-span-4">
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
                    className="h-[300px]"
                  />

                  {/* Hidden Input for React Hook Form */}
                  <input
                    type="hidden"
                    {...register("description")}
                    value={description}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-16 mt-10">
                <LabelArea label={t("Return Policy")} />
                <div className="col-span-8 sm:col-span-4">
                  {/* ReactQuill Editor */}
                  <ReactQuill
                    value={returnPolicy}
                    modules={modules}
                    formats={formats}
                    onChange={(content) => {
                      setReturnPolicy(content);
                      setValue("returnPolicy", content); // Update form value
                    }}
                    placeholder="Write something..."
                    className="h-[300px]"
                  />

                  {/* Hidden Input for React Hook Form */}
                  <input
                    type="hidden"
                    {...register("returnPolicy")}
                    value={returnPolicy}
                  />
                </div>
              </div>
            </div>
          )}
          <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
