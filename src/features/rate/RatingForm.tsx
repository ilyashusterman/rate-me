import { useEffect, useRef, useState } from "react";
import { UserRate } from "../user/user";
import {
  rateUserAsync,
  selectRating,
  UserRating,
  getRateUser,
  setRatingSelect,
  rateUserUpdateAsync,
} from "./rateSlice";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Grid } from "@mui/material";

interface RatingFormInput {
  ratingUser: UserRate;
  userIdFrom: string;
  userIdTo: string;
}

export const RatingForm = ({
  ratingUser,
  userIdFrom,
  userIdTo,
}: RatingFormInput) => {
  const dispatch = useAppDispatch();
  const ratingBase: any = useAppSelector(selectRating);
  const [rating, setRating] = useState<UserRating>(ratingBase);
  const inputForm: any = useRef();
  const setRatingKeyVal = (key: string, value: any) => {
    const newObj = { ...rating, [key]: value };
    setRating(newObj);
    return newObj;
  };
  const setRatingKeyValDispatch = (key: string, value: any) => {
    const newRate = setRatingKeyVal(key, value);
    dispatch(rateUserUpdateAsync({ rate: newRate }));
    dispatch(setRatingSelect(newRate));
  };
  const getReverseBoolean = (value: any) => {
    if (value === "") {
      return "1";
    }
    return "";
  };
  const getLikeButton = (key: string, value: any) => {
    return (
      <Stack key={key} direction="row" spacing={1}>
        <IconButton
          color={value === "1" || value === 1 ? "primary" : "default"}
          aria-label={`like ${key}`}
          onClick={async () => {
            const reverseValue = getReverseBoolean(value);
            setRatingKeyValDispatch(key, reverseValue);
          }}
        >
          {key}
          <ThumbUpOffAltIcon />
        </IconButton>
      </Stack>
    );
  };

  useEffect(() => {
    setRatingKeyVal("user_id_from", userIdFrom);
    setRatingKeyVal("user_id_to", userIdTo);
    getRateUser({ userIdFrom, userIdTo }).then((rate: any) => {
      setRating(rate);
    });
  }, [userIdFrom, userIdTo]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {Object.entries(rating).map(([key, value]) => {
          if (key.includes("user_id") || key === "comment") {
            return undefined;
          }
          return getLikeButton(key, value);
        })}
      </Grid>
    </>
  );
};
