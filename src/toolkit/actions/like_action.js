import axios from 'axios';

function addlike(formData, config) {
    return async () => {
        await axios
            .post(`/review/like`, formData, config)
            .then((response) => response.data);
    }
}

export const likeActions = {
    addlike
}