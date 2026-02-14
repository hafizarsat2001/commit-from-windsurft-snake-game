// POST Requests Discovery Challenge - JavaScript
// Explore HTTP methods beyond GET: CREATE, UPDATE, DELETE operations

// API Configuration - JSONPlaceholder provides a full REST API for testing
const API_BASE = 'https://jsonplaceholder.typicode.com';

// Track operations for logging
let operationCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeForms();
    logMessage('Application initialized - Ready for CRUD operations!', 'info');
});

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Form Initialization
function initializeForms() {
    // Post Form
    document.getElementById('postForm').addEventListener('submit', handleCreatePost);

    // User Form
    document.getElementById('userForm').addEventListener('submit', handleCreateUser);

    // Comment Form
    document.getElementById('commentForm').addEventListener('submit', handleCreateComment);

    // Update Form
    document.getElementById('updateForm').addEventListener('submit', handleUpdatePost);
}

// DISCOVERY CHALLENGE 1: POST Request Implementation
// Research Question: How do you send data TO an API instead of just getting data?
// Goal: Master HTTP POST requests and data creation

async function handleCreatePost(event) {
    event.preventDefault();

    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    // FORM DATA EXTRACTION - Study this pattern
    const postData = {
        title: document.getElementById('postTitle').value,
        body: document.getElementById('postBody').value,
        userId: parseInt(document.getElementById('postUserId').value)
    };

    try {
        logMessage(`🚀 Creating new post: "${postData.title}"`, 'request');

        // RESEARCH CHALLENGE: POST Request Structure
        // 1. How is a POST request different from a GET request?
        // 2. What is the 'Content-Type' header and why is it needed?
        // 3. Why do you need JSON.stringify() for the body?
        // 4. What happens when you don't include proper headers?
        // CONCEPT: HTTP Methods and Data Creation
        // LEARNING GOAL: Understanding how to send data TO servers, not just retrieve it
        // DEBUGGING TIP: Check Network tab to see if your POST body is formatted correctly
        // WATCH OUT: Forgetting Content-Type header causes "Unexpected token" errors

        // YOUR DISCOVERY MISSION:
        // - Investigate the fetch() method with different HTTP methods
        // - Learn about request headers and their purposes
        // - Explore JSON serialization for API communication
        // - Understand RESTful API endpoints and naming
        // HINT: POST requests require a body with your data
        // Common mistake: Sending JavaScript objects instead of JSON strings
        // Think about: Why does the server need to know the content type?

        // YOUR CODE HERE:
        // Build the fetch request with:
        // - method: 'POST'
        // - headers: { 'Content-Type': 'application/json' }
        // - body: JSON.stringify(postData)
        // CONCEPT: Request Structure
        // DEBUGGING TIP: console.log(JSON.stringify(postData)) to see what you're sending
        // UX PRINCIPLE: Always show loading states during POST operations

        console.log('📨 CHALLENGE: Implement POST request to create data!');
        console.log('🔬 Research: HTTP methods, headers, JSON serialization');
        console.log('💡 TIP: Remember - method, headers, and body are all required');

        throw new Error('⚡ POST challenge awaits! Implement the fetch request in handleCreatePost!');

        logMessage(`✅ Post created successfully (ID: ${result.id})`, 'response');
        displayResult('POST', '/posts', result, 'Post created successfully!');

        // Clear form
        document.getElementById('postForm').reset();

    } catch (error) {
        // CONCEPT: CRUD Operation Error Handling
        // LEARNING: POST requests can fail for different reasons than GET requests
        // Common errors: Validation failures, server errors, network timeouts, malformed JSON
        // DEBUGGING TIP: Check error.message for specific failure reasons
        // WATCH OUT: Some APIs return errors as successful HTTP responses with error data
        logMessage(`❌ Error creating post: ${error.message}`, 'error');
        displayResult('POST', '/posts', { error: error.message }, 'Failed to create post');
    } finally {
        setLoadingState(button, false);
    }
}

// Create User Handler
async function handleCreateUser(event) {
    event.preventDefault();

    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    const userData = {
        name: document.getElementById('userName').value,
        username: document.getElementById('userUsername').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value || '',
        website: document.getElementById('userWebsite').value || ''
    };

    try {
        logMessage(`👤 Creating new user: "${userData.name}"`, 'request');

        const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        logMessage(`✅ User created successfully (ID: ${result.id})`, 'response');
        displayResult('POST', '/users', result, 'User created successfully!');

        // Clear form
        document.getElementById('userForm').reset();

    } catch (error) {
        logMessage(`❌ Error creating user: ${error.message}`, 'error');
        displayResult('POST', '/users', { error: error.message }, 'Failed to create user');
    } finally {
        setLoadingState(button, false);
    }
}

// Create Comment Handler
async function handleCreateComment(event) {
    event.preventDefault();

    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    const commentData = {
        postId: parseInt(document.getElementById('commentPostId').value),
        name: document.getElementById('commentName').value,
        email: document.getElementById('commentEmail').value,
        body: document.getElementById('commentBody').value
    };

    try {
        logMessage(`💬 Adding comment to post ${commentData.postId}`, 'request');

        const response = await fetch(`${API_BASE}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        logMessage(`✅ Comment added successfully (ID: ${result.id})`, 'response');
        displayResult('POST', '/comments', result, 'Comment added successfully!');

        // Clear form
        document.getElementById('commentForm').reset();

    } catch (error) {
        logMessage(`❌ Error adding comment: ${error.message}`, 'error');
        displayResult('POST', '/comments', { error: error.message }, 'Failed to add comment');
    } finally {
        setLoadingState(button, false);
    }
}

// Load Post for Update
async function loadPostForUpdate() {
    const postId = document.getElementById('updateId').value;

    try {
        logMessage(`📖 Loading post ${postId} for update`, 'request');

        const response = await fetch(`${API_BASE}/posts/${postId}`);

        if (!response.ok) {
            throw new Error(`Post ${postId} not found`);
        }

        const post = await response.json();

        // Fill the update form
        document.getElementById('updateTitle').value = post.title;
        document.getElementById('updateBody').value = post.body;

        logMessage(`✅ Post ${postId} loaded for editing`, 'response');

    } catch (error) {
        logMessage(`❌ Error loading post: ${error.message}`, 'error');
        alert(`Could not load post ${postId}: ${error.message}`);
    }
}

// Update Post Handler
async function handleUpdatePost(event) {
    event.preventDefault();

    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    const postId = document.getElementById('updateId').value;
    const updateData = {
        id: parseInt(postId),
        title: document.getElementById('updateTitle').value,
        body: document.getElementById('updateBody').value,
        userId: 1 // JSONPlaceholder requirement
    };

    try {
        logMessage(`✏️ Updating post ${postId}`, 'request');

        // CONCEPT: HTTP PUT vs POST
        // LEARNING: PUT is for updating existing resources, POST is for creating new ones
        // RESEARCH: What's the difference between PUT and PATCH methods?
        // DEBUGGING TIP: PUT typically requires the complete resource data
        // WATCH OUT: Some APIs use PATCH for partial updates instead of PUT
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        logMessage(`✅ Post ${postId} updated successfully`, 'response');
        displayResult('PUT', `/posts/${postId}`, result, 'Post updated successfully!');

    } catch (error) {
        logMessage(`❌ Error updating post: ${error.message}`, 'error');
        displayResult('PUT', `/posts/${postId}`, { error: error.message }, 'Failed to update post');
    } finally {
        setLoadingState(button, false);
    }
}

// Delete Post
async function deletePost() {
    const postId = document.getElementById('deleteId').value;
    const button = document.querySelector('#manage .btn-danger');

    if (!confirm(`Are you sure you want to delete post ${postId}?`)) {
        return;
    }

    setLoadingState(button, true);

    try {
        logMessage(`🗑️ Deleting post ${postId}`, 'request');

        // CONCEPT: HTTP DELETE Method
        // LEARNING: DELETE removes resources from the server
        // RESEARCH: What status codes indicate successful deletion?
        // UX PRINCIPLE: Always confirm destructive actions with users
        // DEBUGGING TIP: DELETE requests usually don't need a body
        // WATCH OUT: Some APIs return 200, others return 204 for successful deletes
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        logMessage(`✅ Post ${postId} deleted successfully`, 'response');
        displayResult('DELETE', `/posts/${postId}`, { deleted: true, id: postId }, 'Post deleted successfully!');

    } catch (error) {
        logMessage(`❌ Error deleting post: ${error.message}`, 'error');
        displayResult('DELETE', `/posts/${postId}`, { error: error.message }, 'Failed to delete post');
    } finally {
        setLoadingState(button, false);
    }
}

// Example Data Functions
function fillExample(type) {
    switch(type) {
        case 'pokemon':
            document.getElementById('postTitle').value = 'My Epic Pokemon Team Battle';
            document.getElementById('postBody').value = 'Just had an amazing battle with my team of Pikachu, Charmander, and Squirtle! Pikachu\'s speed really made the difference. The strategy of balancing offense and defense from different types worked perfectly. Can\'t wait for the next gym challenge!';
            break;
        case 'recipe':
            document.getElementById('postTitle').value = 'Perfect Chocolate Chip Cookies Recipe';
            document.getElementById('postBody').value = 'Finally perfected my chocolate chip cookie recipe! The secret is browning the butter first and using a mix of brown and white sugar. Bake at 350°F for exactly 12 minutes. The cookies come out crispy on the edges but soft in the middle - absolute perfection!';
            break;
        case 'travel':
            document.getElementById('postTitle').value = 'Amazing Weekend in Tokyo';
            document.getElementById('postBody').value = 'Just got back from an incredible weekend in Tokyo! Visited the Senso-ji Temple, tried authentic ramen in Shibuya, and watched the sunrise from Tokyo Skytree. The cherry blossoms were in full bloom - absolutely magical. Already planning my next trip back!';
            break;
    }
}

// UI Helper Functions
function setLoadingState(button, loading) {
    const textSpan = button.querySelector('.btn-text');
    const loaderSpan = button.querySelector('.btn-loader');

    if (loading) {
        textSpan.style.display = 'none';
        loaderSpan.style.display = 'inline';
        button.disabled = true;
        button.classList.add('loading');
    } else {
        textSpan.style.display = 'inline';
        loaderSpan.style.display = 'none';
        button.disabled = false;
        button.classList.remove('loading');
    }
}

function displayResult(method, endpoint, data, message) {
    const resultsDiv = document.getElementById('results');
    const placeholder = resultsDiv.querySelector('.placeholder');

    if (placeholder) {
        placeholder.remove();
    }

    const resultItem = document.createElement('div');
    resultItem.className = `result-item ${data.error ? 'error' : ''}`;

    const timestamp = new Date().toLocaleTimeString();

    resultItem.innerHTML = `
        <div class="result-header">
            <div>
                <span class="result-method ${method}">${method}</span>
                <strong>${message}</strong>
            </div>
            <span class="result-time">${timestamp}</span>
        </div>
        <div class="result-data">${JSON.stringify(data, null, 2)}</div>
    `;

    resultsDiv.insertBefore(resultItem, resultsDiv.firstChild);

    // Keep only last 10 results
    const results = resultsDiv.querySelectorAll('.result-item');
    if (results.length > 10) {
        results[results.length - 1].remove();
    }
}

function logMessage(message, type = 'info') {
    const logDiv = document.getElementById('networkLog');
    const placeholder = logDiv.querySelector('.placeholder');

    if (placeholder) {
        placeholder.remove();
    }

    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;

    const timestamp = new Date().toLocaleTimeString();
    logEntry.textContent = `[${timestamp}] ${message}`;

    logDiv.insertBefore(logEntry, logDiv.firstChild);

    // Keep only last 20 log entries
    const entries = logDiv.querySelectorAll('.log-entry');
    if (entries.length > 20) {
        entries[entries.length - 1].remove();
    }
}

function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="placeholder">Results will appear here when you perform operations...</p>';

    const logDiv = document.getElementById('networkLog');
    logDiv.innerHTML = '<p class="placeholder">Network requests will be logged here...</p>';
}

// Utility function for testing multiple operations
async function testAllOperations() {
    console.log('🧪 Running comprehensive CRUD test...');

    try {
        // Test POST
        console.log('Testing POST...');
        const postResponse = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Test Post',
                body: 'This is a test post',
                userId: 1
            })
        });
        const newPost = await postResponse.json();
        console.log('✅ POST successful:', newPost);

        // Test PUT
        console.log('Testing PUT...');
        const putResponse = await fetch(`${API_BASE}/posts/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 1,
                title: 'Updated Test Post',
                body: 'This post has been updated',
                userId: 1
            })
        });
        const updatedPost = await putResponse.json();
        console.log('✅ PUT successful:', updatedPost);

        // Test DELETE
        console.log('Testing DELETE...');
        const deleteResponse = await fetch(`${API_BASE}/posts/1`, {
            method: 'DELETE'
        });
        console.log('✅ DELETE successful:', deleteResponse.ok);

        console.log('🎉 All CRUD operations working!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Export for testing (uncomment if needed)
// window.testAllOperations = testAllOperations;