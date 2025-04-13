import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DailyDealsTable = ({ dailyDealsData, isLoading }) => {
  const convertToBangladeshTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <TableBody>
      {dailyDealsData?.map((deal, i) => (
        <TableRow key={i + 1}>
          <TableCell>
            <span className="text-sm">{i + 1}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal?.product.productName}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal.price}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{deal.quantity}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">
              {convertToBangladeshTime(deal.startTime)}
            </span>
          </TableCell>
          <TableCell>
            <span className="text-sm">
              {convertToBangladeshTime(deal.endTime)}
            </span>
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

export default DailyDealsTable;
