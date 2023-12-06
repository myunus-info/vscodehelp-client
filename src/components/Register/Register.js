import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faKey, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { countries } from 'countries-list';
import './styles.css';

const Register = () => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [countryData, setCountryData] = useState([]);
  const [mobileCode, setMobileCode] = useState('');
  const [singleCountry, setSingleCountry] = useState('');
  const [countryError, setCountryError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  useEffect(() => {
    const allCountries = Object.keys(countries).map(countryCode => ({
      country: countries[countryCode].name,
      phoneCode: countries[countryCode].phone[0],
      countryCode,
    }));
    setCountryData(allCountries);
  }, []);

  const handleCountryChange = event => {
    const selectedCountry = event.target.value;
    setSingleCountry(selectedCountry);
    const country = countryData.find(country => country.country === selectedCountry);
    if (country) {
      setMobileCode(country?.phoneCode);
    }
  };

  const onSubmit = data => {
    data['country'] = singleCountry;
    data['mobileNumber'] = `+${mobileCode} ${data.mobileNumber}`;
    if (!data.country) {
      return setCountryError('Country is required!');
    }
    if (!/^\+\d{1,4}\s?(\d{1,})$/.test(data.mobileNumber)) {
      return setMobileNumberError('Invalid mobile number!');
    }

    console.log(data);
    reset();
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '85vh',
              }}
            >
              <h4>Welcome to VsCodeHelp</h4>
              <h3>Create an Account</h3>
              <p>
                Already you have an account? <Link to="/user/login">Login Now</Link>
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
          <div className="col-md-8">
            <div style={{ width: '300px', height: '80px', margin: '3.15rem auto' }}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://www.vscodehelp.com/assets/images/logoIcon/logo.png"
                alt="vscodehelp logo"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div className="d-flex justify-content-start my-5">
                <div className="d-flex me-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="username" className="form-label fw-bold">
                    Username
                  </p>
                  <div className="input-group input-group-lg ">
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
                    <span style={{ color: 'crimson', display: 'block' }}>Username is required</span>
                  )}
                </div>

                {/* Email */}
                <div className="d-flex ms-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="email" className="form-label fw-bold">
                    Email Address
                  </p>
                  <div className="input-group input-group-lg ">
                    <span className="input-group-text" id="email">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter Email Address"
                      {...register('email', { required: true })}
                    />
                  </div>
                  {errors.email && (
                    <span style={{ color: 'crimson', display: 'block' }}>Email is required</span>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="d-flex justify-content-start my-5">
                <div className="d-flex me-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="country" className="form-label fw-bold">
                    Country
                  </p>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text" id="country">
                      <FontAwesomeIcon icon={faGlobe} />
                    </span>
                    <Controller
                      name="country"
                      control={control}
                      defaultValue={countryData[0]?.country}
                      render={({ field }) => (
                        <select
                          {...field}
                          onChange={handleCountryChange}
                          style={{ fontSize: '1.18rem' }}
                          className="form-select"
                          aria-label={countryData[0]?.country}
                        >
                          {countryData.map(country => (
                            <option key={country.countryCode} value={country.country}>
                              {country.country}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  {countryError && (
                    <span style={{ color: 'crimson', display: 'block' }}>{countryError}</span>
                  )}
                </div>

                {/* Moble Number */}
                <div className="d-flex ms-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="mobileNumber" className="form-label fw-bold">
                    Enter Mobile Number
                  </p>
                  <div className="input-group input-group-lg ">
                    <span className="input-group-text" id="mobileNumber">
                      +{mobileCode ? mobileCode : countryData[0]?.phoneCode}
                    </span>
                    <input
                      className="form-control"
                      type="phone"
                      placeholder="Mobile Number"
                      {...register('mobileNumber', { required: true })}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <span style={{ color: 'crimson', display: 'block' }}>Mobile Number is required</span>
                  )}
                  {mobileNumberError && (
                    <span style={{ color: 'crimson', display: 'block' }}>{mobileNumberError}</span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="d-flex justify-content-start my-5">
                <div className="d-flex me-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="password" className="form-label fw-bold">
                    Password
                  </p>
                  <div className="input-group input-group-lg ">
                    <span className="input-group-text" id="password">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Enter Password"
                      {...register('password', { required: true })}
                    />
                  </div>
                  {errors.password && (
                    <span style={{ color: 'crimson', display: 'block' }}>Password is required</span>
                  )}
                </div>
                {/* Confirm Password */}
                <div className="d-flex ms-2" style={{ flexDirection: 'column' }}>
                  <p htmlFor="confirm_password" className="form-label fw-bold">
                    Confirm Password
                  </p>
                  <div className="input-group input-group-lg ">
                    <span className="input-group-text" id="confirm_password">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Confirm Password"
                      {...register('confirm_password', { required: true })}
                    />
                  </div>
                  {errors.password && (
                    <span style={{ color: 'crimson', display: 'block' }}>
                      Confirm password is required
                    </span>
                  )}
                </div>
              </div>

              <button
                className="btn"
                style={{
                  backgroundColor: '#0033b5',
                  color: 'white',
                  width: '100%',
                  marginBottom: '2rem',
                }}
                type="submit"
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

export default Register;
