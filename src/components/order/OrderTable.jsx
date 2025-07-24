import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn, FiPrinter } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import

import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import SelectStatus from "@/components/form/selectOption/SelectStatus";

const dateFormat = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let hour = d.getHours();
  const min = String(d.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  const hourStr = String(hour).padStart(2, "0");

  return `${day}/${month}/${year}, ${hourStr}:${min} ${ampm}`;
};

const OrderTable = ({ orders }) => {
  // console.log('globalSetting',globalSetting)
  const { t } = useTranslation();
  const { getNumberTwo } = useUtilsFunction();

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?.invoice}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {dateFormat(order?.createdAt)}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">{order?.user_info?.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.paymentMethod}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {getNumberTwo(order?.total)}
              </span>৳
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus id={order.id} order={order} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                {/* <PrintReceipt orderId={order.id} /> */}

                <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link to={`/order/${order.id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiPrinter}
                      title={("View Invoice & Print")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
