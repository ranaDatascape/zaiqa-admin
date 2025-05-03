import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

const MappingPackageTable = ({ PackagesMappingData, isLoading }) => {
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <TableBody>
      {PackagesMappingData?.map((data, i) =>
        data?.products?.map((item, index) => (
          <TableRow key={`${i}-${index}`}>
            {index === 0 ? (
              <>
                <TableCell rowSpan={data.products.length}>
                  <span className="font-semibold uppercase text-xs">
                    {data?.packageInfo?.id}
                  </span>
                </TableCell>
                <TableCell rowSpan={data.products.length}>
                  <span className="font-semibold uppercase text-xs">
                    {data?.packageInfo?.name}
                  </span>
                </TableCell>
              </>
            ) : null}

            <TableCell>
              <span className="text-sm">{item?.product?.productName}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.day}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.status}</span>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

export default MappingPackageTable;
