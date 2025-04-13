import React from 'react';
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Status from "@/components/table/Status";
import EditDeleteButton from '../table/EditDeleteButton';

const MenusTable = ({ menusData, isLoading }) => {
  if (isLoading) {
    return <TableRow>
      <TableCell colSpan={6}>
        <div className="text-center">Loading...</div>
      </TableCell>
    </TableRow>;
  }

  return (
    <TableBody>
      {menusData?.map((menu, i) => (
        <TableRow key={i}>
          <TableCell>
            <span className="text-sm">{i + 1}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm font-medium">{menu.name}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{menu.description}</span>
          </TableCell>
          <TableCell>
            <Status status={menu.status} />
          </TableCell>
          <TableCell>
          <EditDeleteButton
                id={menu?.id}
                menu={menu}
              />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MenusTable;
