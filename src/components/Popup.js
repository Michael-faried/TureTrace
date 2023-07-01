import React ,{useState} from "react";
import '../components/Popup.css'
import {UploadProducts_send} from '../web3Client';


function Popup(props){
    const [ProductName, setProductName] = useState('');
    const [ProductDesc, setProductDesc] = useState('');
    const [ProductID, setProductID] = useState('');
    const [CompanyName, setCompanyName] = useState('');

    //product items uploaded to blockchain
    const submitUpload = () => {
        const hash= UploadProducts_send(parseInt(ProductID,10),ProductName,ProductDesc,CompanyName);
        console.log(hash);
        props.setTrigger(false);
        // add ProductName to URL as a parameter
        window.location.href = `/other-page?productName=${encodeURIComponent(ProductName)}`;
     }
    return (props.trigger)?(
        <>
        <div className="popup">
        <div className="popup-inner">
                <textarea
                    onChange={(event) => {setProductName(event.target.value)}}
                    className="myText"
                    placeholder="enter product name">
                </textarea>
                <textarea
                    onChange={(event) => {setProductDesc(event.target.value)}}
                    className="myText"
                    placeholder="enter product description">
                </textarea>
                <textarea
                    onChange={(event) => {setProductID(event.target.value)}}
                    className="myText"
                    placeholder="enter product ID">
                </textarea>
                <button onClick={submitUpload} className="btn">Upload</button>
                <button className="btn--close" onClick={()=>props.setTrigger(false)}>Close</button>
                {props.childern}
        </div>
        </div>
        </>
    ): "";
}
export default Popup