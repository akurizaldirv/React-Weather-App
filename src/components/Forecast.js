import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import GetThumb from "./GetThumb";

const Forecast = ({ data }) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getNextDate = (days) => {
    const day = dayNames[(new Date().getDay()+days)%7];
    return day;
  };

  const forecastItems = data.map((row, idx) => {
    const count = idx+1;
    const date = getNextDate(count);
    return <Col className="forecast-item text-center" key={{count}}>
      <img
        className="mini-thumb-photo d-block"
        src={GetThumb(row.weather[0].icon)}
        alt={row.weather[0].description}
      />
      <p><strong>{row.weather[0].description}</strong></p>
      <p>{date.toLowerCase()}</p>
    </Col>
  });

  
  return (
    <div>
      <Modal.Header closeButton className="variant-dark modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="header-text">
          Weather Forecast
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-section">
        <Row className="row-col-auto">
          {forecastItems}
        </Row>
      </Modal.Body>
    </div>
  );
};

export default Forecast;
