function sendNotification(title, options) {
  if (!("Notification" in window)) {
    alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
  } else if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
    
    function clickFunc() { 
      document.location.href = "https://rss-chat-socket.firebaseapp.com"; 
    }

    notification.onclick = clickFunc;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
}

export default sendNotification;