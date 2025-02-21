import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCheck, FaCopy } from "react-icons/fa";


const CoppyOrder = ({ orderCode }) => {

    const [coppytStatus, setCoppyStatus] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCoppy = () => {

        setCoppyStatus(true);
        setCopied(true);    
        setTimeout(() => {
            setCoppyStatus(false);
            setCopied(false); 
        }, 3000);
    };

    return (
        <>
            
            <CopyToClipboard text={orderCode} onCopy={handleCoppy}>
                <button className="btn btn-sm btn-outline-secondary ms-2">
                    {coppytStatus ? <FaCheck /> : <FaCopy />}
                </button>
            </CopyToClipboard>
            {copied && <span className="ms-2 text-success">Đã sao chép mã đơn hàng {orderCode}</span>} {/* Render message when copied is true */}
        </>
    )


}
export default CoppyOrder;
