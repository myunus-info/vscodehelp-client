import React, { useContext, useState } from 'react';
import Layout from '../Layout/Layout';
import useHttp from '../hook/useHttp';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  function transformEmail(email) {
    const firstHalf = email?.split('@')[0];
    const secondHalf = email?.split('@')[1];
    let transformedEmail = '';
    transformedEmail += firstHalf?.replace(firstHalf.slice(1), '***');
    transformedEmail += `@${secondHalf}`;
    return transformedEmail;
  }
  const { sendRequest, isLoading, error } = useHttp();
  const authCtx = useContext(AuthContext);
  const transformedEmail = transformEmail(authCtx?.user?.email);
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');

  const verifyOTP = data => {
    if (data.status === 'success') {
      navigate('/user/user-data');
    }
    // console.log('Verify OTP data: ', data);
  };

  const verifyOTPHandler = async otp => {
    sendRequest(
      {
        url: 'http://localhost:5000/api/users/verify-otp',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: { OTP: otp },
      },
      verifyOTP
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    verifyOTPHandler(verificationCode);

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
                  <p>
                    A six digit email email verification code sent to your email address:{' '}
                    {transformedEmail}
                  </p>
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

                  {error && <p className="text-danger">{error}</p>}
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
                    {isLoading ? 'Submitting...' : 'Submit'}
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
