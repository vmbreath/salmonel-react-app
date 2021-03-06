import React, {useEffect} from "react";

function Admin() {
    async function sendData(event) {
        const formData  = new FormData();
        const data = event.target.files;
        console.log('data',data[0])
        //for(const name in data) {
            formData.append('table', data[0]);
        //}
        const url = 'https://salmonel-heroku.herokuapp.com/uploadtable';
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        console.log(response)
    }

    return (
            <div className="admin">
                <h2>
                    ADMIN
                </h2>
                <input onChange={sendData} type="file" id="image_uploads"/>
            </div>
    );
}

export default Admin;
