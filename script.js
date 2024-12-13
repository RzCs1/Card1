const envelope = document.getElementById('envelope');
const messageText = document.getElementById('message-text');
const messages = [
    "Dear Ma'am,",
    "Thank po because you educate me very well and I am very glad to have you as my teacher. I have learned a lot po in our class and sana marami pa akong matutunan sa inyo in future. Thank you so much for your time and effort that given to us. Thank din po for considering some of the cases like submissions of dead line.",
    "Sorry po if sometimes I am not able to give efforts in my works in class like po laboratories, case studies, etc. Sensya po if sometimes ay di ako nakikinig sa klase and medyo lutang. For the next time, I will try to do my best na.",
    "Thank you for everything Ma'am.",
    "...",
];

let currentMessageIndex = 0; // Always start from the first message
let isEnvelopeOpen = false;  // Track whether the envelope is open or closed
let typingInterval; // Store the typing interval to clear it when closing the envelope

// Function to type out the message one character at a time
function typeMessage(message, callback) {
    let index = 0;
    messageText.textContent = ''; // Clear the message text
    messageText.style.opacity = 1; // Ensure message text is visible

    typingInterval = setInterval(() => {
        messageText.textContent += message[index]; // Add one character at a time
        index++;

        if (index === message.length) {
            clearInterval(typingInterval); // Stop when all characters are typed
            callback(); // Call the callback after typing is done
        }
    }, 100); // Adjust typing speed (100 ms = 1 character per second)
}

// Function to clear the message after a delay
function clearMessage(callback) {
    setTimeout(() => {
        messageText.textContent = ''; // Clear message after 3 seconds
        callback(); // Call the callback after clearing the message
    }, 2000); // Wait for 3 seconds after typing is finished
}

// Function to handle message cycling
function handleMessageCycle() {
    // Trigger the typing of the current message
    typeMessage(messages[currentMessageIndex], () => {
        // Wait for typing animation to finish, then clear the message
        clearMessage(() => {
            // Update the message index
            currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Cycle through messages
            setTimeout(() => {
                // Start typing the next message after 3 seconds
                if (isEnvelopeOpen) {
                    handleMessageCycle();
                }
            }, 500); // Wait 3 seconds before displaying the next message
        });
    });
}

// Toggle envelope open/close on click
envelope.addEventListener('click', () => {
    // Toggle the envelope open/close
    isEnvelopeOpen = !isEnvelopeOpen;
    envelope.classList.toggle('open');

    if (isEnvelopeOpen) {
        // Reset to the first message each time the envelope is opened
        currentMessageIndex = 0;
        // Start the message cycle when the envelope is opened
        handleMessageCycle();
    } else {
        // Clear the current typing message when the envelope is closed
        clearInterval(typingInterval); // Stop the typing interval
        messageText.textContent = ''; // Immediately clear the current message
    }
});
