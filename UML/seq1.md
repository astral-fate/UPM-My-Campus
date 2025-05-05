sequenceDiagram
    actor Student
    participant AppUI_Student
    participant ClubController
    participant ClubService / ClubDB
    participant ClubMembershipService / MembershipDB
    participant NotificationService

    Student->>AppUI_Student: Request to Browse Clubs
    AppUI_Student->>ClubController: getClubList()
    ClubController->>ClubService / ClubDB: Find Available Clubs
    ClubService / ClubDB-->>ClubController: clubList
    ClubController->>AppUI_Student: displayClubList(clubList)
    AppUI_Student-->>Student: Show Club List

    Student->>AppUI_Student: Select Club (clubID)
    AppUI_Student->>ClubController: getClubDetails(clubID)
    ClubController->>ClubService / ClubDB: Find Club Details (clubID)
    ClubService / ClubDB-->>ClubController: clubDetails
    ClubController->>AppUI_Student: displayClubDetails(clubDetails)
    AppUI_Student-->>Student: Show Club Details

    Student->>AppUI_Student: Click 'Join Club'
    AppUI_Student->>ClubController: submitJoinRequest(studentID, clubID)
    ClubController->>ClubMembershipService / MembershipDB: Create Pending Membership(studentID, clubID)
    ClubMembershipService / MembershipDB-->>ClubController: Confirmation (Request Submitted)
    ClubController->>NotificationService: Notify Club Admin (New Request)
    Note right of NotificationService: Admin notified externally
    ClubController->>AppUI_Student: displayRequestSubmittedMessage()
    AppUI_Student-->>Student: Show "Request Submitted"

    Note over ClubController, Student: --- Time Passes; Admin reviews and makes decision (off-diagram) ---

    Note over ClubController: System receives processed decision
    ClubController->>ClubMembershipService / MembershipDB: Update Membership Status(membershipID, newStatus)
    ClubMembershipService / MembershipDB-->>ClubController: Confirmation (Status Updated)
    ClubController->>NotificationService: Notify Student (Decision: Approved/Rejected)
    NotificationService-->>Student: (Delivers Notification)
