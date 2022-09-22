import { useAppDispatch } from "../../app/hooks";
import { UserSessionObj } from "../user/UserSession";
import { userLogout, userSession } from "./userSlice";

interface GreetingUserProps {
  user: UserSessionObj | undefined;
}
export const GreetingUser = ({ user }: GreetingUserProps) => {
  const dispatch = useAppDispatch();
  const logout = () => {
    userSession.removeUser();
    dispatch(userLogout());
  };
  return (
    <>
      <p>hello {user?.name}</p>
      <img src={user?.picture} />
      <button onClick={logout}>logout</button>
    </>
  );
};
