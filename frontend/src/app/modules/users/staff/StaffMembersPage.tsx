import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { StaffMember } from '../../types'; // Define your types

export const StaffMembersPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    position: 'all',
    institution: 'all'
  });

  // Sample data - replace with your API data
  const staffData = {
    total_results: 24,
    users_found: [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email_address: 'john@example.com',
        position: 'Teacher',
        department: 'Mathematics',
        image: null,
        on_site: true
      }
    ],
    positions: [
      { staff_position: 'Teacher' },
      { staff_position: 'Administrator' }
    ],
    institutions: [
      { id: 1, name: 'Main Campus' },
      { id: 2, name: 'North Campus' }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/view-staff/1/${filters.institution}/${filters.position}/${searchQuery}`);
  };

  const handleFilterChange = (filterType: 'position' | 'institution', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    navigate(`/view-staff/1/${filterType === 'institution' ? value : filters.institution}/${filterType === 'position' ? value : filters.position}/${searchQuery}`);
  };

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/* Navbar would be a separate component */}
      
      <div className="flex-lg-row-fluid">
        {/* Toolbar */}
        <div className="d-flex flex-wrap flex-stack pb-7">
          <div className="d-flex flex-wrap align-items-center my-1">
            <h3 className="fw-bold me-5 my-1">Users ({staffData.total_results})</h3>
            
            <div className="d-flex align-items-center position-relative my-1">
              <form onSubmit={handleSearch} style={{ margin: 0 }}>
                <button className="m-0 p-0 border-0 bg-transparent">
                  <i className="ki-duotone ki-magnifier fs-3 mt-3 position-absolute ms-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </button>
                <input 
                  type="text" 
                  className="form-control form-control-sm form-control-solid w-150px ps-10" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="d-flex flex-wrap my-1">
            <ul className="nav nav-pills me-6 mb-2 mb-sm-0">
              <li className="nav-item m-0">
                <button 
                  className={`btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                >
                  <i className="ki-duotone ki-element-plus fs-2">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                  </i>
                </button>
              </li>
              <li className="nav-item m-0">
                <button 
                  className={`btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <i className="ki-duotone ki-row-horizontal fs-2">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </button>
              </li>
            </ul>

            <div className="d-flex my-0">
              <select 
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="form-select form-select-sm form-select-solid w-150px me-5"
              >
                <option value="all">Filter by position</option>
                {staffData.positions.map((pos) => (
                  <option key={pos.staff_position} value={pos.staff_position}>
                    {pos.staff_position}
                  </option>
                ))}
              </select>

              <select 
                value={filters.institution}
                onChange={(e) => handleFilterChange('institution', e.target.value)}
                className="form-select form-select-sm form-select-solid w-150px me-5"
              >
                <option value="all">Filter by institution</option>
                {staffData.institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'card' ? (
          <div className="row g-6 g-xl-9">
            {staffData.users_found.length === 0 ? (
              <div className="col-md-4 col-xxl-3">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column pt-12 p-9">
                    <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
                      No user found
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              staffData.users_found.map((staff) => (
                <div key={staff.id} className="col-md-4 col-xxl-3">
                  <div className="card">
                    <div className="card-body d-flex flex-center flex-column pt-12 p-9">
                      <div className="symbol symbol-65px symbol-circle mb-5 position-relative">
                        {staff.image ? (
                          <img src={staff.image} alt="Staff" className="symbol-label" />
                        ) : (
                          <span className="symbol-label bg-primary text-inverse-primary fw-bold">
                            {staff.first_name.charAt(0).toUpperCase()}
                          </span>
                        )}
                        {staff.on_site && (
                          <div 
                            className="bg-success position-absolute border border-4 border-body h-15px w-15px rounded-circle translate-middle start-100 top-100 ms-n3 mt-n3"
                            title="On site"
                          />
                        )}
                      </div>
                      
                      <a 
                        href={`/user-profile/${staff.id}/overview`} 
                        className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0"
                      >
                        {staff.first_name} {staff.last_name}
                      </a>
                      
                      <div className="fw-semibold text-gray-400 mb-6">
                        {staff.position}
                      </div>
                      
                      <div className="d-flex flex-center flex-wrap">
                        <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
                          <div className="text-center fw-semibold text-gray-400">
                            {staff.department}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="card card-flush">
            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bold">
                  <thead className="fs-7 text-gray-400 text-uppercase">
                    <tr>
                      <th className="min-w-250px">Staff</th>
                      <th className="min-w-150px">Department</th>
                      <th className="min-w-150px">Position</th>
                      <th className="min-w-90px">Status</th>
                      <th className="min-w-50px text-end">Details</th>
                    </tr>
                  </thead>
                  <tbody className="fs-6">
                    {staffData.users_found.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      staffData.users_found.map((staff) => (
                        <tr key={staff.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="me-5 position-relative">
                                <div className="symbol symbol-35px symbol-circle">
                                  {staff.image ? (
                                    <img src={staff.image} alt="Staff" className="symbol-label" />
                                  ) : (
                                    <span className="symbol-label bg-primary text-inverse-primary fw-bold">
                                      {staff.first_name.charAt(0).toUpperCase()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <a 
                                  href={`/user-profile/${staff.id}/overview`} 
                                  className="mb-1 text-gray-800 text-hover-primary"
                                >
                                  {staff.first_name} {staff.last_name}
                                </a>
                                <div className="fw-semibold fs-6 text-gray-400">
                                  {staff.email_address}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{staff.department}</td>
                          <td>{staff.position}</td>
                          <td>
                            <span className={`badge fw-bold px-4 py-3 ${staff.on_site ? 'badge-light-success' : 'badge-light-warning'}`}>
                              {staff.on_site ? 'On site' : 'Off site'}
                            </span>
                          </td>
                          <td className="text-end">
                            <a 
                              href={`/user-profile/${staff.id}/overview`} 
                              className="btn btn-light btn-sm"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pagination would be a separate component */}
      </div>
    </div>
  );
};