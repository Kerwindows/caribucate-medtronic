import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";

// validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

// initial form values - removed static login
const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setStatus(undefined);
      try {
        // 1) Authenticate user and get JWT
        const { data: auth } = await login(values.email, values.password);
        // 2) Save token into context/localStorage and axios header
        saveAuth(auth);
        // 3) Verify token and load user profile
        const { data: userRes } = await getUserByToken(auth.api_token);
        setCurrentUser(userRes.user);
        // 4) Redirect to dashboard
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Login error:", error);
        saveAuth(undefined);
        setStatus("The login details are incorrect");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* Heading */}
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          School Management System
        </div>
      </div>

      {/* Social login options */}
      <div className="row g-3 mb-9">
        {/* Google */}
        <div className="col-md-6">
          <a
            href="#"
            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
          >
            <img
              alt="Google"
              src={toAbsoluteUrl("media/svg/brand-logos/google-icon.svg")}
              className="h-15px me-3"
            />
            Sign in with Google
          </a>
        </div>
        {/* Apple */}
        <div className="col-md-6">
          <a
            href="#"
            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
          >
            <img
              alt="Apple"
              src={toAbsoluteUrl("media/svg/brand-logos/apple-black.svg")}
              className="theme-light-show h-15px me-3"
            />
            <img
              alt="Apple Dark"
              src={toAbsoluteUrl("media/svg/brand-logos/apple-black-dark.svg")}
              className="theme-dark-show h-15px me-3"
            />
            Sign in with Apple
          </a>
        </div>
      </div>

      {/* Separator */}
      <div className="separator separator-content my-14">
        <span className="w-125px text-gray-500 fw-semibold fs-7">
          Or with email
        </span>
      </div>

      {/* Status message */}
      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* Email input */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            { "is-valid": formik.touched.email && !formik.errors.email && formik.values.email }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>

      {/* Password input */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.password && formik.errors.password },
            { "is-valid": formik.touched.password && !formik.errors.password && formik.values.password }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      {/* Forgot password link */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />
        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>
      </div>

      {/* Submit button */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>

      {/* Registration link */}
      <div className="text-gray-500 text-center fw-semibold fs-6">
        Not a Member yet?{" "}
        <Link to="/auth/registration" className="link-primary">
          Sign up
        </Link>
      </div>
    </form>
  );
}