import React, { Fragment, useState } from "react";
import "./Project.scss";
import { ReactComponent as KeyIcon } from "../../../icons/key.svg";
import { ReactComponent as ProfileIcon } from "../../../icons/profile.svg";
import { ReactComponent as SettingsIcon } from "../../../icons/bolt.svg";
import { ReactComponent as NewTabIcon } from "../../../icons/newtab.svg";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal/Modal";
import EditProject from "../EditProject/EditProject";

const Project = (props) => {
  const { projects, history } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const dismissable = () => {
    setIsModalOpen(false);
  };
  const redirectToprojectDetail = (name) => {
    history.push("/project/activesprint");
  };

  const editProject = () => {};
  return (
    <Fragment>
      {projects.map((project, index) => (
        <article key={index} className="project" onClick={handleModalOpen}>
          <div className="projectName icon">
            <span>{project.projectName}</span>
            <span
              className="icon-project projectIcons"
              onClick={() => editProject(project.projectName)}
            >
              <SettingsIcon />
            </span>
            <span
              className="icon-project"
              onClick={() => redirectToprojectDetail(project.projectName)}
            >
              <NewTabIcon />
            </span>
          </div>
          <div className="projectKey icon">
            <span className="icon-project">
              <KeyIcon />
            </span>
            {project.projectKey}
          </div>
          <div className="projectType">{project.projectType}</div>
          <div className="projectLead icon">
            <span className="icon-project">
              <ProfileIcon />
            </span>
            {project.projectLead}
          </div>
        </article>
      ))}
      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <EditProject dismiss={dismissable} /> : ""}
      />
    </Fragment>
  );
};

export default withRouter(Project);
