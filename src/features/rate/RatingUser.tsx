import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../login/userSlice";
import { getRateUserAsync, selectUserRate } from "./rateSlice";
import { RatingForm } from "./RatingForm";

export const RatingUser = () => {
  const dispatch = useAppDispatch();
  const selectedUser: any = useAppSelector(selectUserRate);
  const currentUser: any = useAppSelector(selectUser);
  const userIdTo = selectedUser?.userId;
  const userIdFrom = currentUser?.userId;

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
