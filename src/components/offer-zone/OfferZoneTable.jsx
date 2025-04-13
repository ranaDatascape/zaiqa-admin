import React from 'react';
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Status from "@/components/table/Status";

const OfferZoneTable = ({ offersData, isLoading }) => {
  if (isLoading) {
    return <TableRow>
      <TableCell colSpan={7}>
        <div className="text-center">Loading...</div>
      </TableCell>
    </TableRow>;
  }

  return (
    <TableBody>
      {offersData?.map((offer, i) => (
        <TableRow key={i}>
          <TableCell>
            <span className="text-sm">{i + 1}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm font-medium">{offer.product?.productName}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm font-medium">{offer?.product?.title}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{offer?.offerPrice}%</span>
          </TableCell>
          <TableCell>
            <Status status={offer?.status} />
          </TableCell>
          <TableCell>
            <div className="flex justify-center items-center space-x-4">
              <button className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                <FiEdit />
              </button>
              <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                <FiTrash2 />
              </button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OfferZoneTable;