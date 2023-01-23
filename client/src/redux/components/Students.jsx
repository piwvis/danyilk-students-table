import React, {useState} from 'react';
import {
    useAddNewStudentMutation,
    useDeleteAllStudentsMutation, useDeleteStudentMutation,
    useEditStudentMutation,
    useGetStudentsQuery
} from "../../api/Api";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Students() {
    const {data, error, isLoading} = useGetStudentsQuery()
    const [addNewStudent] = useAddNewStudentMutation()
    const [deleteStudents] = useDeleteAllStudentsMutation()
    const [editStudent] = useEditStudentMutation();
    const [deleteStudent] = useDeleteStudentMutation()

    let [newStudent, setNewStudent] = useState({
        name: "",
        surname: "",
        studentId: "",
        _id: ""
    })
    let [addStudentDialog, setAddStudentDialog] = useState(false)
    let [editStudentDialog, setEditStudentDialog] = useState(false)

    const addStudent = () => {
        addNewStudent({name: newStudent.name, surname: newStudent.surname, studentId: newStudent.studentId})
        setAddStudentDialog(false);
    }

    const deleteStudentData = (_id) => {
        deleteStudent(_id)
    }

    const editStudentData = () => {
        editStudent(newStudent)
        setEditStudentDialog(false);
    }

    const addStudentDialogOpen = () => {
        setAddStudentDialog(true);
    }

    const addStudentDialogClose = () => {
        setAddStudentDialog(false);
    }

    const editStudentDialogOpen = (student) => {
        setNewStudent({...newStudent, name: student.name, surname: student.surname, studentId: student.studentId, _id: student._id})
        setEditStudentDialog(true);
    }

    const editStudentDialogClose = () => {
        setEditStudentDialog(false);
    }

    const removeStudents = () => {
        deleteStudents()
    }

    return (
        <>
            <Dialog onClose={addStudentDialogClose} open={addStudentDialog}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent style={{minWidth: "300px"}}>
                    <Stack padding={"10px"} spacing={3}>
                        <TextField fullWidth variant="outlined" label="Student Name"
                                   onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}>
                            Name
                        </TextField>
                        <TextField fullWidth variant="outlined" label="Student Surname"
                                   onChange={(e) => setNewStudent({...newStudent, surname: e.target.value})}>
                            Surname
                        </TextField>
                        <TextField fullWidth variant="outlined" label="Student Id"
                                   onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}>
                            Student Id
                        </TextField>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={addStudent}>Add Student</Button>
                    <Button onClick={addStudentDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog onClose={editStudentDialogClose} open={editStudentDialog}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent style={{minWidth: "300px"}}>
                    <Stack padding={"10px"} spacing={3}>
                        <TextField value={newStudent.name} fullWidth variant="outlined" label="Student Name"
                                   onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}>
                            Name
                        </TextField>
                        <TextField value={newStudent.surname} fullWidth variant="outlined" label="Student Surname"
                                   onChange={(e) => setNewStudent({...newStudent, surname: e.target.value})}>
                            Surname
                        </TextField>
                        <TextField value={newStudent.studentId} fullWidth variant="outlined" label="Student Id"
                                   onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}>
                            Student Id
                        </TextField>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={editStudentData}>Edit Student</Button>
                    <Button onClick={addStudentDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <h1 style={{color: "white"}}>Arsen Liush 54106</h1>

            <TableContainer sx={{width: "1200px", margin: " 0 auto"}} component={Paper}>
                <Table>
                    <TableHead style={{backgroundColor: "black"}}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>
                                Student Name
                            </TableCell>
                            <TableCell style={{color: "white"}}>
                                Student Surname
                            </TableCell>
                            <TableCell style={{color: "white"}}>
                                Student Id
                            </TableCell>
                            <TableCell align="center" style={{color: "white"}}>
                                <Button variant={"contained"} onClick={addStudentDialogOpen}>Add Student</Button>
                            </TableCell>
                            <TableCell align="center" style={{color: "white"}}>
                                <Button variant={"contained"} onClick={removeStudents}>Remove All Students</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ? data.map((student) =>
                            <TableRow key={student._id}>
                                <TableCell>
                                    {student.name}
                                </TableCell>
                                <TableCell>
                                    {student.surname}
                                </TableCell>
                                <TableCell>
                                    {student.studentId}
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant={"contained"} onClick={() => editStudentDialogOpen(student)}><EditIcon/></Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant={"contained"} onClick={() => deleteStudentData(student._id)}><DeleteIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );

}

export default Students;