sequenceDiagram
    actor Student
    participant AppUI_Student
    participant ClubController
    participant ClubService
    participant ClubDB
    participant ClubMembershipService
    participant MembershipDB
    participant NotificationService
    actor ClubAdmin
    participant AppUI_Admin

    Student->>AppUI_Student: Navigate to 'Clubs'
    AppUI_Student->>ClubController: requestClubList()
    ClubController->>ClubService: getAvailableClubs()
    ClubService->>ClubDB: findAllClubs()
    ClubDB-->>ClubService: clubList
    ClubService-->>ClubController: clubList
    ClubController->>AppUI_Student: displayClubList(clubList)
    AppUI_Student->>Student: Show Clubs

    Student->>AppUI_Student: Select Club(clubID)
    AppUI_Student->>ClubController: requestClubDetails(clubID)
    ClubController->>ClubService: getClubDetails(clubID)
    ClubService->>ClubDB: findClubByID(clubID)
    ClubDB-->>ClubService: clubDetails
    ClubService-->>ClubController: clubDetails
    ClubController->>AppUI_Student: displayClubDetails(clubDetails)
    AppUI_Student->>Student: Show Club Details

    Student->>AppUI_Student: Click 'Join Club'
    AppUI_Student->>ClubController: submitJoinRequest(studentID, clubID)
    ClubController->>ClubMembershipService: createPendingMembership(studentID, clubID)
    ClubMembershipService->>MembershipDB: saveMembership(studentID, clubID, status='Pending')
    MembershipDB-->>ClubMembershipService: saveConfirmation
    ClubMembershipService-->>ClubController: requestSubmittedConfirmation
    ClubController->>NotificationService: notifyClubAdmin(clubID, studentID, requestID)
    NotificationService-->>ClubAdmin: (Sends Email/Push Notification)
    ClubController->>AppUI_Student: displayRequestSubmittedMessage()
    AppUI_Student->>Student: Show "Request Submitted"

    loop Admin Approval Process
        ClubAdmin->>AppUI_Admin: View Pending Requests(clubID)
        AppUI_Admin->>ClubController: getPendingRequests(clubID)
        ClubController->>ClubMembershipService: findPendingMemberships(clubID)
        ClubMembershipService->>MembershipDB: queryMemberships(clubID, status='Pending')
        MembershipDB-->>ClubMembershipService: pendingList
        ClubMembershipService-->>ClubController: pendingList
        ClubController->>AppUI_Admin: displayPendingRequests(pendingList)
        AppUI_Admin->>ClubAdmin: Show Pending Requests

        ClubAdmin->>AppUI_Admin: Approve/Reject Request(membershipID, decision)
        AppUI_Admin->>ClubController: processMembershipDecision(membershipID, decision)
        ClubController->>ClubMembershipService: updateMembershipStatus(membershipID, newStatus)
        ClubMembershipService->>MembershipDB: updateStatus(membershipID, newStatus)
        MembershipDB-->>ClubMembershipService: updateConfirmation
        ClubMembershipService-->>ClubController: statusUpdateConfirmation
        ClubController->>NotificationService: notifyStudent(studentID, clubID, decision)
        NotificationService-->>Student: (Sends Email/Push Notification about decision)
        ClubController->>AppUI_Admin: displayActionConfirmation()
        AppUI_Admin->>ClubAdmin: Show Confirmation
    end
