import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL, API_V1 } from '../config';



export const addBuildingSite = async (buildingId, siteId) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    let payload = {
        "buildingId": buildingId,
        "siteId": siteId
    }

    try {
        const response = await axios.post(API_BASE_URL + API_V1 + '/buildingsite/',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching buildingsite data:', error);
        throw error;
    }
};

export const removeBuildingSite = async (buildingId, siteId) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.delete(API_BASE_URL + API_V1 + '/buildingsite/' + buildingId + '/sites/' + siteId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching buildingsite data:', error);
        throw error;
    }
};

export const getBuildingSites = async (id) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 + '/buildingsite/' + id + '/sites', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching buildingsite data:', error);
        throw error;
    }
};
