// src/app/modules/profile/ProfileHeader.tsx
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useAuth} from '../auth'

const ProfileHeader: React.FC = () => {
  const location = useLocation()
  const {currentUser} = useAuth()
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img 
                src={currentUser?.avatar ? toAbsoluteUrl(currentUser.avatar) : toAbsoluteUrl('/media/avatars/300-1.jpg')} 
                alt={currentUser?.fullName || 'User'} 
              />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <span className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {currentUser?.fullName || 'Loading...'}
                  </span>
                  {currentUser?.role === 'admin' && (
                    <a href='#'>
                      <KTIcon iconName='verify' className='fs-1 text-primary' />
                    </a>
                  )}
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <span className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'>
                    <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                    {currentUser?.position || 'User'}
                  </span>
                  <span className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'>
                    <KTIcon iconName='geolocation' className='fs-4 me-1' />
                    Member since {currentUser ? new Date(currentUser.createdAt).getFullYear() : ''}
                  </span>
                  <span className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'>
                    <KTIcon iconName='sms' className='fs-4 me-1' />
                    {currentUser?.email || 'loading...'}
                  </span>
              
                </div>
              </div>

              <div className='d-flex my-4'>
                <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTIcon iconName='check' className='fs-3 d-none' />
                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-500'>Earnings</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-500'>Projects</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-500'>Success Rate</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-500'>Profile Completion</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/overview' && 'active')
                }
                to='/crafted/pages/profile/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/projects' && 'active')
                }
                to='/crafted/pages/profile/projects'
              >
                Projects
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/campaigns' && 'active')
                }
                to='/crafted/pages/profile/campaigns'
              >
                Campaigns
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/documents' && 'active')
                }
                to='/crafted/pages/profile/documents'
              >
                Documents
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/connections' && 'active')
                }
                to='/crafted/pages/profile/connections'
              >
                Connections
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}