import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import InputField from "../helperComponents/inputField";
import Select from "../helperComponents/staticSelect";
import { platformOptions } from "../../constants/NftListing";

const TransferContent = ({
                           platform,
                           transferTo,
                           amount,
                           memo,
                           errors,
                           setPlatform,
                           setTransferTo,
                           setAmount,
                           setMemo,
                         }) => {

const updateAmount = (e) => {
  const amountToBeUpdated = Number(e.target.value);
  if (amountToBeUpdated >= 0) {
    setAmount(amountToBeUpdated);
  }
};

  return (
    <Box>
      <Typography variant="body2" color="textSecondary" component="p">
        Move tokens to another xHashtag wallet.
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        If transferring to an exchange, verify the memo that is needed.
      </Typography>
      <Box pt={2}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Select
              autoFocus
              value={platform}
              data={platformOptions}
              label="Platform"
              onChange={(e) => setPlatform(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={7}>
            <InputField
              required
              fullWidth
              label="Transfer To"
              autoComplete="off"
              type="text"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              error={errors.transferTo}
              helperText={errors.transferTo}
            />
          </Grid>
        </Grid>
        <InputField
          required
          fullWidth
          label="Amount"
          autoComplete="off"
          type="text"
          value={amount}
          onChange={updateAmount}
          error={errors.amount}
          helperText={errors.amount}
        />
        <InputField
          fullWidth
          label="Memo"
          autoComplete="off"
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          error={errors.memo}
          helperText={errors.memo}
        />
      </Box>
    </Box>
  );

};

export default TransferContent;