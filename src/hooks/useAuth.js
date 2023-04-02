import { useSelector } from "react-redux";
import { selectMemoizedAuth } from "../features/auth/authSelector";

export default function useAuth() {
  const auth = useSelector(selectMemoizedAuth);
  if (auth?.email) {
    return auth;
  } else {
    return false;
  }
}
