import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.scss'
import ApiTypes from './pages/ApiTypes/ApiTypes'

export default function App() {


	return (
		<>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" />
					<Route path="/apitypes" element={<ApiTypes />} />
				</Routes>
			</BrowserRouter>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
		</>
	)
}