  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB_JhhpjE36bQcYqsc3nNMOjPjI2-L4VHM",
    authDomain: "bdaygift-efd66.firebaseapp.com",
    projectId: "bdaygift-efd66",
    storageBucket: "bdaygift-efd66.appspot.com",
    messagingSenderId: "555720467671",
    appId: "1:555720467671:web:6937e07247d39679413c92"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to Firestore
  var db = firebase.firestore();

  // Function to add data to Firestore with timestamp
  function addData() {
    var inputData = document.getElementById('inputData').value;
    var timestamp = firebase.firestore.FieldValue.serverTimestamp(); // Get server timestamp
  
    // Add data to Firestore with timestamp
    db.collection('data').add({
      text: inputData,
      timestamp: timestamp // Include timestamp in the document
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('addResult').innerText = 'Data added successfully!';
      document.getElementById('inputData').value = ''; // Clear the input field
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      documnt.getElementById('addResult').innerText = 'Error adding data: ' + error;
    });
  } 

  // Event listener for Enter key press in input field


  // Function to load and display data from Firestore
  // Function to load and display data from Firestore
function loadRandomDocument() {
    db.collection("data")
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.size > 0) {
                var randomIndex = Math.floor(Math.random() * querySnapshot.size);
                var counter = 0;
                querySnapshot.forEach(function (doc) {
                    if (counter === randomIndex) {
                        // Display the text from the 'data' collection
                        document.getElementById('displayData').innerText = doc.data().text;

                        // Add timestamp and text to the 'use' collection
                        var timestamp = firebase.firestore.FieldValue.serverTimestamp(); // Get server timestamp
                        db.collection('use').add({
                            text: doc.data().text, // Include text in the document
                            timestamp: timestamp // Include timestamp in the document
                        })
                            .then(function (docRef) {
                                console.log("Document written to 'use' collection with ID: ", docRef.id);
                            })
                            .catch(function (error) {
                                console.error("Error adding document to 'use' collection: ", error);
                            });

                    }
                    counter++;
                });
            } else {
                document.getElementById('displayData').innerText = "No data found.";
            }
        })
        .catch(function (error) {
            console.error("Error getting documents: ", error);
            document.getElementById('displayData').innerText = 'Error loading data: ' + error;
        });
}
