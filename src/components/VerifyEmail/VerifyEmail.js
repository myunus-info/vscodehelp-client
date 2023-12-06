import React, { useState } from 'react';
import Layout from '../Layout/Layout';

const VerifyEmail = () => {
  function transformEmail(email) {
    const firstHalf = email.split('@')[0];
    const secondHalf = email.split('@')[1];
    let transformedEmail = '';
    transformedEmail += firstHalf.replace(firstHalf.slice(1), '***');
    transformedEmail += `@${secondHalf}`;
    return transformedEmail;
  }
  const transformedEmail = transformEmail('myunus_edu@yahoo.com');

  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log(verificationCode);

    // reset
    setVerificationCode('');
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              style={{
                width: '100%',
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <form onSubmit={handleSubmit} className="form-control w-50">
                <div className=" w-100 p-2" style={{ borderRadius: '10px', boxShadow: '5 5 5 10 10' }}>
                  <p>A six digit email address sent to your email address: {transformedEmail}</p>
                  <label htmlFor="input" className="pb-2">
                    Verification Code
                  </label>
                  <input
                    onChange={e => setVerificationCode(e.target.value)}
                    value={verificationCode}
                    type="text"
                    className="form-control w-100"
                    required
                  />
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      backgroundColor: '#0033b5',
                      color: 'white',
                      width: '100%',
                      marginBottom: '2rem',
                      marginTop: '2rem',
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
