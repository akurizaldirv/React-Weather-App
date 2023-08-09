import P04d from "../assets/broken-clouds.png";
import P01d from "../assets/clear-sky.png";
import P03d from "../assets/clouds.png";
import P02d from "../assets/few-clouds.png";
import P10d from "../assets/rain.png";
import P09d from "../assets/shower.png";
import P13d from "../assets/snow.png";
import P11d from "../assets/thunder.png";
import P50d from "../assets/mist.png";

const GetThumb = (icon) => {
  let thumbPhoto = P03d;
  if (icon === "04d") {
    thumbPhoto = P04d;
  } else if (icon === "01d" || icon === "01n") {
    thumbPhoto = P01d;
  } else if (icon === "03d" || icon === "03n") {
    thumbPhoto = P03d;
  } else if (icon === "02d" || icon === "02n") {
    thumbPhoto = P02d;
  } else if (icon === "10d" || icon === "10n") {
    thumbPhoto = P10d;
  } else if (icon === "P09d" || icon === "P09n") {
    thumbPhoto = P09d;
  } else if (icon === "13d" || icon === "13n") {
    thumbPhoto = P13d;
  } else if (icon === "11d" || icon === "11n") {
    thumbPhoto = P11d;
  } else if (icon === "50d" || icon === "50n") {
    thumbPhoto = P50d;
  }

  return thumbPhoto;
};

export default GetThumb;
