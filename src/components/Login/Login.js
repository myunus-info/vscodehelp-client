import React from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '85vh',
              }}
            >
              <h4>Welcome Back</h4>
              <h3>Login to Your Account</h3>
              <p>
                Don't have an account? <Link to="/user/register">Create an Account</Link>
              </p>
              <h3>Our Top Authors</h3>
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                }}
                src="https://www.vscodehelp.com/assets/images/user/profile/6519cde94354a1696189929.jpg"
                alt="Top Author"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div style={{ width: '300px', height: '80px', margin: '3.15rem auto' }}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://www.vscodehelp.com/assets/images/logoIcon/logo.png"
                alt="vscodehelp logo"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div className="my-5">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="username">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Username"
                    {...register('username', { required: true })}
                  />
                </div>
                {errors.username && (
                  <span style={{ display: 'block', color: 'crimson' }}>Username is required</span>
                )}
              </div>

              {/* Password */}
              <div className="my-5">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group input-group-lg mb-3">
                  <span className="input-group-text" id="password">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                    {...register('password', { required: true })}
                  />
                </div>
                {errors.password && (
                  <span style={{ display: 'block', color: 'crimson' }}>Password is required</span>
                )}
              </div>

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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
