chrome.runtime.onInstalled.addListener(() => {
  checkAuthToken();
});

chrome.runtime.onStartup.addListener(() => {
  checkAuthToken();
});

chrome.action.onClicked.addListener(() => {
  checkAuthToken();
});

function checkAuthToken() {
  chrome.storage.local.get('authToken', (result) => {
      if (result.authToken) {
          chrome.action.setPopup({ popup: 'html/main.html' });
      } else {
          chrome.action.setPopup({ popup: 'html/login.html' });
      }
  });
}







// // Promise를 이용한 동적 규칙 업데이트
// function updateDynamicRules(addRules, removeRuleIds = []) {
//   return new Promise((resolve, reject) => {
//     chrome.declarativeNetRequest.updateDynamicRules(
//       { addRules, removeRuleIds },
//       () => resolve("Rules updated successfully.")
//     );
//   });
// }

// // chrome.storage.sync에 저장된 blockedURLs를 기반으로 동적 규칙을 업데이트하는 함수입니다.
// function updateDynamicRulesFromStorage() {
//   chrome.storage.sync.get("blockedURLs", (data) => {
//     const blockedURLs = data.blockedURLs || [];

//     chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
//       // 기존 규칙들의 ID를 가져옵니다.
//       const existingIds = existingRules.map((rule) => rule.id);
//       let maxId = existingIds.length ? Math.max(...existingIds) : 0;

//       if (blockedURLs.length > 0) {
//         // blockedURLs에 있는 URL들에 대한 강력한 차단 규칙을 생성합니다.
//         const addRules = blockedURLs.map((url) => ({
//           id: ++maxId,
//           priority: 1,
//           action: { type: "block" },
//           condition: { urlFilter: url, resourceTypes: ["main_frame"] },
//         }));
//         updateDynamicRules(addRules)
//           .then((message) => {
//             console.log(message);
//             // 규칙 업데이트 완료 후 처리할 작업 추가 가능
//           })
//           .catch((error) => {
//             console.error("Error updating rules:", error);
//           });
//       } else {
//         // blockedURLs가 비어있으면 모든 규칙을 제거하여 차단을 해제합니다.
//         const removeRuleIds = existingRules.map((rule) => rule.id);
//         updateDynamicRules([], removeRuleIds)
//           .then((message) => {
//             console.log(message);
//             // 규칙 업데이트 완료 후 처리할 작업 추가 가능
//           })
//           .catch((error) => {
//             console.error("Error updating rules:", error);
//           });
//       }
//     });
//   });
// }

// // storage에 변화가 있을 때마다 규칙을 업데이트합니다.
// chrome.storage.onChanged.addListener((changes, namespace) => {
//   if (namespace === "sync" && changes.blockedURLs) {
//     updateDynamicRulesFromStorage();
//   }
// });
