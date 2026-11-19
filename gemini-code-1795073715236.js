rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admin/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2";
    }
    match /portal/{clientUid} {
      allow read, write: if request.auth != null && (request.auth.uid == clientUid || request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2");
    }
    match /invites/{code} {
      allow get: if true;
      allow list, create, delete: if request.auth != null && request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2";
      allow update: if request.auth != null && (resource.data.used == false || request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2");
    }
    match /notices/{noticeId} {
      allow read, update: if request.auth != null && (resource.data.uid == request.auth.uid || request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2");
      allow create, delete: if request.auth != null && request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2";
    }
    match /catalog/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2";
    }
    match /requests/{reqId} {
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow read: if request.auth != null && (resource.data.uid == request.auth.uid || request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2");
      allow update, delete: if request.auth != null && request.auth.uid == "x4XlJ47x3Kbck9eSM6TQKCmU3zj2";
    }
  }
}