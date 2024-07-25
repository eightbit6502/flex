import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL, API_V1 } from '../config';


export const getAllBuildingData = async () => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 +'/building/', {
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

export const getBuildingData = async (id) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 + '/building/' + id, {
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

export const getBuildingRecentChanges = async (id) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 + '/building/' + id + '/changes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent building changes:', error);
        throw error;
    }
};


export const updateBuildingData = async (buildingData) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.put(
            `${API_BASE_URL + API_V1}/building/${buildingData.id}`,
            buildingData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating building data:', error);
        throw error;
    }
};

export const createBuildingData = async (buildingData) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.post(
            `${API_BASE_URL + API_V1}/building`,
            buildingData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating building:', error);
        throw error;
    }
};
