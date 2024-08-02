import React from 'react';
import { Customer } from '../types/types';

interface Props {
  customer: Customer | null;
}

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  if (!customer) return <div>Select a customer to view details</div>;

  return (
    <div className="customer-details">
      <h2>{customer.name} details here</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
    </div>
  );
};

export default CustomerDetails;