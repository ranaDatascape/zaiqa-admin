import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

const MappingPackageTable = ({ PackagesMappingData, isLoading }) => {
  console.log(PackagesMappingData);


  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <TableBody>
        {PackagesMappingData?.map((data, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {data?.id}
              </span>
            </TableCell>

            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {data?.package?.name}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{data?.product?.productName}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{data?.days}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{data?.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default MappingPackageTable;
