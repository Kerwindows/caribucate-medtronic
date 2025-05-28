import { useEffect, useState } from 'react';
import { getUsers } from '../../../../app/modules/auth/core/_requests';
import { useAuth } from '../../../../app/modules/auth';



type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  position?: { name: string }; // API returns object
  departments: Array<{ name: string }>; // API returns objects
  schools: Array<{ name: string }>; // API returns objects
  created_at: string;
};

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { auth } = useAuth();

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        if (data.status === 'success') {
          setUsers(data.users); // Directly use the API structure
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  

  if (loading) return <div className="text-center py-5">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Users Management</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {users.length} users found
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-100px">Name</th>
                <th className="min-w-125px">Email</th>
                <th className="min-w-100px">Role</th>
                <th className="min-w-100px">Position</th>
                <th className="min-w-150px">Departments</th>
                <th className="min-w-150px">Schools</th>
                <th className="min-w-100px">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <span className="symbol-label bg-light-primary">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </span>
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="text-dark fw-bold">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark fw-bold d-block fs-6">
                      {user.email}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-light-${
                      user.role === 'admin' ? 'danger' : 
                      user.role === 'teacher' ? 'primary' : 'success'
                    } fs-7 fw-bold`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.position || '-'}</td>
                  <td>
  {user.departments && user.departments.length > 0 ? (
    user.departments.map((dept, index) => (
      <span key={index} className="badge badge-light-info fs-7 m-1">
        {dept}
      </span>
    ))
  ) : '-'}
</td>
                 <td>
  {user.schools && user.schools.length > 0 ? (
    user.schools.map((school, index) => (
      <span key={index} className="badge badge-light-success fs-7 m-1">
        {school}
      </span>
    ))
  ) : '-'}
</td>
                  <td className="text-end">
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}