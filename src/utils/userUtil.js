import axios from "axios";
import { host } from "./Constants";

export const fetchUser = async () => {
  if (
    localStorage.length < 1 ||
    localStorage.getItem("userDetails") === undefined ||
    localStorage.getItem("userDetails") === null
  ) {
    return null;
  }
  try {
    const id = JSON.parse(localStorage.getItem("userDetails")).id;

    if (id === undefined || id === null) return null;
    const data = await axios.get(`${host}fetchUser?id=${id}`);
    localStorage.setItem("userDetails", JSON.stringify(data.data));
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};

export const fetchMatches = async () => {
  try {
    const data = await axios.get(`${host}fetchAllMatches`);
    console.log("matchesssss", data);
    localStorage.setItem("matches", JSON.stringify(data.data));
  } catch (err) {
    console.log("err", err);
    return [];
  }
};

export const insertOrderToDb = async (
  orderId,
  selectedPlayers,
  matchId,
  eventName
) => {
  if (
    localStorage.length < 1 ||
    localStorage.getItem("userDetails") === undefined ||
    localStorage.getItem("userDetails") === null
  ) {
    return null;
  }
  try {
    const id = JSON.parse(localStorage.getItem("userDetails")).id;

    if (id === undefined || id === null) {
      localStorage.clear();
      return null;
    }
    const data = await axios.post(
      `${host}insertOrderId?id=${id}&orderId=${orderId}&matchId=${matchId}&eventname=${eventName}`,
      { playerSelected: selectedPlayers }
    );
    console.log(data);
    localStorage.setItem("userDetails", JSON.stringify(data.data));
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};

export const fetchWalletAmount = () => {
  console.log("in fetch amount");
  if (localStorage.getItem("userDetails") !== null) {
    console.log("logssss", JSON.parse(localStorage.getItem("userDetails")));
    return JSON.parse(localStorage.getItem("userDetails")).amount;
    // JSON.parse(JSON.parse(localStorage.getItem("userDetails")).amount ) ;
  } else {
    return 0;
    // return JSON.parse(localStorage.getItem("userDetails")).amount;
  }
};
