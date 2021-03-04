import React, { Fragment } from "react";
import { DatePicker } from "@material-ui/pickers";
import { InputAdornment, Paper } from "@material-ui/core";
import { BrowserView, MobileView } from "react-device-detect";
import EventRoundedIcon from '@material-ui/icons/EventRounded';

const StaticDatePicker = ({ date, handler }) => {
  return (
    <Fragment>
      <BrowserView>
        <Paper className="border">
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={(e) => handler(e)}
          />
        </Paper>
      </BrowserView>

      <MobileView>
        <DatePicker
          label="Basic example"
          value={date}
          onChange={handler}
          animateYearScrolling
          inputVariant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><EventRoundedIcon />&nbsp;&nbsp;</InputAdornment>,
          }}
          fullWidth
          name="calender"
        />
      </MobileView>
    </Fragment>
  );
};

export default StaticDatePicker;
