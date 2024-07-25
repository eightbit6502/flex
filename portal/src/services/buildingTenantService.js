import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL, API_V1 } from '../config';



export const addBuildingTenant = async (buildingId, tenantId) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    let payload = {
        "buildingId": buildingId,
        "tenantId": tenantId
    }

    try {
        const response = await axios.post(API_BASE_URL + API_V1 + '/buildingtenant/',
            payload,
            {
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

export const removeBuildingTenant = async (buildingId, tenantId) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    try {
        const response = await axios.delete(API_BASE_URL + API_V1 + '/buildingtenant/' + buildingId + '/tenants/' + tenantId,
            {
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

export const getBuildingTenants = async (id) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    try {
        const response = await axios.get(API_BASE_URL + API_V1 + '/buildingtenant/' + id + '/tenants', {
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