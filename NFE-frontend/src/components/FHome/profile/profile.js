//import React from 'react';
  
// const Profile = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'Right',
//         alignItems: 'Right',
//         height: '100vh'
//       }}
//     >
//       <h1>Profile Page of individual farmer</h1>
//     </div>
//   );
// };

import React, {PropTypes} from 'react';
//import ProfileView from '../components/ProfileView';
//import {connect} from 'react-redux';


import {
Nav,
NavLink,
Bars,
NavMenu,
// NavBtn,
// NavBtnLink,
} from '../NavbarElements';

const Profile = () => {
	


return (
	
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/farmerHome' activeStyle>
			Home
		</NavLink>
		<NavLink to='/profile' activeStyle>
			Profile
		</NavLink>
		<NavLink to='/notification' activeStyle>
			Notification
		</NavLink>
		<NavLink to='/contract' activeStyle>
			Contract
		</NavLink>
		<NavLink to='/bidding' activeStyle>
			Bidding
		</NavLink>
		</NavMenu>
		
	</Nav>
	</>


);
};

  
export default Profile;