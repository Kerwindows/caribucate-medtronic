// src/app/modules/profile/SchoolHeader.tsx
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'

type UserCounts = {
  user_population: number
  user_absent: number
  user_on_site: number
}

type UserInfo = {
  first_name: string
  last_name: string
  image: string | null
}

type DisplayStrings = {
  title: string
  badge: string
  description: string
  add_user: string
}

type Props = {
  user_counts: UserCounts
  user_info: UserInfo[]
  display_strings: DisplayStrings
}

const SchoolHeader: React.FC<Props> = ({user_counts, user_info, display_strings}) => {
  const location = useLocation()
  const classes = ['warning', 'primary', 'info', 'dark']

  return (
    <div className='card mb-8'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
          <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4'>
            <img className='mw-50px mw-lg-75px' src={toAbsoluteUrl('/media/logos/caribucate-logo.svg')} alt='image' />
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-1'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                    {display_strings.title}
                  </a>
                  <span className='badge badge-light-success me-auto'>{display_strings.badge}</span>
                </div>
                <div className='d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400'>
                  {display_strings.description}
                </div>
              </div>

              <div className='d-flex mb-4'>
                <a
                  href='#'
                  className='btn btn-sm btn-bg-light btn-active-color-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_staff'
                >
                  {display_strings.add_user}
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_target'
                >
                  Add Target
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                  >
                    <KTIcon iconName='dots-horizontal' className='fs-2' />
                  </button>
                  <Dropdown1 />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap justify-content-start'>
              <div className='d-flex flex-wrap'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <div className='fs-4 fw-bold'>{user_counts.user_population}</div>
                  </div>
                  <div className='fw-semibold fs-6 text-gray-400'>Population</div>
                </div>

                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                    <div className='fs-4 fw-bold'>{user_counts.user_absent}</div>
                  </div>
                  <div className='fw-semibold fs-6 text-gray-400'>Absent</div>
                </div>

                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                    <div className='fs-4 fw-bold'>{user_counts.user_on_site}</div>
                  </div>
                  <div className='fw-semibold fs-6 text-gray-400'>On-site</div>
                </div>
              </div>

              <div className='symbol-group symbol-hover mb-3'>
                {user_info.map((person, index) => {
                  const randomClass = classes[Math.floor(Math.random() * classes.length)]
                  return (
                    <div
                      key={index}
                      className='symbol symbol-35px symbol-circle'
                      data-bs-toggle='tooltip'
                      title={`${person.first_name} ${person.last_name}`}
                    >
                      {!person.image ? (
                        <span
                          className={`symbol-label bg-${randomClass} text-inverse-${randomClass} fw-bold`}
                        >
                          {person.first_name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <img src={person.image} alt='Pic' />
                      )}
                    </div>
                  )
                })}
                {user_counts.user_population > 10 && (
                  <a href='#' className='symbol symbol-35px symbol-circle'>
                    <span className='symbol-label bg-dark text-inverse-dark fs-8 fw-bold'>
                      +{user_counts.user_population - 10}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='separator'></div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
            <li className='nav-item'>
              <Link
                className={`nav-link text-active-primary py-5 me-6 ${
                  location.pathname.includes('/view') ? 'active' : ''
                }`}
                to='/people/staff/view'
              >
                List
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-active-primary py-5 me-6 ${
                  location.pathname.includes('/history') ? 'active' : ''
                }`}
                to='/people/staff/history'
              >
                History
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-active-primary py-5 me-6 ${
                  location.pathname.includes('/hr') ? 'active' : ''
                }`}
                to='/people/staff/hr'
              >
                HR
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-active-primary py-5 me-6 ${
                  location.pathname.includes('/attendance') ? 'active' : ''
                }`}
                to='/people/staff/attendance'
              >
                Attendance
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-active-primary py-5 me-6 ${
                  location.pathname.includes('/roles-permissions') ? 'active' : ''
                }`}
                to='/people/staff/roles'
              >
                Roles & Permissions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {SchoolHeader}