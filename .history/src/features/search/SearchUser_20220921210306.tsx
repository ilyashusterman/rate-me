import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../login/loginSlice";

const SearchUser = () => {
  const isLogged = useAppSelector(selectIsLoggedIn);
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
