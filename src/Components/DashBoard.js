import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate } from "react-router-dom"
import { Paper, Typography } from "@mui/material";
const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true })
        }
        let token = localStorage.getItem("token")
        const fetchAllData = async () => {
            const res = await fetch(`https://interview2.onrender.com/api/notes/all`, {
                method: "GET",
                headers: {
                    "x-auth-token": token
                }
            });
            const data = await res.json()
            if (!data.data) {
                setError(data.message)

            }
            setNotes(data.data)
            console.log(notes)
        }
        fetchAllData()
    }, [navigate, notes])
    return (
        <div className="dashboard-container">
            <Base>
                {notes && (
                    <div className="notes-container">
                        {notes?.map((data, index) => (
                            <Paper
                                className="custom-paper"
                                elevation={6}
                                key={data._id}
                                sx={{
                                    padding: '16px',
                                    marginBottom: '16px',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                }}
                            >
                                <p>Company name: {data.companyName}</p>
                                <p>Location: {data.location}</p>
                                <p>Position: {data.position}</p>
                                <p>Package: {data.package}</p>
                                <p>Skills: {data.skills}</p>
                                <p>Questions: {data.questions}</p>
                                {/* <p>Posted by: {data.user.name}</p> */}
                                <p>Posted by: {data.user ? data.user.name : 'Unknown User'}</p>
                                <p>Date: {data.date}</p>
                            </Paper>

                        ))}
                    </div>
                )}


                {error ?
                    <Typography color={"danger"}>
                        {error}
                    </Typography> : ""}
            </Base>
        </div>
    )
}

export default Dashboard
