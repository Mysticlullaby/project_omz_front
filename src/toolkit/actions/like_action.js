import axios from 'axios';

function addLike(formData, config) {
    return async () => {
        await axios
            .post(`/review/like`, formData, config)
            .then((response) => response.data);
    }
}

function removeLike(reviewId, clientId, config) {
    return async () => {
        await axios
            .delete(`/review/delete/${reviewId}/${clientId}`, config)
            .then((response => response.data));
    }
}

export const likeActions = {
    addLike, removeLike
}