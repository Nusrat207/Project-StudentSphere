
//import { render } from "react-dom";
/*
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from "@syncfusion/ej2-react-schedule";
//render(<Study />, document.getElementById("sample"));

//registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cWWJCe0x0THxbf1x0ZFxMYl1bRndPMyBoS35RckVnW3ZeeXZXR2NeVUJy')

export class Study extends React.Component {
  constructor() {
    super(...arguments);
    this.data = [
      {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2022, 0, 10, 9, 30),
        EndTime: new Date(2022, 0, 10, 11, 0),
        CategoryColor: '#1aaa55'
      }
    ];
  }

  render() {
    return (
        <div>
            <Top></Top>
            <Navbar/>
      <div className="schedule-control-section">
        <div className="control-wrapper">
          <ScheduleComponent height="650px" ref={schedule => (this.scheduleObj = schedule)} selectedDate={new Date(2024, 0, 10)} eventSettings={{ dataSource: this.data }}>
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
           
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div> 
      <Footer></Footer>
      </div>
    );
  }
}
//   <ViewDirective option="Agenda" />
*/
import React, { Component } from "react";
import './Study.css';
import Top from "../components/Top";
import Navbar from "../components/Navbar";
import { registerLicense } from '@syncfusion/ej2-base';
import Footer from '../components/Footer';
import axios from 'axios';
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cW2hIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjX39ccHRUQ2VUVkJ0Ww==');

class Study extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  addEvent = async (event) => {
    try {
      const response = await axios.post('/api/events', event);
      this.setState(prevState => ({
        data: [...prevState.data, response.data]
      }));
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  onPopupClose = async (args) => {
    if (args.type === "Editor" && args.data) {
      const studentId = localStorage.getItem('student_id');
      const eventData = args.data;
      const newEvent = {
        Id: studentId,
        Subject: eventData.Subject,
        StartTime: eventData.StartTime,
        EndTime: eventData.EndTime,
        CategoryColor: eventData.CategoryColor
      };
      await this.addEvent(newEvent);
      this.fetchEvents();  
    }
  };

  render() {
    console.log('Events Data:', this.state.data); 
  
    return (
      <div>
        <Top />
        <Navbar />
        <div className="schedule-control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              height="650px"
              ref={schedule => (this.scheduleObj = schedule)}
              selectedDate={new Date(2024, 5, 3)}
              eventSettings={{ dataSource: this.state.data }}
              actionComplete={this.handleActionComplete}>
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Study;

