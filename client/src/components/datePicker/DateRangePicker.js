import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const { RangePicker } = DatePicker;

function DateRangePicker(props) {
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  return (
    <div className="date_picker">
      <div className="date_picker_div">
        <RangePicker
          style={{
            border: "1px solid #000000",
            borderRadius: "3px",
            height: "35px",
          }}
          format="DD-MM-YYYY"
          onChange={props.callback}
          disabledDate={disabledDate}
        />
      </div>
      <div className="date_picker_div">
        <input
          type="text"
          placeholder="Search Rooms"
          value={props.searchKey}
          onChange={(e) => props.setSearchKey(e.target.value)}
          onKeyUp={props.search}
        />
      </div>
      <div className="date_picker_div">
        <select
          value={props.type}
          onChange={(e) => props.searchType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-Delux">Non-Delux</option>
        </select>
      </div>
    </div>
  );
}

export default DateRangePicker;
