import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

export default function Nav() {


	return (
		<nav className='nav-container'>
			<ul className='nav'>
				<li className='nav__item'>
					<NavLink to="/" className='nav__item-link'>
						Home
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to="/apitypes" className='nav__item-link'>
						API Types
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to="/p3" className='nav__item-link'>
						P3
					</NavLink>
				</li>
			</ul>
		</nav >
	)
}