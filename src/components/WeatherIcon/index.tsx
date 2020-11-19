import React from "react";
import { ReactComponent as Cloud } from "../../assets/icons/cloud.svg";
import { ReactComponent as Rain } from "../../assets/icons/rain.svg";
import { ReactComponent as Snow } from "../../assets/icons/snow.svg";
import { ReactComponent as Sun } from "../../assets/icons/sun.svg";
import { ReactComponent as Thunder } from "../../assets/icons/thunder.svg";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, className }) => {
  const components: {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  } = {
    "01": Sun,
    "02": Cloud,
    "03": Cloud,
    "04": Cloud,
    "09": Rain,
    "10": Rain,
    "11": Thunder,
    "13": Snow,
  };

  const IconComponent = components[iconCode.slice(0, 2)];

  return <IconComponent className={className} />;
};

export default WeatherIcon;
