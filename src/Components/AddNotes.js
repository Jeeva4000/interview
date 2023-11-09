import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"



const Addnotes = ({ userData, setUserData }) => {
    const { token } = useParams();
    const [companyName, setCompanyName] = useState("")
    const [packages, setPackages] = useState("")
    const [location, setLocation] = useState("")
    const [position, setPosition] = useState("")
    const [skills, setSkills] = useState("")
    const [questions, setQuestions] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")



    const navigate = useNavigate()
    // const user = useContext(UserContext);
    async function postNewNotes() {
        const newNotes = {
            companyName,
            package: packages,
            location,
            position,
            skills,
            questions,
            postedBy: userData.name
        }
        const res = await fetch(`https://interview2.onrender.com/api/notes/add`, {
            method: "POST",
            body: JSON.stringify(newNotes),
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
        setUserData([...userData, data.data])
        setSucessMessage(data.message)
        navigate("/user")
    }

    return (
        <Base>
            <div className="add-notes-form">
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

                    <Button
                        className="add-notes-button"
                        type="submit" variant="contained"
                        onClick={postNewNotes}
                    >Add Notes</Button>

                    {error ?
                        <Typography color={"danger"}>
                            {error}
                        </Typography> : ""}

                    {sucessMsg ?
                        <Typography color={"danger"}>
                            {sucessMsg}
                        </Typography> : ""}
                </form>
            </div>
        </Base>
    )
}

export default Addnotes
