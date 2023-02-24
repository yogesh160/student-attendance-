import React, { useState } from "react";
import {
  Table,
  Container,
  TableCell,
  TableRow,
  tableCellClasses,
  Paper,
  TableHead,
  TableContainer,
  TableBody,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0b3155",
    color: "white",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F7F7F7",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F7F7F7",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StudentTable = () => {
  const studentDetails = JSON.parse(localStorage.getItem("STUDATA"));
  const [showBox, setShowBox] = useState(false);
  const [data, setData] = useState({
    stuRoll: "",
    stuName: "",
    checkInTime: "",
    checkOutTime: "",
  });
  const [updateStud, setUpdateStud] = useState(studentDetails);
  const [deleteStud, setDeleteStud] = useState(studentDetails);

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const getData = (id) => {
    let getDtls = studentDetails?.filter((stud, i) => stud.stuRoll === id);
    getDtls?.map((curItem) =>
      setData({
        ...curItem,
        stuRoll: curItem.stuRoll,
        stuName: curItem.stuName,
        checkInTime: curItem.checkInTime,
        checkOutTime: curItem.checkOutTime,
      })
    );
    setShowBox(true);
  };

  const updateDataStudentDetails = () => {
    setUpdateStud(
      updateStud?.map((curStud) => {
        if (curStud.stuRoll == data.stuRoll) {
          curStud.stuRoll = data.stuRoll;
          curStud.stuName = data.stuName;
          curStud.checkInTime = data.checkInTime;
          curStud.checkOutTime = data.checkOutTime;
        }
        return curStud;
      }),

      setData({
        stuRoll: "",
        stuName: "",
        checkInTime: "",
        checkOutTime: "",
      })
    );
    localStorage.setItem("STUDATA", JSON.stringify(updateStud));
    setShowBox(false);
  };

  const deleteStudInfo = (event, removeindex) => {
    const studentDeleted = deleteStud?.filter((_, index) => {
        return index !== removeindex;
    });
    localStorage.setItem("STUDATA", JSON.stringify(studentDeleted));
  }

  return (
    <Container container="true" spacing={2}>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          background: "#0b3155",
          color: "white",
          padding: "10px 0px",
          borderRadius: "5px",
        }}
      >
        Student Attendance
      </Box>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 5,
          marginTop: "40px",
          marginBottom: "70px",
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Student Roll No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Student Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Check In Time
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Check Out Time
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  ACTIONS
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentDetails?.map((item, index) => {
                return (
                  <>
                    {showBox ? (
                      <Dialog
                        open={showBox}
                        onClose={showBox}
                        aria-labelledby="form-dialog-title"
                        BackdropProps={{
                          style: { backgroundColor: "transparent" },
                        }}
                      >
                        <DialogTitle id="form-dialog-title">
                          Update Student Details
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText
                            sx={{
                              margin: "5px 0px",
                            }}
                          >
                            To update your data, please enter a new task.
                          </DialogContentText>

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
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{
                              border: "2px solid rgba(0, 0, 0, 0.4)",
                              color: "rgba(0, 0, 0, 0.4)",
                              fontWeight: "bold",
                              "&:hover": {
                                color: "#fff",
                                background: "rgb(11, 136, 42)",
                                border: "2px solid #fff",
                              },
                            }}
                            onClick={() => updateDataStudentDetails()}
                          >
                            Update
                          </Button>
                        </DialogActions>
                      </Dialog>
                    ) : (
                      <></>
                    )}
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {item.stuRoll}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {item.stuName}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {item.checkInTime}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {item.checkOutTime}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <EditIcon
                          sx={{
                            fontSize: "25px",
                            padding: "5px",
                            borderRadius: "50%",
                            "&:hover": {
                              cursor: "pointer",
                              background: "#e3123f",
                              color: "#f5e9eb",
                            },
                          }}
                          onClick={() => {
                            getData(item.stuRoll);
                          }}
                        />
                        <DeleteIcon
                          sx={{
                            fontSize: "25px",
                            padding: "5px",
                            borderRadius: "50%",
                            "&:hover": {
                              cursor: "pointer",
                              background: "#e3123f",
                              color: "#f5e9eb",
                            },
                          }}
                          onClick={(e) => {
                            deleteStudInfo(e, index);
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default StudentTable;
