import React, { useEffect, useState } from "react";
import XLSX from 'xlsx';
import { Document, Paragraph, Packer } from 'docx'; 
import fileDownload from 'js-file-download'; 
import "./download.css";

export default function Registeredusers() {
    const [items, setItems] = useState([]);
    const item=items.length;
 function logout(){
    window.location.href="/";
 }   
   
     
    useEffect(() => {
        getItems();
    }, []);
    
    async function handleDownloadWord(item) {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph(`Name: ${item.firstname}`),
                        new Paragraph(`Employee ID: ${item.id}`),
                        new Paragraph(`Photo: ${item.photo}`),
                        new Paragraph(`Description: ${item.description}`),
                    ],
                },
            ],
        });
        const blob = await Packer.toBlob(doc);
        fileDownload(blob, `${item.firstname}_data.docx`);
    };
    
    function getItems() {
        fetch("http://localhost:8000/login")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setItems(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function handleDownload(itemData) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([itemData]);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');
    }
    
    return (
        <div className="dmain">
            <button onClick={logout} className="editbutton">Logout</button>
            <center><img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" className="logo"></img></center>
             <center><h1>EMPLOYEES DETAILS</h1></center>
            <div>
                <h1>{item}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Phone</th>
                            <th>Photo</th>
                            <th>Description</th>
                            <th colspan="2">Download File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item.id}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.mail}</td>
                                        <td>{item.phone}</td>
                                        <td><img src={item.photo} alt="name"></img></td>
                                        <td>{item.description}</td>
                                        <td><button onClick={() => handleDownload(item)} className="editbutton">excel</button></td>
                                        <td><button onClick={() => handleDownloadWord(item)}  className="editbutton">DOCX</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}