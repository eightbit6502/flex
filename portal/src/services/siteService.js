import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL, API_V1 } from '../config';


export const getAllSiteData = async () => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await axios.get(API_BASE_URL + API_V1 +'/site/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching site data:', error);
        throw error;
    }
};

// export const getBuildingData = async (id) => {
//     const authStore = useAuthStore();
//     const token = authStore.token;

//     try {
//         const response = await axios.get(API_BASE_URL + API_V1 + '/building/' + id, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching building data:', error);
//         throw error;
//     }
// };

// export const getBuildingSites = async (id) => {
//     const authStore = useAuthStore();
//     const token = authStore.token;

//     try {
//         const response = await axios.get(API_BASE_URL + API_V1 + '/buildingsite/' + id + '/sites', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching building data:', error);
//         throw error;
//     }
// };

// export const getBuildingTenants = async (id) => {
//     const authStore = useAuthStore();
//     const token = authStore.token;

//     try {
//         const response = await axios.get(API_BASE_URL + API_V1 + '/buildingtenant/' + id + '/tenants', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching building data:', error);
//         throw error;
//     }
// };


// export const updateBuildingData = async (buildingData) => {
//     const authStore = useAuthStore();
//     const token = authStore.token;

//     try {
//         const response = await axios.put(
//             `${API_BASE_URL + API_V1}/building/${buildingData.id}`,
//             buildingData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error updating building data:', error);
//         throw error;
//     }
// };
