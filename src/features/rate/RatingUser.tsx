import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../login/userSlice";
import { selectUserRate } from "./rateSlice";
import { RatingForm } from "./RatingForm";

export const RatingUser = () => {
  const selectedUser: any = useAppSelector(selectUserRate);
  const currentUser: any = useAppSelector(selectUser);
  const userIdRateTo = selectedUser?.user_id;
  const userIdFrom = currentUser?.user_id;
  return (
    <>
      {selectedUser && currentUser ? (
        <RatingForm
          ratingUser={selectedUser}
          userIdFrom={userIdFrom}
          userIdTo={userIdRateTo}
        />
      ) : null}
    </>
  );
};
