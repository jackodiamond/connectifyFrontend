import React from "react";
import { v1 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';

const CreateRoom = (props) => {
    const navigate = useNavigate();

    function create() {
        let id = uuid();
        id = "abc"
        navigate(`/room/${id}`);
    }

    return (
        <button onClick={create}>Create Room</button>
    );
}

export default CreateRoom;