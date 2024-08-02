import React from 'react';
import { Customer } from '../types/types';

interface Props {
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<Props> = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${customer.id === selectedCustomerId ? 'selected' : ''}`}
          onClick={() => onSelectCustomer(customer)}
        >
          <h3>{customer.name}</h3>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;