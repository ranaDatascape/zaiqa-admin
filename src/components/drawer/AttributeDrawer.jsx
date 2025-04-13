import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Scrollbars } from "react-custom-scrollbars-2";

import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import useAttributeSubmit from "@/hooks/useAttributeSubmit";

const AttributeDrawer = ({ id }) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    isSubmitting,
  } = useAttributeSubmit(id);

  const { t } = useTranslation();

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-4">Add Attributes</h1>
      </div>
     

      <Scrollbars className="w-full md:w-12/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Attribute Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="name"
                  type="text"
                  placeholder="Please Enter Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t("Placeholder")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  name="placeholder"
                  type="text"
                  placeholder="Enter Placeholder"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative">
              <LabelArea label={t("Field Type")} />
              <div className="col-span-8 sm:col-span-4 ">
                <Select
                  name="field_type"
                  {...register(`field_type`, {
                    required: `field_type is required!`,
                  })}
                >
                  <option value="" defaultValue hidden>
                    {t("DrawerSelecttype")}
                  </option>
                  <option value="text">{t("Text")}</option>
                  <option value="checkbox">{t("Checkbox")}</option>
                  <option value="number">{t("Number")}</option>
                  <option value="radio">{t("Radio")}</option>
                  <option value="File">{t("File")}</option>
                  <option value="select">{t("Select")}</option>
                  <option value="textarea">{t("textarea")}</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative mt-5">
              <LabelArea label={t("Field Type Data")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  name="field_type_data"
                  type="text"
                  placeholder="Enter Field Type Data"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative">
              <LabelArea label={t("Is Required")} />
              <div className="col-span-8 sm:col-span-4 ">
                <Select
                  name="is_required"
                  {...register(`is_required`, {
                    required: `is_required is required!`,
                  })}
                >
                  <option value="" defaultValue hidden>
                    {t("DrawerSelecttype")}
                  </option>
                  <option value="yes">{t("Yes")}</option>
                  <option value="no">{t("No")}</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative mt-5">
              <LabelArea label={t("CSS Class")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  name="css_class"
                  type="text"
                  placeholder="Enter CSS Class"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative mt-5">
              <LabelArea label={t("Extra Attr")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  name="extra_attr"
                  type="text"
                  placeholder="Enter Extra Attribute"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative mt-5">
              <LabelArea label={t("Default Value")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  name="default_value"
                  type="text"
                  placeholder="Enter Default Value"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative mb-32">
              <LabelArea label={t("Status")} />
              <div className="col-span-8 sm:col-span-4 ">
                <Select
                  name="status"
                  {...register(`status`, {
                    required: `Status is required!`,
                  })}
                >
                  <option value="" defaultValue hidden>
                    {t("DrawerSelecttype")}
                  </option>
                  <option value="1">{t("Active")}</option>
                  <option value="2">{t("InActive")}</option>
                </Select>
              </div>
            </div>
          </div>
        <DrawerButton id={id} title="Attribute" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default AttributeDrawer;
