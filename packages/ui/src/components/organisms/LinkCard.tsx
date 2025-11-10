import { cn } from "../../lib/utils";
import { Title } from "../../components/atoms/Title";
import { Text } from "../../components/atoms/Text";
import { Button } from "../atoms/Button";

type PropTypes = {
  title?: string;
  description?: string;
  caption?: string;
  link?: string;
  className?: string;
  backgroundImage?: string;
  source?: string;
};

export const LinkCard = ({
  title,
  description,
  caption,
  link,
  className,
  backgroundImage,
  source = ""
}: PropTypes) => {
  return (
    <a className={cn("w-full h-full rounded-lg flex flex-row justify-between", className)} href={link}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between">

        <Text variant="caption" weight="regular" as="span" className="text-white">
          {source}
        </Text>
        <Button variant="ghost">
          {">"}
        </Button>

      </div>
      <div className="flex flex-col gap-4">
        {title && <Title variant="subtitle1" weight="bold" className="text-white">
          {title}
        </Title>}
        {description && <Text variant="body2" weight="medium" className="text-white">
          {description}
        </Text>}
        <Text variant="caption" weight="regular" className="text-white">
          {caption}
        </Text>
      </div>
    </a>
  );
};