import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINKEDIN_CLIENT_ID, LS_LINKEDIN_TOKEN, WORK_INFO_URL } from './constants';
import { LinkedIn, useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { LinkedIn } from 'react-linkedin-login-oauth2';

export function WorkPage() {
    const [hasSignedIn, setHasSignedIn] = useState(false);
    const navigate = useNavigate();
    if(!hasSignedIn) {
        return (
            <LinkedIn
                clientId={LINKEDIN_CLIENT_ID}
                redirectUri={`${window.location.origin}/linkedin`}
                scope=''                
                onSuccess={(code) => {
                    localStorage.setItem(LS_LINKEDIN_TOKEN, code);
                    setHasSignedIn(true);
                    navigate(WORK_INFO_URL);
                }}
                onError={(error) => {
                    console.log(error);
                }}>
                {({ linkedInLogin }) => (
                    <img
                    onClick={linkedInLogin}
                    src={linkedin}
                    alt="Sign in with Linked In"
                    style={{ maxWidth: '180px', cursor: 'pointer' }}
                    />
                )}
            </LinkedIn>
        );
    }
}

export function WorkInfoPage() {
    return (
        <div>
            <h1>Du har logget inn</h1>
        </div>
    );
}