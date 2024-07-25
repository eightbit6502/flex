import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL, API_V1 } from '../config';


export const getRecentBuildingLogs = async (buildingId) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 +'/logs/entity/' + buildingId + '/recent', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching building data:', error);
        throw error;
    }
};

export const getBuildingLogs = async (buildingId, payload) => {
	const authStore = useAuthStore();
	const token = authStore.token;

	let url = "";
	if (payload) {
	  const startDate = encodeURIComponent(new Date(payload.startDate).toISOString());
	  const endDate = encodeURIComponent(new Date(payload.endDate).toISOString());
	  url = `${API_BASE_URL}${API_V1}/logs/entity/${buildingId}?startDate=${startDate}&endDate=${endDate}`;
	} else {
	  url = `${API_BASE_URL}${API_V1}/logs/entity/${buildingId}`;
	}

	try {
	  const response = await axios.get(url, {
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  });
	  return response.data;
	} catch (error) {
	  console.error('Error fetching building data:', error);
	  throw error;
	}
  };






