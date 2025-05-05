graph TD
    A[Start] --> B{User Authenticated?};
    B -- Yes --> C[Navigate to 'Campus Services'];
    B -- No --> D[Redirect to Login];
    D --> A;
    C --> E[Select 'Gym Subscription'];
    E --> F[System Displays Available Plans & Fees];
    F --> G[Select Desired Plan];
    G --> H[System Displays Payment Options];
    H --> I[Select Payment Method];
    I --> J{Process Payment};
    J -- Success --> K[System Activates Gym Membership];
    J -- Failure --> L[Display Payment Error];
    K --> M[System Records Subscription Details];
    M --> N[Display Confirmation & Digital Receipt];
    N --> O[Send Confirmation Notification];
    O --> P[End];
    L --> H; 

    subgraph Payment Sub-Process
        J --> J1[Connect to Payment Gateway];
        J1 --> J2[Submit Payment Details];
        J2 --> J3{Payment Authorized?};
        J3 -- Yes --> J_Success[Return Success];
        J3 -- No --> J_Fail[Return Failure];
        J_Success --> J;
        J_Fail --> J;
    end
