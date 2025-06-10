Vocabulary Reminder

A web application to help users grow their vocabulary by getting hourly word notifications and maintaining a personal vocabulary list. Users can add new words, view a random word with its meaning and example, and receive periodic desktop notifications.

 Features

- **Add New Words** with meanings and example sentences.
- **Hourly Word Notifications** via browser notifications.
- **Live Word List** display from a database (no localStorage).
- **React + Flask + SQLite** stack.
-  Clean and responsive UI using modern React and CSS.


 Technologies Used

### Frontend
- React.js (with Hooks)
- Axios for API requests
- CSS for styling

### Backend
- Flask (Python web framework)
- Flask-CORS
- Flask-SQLAlchemy
- SQLite database

Notification Logic
Sends a browser notification every hour with a random word.

Uses the browser's Notification API after permission is granted.


