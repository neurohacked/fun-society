<<<<<<< HEAD
// FIREBASE AUTHENTICATION //////////////////////////////////////////////

$usrSignIn = ('<button type="button" class="btn btn-default navbar-btn sign-in">Sign in</button>');
$usrSignOut = ('<li id="fat-menu" class="dropdown signed-in"><a href="#" class="dropdown-toggle" id="drop3" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="user"></span><span class="caret"></span></a><ul class="dropdown-menu" aria-labelledby="drop3"><li class="usr-scores"><a href="#">View Your High Scores</a></li><li class="sign-out"><a href="#">Sign out</a></li></ul></li>');

/**
 * Writes the user's data to the database.
 */
function writeUserData(userId, name, gmPoints, tvPoints, mvPoints, muPoints) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        gmPoints: '',
        tvPoints: '',
        mvPoints: '',
        muPoints: ''
    });
}
/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
    // Sign in Display -----------------------------------------------------
    // Get current user --------------------------------------------
    if (user && currentUID === user.uid || !user && currentUID === null) {
        return;
    }
    currentUID = user ? user.uid : null;
    if (user) {
        // User is signed in.
        $('.sign-in').remove();
        $('.site-nav').append($usrSignOut);
        $('.user').html(user.displayName);
        writeUserData(user.uid, user.displayName);
    } else {
        // No user is signed in.
        $('.signed-in').remove();
        $('.site-nav').append($usrSignIn);
    }
}

// Sign In -------------------------------------------------------------
function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // Sign in redirect --------------------------------------------
    firebase.auth().signInWithRedirect(provider);
    // Get redirect result -----------------------------------------
=======
// FIREBASE AUTHENTICATION
// -----------------------------------------------------------------------
var signedIn = false;
var user;
var userId;
var username = null;

$usrSignIn = ('<a class="btn btn-default navbar-btn sign-in">Sign in with Google</a>');
$usrSignOut = ('<li class="dropdown"><a href="#" class="dropdown-toggle signed-in" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="user"></span><span class="caret"></span></a><ul class="dropdown-menu"><li class="usr-scores"><a href="#">View Your High Scores</a></li><li class="sign-out"><a href="#">Sign out</a></li></ul></li>');

/**
 * User sign in.
 */
function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    // Sign in redirect
    firebase.auth().signInWithRedirect(provider);
    // Get redirect result
>>>>>>> master
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
<<<<<<< HEAD
// Sign out -------------------------------------------------------------
=======
/**
 * User sign out.
 */
>>>>>>> master
function signOut() {
    firebase.auth().signOut().then(function() {
        location.reload();
        // Sign-out successful.
    }, function(error) {
        // An error happened.
    });
}
<<<<<<< HEAD

$(document).on("click", ".sign-in", signIn);
$(document).on("click", ".sign-out", signOut);

// Listen for auth state changes
firebase.auth().onAuthStateChanged(onAuthStateChanged);
=======
/**
 * Update user info in database.
 */
function updateUsername(UserId, name) {
    firebase.database().ref('users/' + userId).update({
        name: name
    });
}
/**
 * User state.
 */
var initAuth = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            currentUser = firebase.auth().currentUser;
            userId = user.uid;
            signedIn = true;
            $('.sign-in').remove();
            $('.site-nav').append($usrSignOut);
            $('.user').html(user.displayName);
            updateUsername(user.uid, user.displayName);
        } else {
            // No user is signed in.
            signedIn = false;
            $('.signed-in').remove();
            $('.site-nav').append($usrSignIn);
        }
    }, function(error) {
        console.log(error);
    });
    /**
     * Auth buttons.
     */
    $(document).on("click", ".sign-in", signIn);
    $(document).on("click", ".sign-out", signOut);
};

window.onload = function() {
    initAuth();
};
>>>>>>> master
