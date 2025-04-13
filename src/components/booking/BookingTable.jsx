import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import EditDeleteButton from "../table/EditDeleteButton";

const BookingTable = ({ BookingList = [], isLoading }) => {
  console.log("Booking List", BookingList);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!BookingList.length) {
    return <h1>No Bookings Found</h1>;
  }

  return (
    <TableBody>
      {BookingList.map((booking) => (
        <TableRow key={booking.id}>
          <TableCell className="font-semibold uppercase text-xs">
            {booking.id}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.date}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.personName}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.phoneNumber}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking?.email}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.city}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.place}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.eventType}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.peopleNum}
          </TableCell>

          

         

          <TableCell className="font-semibold uppercase text-xs">
            {booking.address}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {booking.description}
          </TableCell>

          <TableCell>
            <EditDeleteButton
              id={booking?.id}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BookingTable;
