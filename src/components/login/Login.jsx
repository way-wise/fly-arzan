import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/loginlogo.png";
import apple from "../../assets/Images/apple.png";
import google from "../../assets/Images/google.png";
import { useTranslation } from "react-i18next";
import { loginSchema, registrationSchema } from "../Schemas/Schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn, useSignUp } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = ({ setShowPopup, redirectTo }) => {
  const [isSignup, setIsSignup] = useState(false); // Track which form is visible
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from props, location state, or default to /admin
  const from = redirectTo || location.state?.from || "/admin";
  
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  
  const loading = signInMutation.isPending || signUpMutation.isPending;
  const error = signInMutation.error?.message || signUpMutation.error?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(!isSignup ? loginSchema : registrationSchema),
  });
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    try {
      if (isSignup) {
        await signUpMutation.mutateAsync({
          name: data.email.split("@")[0], // Use email prefix as name
          email: data.email,
          password: data.password,
        });
        toast.success("Account created successfully!");
        setIsSignup(false); // Switch to login
      } else {
        const response = await signInMutation.mutateAsync({
          email: data.email,
          password: data.password,
        });
        if (response?.user) {
          toast.success("Login successful!");
          if (setShowPopup) {
            setShowPopup(false);
          } else {
            // Navigate based on role (only super can access admin)
            const userRole = response.user.role;
            const isSuperAdmin = userRole === "super";
            // Super admins go to /admin, others go to /dashboard (or original destination if not /admin)
            let destination;
            if (isSuperAdmin) {
              destination = "/admin";
            } else if (from && from !== "/admin") {
              destination = from;
            } else {
              destination = "/dashboard";
            }
            navigate(destination, { replace: true });
          }
        }
      }
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {!isSignup ? (
        <section className="Login-sec" style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
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
        <section className="Login-sec singup-page" style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
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
    </div>
  );
};

export default Login;
