import {
  Card,
  CardContent,
  Box,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { stuInfo } from "../../context/StuData";

const InputBox = () => {
  const [data, setData] = useState({
    stuRoll: "",
    stuName: "",
    checkInTime: "",
    checkOutTime: "",
  });
  const [addStudentError, setAddStudentError] = useState({});

  let time = new Date();
  time =
    time.getHours() > 12
      ? time.getHours() - 12 + ":" + time.getMinutes() + " PM"
      : time.getHours() + ":" + time.getMinutes() + " AM";

  let checkOut = new Date();
  checkOut =
    checkOut.getHours() > 12
      ? checkOut.getHours() - 12 + 5 + ":" + checkOut.getMinutes() + " PM"
      : checkOut.getHours() + ":" + checkOut.getMinutes() + " AM";

  useEffect(() => {
    localStorage.setItem("STUDATA", JSON.stringify(stuInfo));
  }, []);

  const validation = (data) => {
    const error = {};

    if (!data.stuRoll) {
      error.stuRoll = "Roll No is Requried!";
    }

    if (!data.stuName) {
      error.stuName = "Student Name is Requried!";
    }

    return error;
  };

  const addStudent = () => {
    setAddStudentError(validation(data));

    if (Object.keys(addStudentError).length === 0) {
      const studentDtls = JSON.parse(localStorage.getItem("STUDATA")) || [];
      const currentStudent = data;
      currentStudent.checkInTime = time;
      currentStudent.checkOutTime = checkOut;

      studentDtls.push(currentStudent);
      localStorage.setItem("STUDATA", JSON.stringify(studentDtls));
    }

    setData({
      stuRoll: "",
      stuName: "",
      checkInTime: "",
      checkOutTime: "",
    });
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Card
        sx={{
          minWidth: 375,
          boxShadow: "0 0.5rem 0.3rem rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0px",
            color: "#0b3155",
            textShadow: "0 0.4rem 0.3rem rgba(0, 0, 0, 0.2)",
          }}
        >
          Student Form
        </Box>
        <CardContent>
          <Box>
            <TextField
              id="outlined-basic"
              label="Student Roll No.:"
              size="medium"
              variant="outlined"
              type="number"
              name="stuRoll"
              value={data.stuRoll}
              onChange={handleOnChange}
              sx={{
                width: "100%",
                fontSize: "15px",
                padding: "5px",
                color: "#0b3155",
                ":focus": {
                  outline: "none",
                },
                margin: "5px 0px",
              }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Student Name:"
              size="medium"
              variant="outlined"
              type="text"
              name="stuName"
              value={data.stuName}
              onChange={handleOnChange}
              sx={{
                width: "100%",
                fontSize: "15px",
                padding: "5px",
                color: "#0b3155",
                ":focus": {
                  outline: "none",
                },
                margin: "5px 0px",
              }}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{
              margin: "auto",
              display: "block",
              marginTop: "10px",
              transition: "all 0.3s linear",
              "&:hover": {
                letterSpacing: "4px",
                color: "white",
                background: "#0b3155",
              }
            }}
            onClick={addStudent}
          >
            Add
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InputBox;
