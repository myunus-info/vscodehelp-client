import React, { useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useForm } from 'react-hook-form';
import useHttp from '../hook/useHttp';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const RegisterUserData = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitted },
  } = useForm();

  const registerUserDetails = data => {
    if (data.status === 'success') {
      navigate('/user/dashboard');
    }
    console.log('Register user details data: ', data);
  };

  const registerUserDetailsHandler = async data => {
    sendRequest(
      {
        url: 'http://localhost:5000/api/users/create-user-details',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: data,
      },
      registerUserDetails
    );
  };

  const onSubmit = data => {
    registerUserDetailsHandler(data);
    console.log(data);
  };

  useEffect(() => {
    if (!errors && isSubmitSuccessful && !isDirty && isSubmitted) {
      reset();
    }
  }, [errors, isSubmitSuccessful, isDirty, isSubmitted, reset]);

  return (
    <Layout>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <div className="row">
          <div className="col-lg-8 m-auto">
            <h2 className="text-center my-5">User Data</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-center my-5">
                {/* First Name */}
                <div className="w-100 me-2">
                  <label className="fw-bold" htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter first name"
                    {...register('firstName', { required: true })}
                  />
                  {errors.firstName && (
                    <span style={{ color: 'crimson', display: 'block' }}>First name is required</span>
                  )}
                </div>
                {/* Last Name */}
                <div className="w-100 ms-2">
                  <label className="fw-bold" htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter last name"
                    {...register('lastName', { required: true })}
                  />
                  {errors.lastName && (
                    <span style={{ color: 'crimson', display: 'block' }}>Last name is required</span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center my-5">
                {/* Address */}
                <div className="w-100 me-2">
                  <label className="fw-bold" htmlFor="firstName">
                    Address
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter address"
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <span style={{ color: 'crimson', display: 'block' }}>Address is required</span>
                  )}
                </div>
                {/* State */}
                <div className="w-100 ms-2">
                  <label className="fw-bold" htmlFor="state">
                    State
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter state"
                    {...register('state', { required: true })}
                  />
                  {errors.state && (
                    <span style={{ color: 'crimson', display: 'block' }}>State is required</span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center my-5">
                {/* Zip Code */}
                <div className="w-100 me-2">
                  <label className="fw-bold" htmlFor="zipCode">
                    Zip Code
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter zip code"
                    {...register('zipCode', { required: true })}
                  />
                  {errors.zipCode && (
                    <span style={{ color: 'crimson', display: 'block' }}>Zip code is required</span>
                  )}
                </div>
                {/* City */}
                <div className="w-100 ms-2">
                  <label className="fw-bold" htmlFor="city">
                    City
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter City"
                    {...register('city', { required: true })}
                  />
                  {errors.city && (
                    <span style={{ color: 'crimson', display: 'block' }}>City is required</span>
                  )}
                </div>
              </div>

              {error && <p className="text-danger">{error}</p>}

              <button
                className="btn"
                type="submit"
                style={{
                  backgroundColor: '#0033b5',
                  color: 'white',
                  width: '100%',
                  marginBottom: '2rem',
                }}
              >
                {isLoading ? 'Submitting' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterUserData;
