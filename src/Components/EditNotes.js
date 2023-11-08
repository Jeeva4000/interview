import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate, useParams } from "react-router-dom"
import { Button, TextField, Typography } from "@mui/material"
const EditPage = ({ userData, setUserData }) => {
    const [companyName, setCompanyName] = useState("")
    const [packages, setPackages] = useState("")
    const [location, setLocation] = useState("")
    const [position, setPosition] = useState("")
    const [skills, setSkills] = useState("")
    const [questions, setQuestions] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")
    const { id, token } = useParams();
    const navigate = useNavigate()
    console.log()
    useEffect(() => {
        const data = userData?.find((data) => data._id === id)
        if (data) {
            setCompanyName(data.companyName)
            setPackages(data.package)
            setLocation(data.location)
            setPosition(data.position)
            setSkills(data.skills)
            setQuestions(data.questions)
        }
    }, [id, userData])

    async function handleEditNotes() {

        const editedNotes = {
            companyName,
            package: packages,
            location,
            position,
            skills,
            questions
        }

        const res = await fetch(`http://localhost:9000/api/notes/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify(editedNotes),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            }
        });

        const data = await res.json();
        if (!data.data) {
            setError(data.message)
            setSucessMessage("")
        }
        const userindex = userData?.findIndex((data, idx) => data._id === id);
        userData[userindex] = data.data;
        await setUserData([...userData])
        setSucessMessage(data.message)
    }

    return (
        <Base>
            <form>
                <TextField label="Company Name" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder="Enter the Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text" />
                <TextField label="Packages" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder="Enter the package"
                    type="text"
                    value={packages}
                    onChange={(e) => setPackages(e.target.value)}
                />
                <TextField label="Location" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder="Enter the location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField label="Positions" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder="Enter the position"
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <TextField label="Skills" variant="outlined" fullWidth sx={{ m: 1 }}
                    placeholder="Enter the skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />
                <TextField label="Questions"
                    variant="outlined" fullWidth sx={{ m: 1 }}
                    inputProps={{ sx: { height: 100 } }}
                    placeholder="Enter the questions"
                    type="text"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                />
                <div className="btn3">
                    <Button
                        type="submit" variant="contained"
                        onClick={handleEditNotes}
                    >Edit Notes</Button>


                    <Button
                        type="submit" variant="contained"
                        onClick={() => navigate("/user")}
                    >Home</Button>
                </div>

                {error ?
                    <Typography color={"danger"}>
                        {error}
                    </Typography> : ""}

                {sucessMsg ?
                    <Typography color={"success"}>
                        {sucessMsg}
                    </Typography> : ""}
            </form>

        </Base>
    )
}

export default EditPage
