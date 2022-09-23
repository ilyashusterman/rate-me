import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../login/userSlice";
import { getRateUserAsync, selectUserRate } from "./rateSlice";
import { RatingForm } from "./RatingForm";

export const RatingUser = () => {
  const dispatch = useAppDispatch();
  const selectedUser: any = useAppSelector(selectUserRate);
  const currentUser: any = useAppSelector(selectUser);
  const userIdTo = selectedUser?.user_id;
  const userIdFrom = currentUser?.user_id;
  useEffect(() => {
    if (userIdTo && userIdFrom) {
      dispatch(getRateUserAsync({ userIdFrom, userIdTo }));
    }
  });
  return (
    <>
      {userIdTo && userIdFrom ? (
        <RatingForm
          ratingUser={selectedUser}
          userIdFrom={userIdFrom}
          userIdTo={userIdTo}
        />
      ) : null}
    </>
  );
};
