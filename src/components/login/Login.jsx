import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loginimg from "../../assets/Images/Login.png";
import logo from "../../assets/Images/loginlogo.png";
import apple from "../../assets/Images/apple.png";
import google from "../../assets/Images/google.png";
import { useTranslation } from "react-i18next";
import { loginSchema, registrationSchema } from "../Schemas/Schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BackendUrl } from "../../baseUrl";
import { usePost } from "../../utils/ApiMethod";

const Login = ({ setShowPopup }) => {
  const [isSignup, setIsSignup] = useState(false); // Track which form is visible
  const { postData, loading, error } = usePost(
    !isSignup ? "/auth/login" : "/auth/register",
    BackendUrl
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(!isSignup ? loginSchema : registrationSchema),
  });
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    console.log(data); // Handle form submission (e.g., API call)

    const response = await postData(data);
    if (response?.status === true) {
      setShowPopup(false);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(response?.data));
    }
  };

  return (
    <>
      {!isSignup ? (
        <section className="Login-sec">
          <div className="Login-main">
            <div className="Login-form-box">
              <div className="Login-form-logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="Login-form-tital">
                <h2>{t(`Logsec.heading`)}</h2>
                <p>{t(`Logsec.para`)}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Login-form-group">
                  <div className="Login-form-group-box">
                    <div className="Login-form-input-group">
                      <label>{t(`Logsec.label1`)}</label>
                      <input
                        type="text"
                      placeholder="info@example.com"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="error">*{errors.email.message}</p>
                    )}
                    <div className="Login-form-input-group">
                      <label>{t(`Logsec.label2`)}</label>
                      <input
                        type="password"
                        placeholder="**************"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="error">*{errors.password.message}</p>
                    )}
                    {error && <p className="error">{error}</p>}
                  </div>
                  <div className="Login-form-Forgot-box">
                    <div className="Remember-box">
                      <input type="checkbox" />
                      <p>{t(`Logsec.label3`)}</p>
                    </div>
                    <a href="#">{t(`Logsec.label4`)}</a>
                  </div>
                  <div className="Login-form-btn">
                    <button disabled={loading} type="submit">
                      {loading ? t(`Logsec.btn3`) : t(`Logsec.btn1`)}{" "}
                    </button>
                  </div>
                  <div className="Or-box">
                    <div className="Or-line"></div>
                    <h2>{t(`Logsec.label5`)}</h2>
                    <div className="Or-line"></div>
                  </div>
                  <div className="google-btn-box">
                    <button>
                      <img src={google} alt="Google" />
                    </button>
                    <h2>{t(`Logsec.label6`)}</h2>
                    <button>
                      <img src={apple} alt="Apple" />
                    </button>
                  </div>
                  <div className="an-account-box">
                    <p>
                      {t(`Logsec.label7`)}
                      <Link
                        onClick={() => setIsSignup(true)}
                        className="link-btn"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section className="Login-sec singup-page">
          <div className="Login-main">
            <div className="Login-form-box">
              <div className="Login-form-logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="Login-form-tital">
                <h2>{t(`Logsec.heading1`)} </h2>
                <p>{t(`Logsec.para1`)}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Login-form-group">
                  <div className="Login-form-group-box">
                    <div className="Login-form-input-group">
                      <label>{t(`Logsec.label8`)} </label>
                      <input
                        type="Email"
                        placeholder="info@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="error mt-2">*{errors.email.message}</p>
                      )}
                    </div>

                    <div className="Login-form-input-group more-group-with">
                      <label>{t(`Logsec.label9`)}</label>
                      <input
                        type="Password"
                        placeholder="**************"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="error mt-2">*{errors.password.message}</p>
                      )}
                    </div>
                    <div className="Login-form-input-group more-group-with">
                      <label> {t(`Logsec.label10`)} </label>
                      <input
                        type="password"
                        placeholder="**************"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="error mt-2">
                          *{errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    {error && <p className="error">{error}</p>}
                  </div>
                  <div className="Login-form-Forgot-box">
                    <div className="Remember-box more-withd-Forgot">
                      <input type="checkbox" {...register("terms")} />
                      <p>
                        {t(`Logsec.label11`)}{" "}
                        <a href="#">{t(`Logsec.label12`)} </a>{" "}
                        {t(`Logsec.label13`)}{" "}
                        <a href="#">{t(`Logsec.label14`)} </a>
                      </p>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="error mt-2">*{errors.terms.message}</p>
                  )}
                  <div className="Login-form-btn">
                    {/* <Link to="/Recentactivities"> */}
                    <button disabled={loading} type="submit">
                      {loading ? t(`Logsec.btn5`) : t(`Logsec.btn2`)}{" "}
                    </button>
                    {/* </Link> */}
                  </div>
                  <div className="Or-box">
                    <div className="Or-line"></div>
                    <h2>{t(`Logsec.label5`)} </h2>
                    <div className="Or-line"></div>
                  </div>
                  <div className="google-btn-box">
                    <button>
                      <img src={google} alt="Google" />
                    </button>
                    <h2>{t(`Logsec.label6`)} </h2>
                    <button>
                      <img src={apple} alt="Apple" />
                    </button>
                  </div>
                  <div className="an-account-box">
                    <p>
                      {t(`Logsec.label15`)}
                      <Link
                        onClick={() => setIsSignup(false)}
                        className="link-btn"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
