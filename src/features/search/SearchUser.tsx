import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsersAsync, selectUsers } from "../login/userSlice";
import { setRateUser } from "../rate/rateSlice";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { User } from "../user/user";
import { Grid } from "@mui/material";

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [user, setUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name,
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            value={user || { name: "", picture: undefined }}
            onChange={(event: any, selectedUser: User | null) => {
              setUser(selectedUser);
              dispatch(setRateUser(selectedUser));
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="free-solo-2-demo"
            disableClearable
            options={users}
            filterOptions={filterOptions}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img loading="lazy" width="20" src={option.picture} alt="" />
                {option.name}
              </Box>
            )}
          />
        </Stack>
      </Grid>
    </>
  );
};
export default SearchUser;
