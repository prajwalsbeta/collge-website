import { firestore } from "./firebase";

async function loadPage(sector) {
  console.log(sector);
  let result = document.getElementById("result");
  const template = Handlebars.compile(
    document.querySelector("#page").innerHTML
  );
  const teamsRef = firestore.collection("teams");
  const snapshot = await teamsRef
    .where("status", "==", null)
    .where("projectTheme", "==", sector)
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    result.innerHTML = "<h1>NO PROBLEM STATEMENTS</h1>";
    return;
  }
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    const { teamName, problem, solution, url } = doc.data();
    const content = template({ teamName, problem, solution, url, uid: doc.id });
    result.innerHTML += content;
  });
  document.querySelectorAll(".accept").forEach((button) => {
    button.onclick = async () => {
      await accept(button.dataset.uid);
      button.parentElement.parentElement.remove();
    };
  });

  document.querySelectorAll(".reject").forEach((button) => {
    button.onclick = async () => {
      await reject(button.dataset.uid);
      button.parentElement.parentElement.remove();
    };
  });
}

async function accept(uid) {
  const teamRef = firestore.collection("teams").doc(uid);
  const res = await teamRef.set(
    {
      status: true,
    },
    { merge: true }
  );
  const doc = await teamRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const res = await firestore
      .collection(`${doc.data().projectTheme}_accepted`)
      .add(doc.data());
  }
}

async function reject(uid) {
  const teamRef = firestore.collection("teams").doc(uid);

  const res = await teamRef.set(
    {
      status: false,
    },
    { merge: true }
  );
  const doc = await teamRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const res = await firestore
      .collection(`${doc.data().projectTheme}_rejected`)
      .add(doc.data());
  }
}

loadPage(localStorage.getItem("sector"));
