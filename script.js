let words = [];

  // DOM Elements
  const enableNotificationsBtn = document.getElementById("enable-notifications");
  const wordElement = document.getElementById("word");
  const definitionElement = document.getElementById("definition");
  const sentenceElement = document.getElementById("sentence");
  const currentWordSection = document.getElementById("current-word");
  const addWordBtn = document.getElementById("add-word-btn");
  const newWordInput = document.getElementById("new-word");
  const newMeaningInput = document.getElementById("new-meaning");
  const newExampleInput = document.getElementById("new-example");
  const wordList = document.getElementById("word-list");

  // Local Storage Keys
  const WORDS_KEY = "vocabularyWords";
  const LAST_WORD_KEY = "lastWordIndex";
  const LAST_NOTIFICATION_TIME = "lastNotificationTime";

  // Load Words from Local Storage
  function loadWords() {
    const savedWords = JSON.parse(localStorage.getItem(WORDS_KEY));
    if (savedWords) {
      words = savedWords;
    }
  }

  
  function saveWords() {
    localStorage.setItem(WORDS_KEY, JSON.stringify(words));
  }

  
  function displayWords() {
    wordList.innerHTML = ""; 
    words.forEach(({ word, meaning, sentence },index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("new-word");
      setTimeout(() => listItem.classList.remove("new-word"), 1000);
      listItem.innerHTML = `<strong>${word}</strong>: ${meaning}<br><em>Example:</em> ${sentence}`;
      wordList.appendChild(listItem);
    });
  }

  
  function requestNotificationPermission() {
      alert("Requesting Notification Permission..");
    if (Notification.permission === "granted") {
      alert("Permission already granted!!");
      sendDailyWord();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          sendDailyWord();
        } else {
          alert("Notifications are blocked. Please allow them to enable daily reminders.");
        }
      });
    }
  }

  // Send Daily Word Notification
  function sendDailyWord() {
    const today = new Date().toDateString();
    const lastNotificationDate = localStorage.getItem(LAST_NOTIFICATION_TIME);

    if (lastNotificationDate === today) {
      return; // Already sent notification today
    }

    const wordIndex = getNextWordIndex();
    const { word, meaning, sentence } = words[wordIndex];

    // Show Notification
    const notification = new Notification("📚 Daily Vocabulary", {
      body: `${word}: ${meaning}\nExample: ${sentence}`,
      icon: "https://via.placeholder.com/150"
    });

    // Update Word Display on Page
    wordElement.textContent = word;
    definitionElement.textContent = meaning;
    sentenceElement.textContent = sentence;
    currentWordSection.classList.remove("hidden");
    currentWordSection.classList.add("animated");

    // Save Last Notification Date and Word
    localStorage.setItem(LAST_NOTIFICATION_TIME, today);
    localStorage.setItem(LAST_WORD_KEY, wordIndex);
  }

  // Get Next Word Index
  function getNextWordIndex() {
    let lastWordIndex = parseInt(localStorage.getItem(LAST_WORD_KEY), 10);
    if (isNaN(lastWordIndex) || lastWordIndex >= words.length - 1) {
      return 0; // Start from the beginning
    }
    return lastWordIndex + 1;
  }

  // Add a New Word
  addWordBtn.addEventListener("click", () => {
    const newWord = newWordInput.value.trim();
    const newMeaning = newMeaningInput.value.trim();
    const newExample = newExampleInput.value.trim();

    if (newWord && newMeaning && newExample) {
      words.push({ word: newWord, meaning: newMeaning, sentence: newExample });
      saveWords(); // Save to Local Storage
      newWordInput.value = "";
      newMeaningInput.value = "";
      newExampleInput.value = "";
      displayWords(); // Update the displayed list
      alert("Word added successfully!");
    } else {
      alert("Please fill out all fields to add a word!");
    }
  });

  // Initialize App
  enableNotificationsBtn.addEventListener("click", requestNotificationPermission);
  setInterval(sendDailyWord,3600000)
  loadWords(); // Load saved words from localStorage
  displayWords(); // Display words in the list
  
 