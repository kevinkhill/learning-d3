import { select } from "d3";
import { debounce } from "lodash-es";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

export const Circles: FC<{ data: number[] }> = ({ data }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      const clientWidth = Number(containerRef.current?.clientWidth);
      setWidth(clientWidth / (data.length + 1));
    };
    const handleResize = debounce(updateWidth, 500);
    updateWidth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data.length]);

  useLayoutEffect(() => {
    const clientHeight = Number(containerRef.current?.clientHeight);

    if (Array.isArray(data)) {
      const update = select("g").selectAll("circle").data(data);

      update
        .enter()
        .append("circle")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .merge(update)
        .attr("r", d => d)
        .attr("cx", (_, i) => width * (i + 1))
        .attr("cy", () => Math.random() * (clientHeight - 200))
        .attr("stroke", (_, i) => (i % 2 === 0 ? "#f80" : "#aaf"))
        .attr("fill", (_, i) => (i % 2 === 0 ? "orange" : "#44f"));

      update.exit().remove();
    }
  }, [data, width]);

  return (
    <svg width="100%" height="600px" ref={containerRef}>
      <g transform="translate(0, 100)" />
    </svg>
  );
};
