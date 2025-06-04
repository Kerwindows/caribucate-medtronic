import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { StaffMember } from '../../types'; // Define your types

export const StaffRoles = () => {

    return (
        <>
            <div className="row g-5">
                
                <div className="col-lg-4">
                    <div className="card card-custom card-stretch mb-5">
                        <div className="card-header">
                            <h3 className="card-title">Roles</h3>
                        </div>
                        <div className="card-body">
                            Lorem Ipsum is simply dummy text
                        </div>
                        <div className="card-footer">
                            Footer
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card card-custom card-stretch mb-5">
                        <div className="card-header">
                            <h3 className="card-title">Permissions</h3>
                        </div>
                        <div className="card-body">
                            Lorem Ipsum is simply dummy text
                        </div>
                        <div className="card-footer">
                            Footer
                        </div>
                    </div>
                </div>
            </div>
        </>



    );
};