import React, { useState } from "react";
import { login } from "../apiCalls";
import { useNavigate } from "react-router-dom";
function Signin() {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const navigate = useNavigate();
	async function signIn() {
		await login(Email, Password);
	}
	return (
		<div className="bg-base-300 h-screen w-screen">
			<div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
				<div
					className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-base-100 sm:mx-0"
					style={{ height: "500px" }}
				>
					<div className="flex flex-col w-full md:w-1/2 p-4">
						<div className="flex flex-col flex-1 justify-center mb-8">
							<h1 className="text-4xl text-center font-thin">
								Welcome Back to Trip Manager
							</h1>
							<div className="w-full mt-4">
								<form
									className="form-horizontal w-3/4 mx-auto"
									onSubmit={(e) => {
										e.preventDefault();
										signIn();
									}}
								>
									<div className="flex flex-col mt-4">
										<input
											id="email"
											type="text"
											className="input input-primary"
											name="email"
											value={Email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Email"
										/>
									</div>
									<div className="flex flex-col mt-4">
										<input
											id="password"
											type="password"
											className="input input-primary"
											name="password"
											required
											placeholder="Password"
											value={Password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>

									<div className="flex flex-col mt-8">
										<button type="submit" className="btn btn-primary">
											Login
										</button>
									</div>
								</form>
								<div className="text-center mt-4">
									<div className="no-underline hover:underline text-blue-dark text-xs">
										Don't have an account?{" "}
										<button
											className="underline"
											onClick={() => navigate("/signup")}
										>
											Signup
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className="hidden md:block md:w-1/2 rounded-r-lg"
						style={{
							background:
								"url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
							backgroundSize: "cover",
							backgroundPosition: "center center",
						}}
					></div>
				</div>
			</div>
		</div>
	);
}

export default Signin;
