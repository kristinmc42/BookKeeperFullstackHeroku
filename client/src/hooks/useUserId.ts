import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useUserId() {
  // get username from AuthContext
  const userContext = useContext(AuthContext);

  if (!userContext) return null;

  console.log(userContext);

  const { currentUserId } = userContext;

  console.log(currentUserId);
  return currentUserId;
}

// export default function useUserId() {
//   // get username from AuthContext
//   let username: string | null | undefined;
//   const userContext: ContextState | null = useContext(AuthContext);
//   if (userContext) {
//     username = userContext.currentUser;
//     console.log(username)
//   }

//   // get userId from db based on username
//   const getUser = async () => {
//     console.log(username)
//     return axios
//       .get(`http://localhost:5000/api/users/${username}`)
//       // .get(`https://${process.env.REACT_APP_API_URL}/api/users/${username}`)
//       .then((res) => {
//         console.log(res.data)
//         return res.data;
//       });
//   };

//   return useQuery(["user", username], getUser, { enabled: !!username });
// }
