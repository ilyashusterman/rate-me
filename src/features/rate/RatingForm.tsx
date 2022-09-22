import { useEffect, useRef, useState } from "react";
import { UserRate } from "../user/user";
import {
  getRateUserAsync,
  rateUserAsync,
  selectRating,
  UserRating,
} from "./rateSlice";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

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
  const selectedRating = useAppSelector(selectRating);
  const [rating, setRating] = useState<any>(selectedRating);
  const inputForm: any = useRef();
  const setRatingKeyVal = async (key: string, value: any) => {
    const newObj = { ...rating, [key]: value };
    setRating(newObj);
    return newObj;
  };
  const setRatingKeyValAsync = async (key: string, value: any) => {
    const newObj = setRatingKeyVal(key, value);
    setTimeout(() => {
      dispatch(rateUserAsync({ rate: rating, formRef: inputForm }));
    }, 50);
  };
  const getReverseBoolean = (value: any) => {
    if (value === "") {
      return "1";
    }
    return "";
  };
  const ratingInput = Object.entries(rating).filter(
    ([key, value]) => !key.includes("user_id") && !(key === "comment")
  );
  const getLikeButton = (key: string, value: any) => {
    return (
      <Stack key={key} direction="row" spacing={1}>
        <IconButton
          color={value === "1" ? "primary" : "default"}
          aria-label={`like ${key}`}
          onClick={async () => {
            const reverseValue = getReverseBoolean(value);
            await setRatingKeyValAsync(key, reverseValue);
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
    dispatch(getRateUserAsync({ userIdFrom, userIdTo }));
  }, [userIdFrom, userIdTo]);
  return (
    <>
      {ratingInput.map(([key, value]) => {
        return getLikeButton(key, value);
      })}
      {ratingUser.name}
      <form
        ref={inputForm}
        action="https://docs.google.com/forms/d/e/1FAIpQLSdqpOVyixQ7sQARhfxp6QDt7qGP04XdVUl9xdYi_IbOCNRzzQ/formResponse"
        target="_self"
        id="userRateForm"
        method="POST"
      >
        <input
          value={rating.good}
          id="1584792400"
          type="hidden"
          name="entry.1584792400"
        />
        <input
          value={rating.bad}
          id="1850534974"
          type="hidden"
          name="entry.1850534974"
        />
        <input
          value={rating.sexy}
          id="1236868080"
          type="hidden"
          name="entry.1236868080"
        />
        <input
          value={rating.ugly}
          id="1627263906"
          type="hidden"
          name="entry.1627263906"
        />
        <input
          value={rating.smart}
          id="1531758727"
          type="hidden"
          name="entry.1531758727"
        />
        <input
          value={rating.stupid}
          id="1463309632"
          type="hidden"
          name="entry.1463309632"
        />
        <input
          value={rating.young}
          id="1338421273"
          type="hidden"
          name="entry.1338421273"
        />
        <input
          value={rating.old}
          id="542522970"
          type="hidden"
          name="entry.542522970"
        />
        <input
          value={rating.slow}
          id="125709274"
          type="hidden"
          name="entry.125709274"
        />
        <input
          value={rating.fast}
          id="1482282448"
          type="hidden"
          name="entry.1482282448"
        />
        <input
          value={rating.comment}
          id="565086652"
          type="hidden"
          name="entry.565086652"
        />
        <input
          value={rating.user_id_from}
          id="886015579"
          type="hidden"
          name="entry.886015579"
        />
        <input
          value={rating.user_id_to}
          id="1021623480"
          type="hidden"
          name="entry.1021623480"
        />
        <input type="hidden" name="fvv" value="1" />
        <input type="hidden" name="fbzx" value="3522236202103590474" />

        <input type="hidden" name="pageHistory" value="0" />
      </form>
    </>
  );
};
