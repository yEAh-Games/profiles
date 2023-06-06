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
            var img = document.getElementById('profileImage');
            var url = 'https://ugc.yeahgames.net/profile/p/default/png/@' + userProfile.username + '.png';
            var defaultUrl = 'https://ugc.yeahgames.net/profile/p/default/png/default.png';
            img.onerror = function () {
              img.src = defaultUrl;
            };

            img.src = url;


            var profileNameElement = document.getElementById('profileName');
            profileNameElement.textContent = userProfile.name;

            var profileUsernameElement = document.getElementById('profileUsername');
            profileUsernameElement.textContent = userProfile.username;

          })

          .catch(function (error) {
            console.error("Error:", error);
          });
      } else {
        throw new Error("Profile not found.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });




});

