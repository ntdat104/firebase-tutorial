const firebase = window.firebase;

//TODO config
const config = {
    apiKey: "AIzaSyCPwdT48rFEb9wa_712z6_m26uhE6EPV3c",
	authDomain: "fir-tutorial-ntdat.firebaseapp.com",
	projectId: "fir-tutorial-ntdat",
	storageBucket: "fir-tutorial-ntdat.appspot.com",
	messagingSenderId: "1073997515350",
	appId: "1:1073997515350:web:92eca56098079aa24709f7",
};
firebase.initializeApp(config);
const db = firebase.database();

//TODO get element
const hobbyFormElement = document.getElementById("hobbyForm");
const hobbyItemElement = document.getElementById("hobbyItem");
const hobbyListElement = document.getElementById("hobbyList");

//TODO submit event
hobbyFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const hobby = hobbyItemElement.value;
    if(!hobby) return;

    addHobbyItem({ name: hobby });
    
    //! reset value
    hobbyItemElement.value = "";
})

//TODO render hobby list
function renderHobbyList(hobbyList) {
    //! reset hobbyList
    hobbyListElement.innerHTML = "";

    hobbyList.map(hobby => {
        const liElement = document.createElement("li");
        liElement.innerHTML = hobby.name;
        liElement.style.cursor = "pointer";
        liElement.addEventListener("click", () => deleteHobbyItem(hobby.id));
        hobbyListElement.appendChild(liElement);
    })
}

//TODO get hobby list from database
function getHobbyListFromDB() {
    db.ref("hobbies").on("value", snapshot => {
        let hobbyList = [];
        snapshot.forEach((childSnapshot) => {
            let hobby = childSnapshot.val();
            hobby.id = childSnapshot.key;
            hobbyList.push(hobby);
        })
        renderHobbyList(hobbyList);
    })
}

//TODO add hobby item
function addHobbyItem(hobby) {
    db.ref("hobbies").push(hobby);
}

//TODO delete hobby item
function deleteHobbyItem(id) {
    db.ref("hobbies").child(id).remove();
}

//TODO set hobby item
function setHobbyItem(id, value) {
    db.ref("hobbies").child(id).set(value);
}

getHobbyListFromDB();