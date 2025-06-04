import { useNavigate } from 'react-router-dom';
// import { StaffMember } from '../../types'; // Define your types
import {Card2} from '../../../../_metronic/partials/content/cards/Card2'
import {IconUserModel} from '../../profile/ProfileModels'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  ListsWidget9,
  MixedWidget3,
  MixedWidget8,
  StatisticsWidget4,
  TablesWidget5,
  TablesWidget9,
} from '../../../../_metronic/partials/widgets'

export const StaffHR = () => {
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

      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <StatisticsWidget4
            className='card-xxl-stretch-50 mb-5 mb-xl-8'
            svgIcon='element-11'
            color='danger'
            description='Weekly Income'
            change='750$'
          />

          <StatisticsWidget4
            className='card-xxl-stretch-50 mb-xl-8'
            svgIcon='basket'
            color='success'
            description='Sales Change'
            change='+259'
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xxl-4'>
          <ListsWidget9 className='card-xxl-stretch mb-xl-8' />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xxl-4'>
          <ListsWidget4 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}
      

     

      
    </>
  )
};
