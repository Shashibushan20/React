import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import PhotoGrid from './components/PhotoGrid';
import { Customer } from './types/types';
import { getCustomers } from './services/api';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="App">
      <h4>This here is the heading</h4>
      <div className="content">
        <CustomerList
          customers={customers}
          selectedCustomerId={selectedCustomer?.id || null}
          onSelectCustomer={setSelectedCustomer}
        />
        <div className="right-panel">
          <CustomerDetails customer={selectedCustomer} />
          <PhotoGrid />
        </div>
      </div>
    </div>
  );
};

export default App;