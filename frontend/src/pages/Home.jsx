import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../Components/UserDashboard'
import OwnerDashboard from '../Components/OwnerDashboard'
import DeliveryBoyDashboard from '../Components/DeliveryBoyDashboard'
import Navbar from '../Components/Navbar'

const Home = () => {
 const {userData} =  useSelector(state=>state.user)
  return (
    <div className='w-[100vw] min-h-[100vh] flex flex-col items-center bg-[#fff9f6]'>
      {userData?.role === 'user' && <UserDashboard/>}
      {userData?.role === 'owner' && <OwnerDashboard/>}
      {userData?.role === 'deliveryBoy' && <DeliveryBoyDashboard/>}
      
    </div>
  )
}

export default Home