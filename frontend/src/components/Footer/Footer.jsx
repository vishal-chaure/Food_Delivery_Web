import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
     <div className="footer-content">
          <div className='footer-content-left'>
          <div className="logo-name">Yummie</div>
               <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum id itaque illo, accusamus atque officia? adipisicing elit. Necessitatibus nihil eos consectetur porro repellat unde!</p>
               <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
               </div>
          </div>
          <div className='footer-content-center'>
               <h2>COMPANY</h2>
               <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
               </ul>
          </div>
          <div className='footer-content-right'>
               <h2>GET IN TOUCH</h2>
               <ul>
                    <li>8374736373</li>
                    <li>dumy@gmail.com</li>
               </ul>
          </div>
     </div>
     <hr />
     <p className="footer-copyright">
          all right are reserved
     </p>
    </div>
  )
}

export default Footer