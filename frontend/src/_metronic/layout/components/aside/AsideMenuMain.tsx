import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      {/* Top-Level Single Links */}
      <AsideMenuItem
        to='/dashboard'
        icon='color-swatch'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/announcements'
        icon='technology'
        title='Announcements'
        fontIcon='bi-app-indicator'
      />



      {/* Academics Section */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Academics</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/academics/calendar'
        title='Calendar'
        icon='calendar-8'
        fontIcon='bi-calendar'
      >
        <AsideMenuItem to='/academics/calendar/events' title='Events' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/timetable'
        title='Timetable'
        icon='time'
        fontIcon='bi-clock'
      >
        <AsideMenuItem to='/academics/timetable/v1' title='Timetable v1' hasBullet={true} />
        <AsideMenuItem to='/academics/timetable/v2' title='Timetable v2' hasBullet={true} />
        <AsideMenuItem to='/academics/timetable/cycles' title='Set Cycles' hasBullet={true} />
        <AsideMenuItem to='/academics/timetable/periods' title='Set Periods' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/students'
        title='Class Management'
        icon='time'
        fontIcon='bi-clock'
      >
        <AsideMenuItem to='/academics/students/classrooms' title='Classrooms' hasBullet={true} />
        <AsideMenuItem to='/academics/students/assignment' title='Class Assignment' hasBullet={true} />
        <AsideMenuItem to='/academics/students/rollcall' title='Ministry Roll Call' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/courses'
        title='Courses & Grades'
        icon='book'
        fontIcon='bi-book'
      >
        <AsideMenuItem to='/academics/courses/manage' title='Manage Courses' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/grades' title='Manage Grades' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/view' title='View Courses' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/subjects' title='Add Subjects' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/mastersheets' title='Master Sheets' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/reports' title='Report Settings' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/grading' title='Grading Scale' hasBullet={true} />
        <AsideMenuItem to='/academics/courses/analytics' title='Performance Analytics' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/exams'
        title='Online Exams'
        icon='book'
        fontIcon='bi-book'
      >
        <AsideMenuItem to='/academics/exams/add' title='Add Exam' hasBullet={true} />
        <AsideMenuItem to='/academics/exams/results' title='Exam Results' hasBullet={true} />
        <AsideMenuItem to='/academics/exams/analytics' title='Exam Analytics' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* People Management Section */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>People Management</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/people/staff'
        title='Staff'
        icon='profile-circle'
        fontIcon='bi-person-badge'
      >
        <AsideMenuItem to='/people/staff/view' title='View Staff' hasBullet={true} />
        <AsideMenuItem to='/people/staff/history' title='Staff History' hasBullet={true} />
        <AsideMenuItem to='/people/staff/hr' title='Human Resources' hasBullet={true} />
        <AsideMenuItem to='/people/staff/add' title='Add Staff' hasBullet={true} />
        <AsideMenuItem to='/people/staff/edit' title='Edit Staff' hasBullet={true} />
        <AsideMenuItem to='/people/staff/teacher-attendance' title='Teacher Attendance' hasBullet={true} />
        <AsideMenuItem to='/people/staff/auxiliary-attendance' title='Auxiliary Attendance' hasBullet={true} />
        <AsideMenuItem to='/people/staff/roles' title='Roles & Permissions' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/students'
        title='Students'
        icon='people'
        fontIcon='bi-people'
      >
        <AsideMenuItem to='/academics/students/profiles' title='Student Profiles' hasBullet={true} />
        <AsideMenuItem to='/academics/students/history' title='Registration History' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/academics/parents'
        title='Parents'
        icon='user'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/academics/parents/view' title='View Parents' hasBullet={true} />
        <AsideMenuItem to='/academics/parents/add' title='Add Parent' hasBullet={true} />
        <AsideMenuItem to='/academics/parents/edit' title='Edit Parents' hasBullet={true} />

      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/people/visitors'
        title='Visitors'
        icon='user-tick'
        fontIcon='bi-person-check'
      >
        <AsideMenuItem to='/people/visitors/checkin' title='Onsite Check-In' hasBullet={true} />
        <AsideMenuItem to='/people/visitors/register' title='Visitor Registration' hasBullet={true} />
        <AsideMenuItem to='/people/visitors/history' title='History' hasBullet={true} />
        <AsideMenuItem to='/people/visitors/lookup' title='Lookup' hasBullet={true} />
        <AsideMenuItem to='/people/visitors/lastscan' title='Last Scan' hasBullet={true} />
        <AsideMenuItem to='/people/visitors/logs' title='Access Logs' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* Communications Section */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Communications</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/communications/ai'
        title='AI Planner'
        icon='android'
        fontIcon='bi-robot'
      >
        <AsideMenuItem to='/communications/ai/text' title='Text Query' hasBullet={true} />
        <AsideMenuItem to='/communications/ai/planner' title='Content Planner' hasBullet={true} />

      </AsideMenuItemWithSub>

      <AsideMenuItem
        to='/communications/messaging'
        icon='message-notif'
        title='Messaging Center'
        fontIcon='bi-chat-left-text'
      />
      <AsideMenuItem
        to='/communications/templates'
        icon='document'
        title='Email Templates'
        fontIcon='bi-envelope'
      />
      <AsideMenuItem
        to='/communications/broadcasts'
        icon='phone'
        title='Broadcasts'
        fontIcon='bi-megaphone'
      />
      {/* Original Metronic Demo Pages (Keep at bottom) */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Demo Pages</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages/profile'
        title='My Profile'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/pages/wizards'
        title='Wizards'
        icon='magic'
        fontIcon='bi-stars'
      >
        <AsideMenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
        <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        icon='cross-circle'
        fontIcon='bi-exclamation'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-11'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='shield-tick'
        title='User management'
        fontIcon='bi-layers'
      />

      {/* Bottom Single Links */}
      <AsideMenuItem
        to='/help'
        icon='information'
        title='Help Center'
        fontIcon='bi-question-circle'
      />
      <AsideMenuItem
        to='/logout'
        icon='exit'
        title='Logout'
        fontIcon='bi-box-arrow-right'
      />
    </>
  )
}