🔥 Project Title: Dynamic User Dashboard with Notification System
🧠 Concepts Used:
React Functional Components

React Hooks: useState, useEffect

LocalStorage for data persistence

Conditional Rendering

Dynamic List Rendering

Controlled Input Components

Filtering & Updating State

Tailwind CSS for styling

🧩 Project Features:
✅ 1. Login & Logout System
Simulated login state (user.loggedIn) is toggled with a button.

On first login, it loads dummy notifications after a simulated delay.

💌 2. Notification System
Supports creating, deleting, filtering, and marking notifications as read.

Notifications are saved to localStorage, so they persist across refreshes.

Each notification includes:

ID

Text

Read status

Timestamp

🔄 3. Filtering Notifications
Users can view:

All

Unread

Read

Implemented using a filter state and .filter() method on the notification array.

🧠 4. Derived State
Unread notification count is dynamically calculated using:
const unreadCount = notifications.filter((n) => !n.read).length;
🧪 5. Controlled Inputs
The input for adding a new notification is a controlled component, synced with newText state.

🗂️ 6. Local Storage Integration
user and notifications are both initialized from localStorage and updated when state changes.

🎯 7. UI/UX Enhancements
Clean and responsive layout using Tailwind CSS

Different background colors for read/unread

Loading state simulation using setTimeout

🛠️ Core Functions Summary:
Function	Description
toggleLogin	Toggles login state and loads fake notifications on first login
addNotification	Adds a new notification to the list
markOneAsRead(id)	Marks a specific notification as read
markAllAsRead()	Marks all notifications as read
deleteNotification(id)	Deletes a notification by ID
setFilter("all" / "read" / "unread")	Filters the notifications list accordingly
🧾 Example User Flow:
User not logged in → Sees "Please Log In"

Clicks Login → App simulates loading and shows dummy notifications

Can add new notification, mark as read, delete, and filter

Data remains saved even after refresh using localStorage

🧠 Skill Level:
Ideal for React Beginners to Intermediate who want to:

Practice state management

Use localStorage

Handle user interactions

Create a dynamic dashboard with conditional UI


