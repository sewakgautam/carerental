import axios from "axios";
import { BACKEND_API } from "./const";

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error
);

// car bridge
export async function fetchCars() {
  const res = await axiosInstance.get("/api/Cars");
  return res;
}

export async function fetchOffers(jwt: any) {
  const res = await axiosInstance.get("/api/offers", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function postCars(data: any, jwt: string) {
  const res = await axiosInstance.post("/api/Cars", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function postUser(data: any, jwt: string) {
  const res = await axiosInstance.post("/api/Auth/signup-staff", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function fetchUsers(role: any, jwt: any) {
  const res = await axiosInstance.get(`/api/Users?role=${role}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function fetchRentalrequest(jwt: any) {
  const res = await axiosInstance.get(`/api/RentalRequests`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function damageRequest(jwt: any, damageDetails: any) {
  const res = await axiosInstance.post(`/api/Damages`, damageDetails, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function rentalRequest(requestId: any, jwt: any, condition: any) {
  const res = await axiosInstance.patch(
    `/api/RentalRequests/${requestId}/approval-state`,
    condition,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res;
}

export async function approvedCars(jwt: any) {
  const res = await axiosInstance.get(`/api/RentalRequests?approved=true`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function damagesCars(jwt: any) {
  const res = await axiosInstance.get(`/api/Damages`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function damageFee(jwt: any, damages: any) {
  const res = await axiosInstance.post(
    `/api/Damages/${damages.id}/ack`,
    damages,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res;
}

export async function addOffers(jwt: any, data: any) {
  const res = await axiosInstance.post(
    `/api/offers`,
    data,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res;
}
