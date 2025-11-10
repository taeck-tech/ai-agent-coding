import { useState } from "react";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

type SliderProps = React.ComponentProps<typeof RcSlider> & {
  onChange?: (value: number[]) => void;
};

function Slider({ className, defaultValue, value, min = 0, max = 100, onChange = () => {}, ...props }: SliderProps) {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  const handleChange = (value: number | number[]) => {
    setSliderValue(value);
    onChange(value);
  };

  return (
    <RcSlider
      data-slot="slider"
      defaultValue={defaultValue}
      value={sliderValue}
      min={min}
      max={max}
      range={true}
      onChange={handleChange}
      classNames={{
        track: "!bg-primary-500",
        rail: "!bg-primary-050",
        handle: "!bg-white !border-primary-500 !opacity-100",
      }}
      {...props}
    />
  );
}

export { Slider };
