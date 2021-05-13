import React from 'react';


import {
Nav,
NavLink,
Bars,
NavMenu,
// NavBtn,
// NavBtnLink,
} from './NavbarElements';

const BHome = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/farmerHome' activeStyle>
			FarmerHome
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


export default BHome