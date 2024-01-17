'use client'
import Navbar from "@/components/navbar/page"
import LoadingOverlay from '../../components/loading/page';
import { useEffect, useState} from "react";
import EnquiriesCard from "./enquiries-card/page";
import EnquiriesCard2 from "./enquiries-card-2/page";

function Enquiries() {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);
    })

    return (
        <div>
            {loading && <LoadingOverlay />}
            <Navbar />
            <div className="enquiries-container">
                <div className="enquiries-header">Enquiries</div>
                <div className="enquiries-top">
                    <div className="enquiries-left">
                        <h2 style={{ display: "flex", justifyContent: 'center' }}>Active</h2>
                        <EnquiriesCard />
                    </div>
                    <div className="enquiries-right">
                        <h2 style={{ display: "flex", justifyContent: 'center' }}>History</h2>
                        <EnquiriesCard2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enquiries
