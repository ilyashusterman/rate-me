import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn, selectUsers } from "../login/loginSlice";

const SearchUser = () => {
  const isLogged = useAppSelector(selectIsLoggedIn);
  const users = useAppSelector(selectUsers);
  if (!isLogged) {
    return <></>;
  }
  return (
    <>
      <h1>logged</h1>
    </>
  );
};
export default SearchUser;
