import { HttpMethod, initFetch } from "../utils/fetch";

// const fetchCall = initFetch("http://localhost:3000");
const findalltask = initFetch("http://localhost:3000/api/tasks");

export const getTasks = () => {
  // return fetchCall<{ data: string }>(HttpMethod.GET, `/`)
  return findalltask<{ data: string }>(HttpMethod.GET, ``)

}


