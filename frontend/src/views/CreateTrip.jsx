import { useEffect, useState } from "react";
import { Country, City } from "country-state-city";
import { v4 } from "uuid";
import { addTrip } from "../apiCalls";
import { useNavigate } from "react-router-dom";

function CreateTrip({ user }) {
	const countries = Country.getAllCountries();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [image, setImage] = useState("");
	const [budget, setBudget] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [cities, setCities] = useState("");
	useEffect(() => {
		const cities = City.getCitiesOfCountry(country);
		setCities(cities);
	}, [country]);
	const submit = async (e) => {
		e.preventDefault();
		const data = {
			id: v4(),
			name,
			description,
			startDate,
			endDate,
			image,
			budget: parseInt(budget),
			destination: `${city}, ${Country.getCountryByCode(country).name}`,
			userId: user.Id,
		};
		await addTrip(data);
		window.location.replace("/all-trips");
	};
	return (
		<div className="flex w-screen mt-12 items-center justify-center">
			<form
				className="flex flex-col gap-3 w-1/2 p-12 bg-gray-50 rounded-lg"
				onSubmit={submit}
			>
				<h1 className="text-primary font-bold">Create Trip</h1>
				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip name</span>
					</label>
					<input
						className="w-full  input input-primary"
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
						className="w-full  input input-primary"
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
						className="w-full input input-primary"
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
						className="w-full  input input-primary"
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
						className="w-full  input input-primary"
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
						className="w-full  input input-primary"
						type="number"
						id="Budget"
						placeholder="Budget"
						value={budget}
						onChange={(e) => setBudget(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label className="label text-primary font-bold">
						<span className="label-text">Trip destination country</span>
					</label>
					<select
						className="w-full  input input-primary"
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
				{country && (
					<div className="form-control">
						<label className="label text-primary font-bold">
							<span className="label-text">Trip destination city</span>
						</label>
						<select
							className="w-full  input input-primary"
							type="text"
							id="City"
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
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
					Create Trip
				</button>
			</form>
		</div>
	);
}

export default CreateTrip;
