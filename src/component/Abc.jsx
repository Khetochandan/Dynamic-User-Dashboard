import React, { useState, useEffect } from "react";


const Abc = () => {
  // 1️⃣ Initial State from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "John Doe", loggedIn: false };
  });

  const [notifications, setNotifications] = useState(() => {
    const storedNotifs = localStorage.getItem("notifications");
    return storedNotifs ? JSON.parse(storedNotifs) : [];
  });

  const [loading, setLoading] = useState(false);
  const [newText, setNewText] = useState(""); // 8️⃣ Input for new notification
  const [filter, setFilter] = useState("all"); // 9️⃣ Filter (all, read, unread)

  // 3️⃣ Simulate API Call on Login
  const toggleLogin = () => {
    const nextStatus = !user.loggedIn;
    const updatedUser = { ...user, loggedIn: nextStatus };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (nextStatus && notifications.length === 0) {
      setLoading(true);
      setTimeout(() => {
        const initialNotifs = [
          {
            id: 1,
            text: "Welcome to the platform!",
            read: false,
            timestamp: new Date().toLocaleString(),
          },
          {
            id: 2,
            text: "New message received.",
            read: false,
            timestamp: new Date().toLocaleString(),
          },
          {
            id: 3,
            text: "System update available.",
            read: false,
            timestamp: new Date().toLocaleString(),
          },
          {
            id: 4,
            text: "Important notification.",
            read: false,
            timestamp: new Date().toLocaleString(),
          },
        ];
        setNotifications(initialNotifs);
        localStorage.setItem("notifications", JSON.stringify(initialNotifs));
        setLoading(false);
      }, 1500);
    }
  };

  // Save to localStorage when notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Derived State
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 2️⃣ Mark one as read
  const markOneAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));

  // 4️⃣ Delete
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // 8️⃣ Add New Notification
  const addNotification = () => {
    if (!newText.trim()) return;
    const newNotif = {
      id: Date.now(),
      text: newText.trim(),
      read: false,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications([newNotif, ...notifications]);
    setNewText("");
  };

  // 9️⃣ Filter Notifications
  const filteredNotifications = notifications.filter((n) => {
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        {user.loggedIn ? (
          loading ? (
            <p className="text-lg text-gray-600">⏳ Loading notifications...</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Welcome, {user.name}!
              </h2>
              <p className="text-gray-600 mb-4">
                You have{" "}
                <span className="font-semibold text-blue-500">{unreadCount}</span>{" "}
                unread notifications.
              </p>

              {/* 🔍 Filter Buttons */}
              <div className="flex justify-center gap-3 mb-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-3 py-1 rounded ${filter === "unread" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-3 py-1 rounded ${filter === "read" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  Read
                </button>
              </div>

              {/* 📝 New Notification Form */}
              <div className="flex mb-4">
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="flex-1 border border-gray-300 p-2 rounded-l"
                  placeholder="New notification..."
                />
                <button
                  onClick={addNotification}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r"
                >
                  Add
                </button>
              </div>

              {/* 🔔 Notifications List */}
              <ul className="text-left mb-4">
                {filteredNotifications.map((n) => (
                  <li
                    key={n.id}
                    className={`mb-3 p-3 rounded flex justify-between items-start ${
                      n.read ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{n.text}</p>
                      <p className="text-sm italic">{n.timestamp}</p>
                      <p className="text-sm">
                        {n.read ? "✅ Read" : "📩 Unread"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!n.read && (
                        <button
                          onClick={() => markOneAsRead(n.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Mark
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 🔘 Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Mark All as Read
                </button>
                <button
                  onClick={toggleLogin}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Please Log In
            </h2>
            <button
              onClick={toggleLogin}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Abc;
