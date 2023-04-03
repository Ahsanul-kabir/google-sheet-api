import React, { useState, useEffect } from "react";
// import { useHistory} from 'react-router-dom';
import axios from "axios";
import { Container } from "react-bootstrap";

function App3() {
    //   const history= useHistory();
    const [getuserdata, setUserdata] = useState([]);
    const [isChecked, setisChecked] = useState([]);
    const [delmsg, setDelmsg] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const reqData = await fetch("https://sheetdb.io/api/v1/zwa7farh1wj5p");
            const resData = await reqData.json();
            //console.log(resData);
            setUserdata(resData);
        }
        getUser();
    }, []);

    const handlecheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        if (checked) {
            setisChecked([...isChecked, value]);
        } else {
            setisChecked(isChecked.filter((e) => e !== value));
        }
    }

    const alldelete = async () => {
        //console.log(isChecked);
        if (isChecked.length !== 0) {


            fetch(`https://sheetdb.io/api/v1/zwa7farh1wj5p/Id/${JSON.stringify(isChecked)}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
            // .then((data) => getData())
            // .then((data) => setDelmessage())


            // const responce = await axios.post(`https://sheetdb.io/api/v1/zwa7farh1wj5p/Id`, JSON.stringify(isChecked));
            // setDelmsg(responce.data.msg);
            // setTimeout( ()=>{
            //   history.push('/user');
            // }, 2000);
        } else {
            alert("please Select at least one check box !");
        }

    }

    return (
        <React.Fragment>
            <Container className="content">
                <div className="row">
                    <div className="col-sm-12 mt-2">

                        <h5 className="text-danger">{delmsg} </h5>

                        <button className="btn btn-danger" onClick={alldelete}>Delete</button>

                        <table className="table text-white table-bordered mt-2">
                            <thead>
                                <tr>
                                    <th scope="col"> #</th>
                                    <th scope="col">Sr.No</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">User Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getuserdata.map((userrecords, index) => (
                                    <tr key={index}>
                                        <td><input type='checkbox' value={userrecords.Id} checked={userrecords.isChecked} onChange={(e) => handlecheckbox(e)} /></td>
                                        <th scope="row">{index + 1} </th>
                                        <td>{userrecords?.Name}</td>
                                        <td>{userrecords?.Phone}</td>
                                        <td>{userrecords?.Address}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default App3;