import React, {useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GetThumb from './GetThumb';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Forecast from './Forecast';

const WeatherInfo = ({data, cityName, forecast}) => {
  let forecastData = [];

  if (forecast.list) {
    for (let index = 0; index < 5; index++) {
      forecastData.push(forecast.list[index]);
    }
  }

  let thumbPhoto = null;
  
  if (data.weather){
    thumbPhoto = GetThumb(data.weather[0].icon);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = dayNames[new Date().getDay()];

   return (
    <Container className='weather-info'>
      {data.name ? <Row className="row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
        <Col>
        <img className='thumb-photo mx-auto d-block' src={thumbPhoto} alt="Current Weather" />
          {/* <ThumbControl icon={data.weather[0].icon} /> */}
        </Col>
        <Col className="text-center text-sm-center text-md-left text-lg-left info-section">
          <p className="info"><strong>{today}</strong></p>
          <p className="info"><strong>{cityName}</strong></p>
          <h2 className='temperature'>{Math.round(data.main.temp)} °C</h2>
          {data.weather ? <p className="info">{data.weather[0].description}</p> : null }
        </Col>
      </Row> : null }
      {data.main ? <div className='second-info'>
        <Row className="row-cols-lg-3 row-cols-md-auto row-cols-sm-auto">
          <Col className='text-center'>
            <h4><strong>{Math.round(data.main.feels_like)} °C</strong></h4>
            <p>Feels Like</p>
          </Col>
          <Col className='text-center'>
            <h4><strong>{data.main.humidity}%</strong></h4>
            <p>Humidity</p>
          </Col>
          {data.wind ? <Col className='text-center'>
            <h4><strong>{data.wind.speed} MPH</strong></h4>
            <p>Wind Speed</p>
          </Col> : null }
        </Row> 
        <Row className='row-forecast-button'>
          <Button variant="primary" onClick={handleShow} className="forecast-button mx-auto btn-warning">
            See Forecast
          </Button>
        </Row> 
      </div>: null }
      
      <div className='forecast-content'> 
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          
        >
          <Forecast data={forecastData}/>
        </Modal>          
      </div>
    </Container>
  )
}

export default WeatherInfo
