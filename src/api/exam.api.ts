import { client } from "./client";

export const getQuestions = async (amount = 10) => {
  const res = await client.get(`/api.php?amount=${amount}`);
  return res.data.results;
};