import axios from "axios";
import { apiEndpoint } from "./config";
import { v4 } from 'uuid';

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
}
async function getUser(Email) {
    try {
        const result = await axios(`${apiEndpoint}user/one/${Email}`, { method: "GET", headers });
        if (result.status === 500) alert("Server error");
        const user = result.data;
        return user;
    } catch (err) {
        alert("Get user error:", err);
    }
}

export async function login(Email, Password) {
    const user = await getUser(Email);
    if (user.password === Password) setLocalStorage(user);
    else alert("Invalid email or password");
}

export async function signup(Name, Email, Password) {
    try {
        const Id = v4();
        const data = {
            Id,
            Name,
            Email,
            Password
        };
        const result = await axios(apiEndpoint + "user/add", { method: "post", data, headers });
        if (result.status === 500) alert("Server error");
        const user = result.data;
        setLocalStorage(user);
    } catch (err) {
        alert("Create user error:", err);
    }
}

export async function getAllTrips(userId) {
    try {
        const result = await axios(apiEndpoint + "trip/all/" + userId, { method: "get", headers });
        if (result.status === 500) alert("Server error");
        const trips = result.data;
        return trips;
    } catch (err) {
        alert("Get all trips error:", err);
    }
}

export async function addTrip(trip) {
    try {
        const result = await axios(apiEndpoint + "trip", { data: trip, headers, method: "post" });
        if (result.status === 500) alert("Server error");
        const tripData = result.data;
        return tripData;
    } catch (err) {
        alert("Add trip error:", err);
    }
}

export async function editTrip(trip) {
    try {
        const result = await axios(apiEndpoint + "trip", { data: trip, headers, method: "put" });
        if (result.status === 500) alert("Server error");
        const tripData = result.data;
        return tripData;
    } catch (err) {
        alert("Edit trip error:", err);
        console.log("Error:", err);
    }
}

export async function deleteTrip(tripId) {
    try {
        const result = await axios(apiEndpoint + "trip/" + tripId, { headers, method: "delete" });
        if (result.status === 500) alert("Server error");
        const tripData = result.data;
        return tripData;
    } catch (err) {
        // alert("Delete trip error:", err);
        console.log(err);
    }
}

export function setLocalStorage(user) {
    localStorage.setItem("trip_manager_user_id", user.id);
    localStorage.setItem("trip_manager_user_name", user.name);
    localStorage.setItem("trip_manager_user_email", user.email);
    window.dispatchEvent(new Event("trip_manager_user_event"));
}

export function clearLocalStorage() {
    try {
        localStorage.removeItem("trip_manager_user_name");
        localStorage.removeItem("trip_manager_user_email");
        localStorage.removeItem("trip_manager_user_id");
    } catch (err) {
        console.log(err);
    }
    window.dispatchEvent(new Event("trip_manager_user_event"));
}
