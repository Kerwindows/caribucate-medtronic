import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPassword } from '../core/_requests';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(50, 'Maximum 50 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (!token) {
        setStatus('Invalid reset token');
        return;
      }

      setLoading(true);
      setHasErrors(undefined);

      try {
        await resetPassword(token, values.password);
        setHasErrors(false);
        setTimeout(() => navigate('/auth/login'), 2000);
      } catch (error) {
        setHasErrors(true);
        setStatus('Failed to reset password. The token may be invalid or expired.');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  if (!token) {
    return (
      <div className='card'>
        <div className='card-body p-10 p-lg-15'>
          <div className='text-center mb-10'>
            <h1 className='text-gray-900 fw-bolder mb-3'>Invalid Token</h1>
            <div className='text-gray-500 fw-semibold fs-6'>
              The password reset link is invalid or has expired.
            </div>
          </div>
          <div className='d-flex flex-center'>
            <Link to='/auth/forgot-password' className='btn btn-primary'>
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Reset Password</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Enter your new password below.
        </div>
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            {formik.status || 'Sorry, looks like there are some errors detected, please try again.'}
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-success p-8 rounded'>
          <div className='text-success'>Password reset successfully! Redirecting to login...</div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>New Password</label>
        <input
          type='password'
          placeholder=''
          autoComplete='new-password'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.password && formik.errors.password},
            {'is-valid': formik.touched.password && !formik.errors.password}
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder=''
          autoComplete='new-password'
          {...formik.getFieldProps('confirmPassword')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword},
            {'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword}
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button
          type='submit'
          className='btn btn-primary me-4'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          <span className='indicator-label'>Reset Password</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            className='btn btn-light'
            disabled={formik.isSubmitting}
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}