// SearchParkingBayService.js

export default class SearchParkingService {
    async fetchAvailableSites(payload) {
        try {
            const response = await fetch('http://localhost:3000/api/search/daily/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!response.ok) {
                return { status: response.status, message: data.message || 'Error occurred' };
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching available sites:', error);
            throw error;
        }
    }
}
