import React, { useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../hook/useHttp';
import AuthContext from '../context/auth-context';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitted },
  } = useForm();

  const loginUser = data => {
    if (data.status === 'success') {
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      authCtx.login(data.data.user, data.data.accessToken, expirationTime);
      navigate('/user/dashboard');
    }
    console.log('Login user data: ', data);
  };

  const loginUserHandler = async data => {
    sendRequest(
      {
        url: 'http://localhost:5000/api/users/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      },
      loginUser
    );
  };

  const onSubmit = data => {
    loginUserHandler(data);
    // console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful && !errors && !isDirty && isSubmitted) {
      toast.success('User Logged in successfully!');
      reset();
    }
  }, [isSubmitSuccessful, reset, errors, isDirty, isSubmitted]);

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
                  <span className="input-group-text" id="identifier">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter username"
                    {...register('identifier', { required: true })}
                  />
                </div>
                {errors.identifier && (
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

              {error && <p>{error}</p>}

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
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Login;
