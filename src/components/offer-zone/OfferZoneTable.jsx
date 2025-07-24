import React from 'react';
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Status from "@/components/table/Status";
import EditDeleteButton from '../table/EditDeleteButton';
import CheckBox from '../form/others/CheckBox';

const OfferZoneTable = ({ offersData, isLoading, refetch, handleUpdate, handleModalOpen, isCheck, setIsCheck }) => {
  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Debug: Log the first offer to see the data structure
  if (offersData && offersData.length > 0) {
    console.log('First offer data:', offersData[0]);
    console.log('Offer ID:', offersData[0]?.id);
    console.log('All offer IDs:', offersData.map(offer => offer?.id));
  }

  if (isLoading) {
    return <TableRow>
      <TableCell colSpan={8}>
        <div className="text-center">Loading...</div>
      </TableCell>
    </TableRow>;
  }

  return (
    <TableBody>
      {offersData?.map((offer, i) => (
        <TableRow key={i}>
          <TableCell>
            <CheckBox
              type="checkbox"
              name={offer?.product?.productName}
              id={offer?.id}
              handleClick={handleClick}
              isChecked={isCheck?.includes(offer?.id)}
            />
          </TableCell>
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
            <span className="text-sm">{offer?.offerPrice}৳</span>
          </TableCell>
          <TableCell>
            <Status status={offer?.status} />
          </TableCell>
          <TableCell>
            <EditDeleteButton
              id={offer?.id}
              title={offer?.product?.productName || offer?.product?.title}
              handleUpdate={handleUpdate}
              handleModalOpen={(id, title, product) => {
                console.log('Delete clicked with ID:', id);
                console.log('Offer data:', offer);
                handleModalOpen(id, title, product);
              }}
              isCheck={isCheck}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OfferZoneTable;