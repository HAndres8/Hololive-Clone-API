import { connect } from "mongoose";

const Connection = () => {
    const url = String(process.env.DB_MONGO);
    connect(url)
    .then(() => {
      console.log("You are connect at",process.env.DB_MONGO);
    })
    .catch((miError) => {
      console.log("Can not find mongo", miError);
    });
};

export default Connection;