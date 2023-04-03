import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";

function Deletemultiplerow() {
    const [userData, setUserdata] = useState([]);
    const [delMessage, setDelmessage] = useState('')

    const [isChecked, setisChecked] = useState([]);
    const [delmsg, setDelmsg] = useState('');

    const getData = async () => {
        const reqData = await fetch("https://sheetdb.io/api/v1/iqeyp7vkwycgh");
        const resData = await reqData.json();
        setUserdata(resData);
    }

    useEffect(() => {
        getData();
    }, []);

    // const handleChange = (e) => {
    //     const { name, checked } = e.target;
    //     if (name === "allselect") {
    //         const checkedvalue = userData.map((user) => { return { ...user, isChecked: checked } });
    //         console.log(checkedvalue);
    //         setUserdata(checkedvalue);
    //     } else {
    //         const checkedvalue = userData.map((user) =>
    //             user.Name === name ? { ...user, isChecked: checked } : user);
    //         console.log(checkedvalue);
    //         setUserdata(checkedvalue);
    //     }


    // }

    // const handlealldelete = async () => {
    //     const checkedinputvalue = [];
    //     for (let i = 0; i < userData.length; i++) {
    //         if (userData[i].isChecked === true) {
    //             checkedinputvalue.push(parseInt(userData[i].Id));
    //         }
    //         else {
    //             // alert("Please select at least one checkbix");
    //         }
    //     }

    //     console.log('data', checkedinputvalue)

    //     fetch(`https://sheetdb.io/api/v1/iqeyp7vkwycgh/Id/${JSON.stringify(checkedinputvalue)}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((data) => getData())
    //         .then((data) => console.log(data))
    // }

    const handlecheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        if (checked) {
            setisChecked([...isChecked, value]);
        } else {
            setisChecked(isChecked.filter((e) => e !== value));
        }
    }


    const handlealldelete = async () => {
        console.log('arrar', isChecked);
        if (isChecked.length !== 0) {

            for (let i = 0; i <= isChecked.length; i++) {
                fetch(`https://sheetdb.io/api/v1/iqeyp7vkwycgh/Id/${isChecked[i]}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then((data) => getData())
                // .then((data) => setDelmessage())
            }

        } else {
            alert("please Select at least one check box !");
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
                                            <input type="checkbox" name="allselect" checked={!userData.some((user) => user?.isChecked !== true)} onChange={(e) => handlecheckbox(e)} />
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
                                            {/* <td> <input type="checkbox" name={getusers.Name} checked={getusers?.isChecked || false} onChange={handleChange} /></td> */}
                                            <td><input type='checkbox' value={getusers.Id} checked={getusers?.isChecked} onChange={(e) => handlecheckbox(e)} /></td>
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

export default Deletemultiplerow;