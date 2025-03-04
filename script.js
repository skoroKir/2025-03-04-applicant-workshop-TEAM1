// import...

// Toggle hidden information
const toggleButton = document.getElementById('btn-toggle1');
const hiddenInfo = document.querySelector('.hidden-info');

toggleButton.addEventListener('click', () => {
    hiddenInfo.classList.toggle('hidden-info');
});

// Change background color of the box
const colorButton = document.getElementById('btn-change-color');
const colorBox = document.getElementById('color-box');

colorButton.addEventListener('click', () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = randomColor;
});

// Form submission handling
const form = document.getElementById('feedback-form');
const formResponse = document.getElementById('form-response');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
    formResponse.textContent = `Thank you, ${name}, for your feedback: "${feedback}"`;
    form.reset();
});

// Function to render the items on data-container
function renderItems(items) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear previous content
  
    items.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${item}</p>`;
      container.appendChild(div);
    });
  }
  
//////toggle button start///////

function addToggleButton() {
    // Find the <nav> inside <header>
    let nav = document.querySelector("body > header > nav");
    
    if (!nav) {
        console.error("Navigation element not found!");
        return;
    }

    // Create the toggle container
    let toggleContainer = document.createElement("div");
    toggleContainer.classList.add("toggle-container");

    // Create the toggle button
    let toggleButton = document.createElement("div");
    toggleButton.classList.add("toggle-button");

    // Create the status text
    let statusText = document.createElement("span");
    statusText.textContent = "Light Mode"; // Default text

    // Add event listener for toggle functionality
    toggleButton.addEventListener("click", function() {
        this.classList.toggle("active");
        statusText.textContent = this.classList.contains("active") ? "Dark Mode" : "Light Mode";

    // Change CSS variables dynamically
        if (this.classList.contains("active")) {
            document.documentElement.style.setProperty("--primary-color", "#0a4d0c");
            document.documentElement.style.setProperty("--secondary-color", "#878787");
            // document.querySelector('.content-section').style.backgroundColor = '#aeaeae';
            document.querySelectorAll('.content-section').forEach(el => {
                el.style.backgroundColor = '#aeaeae';
            });

            // document.documentElement.style.setProperty("--toggle-circle", "#fff");
        } else {
            document.documentElement.style.setProperty("--primary-color", "#4CAF50");
            document.documentElement.style.setProperty("--secondary-color", "#ffffff");
            document.querySelectorAll('.content-section').forEach(el => {
                el.style.backgroundColor = '#ffffff';
            });


            // document.documentElement.style.setProperty("--toggle-circle", "#fff");
        }
    });

    // Append elements to the container
    toggleContainer.appendChild(toggleButton);
    toggleContainer.appendChild(statusText);

    // Append the toggle container inside <nav>
    nav.appendChild(toggleContainer);
}

// Call the function to add the toggle button dynamically
addToggleButton();

// Add CSS styles dynamically
let style = document.createElement("style");
style.textContent = `
    .toggle-container {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: Arial, sans-serif;
        margin-left: 15px;
    }
    .toggle-button {
        width: 50px;
        height: 25px;
        background-color: #ccc;
        border-radius: 25px;
        position: relative;
        cursor: pointer;
        transition: background 0.3s;
    }
    .toggle-button::before {
        content: "";
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        transition: 0.3s;
    }
    .active {
        background-color:rgb(69, 74, 69);
    }
    .active::before {
        left: 25px;
    }
`;
document.head.appendChild(style);

//////toggle button end////////


/////characters counter start///////
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");
    const textarea = form.querySelector("textarea");
    const submitButton = form.querySelector("button[type='submit']");
    
    if (!textarea) return; // Exit if no textarea found

    // Create the counter element
    const counter = document.createElement("div");
    counter.id = "char-counter";
    counter.style.marginTop = "5px";
    counter.style.fontSize = "14px";
    counter.style.color = "#666";
    counter.textContent = "200 characters remaining";
    
    // Insert the counter after the form
    form.insertAdjacentElement("afterend", counter);

    // Update counter on input
    textarea.addEventListener("input", function () {
        const remaining = 200 - textarea.value.length;
        counter.textContent = `${remaining} characters remaining`;
    });

    // Reset textarea and counter on submit
    submitButton.addEventListener("click", function () {
        textarea.value = "";
        counter.textContent = "200 characters remaining";
        });
});
/////characters counter start///////

/////drag and drop rearrange start////

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#section1, #section2, #section3');

    sections.forEach(section => {
        section.setAttribute('draggable', 'true'); // Make each section draggable

        section.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id); // Store the dragged element's id
            e.target.style.opacity = 0.5; // Visual feedback during drag
        });

        section.addEventListener('dragend', (e) => {
            e.target.style.opacity = ''; // Reset opacity after drag ends
        });
    });

    sections.forEach(section => {
        section.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow dropping on this element

            const draggedId = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(draggedId);
            const targetElement = e.target;

            // Ensure that the dragged element is not dropped inside itself or into its descendants
            if (draggedElement === targetElement || targetElement.contains(draggedElement)) {
                return;
            }

            // Highlight the container in pink when it's ready to be dropped on
            targetElement.style.backgroundColor = 'pink';
        });

        section.addEventListener('dragleave', (e) => {
            // Remove the highlight when dragging leaves the element
            e.target.style.backgroundColor = '';
        });

        section.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(draggedId);
            const targetElement = e.target;

            // Reset the highlight color after drop
            targetElement.style.backgroundColor = '';

            // Ensure that the target element is not nested inside the dragged element
            if (draggedElement === targetElement || targetElement.contains(draggedElement)) {
                return;
            }

            // Ensure drop only happens between sibling elements (same level)
            const parent = draggedElement.parentElement;

            // Only move elements within the same parent
            if (parent === targetElement.parentElement) {
                // Reorder by placing the dragged element before or after the target element
                const allSections = Array.from(sections);
                const draggedIndex = allSections.indexOf(draggedElement);
                const targetIndex = allSections.indexOf(targetElement);

                // Perform the reordering logic only if the dragged element is not the same as the target
                if (draggedElement !== targetElement) {
                    // Move dragged element after or before based on their positions
                    if (draggedIndex < targetIndex) {
                        targetElement.after(draggedElement); // Move dragged element after the target
                    } else {
                        targetElement.before(draggedElement); // Move dragged element before the target
                    }
                }
            }
        });
    });
});



////drag and drop rearrange end




/* IDEAS FOR ADDITIONAL INTERACTIONS

1. Add functionality to highlight the navigation link of the current section as the user scrolls.
2. Implement a light/dark mode toggle using CSS root variables.
3. Create a dynamic list where users can add and remove items.
4. Add validation to the feedback form to ensure name and feedback are not empty.
5. Use localStorage to save the user's name for personalized greetings.
6. Animate the color change of the box with a smooth transition.
7. Display a live character counter for the feedback textarea.
8. Implement drag-and-drop functionality for rearranging items in a list.
9. Add a countdown timer to a section, resetting after it reaches zero.
10. Fetch and display data from a public API (e.g., random jokes or quotes).

*/

// Call the render function on page load or when needed
renderItems(dataItems);