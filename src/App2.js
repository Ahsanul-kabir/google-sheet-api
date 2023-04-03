import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";

function App2() {
    const [userData, setUserdata] = useState([]);
    const [delMessage, setDelmessage] = useState('')

    const getData = async () => {
        const reqData = await fetch("https://sheetdb.io/api/v1/iqeyp7vkwycgh");
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
        const checkedinputvalue = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].isChecked === true) {
                checkedinputvalue.push(parseInt(userData[i].Id));
            }
            else {
                // alert("Please select at least one checkbix");
            }
        }

        console.log('deleted data id', checkedinputvalue)


        for (let i = 0; i < checkedinputvalue.length; i++) {
            fetch(`https://sheetdb.io/api/v1/iqeyp7vkwycgh/Id/${JSON.stringify(checkedinputvalue[i])}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(() => getData())
                .then((data) => console.log(data))
        }


    }

    return (
        <React.Fragment>
            <Container className="content">
                <div className="row">
                    <div className="col-sm-12">
                        <h5 className="text-danger">{delMessage} </h5>
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

export default App2;