
import React from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'
import {useAuth} from '../../auth'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'

export function Overview() {
  const {currentUser} = useAuth()
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{currentUser?.fullName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>School</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>Keenthemes</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{currentUser?.phone || 'Not provided'}</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

          {['teacher', 'admin'].includes(currentUser?.role) && (
                  <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Professional Information</label>
                    <div className='col-lg-8'>
                      {currentUser?.position && (
                        <div className='d-flex align-items-center mb-2'>
                          <span className='fw-bolder fs-6 me-3'>Position:</span>
                          <span>{currentUser.position}</span>
                        </div>
                      )}
                      {currentUser.departments.length > 0 && (
                        <div className='d-flex align-items-center mb-2'>
                          <span className='fw-bolder fs-6 me-3'>Departments:</span>
                          <span>{currentUser.departments.join(', ')}</span>
                        </div>
                      )}
                      {currentUser.schools.length > 0 && (
                        <div className='d-flex align-items-center mb-2'>
                          <span className='fw-bolder fs-6 me-3'>School(s):</span>
                          <span>{currentUser.schools.join(', ')}</span>
                        </div>
                      )}
                      {currentUser?.formClass && (
                        <div className='d-flex align-items-center'>
                          <span className='fw-bolder fs-6 me-3'>Form Class:</span>
                          <span>{currentUser.formClass}</span>
                        </div>
                      )}
                      {currentUser?.house && (
                        <div className='d-flex align-items-center'>
                          <span className='fw-bolder fs-6 me-3'>House:</span>
                          <span>{currentUser.house}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Country
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{currentUser?.country}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Communication</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>Email, Phone</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Yes</span>
            </div>
          </div>

          <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>
    </>
  )
}
