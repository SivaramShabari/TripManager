import { useEffect, useState } from "react";
import { Country, City } from "country-state-city";
import { v4 } from "uuid";
import { editTrip } from "../apiCalls";
import moment from "moment";

function EditTrip({ user, props }) {
	const countries = Country.getAllCountries();
	const _startDate = moment(props.startDate).format("YYYY-MM-DD");
	const _endDate = moment(props.endDate).format("YYYY-MM-DD");
	const [name, setName] = useState(props.name);
	const [description, setDescription] = useState(props.description);
	const [startDate, setStartDate] = useState(_startDate);
	const [endDate, setEndDate] = useState(_endDate);
	const [image, setImage] = useState(props.image);
	const [budget, setBudget] = useState(props.budget);
	const [country, setCountry] = useState();
	const [city, setCity] = useState();
	const [cities, setCities] = useState("");
	const [destination, setDestination] = useState(props.destination);
	useEffect(() => {
		const cities = City.getCitiesOfCountry(country) || [];
		setCities(cities);
	}, [country]);
	const submit = async (e) => {
		e.preventDefault();
		const data = {
			id: props.id,
			name,
			description,
			startDate,
			endDate,
			image,
			budget: parseInt(budget),
			destination,
			userId: user.Id,
		};
		await editTrip(data);
		window.location.reload();
	};
	return (
		<div className="flex items-center justify-center">
			<form
				className="flex flex-col gap-1 bg-gray-50 rounded-lg"
				onSubmit={submit}
			>
				<h1 className="text-primary font-bold">Edit Trip</h1>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip name</span>
					</label>
					<input
						className="w-full  input input-sm input-primary"
						type="text"
						id="Name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip description</span>
					</label>
					<input
						className="w-full  input input-sm input-primary"
						type="text"
						id="Description"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip start date</span>
					</label>
					<input
						className="w-full input input-sm input-primary"
						type="date"
						id="StartDate"
						placeholder="Start Date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip end date</span>
					</label>
					<input
						className="w-full  input input-sm input-primary"
						type="date"
						id="EndDate"
						placeholder="End Date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip image</span>
					</label>
					<input
						className="w-full  input input-sm input-primary"
						type="text"
						id="Image"
						placeholder="Image"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip budget</span>
					</label>
					<input
						className="w-full  input input-sm input-primary"
						type="number"
						id="Budget"
						placeholder="Budget"
						value={budget}
						onChange={(e) => setBudget(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip Destination</span>
					</label>
					<div className="input input-sm input-primary">{destination}</div>
				</div>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip destination country</span>
					</label>
					<select
						className="w-full  input input-sm input-primary"
						type="text"
						id="Country"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					>
						{countries.map((country) => (
							<option key={country.isoCode} value={country.isoCode}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				{(country || city) && (
					<div className="form-control">
						<label className="label text-primary font-bold">
							<span className="label-text">Trip destination city</span>
						</label>
						<select
							className="w-full  input input-sm input-primary"
							type="text"
							id="City"
							placeholder="City"
							value={city}
							onChange={(e) => {
								setCity(e.target.value);
								setDestination(
									`${e.target.value}, ${Country.getCountryByCode(country).name}`
								);
							}}
						>
							{cities.map((city, i) => (
								<option key={i} value={city.name}>
									{city.name}
								</option>
							))}
						</select>
					</div>
				)}
				<button type="submit" className="btn btn-primary">
					Edit changes in Trip
				</button>
			</form>
		</div>
	);
}

export default EditTrip;
