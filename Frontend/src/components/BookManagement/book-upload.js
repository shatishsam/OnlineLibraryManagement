import React, { useState } from 'react';
import AWS from 'aws-sdk';
import AdminNavBar from "../../components/common/admin-header";

const S3_BUCKET = 'lms-file-upload-bucket-v2';
const REGION = 'us-east-1';


// AWS.config.update({
//     accessKeyId: 'ASIA6F3PUW2RYI2ZRZLV',
//     secretAccessKey: 'nPgOqZb3lhK8v92orSd1SAGE5KBtZZj7F4gceGbh'
// })

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const BookUpload = () => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read-write',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };
        myBucket.config.update({
            accessKeyId: 'ASIA6F3PUW2RVYQ7OK5P',
            secretAccessKey: '7DxDcA2lkGVtnvbzvrGB/N0qOqo5AUtTdWM2HJXe',
            sessionToken: 'FwoGZXIvYXdzEAEaDOSAaQgF6VhVK8BbeSLAAcU9Nij1aAhpvYFsibgqkxqhpxoBHr1lMeMuRyH48KkcwDbjyyWdt3tTkkTwrCG6ne0cPmXRBH2uiWTXEAPhCBO4s+GA71K7E4G4kflfFo0MrmxLzEgBHyw2PcAUCO+UiavOE7M8HzvojacrEGOz3l4qsYW6JsFMscFW5edUgWso7iIRFfDQF7avNk7oWuywrF0Ap9qRz1UrsTRVwbOXOrQF131/8Zff8kUqUm/m4ZWi4/sJEMrvizrFxiDS0nvL8ijrmeKWBjItrb/U9b4udsiNdPtT86XCEj5fWAVmnfJ8pz6ccP80AdJcuKcmcfxLPb9GWGJR'
        })

        // console.log(response);
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return (
        <div>
            <AdminNavBar />
            <br></br>
            <br></br>
            <div>Book Upload In progress {progress}%</div>
            <br></br>
            <input type="file" onChange={handleFileInput} />

            <button onClick={() => uploadFile(selectedFile)}> Upload Books</button>
        </div>
    );
}

export default BookUpload;