graph TD
    AltA[Start] --> AltB{User Authenticated?};
    AltB -- Yes --> AltC[Navigate to 'Gym Subscription' Section];
    AltB -- No --> AltD[Redirect to Login];
    AltD --> AltA;
    AltC --> AltE[System Checks & Displays Current Gym Subscription Status];
    AltE --> AltF{Has Active/Expired Subscription?};
    AltF -- No (New User) --> AltG[Display Available Plans for New Subscription];
    AltF -- Yes (Existing/Expired) --> AltH[Display Renewal Options / New Plans];
    AltG --> AltI[Select Desired Plan];
    AltH --> AltI;
    AltI --> AltJ[System Displays Payment Options];
    AltJ --> AltK[Select Payment Method];
    AltK --> AltL{Process Payment};
    subgraph Payment Sub-Process
        AltL --> L1[Connect to Payment Gateway];
        L1 --> L2[Submit Payment Details];
        L2 --> L3{Payment Authorized?};
        L3 -- Yes --> L_Success[Return Success];
        L3 -- No --> L_Fail[Return Failure];
        L_Success --> AltL;
        L_Fail --> AltL;
    end
    AltL -- Success --> AltM[System Activates/Renews Gym Membership];
    AltL -- Failure --> AltN[Display Payment Error];
    AltM --> AltO[System Records/Updates Subscription Details];
    AltO --> AltP[Display Confirmation & Digital Receipt];
    AltP --> AltQ[Send Confirmation Notification];
    AltQ --> AltZ[End];
    AltN --> AltJ; %% Option to retry payment method or choose another
