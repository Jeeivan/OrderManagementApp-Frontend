'use client'
import Navbar from "@/components/navbar/page"
import { useEffect, useState } from "react"
import { UserButton, useClerk } from "@clerk/nextjs";
import EnquiriesCard from "../enquiries/enquiries-card/page";
import EnquiriesCard2 from "../enquiries/enquiries-card-2/page";
import Footer from "@/components/footer/page";

function Messages() {
  const { user } = useClerk();

  return (
    <div>
      <Navbar />
      <div className="enquiries-container">
        <div className="enquiries-top">
          <div className="enquiries-left">
            <h2 style={{ display: "flex", justifyContent: 'center' }}>Active</h2>
            <EnquiriesCard />
          </div>
          <div className="enquiries-right">
            <h2 style={{ display: "flex", justifyContent: 'center' }}>History</h2>
            <EnquiriesCard2 user={user} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Messages
