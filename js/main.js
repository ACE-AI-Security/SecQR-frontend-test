// document.addEventListener('DOMContentLoaded', function () {
//   chrome.storage.local.get('authToken', function (result) {
//       if (!result.authToken) {
//           window.location.href = 'login.html';
//       } else {
//         document.getElementById('main-qr-scan-container').addEventListener('click', function () {
//           window.location.href = 'image-upload.html';
//       });
//         // document.addEventListener("DOMContentLoaded", function () {
//         //   // URL 열기
//         //   function openUrlInNewTab() {
//         //     const urlInput = document.querySelector(".main-url-input").value;
//         //     if (urlInput) {
//         //       window.open(urlInput, "_blank");
//         //     } else {
//         //       alert("Please enter a URL.");
//         //     }
//         //   }
        
//         //   // 페이지 이동
//         //   function navigateToPage(elementSelector, targetPage) {
//         //     document
//         //       .querySelector(elementSelector)
//         //       .addEventListener("click", function () {
//         //         window.location.href = targetPage;
//         //       });
//         //   }
        
//         //   // 차단된 URL 이미지 토글
//         //   function toggleBlockURLImage(url) {
//         //     chrome.storage.sync.get("blockedURLs", (data) => {
//         //       const blockedURLs = data.blockedURLs || [];
//         //       const blockURLButton = document.querySelector(".main-Block-URL");
//         //       if (blockedURLs.includes(url)) {
//         //         blockURLButton.src = "/images/Block-URL-check.svg";
//         //       } else {
//         //         blockURLButton.src = "/images/Block-URL.svg";
//         //       }
//         //     });
//         //   }
        
//         //   // URL 차단 및 차단 해제
//         //   function toggleBlockURL() {
//         //     const urlInput = document.querySelector(".main-url-input").value;
//         //     if (!urlInput) {
//         //       alert("No URL to block/unblock");
//         //       return;
//         //     }
        
//         //     chrome.storage.sync.get("blockedURLs", (data) => {
//         //       let blockedURLs = data.blockedURLs || [];
//         //       const urlIndex = blockedURLs.indexOf(urlInput);
        
//         //       if (urlIndex === -1) {
//         //         if (confirm(`Do you want to block this URL: ${urlInput}?`)) {
//         //           blockedURLs.push(urlInput);
//         //           chrome.storage.sync.set({ blockedURLs }, () => {
//         //             toggleBlockURLImage(urlInput);
//         //             alert(`Blocked: ${urlInput}`);
//         //           });
//         //         }
//         //       } else {
//         //         if (confirm(`Do you want to unblock this URL: ${urlInput}?`)) {
//         //           blockedURLs.splice(urlIndex, 1);
//         //           chrome.storage.sync.set({ blockedURLs }, () => {
//         //             toggleBlockURLImage("");
//         //             alert(`Unblocked: ${urlInput}`);
//         //           });
//         //         }
//         //       }
//         //     });
//         //   }
        
//         //   // main-open-url 버튼 클릭 이벤트
//         //   document
//         //     .querySelector(".main-open-url")
//         //     .addEventListener("click", openUrlInNewTab);
        
//         //   // 페이지 네비게이션 설정
//         //   navigateToPage(".main-qr-scan-container", "image-upload.html");
//         //   navigateToPage(".main-qr-generate-container", "generate.html");
//         //   navigateToPage(".main-url-info-container", "url-info.html");
//         //   navigateToPage(".main-history-container", "history.html");
        
//         //   // 차단 버튼 클릭 이벤트
//         //   document
//         //     .querySelector(".main-Block-URL-button")
//         //     .addEventListener("click", toggleBlockURL);
        
//         //   // URL 입력 필드의 input 이벤트 리스너 추가
//         //   document
//         //     .querySelector(".main-url-input")
//         //     .addEventListener("input", (event) => {
//         //       toggleBlockURLImage(event.target.value);
//         //     });
        
//         //   // 초기 차단된 URL 이미지 설정
//         //   toggleBlockURLImage(document.querySelector(".main-url-input").value);
//         // });
      
//       }
//     });
//   });



document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('authToken', function (result) {
      if (!result.authToken) {
          window.location.href = 'login.html';
      } else {
          // main-qr-scan-container 클릭 시 image-upload.html로 이동
          document.getElementById('main-qr-scan-container').addEventListener('click', function () {
              window.location.href = 'image-upload.html';
          });

          // URL 입력 이벤트 처리
          const urlInput = document.querySelector('.main-url-input');
          urlInput.addEventListener('input', function () {
              const url = urlInput.value;
              if (url) {
                  fetch(`http://localhost:3000/api/check-blocked?url=${encodeURIComponent(url)}&userId=${result.authToken}`)
                      .then(response => response.json())
                      .then(data => {
                          if (data.isBlocked) {
                              alert('This URL is blocked.');
                          }
                      })
                      .catch(error => console.error('Error:', error));
              }
          });
      }
  });
});

