import React from 'react';
import UserForm from './pages/Register';
import UserList from './pages/Profile';
import { FormProvider } from 'react-hook-form';

function App() {
  return (
    <FormProvider>
      <UserForm />
      <UserList />
    </FormProvider>
   
  );
}

export default App;