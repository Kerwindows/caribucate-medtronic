import React, {useState, useEffect} from 'react';
import {useAuth} from '../../../../app/modules/auth';
import {KTSVG} from '../../../../_metronic/helpers';
import {getUsers} from '../../../../app/modules/auth/core/_requests';
import {UserModel} from '../../../../app/modules/auth/core/_models';

const UsersTable: React.FC = () => {
  const {currentUser, auth} = useAuth();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.data.status === 'success') {
          setUsers(response.data.data.users);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      // You'll need to implement this endpoint in your backend
      // await axios.patch(`${API_URL}/users/${userId}/status`, {status: newStatus}, {
      //   headers: { Authorization: `Bearer ${auth?.api_token}` }
      // });
      setUsers(users.map(user => 
        user.id === userId ? {...user, status: newStatus} : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      // You'll need to implement this endpoint in your backend
      // await axios.delete(`${API_URL}/users/${userId}`, {
      //   headers: { Authorization: `Bearer ${auth?.api_token}` }
      // });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center py-20'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      {/* Header */}
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          <div className='d-flex align-items-center position-relative my-1'>
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-1 position-absolute ms-6'
            />
            <input
              type='text'
              className='form-control form-control-solid w-250px ps-15'
              placeholder='Search users...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className='card-body pt-0'>
        <div className='table-responsive'>
          <table className='table align-middle table-row-dashed table-row-gray-300 gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>User</th>
                <th className='min-w-150px'>Role</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-100px'>Last Login</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px me-5'>
                          <img
                            src={user.avatar || '/media/avatars/blank.png'}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                            {user.firstName} {user.lastName}
                          </a>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-light-${user.role === 'superadmin' ? 'danger' : user.role === 'admin' ? 'warning' : 'primary'} fs-7 fw-semibold`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-light-${user.status === 'active' ? 'success' : user.status === 'inactive' ? 'danger' : 'warning'} fs-7 fw-semibold`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className='text-muted fw-semibold fs-7'>
                        {user.lastLogin || 'Never'}
                      </span>
                    </td>
                    <td className='text-end'>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => console.log('Edit', user.id)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/art/art005.svg'
                          className='svg-icon-3'
                        />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center py-10'>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='d-flex flex-stack flex-wrap pt-10'>
            <div className='fs-6 fw-semibold text-gray-700'>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
              {filteredUsers.length} entries
            </div>
            <ul className='pagination'>
              <li className={`page-item previous ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className='page-link'
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <i className='previous'></i>
                </button>
              </li>
              {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                  <button className='page-link' onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                <button
                  className='page-link'
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <i className='next'></i>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export {UsersTable};