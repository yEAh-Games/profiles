document.addEventListener("DOMContentLoaded", function () {
    var profileCard = document.getElementById("profile-card");
  
    // Fetch the user's profile data from the JSON database
    fetch("https://accounts.yeahgames.net/data/settings/profiles.json")
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve profile data.");
        }
      })
      .then(function (profileData) {
        // Retrieve the user's profile based on the permalink (username)
        var permalink = window.location.pathname.replace("/", "");
        var username = permalink.replace("@", "").replace(".html", ""); // Remove the "@" symbol
        var userProfile = profileData.find(function (profile) {
          return profile.username === username;
        });
  
        if (userProfile) {
          // Fetch the user's account data from the JSON database
          fetch("https://accounts.yeahgames.net/data/accounts.json")
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to retrieve account data.");
              }
            })
            .then(function (accountData) {
              // Find the user's account based on the username
              var userAccount = accountData.find(function (account) {
                return account.username === userProfile.username;
              });
  
              if (userAccount && userAccount.admin) {
                userProfile.isAdmin = true;
              } else {
                userProfile.isAdmin = false;
              }
  
              // Generate the profile card HTML based on the user's data
              var profileHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div class="flex items-center">
                    <div class="w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://ugc.yeahgames.net/profile/p/default/png/@${userProfile.username}.png" alt="Profile Picture" class="object-cover w-full h-full">
                    </div>
                    <div class="ml-4">
                      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">${userProfile.name}</h2>
                      <p class="text-gray-600 dark:text-gray-400">${userProfile.username}</p>
                      <p class="text-gray-600 dark:text-gray-400">${userProfile.email}</p>
                      ${userProfile.isAdmin ? '<span class="text-sm text-red-500 font-semibold">Admin</span>' : ''}
                      <p class="text-gray-600 dark:text-gray-400 roles">${userProfile.roles.join(", ")}</p>
                      <p class="text-gray-600 dark:text-gray-400 member-site">${userProfile.username}.ms.yeahgames.net</p>
                      <p class="text-gray-600 dark:text-gray-400 registered-sites">${userProfile.registeredSites.join(", ")}</p>
                      <p class="text-gray-600 dark:text-gray-400 yank-account">Yank Account: ${userProfile.yankAccount}</p>
                    </div>
                  </div>
                  <div class="mt-6">
                    <div class="flex space-x-4">
                      <!-- Add social links dynamically -->
                    </div>
                    <div class="mt-4">
                      <a href="${userProfile.website}" target="_blank" class="text-red-500 hover:text-red-600">${userProfile.website}</a>
                    </div>
                    <div class="mt-4">
                      <!-- Add other links dynamically -->
                    </div>
                  </div>
                </div>
              `;
  
              profileCard.innerHTML = profileHTML;
            })
            .catch(function (error) {
              console.error("Error:", error);
              // Display an error message or handle the error gracefully
            });
        } else {
          throw new Error("Profile not found.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        // Display an error message or handle the error gracefully
      });
  });

  var img = document.getElementById('profileImage');
  img.src = 'https://ugc.yeahgames.net/profile/p/default/png/@' + userProfile.username + '.png';