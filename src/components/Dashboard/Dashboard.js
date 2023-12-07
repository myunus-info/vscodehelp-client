import React, { useContext } from 'react';
import Layout from '../Layout/Layout';
import AuthContext from '../context/auth-context';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <div
        style={{
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 className="text-center">
          Welcome <span className="text-primary">{authCtx?.user?.username}</span> to Dashboard!
        </h3>
      </div>
    </Layout>
  );
};

export default Dashboard;
