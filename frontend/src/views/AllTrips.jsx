import React from "react";
import TripCard from "../components/TripCard";

function AllTrips({ trips, user }) {
	return (
		<div className="flex flex-col gap-8 p-6">
			{trips.map((trip) => (
				<TripCard key={trip.id} user={user} {...trip} />
			))}
			{trips.length === 0 && (
				<div className="text-center">
					<h1 className="text-primary font-bold">No trips found</h1>
				</div>
			)}
		</div>
	);
}

export default AllTrips;
