import api from "../api";

export const UpdateLocationPredicCount = (uid,count) => async (dispatch) => {
    try {
        const { data } = await  api
        .put(`/user/updateUser/`,{
            id:uid,
            locationPredicCount:count
        });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}