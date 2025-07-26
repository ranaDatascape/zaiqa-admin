import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {/* Pending or Inactive - Warning Badge */}
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{status}</Badge>
        )}

        {/* Waiting for Password Reset - Warning Badge */}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}

        {/* Processing - Info Badge (default badge for in-progress state) */}
        {status === "Processing" && <Badge type="info">{status}</Badge>}

        {/* Delivered or Active - Success Badge */}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{status}</Badge>
        )}

        {/* OnTheWay - Primary Badge */}
        {status === "OnTheWay" && <Badge type="primary">{status}</Badge>}

        {/* Cancel - Danger Badge */}
        {status === "Cancel" && <Badge type="danger">{status}</Badge>}

        {/* POS-Completed - Custom Styled Badge */}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}
      </span>
    </>
  );
};

export default Status;
