import { useEffect, useState } from "react";
import { getAllTrips } from "./apiCalls";
import Navbar from "./components/Navbar";
import AllTrips from "./views/AllTrips";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import CreateTrip from "./views/CreateTrip";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [trips, setTrips] = useState([]);
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("trip_manager_user_id")) {
			setUser((user) => ({
				Id: localStorage.getItem("trip_manager_user_id"),
				Name: localStorage.getItem("trip_manager_user_name"),
				Email: localStorage.getItem("trip_manager_user_email"),
			}));
			getAllTrips(user.Id).then((trips) => setTrips(trips));
			setIsLoggedIn(true);
		} else {
			navigate("/signin");
			setIsLoggedIn(false);
		}
		window.addEventListener("trip_manager_user_event", () => {
			if (localStorage.getItem("trip_manager_user_id")) {
				setIsLoggedIn(true);
				navigate("/");
			} else {
				navigate("/signin");
				setIsLoggedIn(false);
			}
		});
	}, [isLoggedIn]);
	return (
		<div className="text-xl">
			{isLoggedIn && (
				<>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/all-trips"
							element={<AllTrips user={user} trips={trips} />}
						/>
						<Route
							path="/create-new-trip"
							element={<CreateTrip user={user} />}
						/>
					</Routes>
				</>
			)}
			{!isLoggedIn && (
				<>
					<Routes>
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<Signin />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
