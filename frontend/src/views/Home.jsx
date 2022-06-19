import { Link } from "react-router-dom";
function Home() {
	return (
		<>
			<h1 className="m-10 text-3xl font-bold">Welcome to Trip Manager</h1>
			<div className="p-8 flex gap-12">
				<Link className="btn btn-primary" to="/all-trips">
					View All trips
				</Link>
				<Link className="btn btn-primary" to="create-trip">
					Create a trip
				</Link>
			</div>
		</>
	);
}

export default Home;
