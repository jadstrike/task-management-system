import { Pie } from "@ant-design/plots";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MySpin from "./MySpin";

const ProjectPie = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const Authorization = `Bearer ${token}`;
  const [InProgess, setInProgress] = useState(null);
  const [Incomplete, setIncomplete] = useState(null);
  const [Completed, setCompleted] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendURL}/api/inProgressProjects`, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setInProgress(response.data.length);
        // setLoading(false);
        // handle successful response here
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // handle error here
      });

    axios
      .get(`${backendURL}/api/incompleteProjects`, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setIncomplete(response.data.length);
        // setLoading(false);
        // handle successful response here
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // handle error here
      });
    axios
      .get(`${backendURL}/api/completedProjects`, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCompleted(response.data.length);
        setLoading(false);
        // handle successful response here
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // handle error here
      });
  }, []);
  const projectCount = useSelector((state) => state.content.projectsCount);
  const data = [
    {
      type: "In Progress",
      value: InProgess,
    },
    {
      type: "Completed",
      value: Completed,
    },
    {
      type: "Over Deadline",
      value: Incomplete,
    },
  ];

  const config = {
    appendPadding: 20,
    data,
    angleField: "value",
    colorField: "type",
    color: ["#1890FF", "#59CE8F", "#EB455F"],
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
  return loading ? <MySpin /> : <Pie {...config} />;
};

export default ProjectPie;
