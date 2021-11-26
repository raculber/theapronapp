import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import recipe from "../Recipe/recipe";
import calendar from "./Calendar.css";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import React from "react";
class Calendar extends React.Component {
  render() {
    return (
      <div className="Calendar">
        <ScheduleComponent
          width="75%"
          height="700px"
          margin-left="40px"
          selectedDate={new Date(2021, 1, 15)}
        >
          <ViewsDirective>
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;
