document.getElementById('login-button').addEventListener('click', function () {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        } else {
            chrome.storage.local.set({ 'authToken': token }, function () {
                chrome.action.setPopup({ popup: 'html/main.html' });
                window.location.href = 'main.html';
            });
        }
    });
});
