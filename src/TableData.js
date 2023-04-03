import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";

function TableData() {
    const [userData, setUserdata] = useState([]);
    const [delMessage, setDelmessage] = useState('')

    const getData = async () => {
        const reqData = await fetch("https://sheetdb.io/api/v1/2pb343cavinfb");
        const resData = await reqData.json();
        setUserdata(resData);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allselect") {
            const checkedvalue = userData.map((user) => { return { ...user, isChecked: checked } });
            console.log('allselect', checkedvalue);
            setUserdata(checkedvalue);
        } else {
            const checkedvalue = userData.map((user) =>
                user.Name === name ? { ...user, isChecked: checked } : user);
            console.log('single select', checkedvalue);
            setUserdata(checkedvalue);
        }
    }

    const handlealldelete = async () => {
        for (let i = 0; i < userData?.length; i++) {
            const user = userData[i];
            if (user?.isChecked) {
                try {
                    const url = `https://sheetdb.io/api/v1/2pb343cavinfb/Id/${user.Id}`;
                    const data = await fetch(url, {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });
                    const res = await data.json();
                    if (res.deleted === 1) {
                        getData();
                        console.log(`User ${user.Id} Successfully Deleted`);
                    } else {
                        console.log(`User ${user.Id} Delete Failed`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        // getData();
    };

    return (
        <React.Fragment>
            <Container className="content">
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-danger mb-3" onClick={() => { handlealldelete() }}>Delete </button>
                        <form className="form w-100">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" name="allselect" checked={!userData.some((user) => user?.isChecked !== true)} onChange={handleChange} />
                                        </th>
                                        <th>Sr. No</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((getusers, index) => (
                                        <tr key={index}>
                                            <td> <input type="checkbox" name={getusers.Name} checked={getusers?.isChecked || false} onChange={handleChange} /></td>
                                            <td>{index + 1} </td>
                                            <td>{getusers.Name} </td>
                                            <td>{getusers.Phone} </td>
                                            <td>{getusers.Address} </td>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default TableData;