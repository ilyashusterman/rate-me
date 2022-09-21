import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../login/loginSlice";

const SearchUser = () => {
  const isLogged = useAppSelector(selectIsLoggedIn);
  if (!isLogged) {
    return <></>;
  }
  return <></>;
};
export default SearchUser;
