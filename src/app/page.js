'use client'
import Navbar from '../components/navbar/page';
import { UserButton, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import Footer from '../components/footer/page';
import LoadingOverlay from '../components/loading/page';


export default function Home() {
  const [profile, setProfile] = useState({})
  const { user } = useClerk();
  const [loading, setLoading] = useState(true);
  const business = localStorage.getItem('business')

  useEffect(() => {
    if (user) {
      console.log(business);
      async function getProfile() {
        try {
          const response = await fetch(`http://localhost:4000/cProfile/${user?.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (result == 'Cannot find customerProfile') {
            if (!business) {
              window.location.href = "/complete-profile"
            }else {
            async function getBusinessProfile() {
              try {
                const response = await fetch(`http://localhost:4000/bProfile/${user?.id}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                const result = await response.json();
                if (result == 'Cannot find businessProfile') {
                  if (business) {
                    window.location.href = "/complete-businessprofile";
                  }
                }
                else {
                  setProfile(result);

                }
              } catch (error) {
                console.log("Profile not found", error);
              }
            }
            getBusinessProfile()
          }
        }
          else {
            setProfile(result);
          }
        } catch (error) {
          console.log("Profile not found", error);
        }
      }

      getProfile();
    }
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(loadingTimeout);
  }, [user]);

  return (
    <div>
      {loading && <LoadingOverlay />}
      <Navbar />
      <main >
        <div className='body-home'>
          <div className="left-half">
            {/* <!-- Content for the left half goes here --> */}

          </div>
          <div className="right-half">
            {/* <!-- Content for the right half goes here --> */}
            <h1 style={{ transform: 'scalex(-1)', fontSize: '8vh' }} class="mb-4 font-extrabold text-gray-900 dark:text-black"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"></span> The better way <br /> to find a builder</h1>
            <p style={{ transform: 'scalex(-1)', width: '50vh' }} class="text-lg text-black lg:text-xl dark:text-gray-400">Trade+ makes it easy to find quality local businesses, reviewed by other homeowners, all across the UK.</p>
            {!profile?.owner && !profile?.firstName && <div style={{ transform: 'scalex(-1)' }}><button className='home-left-button' onClick={() => window.location.href = "/services"} style={{ marginRight: '4vh' }}>Services</button><button className='home-right-button' onClick={() => window.location.href = "/login"} style={{ marginRight: '4vh' }}>Trade SignUp</button></div>}
            {profile?.owner && <div style={{ transform: 'scalex(-1)' }}><button className='home-left-button' onClick={() => window.location.href = "/profile"} style={{ marginRight: '4vh' }}>Profile</button></div>}
            {profile?.firstName && <div style={{ transform: 'scalex(-1)' }}><button className='home-left-button' onClick={() => window.location.href = "/services"} style={{ marginRight: '4vh' }}>Services</button></div>}
          </div>
        </div>
        <div className='splitter'>
          <p className='splitter-p'>Don't just take our word for it</p>
          <div className='splitter-img'></div>
        </div>
        <div className='body-sections-header'>
          <h2>Place orders with your favourite Tradesmen</h2>
        </div>
        <div className='body-sections'>
          <div className="first-section">
            <div className='first-image'></div>
            <p className='p-section-header'>Search through are bussiness database</p>
            <p className='p-section'>Begin your journey by exploring our comprehensive database of skilled tradesmen in your area. No need to post a job – simply scroll through a wide array of professionals offering various services. </p>
          </div>
          <div className="second-section">
            <div className="second-image"></div>
            <p className='p-section-header'>Reviews and Recommendations</p>
            <p className='p-section'>Make informed decisions by delving into the experiences of previous customers. Each tradesman on our platform is accompanied by reviews and recommendations from individuals who have previously utilized their services. </p>
          </div>
          <div className="third-section">
            <div className="third-image"></div>
            <p className='p-section-header'>Connect with Your Preferred Tradesman</p>
            <p className='p-section'>Once you've identified the tradesman that aligns with your preferences and project requirements, connect with them directly. Our platform provides convenient communication channels, allowing you to discuss your project, ask questions, and obtain quotes.</p>
          </div>
        </div>
        <div className='builder-section-header-container'>
          <h2 className='builder-section-header'>Builder for any job!</h2>
        </div>
        <div className='builder-section'>
          <div className='builderSection'></div>
          <div className='builderSection'>
            <li className='bs'>Architectural Designers</li>
            <li className='bs'>Bathroom Fitters</li>
            <li className='bs'>Bricklayers</li>
            <li className='bs'>Builders</li>
            <li className='bs'>Carpenters & Joiners</li>
            <li className='bs'>Carpet & Lino Fitters</li>
            <li className='bs'>Chimney & Fireplace Specialists</li>
          </div>
          <div className='builderSection'>
            <li className='bs'>Conservatory Installers</li>
            <li className='bs'>Conversion Specialists</li>
            <li className='bs'>Damp Proofing Specialists</li>
            <li className='bs'>Decking Specialists</li>
            <li className='bs'>Demolition Specialists</li>
            <li className='bs'>Driveway Pavers</li>
            <li className='bs'>Electricians</li>
          </div>
          <div className='builderSection'>
            <li className='bs'>Extension Builders</li>
            <li className='bs'>Fascias & Soffits Specialists</li>
            <li className='bs'>Fencers</li>
            <li className='bs'>Flooring Fitters</li>
            <li className='bs'>Gardeners</li>
            <li className='bs'>Gas Engineers</li>
            <li className='bs'>Groundworkers</li>
          </div>
          <div className='builderSection'></div>

        </div>
        <div className='search-section'>
          <h2 className='search-section-header'>Pick your next home improvement today? <button onClick={() => window.location.href = "/services"}>View Services</button></h2>
        </div>
      </main>
      {/* {profile?.firstName &&
        <main style={{ height: '115vh' }}>
          <section id="text-side">
            <h1 style={{ color: 'white', fontSize: '20vh', marginTop: '-20vh' }}>Welcome</h1>
            <p style={{ fontSize: '3vh' }}>
              Trade+ gives you access to Thousands<br /> of companies at unbeatable prices
            </p>
            <button>Learn more</button>
            <div className="clients-logos">
              <img src="/company-logo-1-removebg-preview.png" />
              <img src="/company-logo-2-removebg-preview.png" />
              <img src="/company-logo-3-removebg-preview.png" />
              <img src="/company-logo-4-removebg-preview.png" />
            </div>
          </section>
          <section id="img-side">
            <img
              className="desktop-img"
              src="https://i.postimg.cc/0Nt97Bhf/image-hero-desktop.png"
            />
            <img
              className="mobile-img"
              src="https://i.postimg.cc/ZnYfhwwW/image-hero-mobile.png"
            />
          </section>
          <div className="footer">
          </div>
        </main>
      } {profile?.owner &&
        <main style={{ height: '115vh' }}>
          <section id="text-side">
            <h1 style={{ color: 'white', fontSize: '8vh', marginTop: '-5vh', fontFamily: 'Titillium Web' }}>Sell Sell Sell</h1>
            <p style={{ fontSize: '3vh' }}>
              Get ready to boost your business into overdrive
            </p>
            <button>Learn more</button>
            <div className="clients-logos">
              <img src="/company-logo-1-removebg-preview.png" />
              <img src="/company-logo-2-removebg-preview.png" />
              <img src="/company-logo-3-removebg-preview.png" />
              <img src="/company-logo-4-removebg-preview.png" />
            </div>
          </section>
          <section id="img-side">
            <img
              className="desktop-img"
              src="https://i.postimg.cc/0Nt97Bhf/image-hero-desktop.png"
            />
            <img
              className="mobile-img"
              src="https://i.postimg.cc/ZnYfhwwW/image-hero-mobile.png"
            />
          </section>
          <div className="footer">
          </div>
        </main>
      } */}
      <Footer />
    </div>
  );
}
