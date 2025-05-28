import React, { useState } from "react";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import {
  IProfileDetails,
  profileDetailsInitValues as initialValues,
} from "../SettingsModel";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../../../auth";

const profileDetailsSchema = Yup.object().shape({
  fName: Yup.string().required("First name is required"),
  lName: Yup.string().required("Last name is required"),
  company: Yup.string().required("Company name is required"),
  contactPhone: Yup.string().required("Contact phone is required"),
  companySite: Yup.string().required("Company site is required"),
  country: Yup.string().required("Country is required"),
  language: Yup.string().required("Language is required"),
  timeZone: Yup.string().required("Time zone is required"),
  currency: Yup.string().required("Currency is required"),
});

const ProfileDetails: React.FC = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState<IProfileDetails>(initialValues);
  const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate);
    setData(updatedData);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        values.communications.email = data.communications.email;
        values.communications.phone = data.communications.phone;
        values.allowMarketing = data.allowMarketing;
        const updatedData = Object.assign(data, values);
        setData(updatedData);
        setLoading(false);
      }, 1000);
    },
  });


 return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer' role='button'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        <div className='card-body border-top p-9'>
          {/* Avatar */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
            <div className='col-lg-8'>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <div
                  className='image-input-wrapper w-125px h-125px'
                  style={{backgroundImage: `url(${toAbsoluteUrl(currentUser?.avatar) || '/media/avatars/blank.png'})`}}
                ></div>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='First name'
                    {...formik.getFieldProps('fName')}
                  />
                  {formik.touched.fName && formik.errors.fName && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.fName}</div>
                    </div>
                  )}
                </div>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Last name'
                    {...formik.getFieldProps('lName')}
                  />
                  {formik.touched.lName && formik.errors.lName && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.lName}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* School (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>School</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={currentUser?.schools?.join(', ') || 'Not specified'}
                readOnly
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Contact Phone</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='tel'
                className='form-control form-control-lg form-control-solid'
                placeholder='Phone number'
                {...formik.getFieldProps('contactPhone')}
              />
              {formik.touched.contactPhone && formik.errors.contactPhone && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.contactPhone}</div>
                </div>
              )}
            </div>
          </div>

          {/* Verified (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Verified</label>
            <div className='col-lg-8 fv-row'>
              <span className='badge badge-light-success'>Verified</span>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className='separator separator-dashed my-5'></div>
          <h4 className='text-gray-800 mb-5'>Professional Information</h4>

          {/* Position (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Position</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={currentUser?.position || 'Not specified'}
                readOnly
              />
            </div>
          </div>

          {/* Departments (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Departments</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={currentUser?.departments?.join(', ') || 'Not specified'}
                readOnly
              />
            </div>
          </div>

          {/* Schools (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Schools</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={currentUser?.schools?.join(', ') || 'Not specified'}
                readOnly
              />
            </div>
          </div>

          {/* House (Read-only) */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>House</label>
            <div className='col-lg-8 fv-row'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={currentUser?.house || 'Not specified'}
                readOnly
              />
            </div>
          </div>

          {/* Country */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Country</label>
            <div className='col-lg-8 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg fw-bold'
                {...formik.getFieldProps('country')}
              >
                <option value=''>Select a Country...</option>
                <option value='TT' selected={currentUser?.country === 'Trinidad and Tobago'}>
                  Trinidad and Tobago
                </option>
                {/* Other country options... */}
              </select>
            </div>
          </div>

          {/* Communication Section */}
          <div className='separator separator-dashed my-5'></div>
          <h4 className='text-gray-800 mb-5'>Communication</h4>

          {/* Communication Preferences */}
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Preferences</label>
            <div className='col-lg-8'>
              <div className='d-flex align-items-center mt-3'>
                <label className='form-check form-check-inline form-check-solid me-5'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    defaultChecked
                    readOnly
                  />
                  <span className='fw-bold ps-2 fs-6'>Email</span>
                </label>
                <label className='form-check form-check-inline form-check-solid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    defaultChecked
                    readOnly
                  />
                  <span className='fw-bold ps-2 fs-6'>Phone</span>
                </label>
              </div>
            </div>
          </div>

          {/* Allow Changes (Read-only) */}
          <div className='row mb-0'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>Allow Changes</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='badge badge-light-success'>Yes</span>
            </div>
          </div>
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {!loading && 'Save Changes'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
};

export { ProfileDetails };
