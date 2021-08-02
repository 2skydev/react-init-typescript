import React from 'react';

import ApiSearchForm from '@web/shared/components/search/ApiSearchForm';

import UsersTable from '~/components/user/UsersTable';

export default function Users() {
  const [qs, setQs] = React.useState({});

  return (
    <>
      <ApiSearchForm
        name="user"
        excludes={[
          'resetPasswordToken',
          'provider',
          'confirmationToken',
          'confirmed',
        ]}
        onSearchFinish={(_, queryObject) => {
          setQs(queryObject);
        }}
      />

      <UsersTable qs={qs} />
    </>
  );
}
