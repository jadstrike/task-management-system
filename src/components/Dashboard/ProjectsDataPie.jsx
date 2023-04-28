import { Pie } from "@ant-design/plots";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MySpin from "./MySpin";

const ProjectPie = () => {
  const project_lists = useSelector((state) => state.project.projects_list);
  console.log(project_lists);
  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;
  const [InProgess, setInProgress] = useState(null);
  const [Incomplete, setIncomplete] = useState(null);
  const [Completed, setCompleted] = useState(null);
  const [loading, setLoading] = useState(false);

  let failedCount = 0;
  let inProgressCount = 0;
  let completeCount = 0;
  let TodoCount = 0;

  if (project_lists !== null) {
    for (let i = 0; i < project_lists.length; i++) {
      const project = project_lists[i];
      if (project.projectStatus === "INCOMPLETE") {
        failedCount++;
      } else if (project.projectStatus === "IN_PROGRESS") {
        inProgressCount++;
      } else if (project.projectStatus === "COMPLETE") {
        completeCount++;
      } else if (project.projectStatus === "TODO") {
        TodoCount++;
      }
    }
  }

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${backendURL}/api/inProgressProjects`, {
  //       headers: {
  //         Authorization: Authorization,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setInProgress(response.data.length);
  //       // setLoading(false);
  //       // handle successful response here
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //       // handle error here
  //     });

  //   axios
  //     .get(`${backendURL}/api/incompleteProjects`, {
  //       headers: {
  //         Authorization: Authorization,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setIncomplete(response.data.length);
  //       // setLoading(false);
  //       // handle successful response here
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //       // handle error here
  //     });
  //   axios
  //     .get(`${backendURL}/api/completedProjects`, {
  //       headers: {
  //         Authorization: Authorization,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setCompleted(response.data.length);
  //       console.log(response.data);
  //       setLoading(false);
  //       // handle successful response here
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //       // handle error here
  //     });
  // }, []);
  const projectCount = useSelector((state) => state.content.projectsCount);
  const data = [
    {
      type: "In Progress",
      value: inProgressCount,
    },
    {
      type: "Completed",
      value: completeCount,
    },
    {
      type: "Failed",
      value: failedCount,
    },
    {
      type: "Todo",
      value: TodoCount,
    },
  ];

  const config = {
    appendPadding: 20,
    data,
    angleField: "value",
    colorField: "type",
    color: ["#1890FF", "#59CE8F", "#EB455F", "gray"],
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
  return loading ? (
    <MySpin />
  ) : project_lists === null ? (
    <MySpin />
  ) : (
    <Pie {...config} />
  );
};

export default ProjectPie;
