import axios from "axios";

function getSignup(formData, config) {
  return async (dispatch) => {
    const data = await axios
      .post("/client/signup", formData, config)
      .then((Response) => Response.data);
    console.log(data);
  };
}

export const clientAction = {
  getSignup,
};
