import React from 'react';
import './FooterCSS.css';

export default function Footer(){
    return(
        <div className="footer">
            <p>This is a Software Engineering Project by Group 1A.</p>
            <div className="names">
                <p>Group Members : &nbsp;</p>
                <p>Noah Rix | &nbsp;</p>
                <p>Rutvik Patel | &nbsp;</p>
                <p>Jonathan Hoffstead | &nbsp;</p>
                <p>Marcus Schumacher | &nbsp;</p>
                <p>Hardik Patel</p>
            </div>
        </div>
    );
}