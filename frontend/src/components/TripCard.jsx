import moment from "moment";
import { deleteTrip } from "../apiCalls";
import EditTrip from "./EditTrip";

function TripCard({
	id,
	name,
	description,
	destination,
	startDate,
	endDate,
	userId,
	image,
	budget,
	user,
}) {
	const seed = Math.round(Math.random() * 100);
	const _deleteTrip = async () => {
		await deleteTrip(id);
		window.location.reload();
	};

	if (!id) return;
	return (
		<>
			<div className="card lg:card-side bg-base-100 shadow-xl">
				<figure>
					{isURL(image) && <img src={image} alt={name} />}
					{!isURL(image) && (
						<img
							src={`https://picsum.photos/seed/${seed}/300/380`}
							alt="Album"
						/>
					)}
				</figure>
				<div className="card-body">
					<h2 className="text-primary font-bold text-3xl">{name}</h2>
					<p>
						<b>Description: </b>
						{description}
					</p>
					<p>
						<b>Destination: </b>
						{destination}
					</p>
					<p>
						<b>StartDate: </b>
						{moment(startDate).format("ll")}
					</p>
					<p>
						<b>EndDate: </b>
						{moment(endDate).format("ll")}
					</p>
					<p>
						<b>UserId: </b>
						{userId}
					</p>
					<p>
						<b>Budget: </b>
						{budget}
					</p>
					<p>
						<b>Id: </b>
						{id}
					</p>
					<div className="card-actions justify-end">
						<label htmlFor={id} className="btn btn-secondary">
							Edit Trip
						</label>
						<label htmlFor={id + "delete"} className="btn btn-error">
							Delete Trip
						</label>
					</div>
				</div>
			</div>

			<input type="checkbox" id={id} className="modal-toggle" />
			<label htmlFor={id} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<EditTrip
						user={user}
						props={{
							id,
							name,
							description,
							destination,
							startDate,
							endDate,
							userId,
							image,
							budget,
						}}
					/>
				</label>
			</label>
			<input type="checkbox" id={id + "delete"} className="modal-toggle" />
			<label htmlFor={id + "delete"} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<div className="modal-body">
						<p>Are you sure you want to delete this trip?</p>
						<div className="modal-actions">
							<button
								onClick={_deleteTrip}
								className="m-2 ml-auto btn btn-error"
							>
								Delete Trip
							</button>
						</div>
					</div>
				</label>
			</label>
		</>
	);
}

function isURL(str) {
	if (!str) return false;
	var pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(str);
}

export default TripCard;
