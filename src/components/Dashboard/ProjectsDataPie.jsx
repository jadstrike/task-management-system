import { Pie } from "@ant-design/plots";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProjectPie = () => {
  const projectCount = useSelector((state) => state.content.projectsCount);
  const data = [
    {
      type: "In Progress",
      value: 27,
    },
    {
      type: "Completed",
      value: 25,
    },
    {
      type: "Incomplete",
      value: 18,
    },
  ];

  const config = {
    appendPadding: 20,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    innerRadius: 0.5,
    label: {
      type: "spider",
      labelHeight: 80,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,

      content: {
        style: {
          fontSize: 13,

          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: `Total\nProjects\n\n${projectCount}`,
      },
    },
  };
  return <Pie {...config} />;
};

export default ProjectPie;
