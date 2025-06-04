import { useNavigate } from 'react-router-dom';
// import { StaffMember } from '../../types'; // Define your types
import {
    MixedWidget3,
    TablesWidget9,
} from '../../../../_metronic/partials/widgets'

export const StaffHistoryPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* begin::Row */}
            <div className='row gy-5 g-xl-8'>
                {/* begin::Col */}
                <div className='col-xxl-4'>
                    <MixedWidget3
                        className='card-xl-stretch mb-xl-8'
                        chartColor='primary'
                        chartHeight='250px'
                    />
                </div>
                {/* end::Col */}

                {/* begin::Col */}
                <div className='col-xxl-8'>
                    <TablesWidget9 className='card-xxl-stretch mb-5 mb-xl-8' />
                </div>
                {/* end::Col */}
            </div>
            {/* end::Row */}

        </>
    )
};
