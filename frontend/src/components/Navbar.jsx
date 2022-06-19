import React from "react";
import { clearLocalStorage } from "../apiCalls";
import { Link } from "react-router-dom";
function Navbar() {
	return (
		<div className="navbar bg-base-100 shadow-xl">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex="0" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex="0"
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/all-trips">All trips</Link>
						</li>

						<li>
							<Link to="/create-new-trip">Create New Trip</Link>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost normal-case text-xl">Trip Manager</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal p-0">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/all-trips">All trips</Link>
					</li>

					<li>
						<Link to="/create-new-trip">Create New Trip</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<button className="btn btn-outline" onClick={() => clearLocalStorage()}>
					Signout
				</button>
			</div>
		</div>
	);
}

export default Navbar;
