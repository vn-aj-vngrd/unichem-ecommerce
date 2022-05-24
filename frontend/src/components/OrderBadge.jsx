const OrderBadge = ({ status }) => {
  if (status === "Awaiting Confirmation") {
    return <span className="badge bg-warning">{status}</span>;
  }

  if (status === "Awaiting Payment") {
    return <span className="badge bg-secondary">{status}</span>;
  }

  if (status === "Awaiting Fulfillment") {
    return <span className="badge bg-purple">{status}</span>;
  }

  if (status === "Awaiting Shipment") {
    return <span className="badge bg-tertiary">{status}</span>;
  }

  if (status === "Shipped") {
    return <span className="badge bg-indigo">{status}</span>;
  }

  if (status === "Awaiting Pickup") {
    return <span className="badge bg-info">{status}</span>;
  }

  if (status === "Completed") {
    return <span className="badge bg-success">{status}</span>;
  }

  if (status === "Cancelled") {
    return <span className="badge bg-primary">{status}</span>;
  }

  if (status === "Declined") {
    return <span className="badge bg-danger">{status}</span>;
  }

  if (status === "Awaiting Return") {
    return <span className="badge bg-gray-400">{status}</span>;
  }

  if (status === "Returned") {
    return <span className="badge bg-gray-600">{status}</span>;
  }

  return;
};

export default OrderBadge;
