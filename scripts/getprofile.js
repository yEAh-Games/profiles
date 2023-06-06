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

            if (userAccount) {
              if (userAccount.admin) {
                userProfile.isAdmin = true;
                insertAdminHTML();
              } else {
                userProfile.isAdmin = false;
              }
            } else {
              userProfile.isAdmin = false;
            }

            var emailDiv = '<a class="c8dCx6gnV43hTOLV6ks5 ezMFUVl744lvw6ht0lFe __9sbu0yrzdhGIkLWNXl OyABRrnTV_kvHV7dJ0uE" href="mailto:' + userProfile.email + '">' + userProfile.email + '</a>';

            var websiteDiv = '<a style="color:#ff4747" title="This user\'s website." href="' + userProfile.website + '">' + userProfile.website.replace("https://", "") + '</a>'; 

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
            profileUsernameElement.textContent = '@' + userProfile.username;

            var profileAboutElement = document.getElementById('profileAbout');
            profileAboutElement.textContent = userProfile.about;

            var profileLocationElement = document.getElementById('profileLocation');
            profileLocationElement.textContent = userProfile.location;

            var profileEmailElement = document.getElementById('profileEmail');
            profileEmailElement.innerHTML = emailDiv;

            var profileWebsiteElement = document.getElementById('profileWebsite');
            profileWebsiteElement.innerHTML = websiteDiv;

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
  var adminsvg = '&#160;<a href="https://admin.yeahgames.net" style="text-decoration:none!important;" title="This user is a yEAh admin."><svg style="color:#ff4747!important;" class="VQS2tmQ_zFyBOC2tkmto YIUegm7fh_CpJbivTu6B MnxxlQlR1H0xJuMEE8Yr PeR2JZ9BZHYIH8Ea3F36 bcsWqjK52oeyT6oeC2Az gZ3KuFw1JESHhOJhjT8j _Oyukq8JlN1X9w2FmPds XIIs8ZOri3wm8Wnj9N_y Lld6j9B1iilEqA6j31e4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></a>'

  function insertAdminHTML() {
    var profileAdminElement = document.getElementById('profileAdmin');
    if (userProfile.isAdmin) {
      profileAdminElement.innerHTML = adminsvg;
    } else {
      profileAdminElement.innerHTML = "";
    }
  }

});
