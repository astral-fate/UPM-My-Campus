classDiagram
    direction LR

    class User {
        +userID: string
        +username: string
        -passwordHash: string
        +name: string
        +email: string
        +role: string
        +login() bool
        +logout() void
        +updateProfile() void
    }

    class Student {
        <<User>>
        +studentID: string
        +subscribeGym() void
        +viewGymSubscription() GymMembership
        +rentLocker() void
        +viewLockerRental() LockerRental[]
        +browseClubs() Club[]
        +joinClub(clubID: string) void
        +viewClubMemberships() ClubMembership[]
        +viewRewardPoints() int
        +viewRewardHistory() RewardTransaction[]
        +redeemPoints(points: int, reward: string) bool
        +viewNotifications() Notification[]
    }

    class CampusServicesManager {
        <<User>>
        +employeeID: string
        +manageGymSubscription(studentID: string, action: string) void
        +manageLocker(lockerID: string, action: string) void
        +viewLockerAvailability() Locker[]
        +generateUsageReport(type: string) Report
    }

    class ClubAdministrator {
        <<User>>
        +manageClubDetails(clubID: string) void
        +approveMembership(membershipRequestID: string) void
        +manageMembers(clubID: string) void
        +createEvent(clubID: string, eventDetails: object) void
        +manageEvent(eventID: string, action: string) void
        +recordEventAttendance(eventID: string, studentID: string) void
    }

    class SystemAdministrator {
        <<User>>
        +adminID: string
        +manageUserAccount(userID: string, action: string) void
        +configureSystemSettings() void
        +viewAuditLogs() Log[]
        +performBackup() bool
        +performRestore() bool
    }

    class GymMembership {
        +membershipID: string
        +startDate: date
        +endDate: date
        +status: string  // Active, Expired, Pending
        +renewalNotificationSent: bool
        +checkStatus() string
        +sendRenewalReminder() void
    }

    class Locker {
        +lockerID: string
        +location: string
        +size: string
        +status: string // Available, Rented, Maintenance
        +updateStatus(newStatus: string) void
    }

    class LockerRental {
        +rentalID: string
        +startDate: date
        +endDate: date
        +accessCode: string
        +status: string // Active, Expired, Cleared
        +renewalNotificationSent: bool
        +checkStatus() string
        +sendRenewalReminder() void
        +generateAccessCode() string
    }

    class Club {
        +clubID: string
        +name: string
        +description: string
        +category: string
        +updateDetails(details: object) void
        +postAnnouncement(message: string) void
    }

    class ClubMembership {
        +membershipID: string
        +joinDate: date
        +role: string // Member, Leader, Treasurer, etc.
        +status: string // Pending, Active, Inactive
        +updateRole(newRole: string) void
    }

    class Event {
        +eventID: string
        +name: string
        +dateTime: datetime
        +location: string
        +description: string
        +pointsValue: int
        +updateDetails(details: object) void
        +getAttendanceList() Student[]
    }

    class Payment {
        +paymentID: string
        +amount: float
        +paymentDate: datetime
        +status: string // Pending, Completed, Failed
        +paymentMethod: string
        +serviceType: string // Gym, Locker
        +processPayment() bool
        +generateReceipt() Receipt
    }

    class RewardAccount {
        +accountID: string
        +currentBalance: int
        +addPoints(amount: int, reason: string) void
        +deductPoints(amount: int, reason: string) bool
        +getBalance() int
    }

    class RewardTransaction {
        +transactionID: string
        +pointsChange: int // positive for earning, negative for redeeming
        +transactionDate: datetime
        +reason: string // e.g., "Event Attendance: [Event Name]", "Redemption: [Reward Item]"
        +relatedEventID: string (optional)
    }

    class Notification {
        +notificationID: string
        +message: string
        +timestamp: datetime
        +isRead: bool
        +type: string // Renewal, Event, Announcement, Points
        +markAsRead() void
    }

    ' Relationships
    User <|-- Student
    User <|-- CampusServicesManager
    User <|-- ClubAdministrator
    User <|-- SystemAdministrator

    Student "1" o-- "0..1" GymMembership : has/subscribes
    Student "1" o-- "0..*" LockerRental : rents
    Student "1" *-- "1" RewardAccount : has
    Student "1" -- "0..*" Payment : makes
    Student "1" -- "0..*" ClubMembership : holds
    Student "1" -- "0..*" Notification : receives

    CampusServicesManager "1" -- "0..*" GymMembership : manages
    CampusServicesManager "1" o-- "0..*" Locker : manages
    CampusServicesManager "1" -- "0..*" LockerRental : manages

    ClubAdministrator "1..*" -- "1..*" Club : manages

    Club "1" o-- "0..*" ClubMembership : consists of
    Club "1" o-- "0..*" Event : organizes

    ClubMembership "1" -- "1" Club : belongs to
    ClubMembership "1" -- "1" Student : belongs to

    LockerRental "1" -- "1" Locker : reserves
    LockerRental "1" -- "1" Payment : requires

    GymMembership "1" -- "1" Payment : requires
    GymMembership "1" -- "1" Student : belongs to

    RewardAccount "1" o-- "0..*" RewardTransaction : logs

    Event "0..*" -- "0..1" RewardTransaction : triggers points for

    Notification "1" -- "1" User : targets
