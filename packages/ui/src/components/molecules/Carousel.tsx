"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/atoms/Button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselWrapperProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  className?: string;
  children?: React.ReactNode;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselWrapperProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function CarouselWrapper({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  loop,
  itemsSizePerPage,
  ...props
}: CarouselWrapperProps & {
  loop: boolean;
  itemsSizePerPage: number;
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      slidesToScroll: "auto",
      loop,
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative h-full w-full", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden h-full w-full" data-slot="carousel-content">
      <div
        className={cn("flex w-full h-full", orientation === "horizontal" ? "" : " flex-col", className)}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  itemsSizePerPage,
  ...props
}: React.ComponentProps<"div"> & { itemsSizePerPage: number }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      style={{ flex: `0 0 ${(1 / itemsSizePerPage) * 100}%` }}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant="ghost"
      color="deactivated"
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        // orientation === "horizontal"
        //   ? "top-1/2 left-1 -translate-y-1/2"
        //   : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        "top-1/2 left-1 -translate-y-1/2",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant="ghost"
      color="deactivated"
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        // orientation === "horizontal"
        //   ? "top-1/2 right-1 -translate-y-1/2"
        //   : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        "top-1/2 right-1 -translate-y-1/2",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

type CarouselProps = {
  className?: string;
  wrapperProps?: CarouselWrapperProps;
  controlWrapperClassName?: string;
  children?: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  itemsSizePerPage?: number;
  loop?: boolean;
  useArrows?: boolean;
};

function Carousel({
  wrapperProps,
  children = [],
  autoplay = false,
  autoplayInterval = 3000,
  controlWrapperClassName,
  itemsSizePerPage = 1,
  loop = true,
  useArrows = true,
}: CarouselProps) {
  const plugins = [];
  if (autoplay) {
    plugins.push(
      Autoplay({
        delay: autoplayInterval,
      }),
    );
  }
  const itemsForLoop = loop && itemsSizePerPage > 1 ? itemsSizePerPage : 1;
  return (
    <CarouselWrapper {...wrapperProps} plugins={plugins} loop={loop} itemsSizePerPage={itemsSizePerPage}>
      <CarouselContent>
        {Array.from({ length: itemsForLoop }).map((_, loopIndex) =>
          children.map((_, index) => (
            <CarouselItem itemsSizePerPage={itemsSizePerPage} key={`carousel-item-${loopIndex}-${index}`}>
              {children[index]}
            </CarouselItem>
          )),
        )}
      </CarouselContent>
      {useArrows ? (
        <div className={cn("absolute top-0 left-0 w-full h-full", controlWrapperClassName)}>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      ) : (
        <></>
      )}
    </CarouselWrapper>
  );
}

export { type CarouselApi, CarouselWrapper, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Carousel };
