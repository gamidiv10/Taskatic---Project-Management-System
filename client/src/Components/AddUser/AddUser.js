import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import "./AddUser.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Autocomplete } from "mui-rff";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import axios from "axios";

const AddUser = ({ dismiss }) => {
  const [isLoading, setLoading] = useState(false);
  var [users, setUsers] = useState([]);
  var [userObjects] = useState([]);
  var [selectedProjUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const getPeople = () => {
    axios
      .get("/people/getPeople")
      .then((response) => {
        response.data.data.forEach((element) => {
          if(element.projectKey !== selectedProject.projectKey){
          users.push(element.name);
          userObjects.push(element);
          }
          else{
            selectedProjUsers.push(element)
          }
        });
        selectedProjUsers.forEach((obj) => {
          setUsers(users.filter((item) => item !== obj.name));
        })
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        dismiss();
      });
    }
    getPeople();
  }, [isLoading]);

  const validate = (values) => {
    setSelectedUser(values.user);
    const errors = {};
    if (!values.user) {
      errors.user = "Required";
    }
    return errors;
  };

  const formFields = [
    {
      size: 6,
      field: (
        <Autocomplete
          label="user"
          name="user"
          required={true}
          options={users}
          variant="outlined"
          getOptionValue={(option) => option}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
  ];

  function request() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const onSubmit = () => {
    let filteredUserObject = userObjects.filter((user) => user.name === selectedUser)[0]
    let name = filteredUserObject.name;
    let role = filteredUserObject.role;
    let projectKey = selectedProject.projectKey;
    filteredUserObject.projectKey = projectKey;
    axios.post('/people/addUser', {
      name,
      role,
      projectKey
    })
    .then(response => {
      console.log(response);
    }).catch(
        error => console.log(error.message)
      );

    dismiss(filteredUserObject);
    setLoading(true);
  };

  return (
    <>
      <div className="addUserHeading">
        <div className="addUser">Add User to the Project</div>
        <span className="icon-button-close" onClick={dismiss}>
          <CloseIcon />
        </span>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="addUserForm">
            <Grid
              container
              alignItems="flex-start"
              className="name-dropdown"
              spacing={2}>
              {formFields.map((item, id) => (
                <Grid item xs={item.size} key={id}>
                  {item.field}
                </Grid>
              ))}
            </Grid>
            <div className="buttons">
              <Button type="submit">Add User</Button>
              <Button onClick={dismiss}>Cancel</Button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default AddUser;