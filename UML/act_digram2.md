graph TD
    AA[Start] --> AB{User Authenticated?};
    AB -- Yes --> AC[Navigate to 'Clubs & Activities'];
    AB -- No --> AD[Redirect to Login];
    AD --> AA;
    AC --> AE[Browse/Search Clubs];
    AE --> AF[Select a Specific Club];
    AF --> AG[System Displays Club Details & Requirements];
    AG --> AH{Interested in Joining?};
    AH -- Yes --> AI[Select 'Join Club' Option];
    AH -- No --> AJ[Continue Browsing/Exit];
    AJ --> AE;
    AJ --> AZ[End];
    AI --> AK[Submit Membership Request];
    AK --> AL[System Notifies Club Administrator];
    AL --> AM{Club Administrator Action};
    subgraph Club Admin Approval Process
        direction LR
        AM --> AM1{Review Request};
        AM1 -- Approve --> AM2[Update Membership Status to 'Active'];
        AM1 -- Reject --> AM3[Keep/Set Status to 'Rejected'];
        AM2 --> AM4[Notify System];
        AM3 --> AM4;
    end
    AM4 --> AN[System Updates Student's Club Membership Record];
    AN --> AO{Request Approved?};
    AO -- Yes --> AP[System Awards Initial Points (Optional)];
    AO -- Yes --> AQ[Send Approval Confirmation Notification to Student];
    AO -- No --> AR[Send Rejection Notification to Student];
    AP --> AZ;
    AQ --> AZ;
    AR --> AZ;
