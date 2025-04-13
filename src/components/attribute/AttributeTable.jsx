import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import AttributeDrawer from "@/components/drawer/AttributeDrawer";

const AttributeTable = ({ isCheck, setIsCheck, attributes }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const { showingTranslateValue } = useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  console.log('attributes', attributes);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {attributes?.map((attribute) => (
          <TableRow key={attribute.id}>
            <TableCell className="font-semibold uppercase text-xs">
              {attribute?.id}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute?.name}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute?.field_type}
            </TableCell>


            <TableCell className="font-medium text-sm">
              {attribute?.placeholder}
            </TableCell>
            <TableCell className="font-medium text-sm">
              {attribute?.css_class}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={attribute.id} status={attribute?.status} />
            </TableCell>

            <TableCell className="flex justify-center">
              <Link
                to={`/attributes/${attribute.id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
              >
                <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title="Edit Values"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={attribute.id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.title)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AttributeTable;
