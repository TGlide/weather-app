import React from "react";
import { ReactComponent as Cloud } from "../../assets/icons/cloud.svg";
import { ReactComponent as Rain } from "../../assets/icons/rain.svg";
import { ReactComponent as Drizzle } from "../../assets/icons/drizzle.svg";
import { ReactComponent as Snow } from "../../assets/icons/snow.svg";
import { ReactComponent as Sun } from "../../assets/icons/sun.svg";
import { ReactComponent as Thunder } from "../../assets/icons/thunder.svg";
import { ReactComponent as Mist } from "../../assets/icons/mist.svg";
import { ReactComponent as Help } from "../../assets/icons/help-circle.svg";

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
    "09": Drizzle,
    "10": Rain,
    "11": Thunder,
    "13": Snow,
    "50": Mist,
  };

  const IconComponent = components[iconCode.slice(0, 2)] || Help;

  return <IconComponent className={className} />;
};

export default WeatherIcon;
