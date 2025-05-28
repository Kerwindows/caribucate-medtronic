// src/app/modules/profile/components/Overview.tsx
import React from 'react'
import {useAuth} from '../../auth'
import {
  FeedsWidget2,
  FeedsWidget3,
  FeedsWidget4,
  FeedsWidget5,
  FeedsWidget6,
  ChartsWidget1,
  ListsWidget5,
  ListsWidget2,
} from '../../../../_metronic/partials/widgets'

export function Overview() {
  const {currentUser} = useAuth()

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-6'>
        <div className='card mb-5 mb-xl-8'>
          <div className='card-body'>
            <h3 className='card-title'>Personal Information</h3>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6'>{currentUser?.fullName}</span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Email</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6'>{currentUser?.email}</span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Phone</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6'>
                  {currentUser?.phone || 'Not provided'}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Account Created</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6'>
                  {currentUser ? new Date(currentUser.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
                      {/* // Add a section for professional information */}
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
      {currentUser?.formClass && (
        <div className='d-flex align-items-center'>
          <span className='fw-bolder fs-6 me-3'>Form Class:</span>
          <span>{currentUser.formClass}</span>
        </div>
      )}
    </div>
  </div>
)}
          </div>

        </div>

        <FeedsWidget2 className='mb-5 mb-xxl-8' />
        <FeedsWidget3 className='mb-5 mb-xxl-8' />
      </div>

      <div className='col-xl-6'>
        <ChartsWidget1 className='mb-5 mb-xxl-8' />
        <ListsWidget5 className='mb-5 mb-xxl-8' />
        <ListsWidget2 className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}