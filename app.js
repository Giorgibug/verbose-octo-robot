function getCountriesData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((Response) => {
      return Response.json();
    })
    .then((countries) => {
      console.log(countries);
      //   renderCountries();
    });
}
console.log(getCountriesData());

const removeBtn = document.querySelector("#remove-btn");
removeBtn.addEventListener("click", (e) => {
  console.log(removeBtn, e.target);
  removeBtn.remove();
  e.target.remove();
});

// Homework 20

c/ TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
  // TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
  // TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

  //   ცხრილების გამოტანა
  const myTable = document.getElementById("myTable");

  myTable.innerHTML =
    "<table><tr><th>id</th><th>name</th><th>surname</th><th>email</th><th>personal ID</th><th>mobile number</th><th>zip</th><th>gender</th><th colspan='2'>Actions</th></tr>" +
    usersArray
      .map(function (usersArray) {
        const userInfo =
          "<tr><td>" +
          usersArray["id"] +
          "</td><td>" +
          usersArray["first_name"] +
          "</td><td>" +
          usersArray["last_name"] +
          "</td><td>" +
          usersArray["email"] +
          "</td><td>" +
          usersArray["id_number"] +
          "</td><td>" +
          usersArray["phone"] +
          "</td><td>" +
          usersArray["zip_code"] +
          "</td><td>" +
          usersArray["gender"] +
          "</td><td class='aligncenter'><button data-user-id='" +
          usersArray["id"] +
          "' class='editbutton'>edit</button></td><td class='aligncenter'><button data-user-id='" +
          usersArray["id"] +
          "' class='deletebutton' >delete</button></td></tr>";

        return userInfo;
      })
      .join("") +
    "</table>";
  // დასრულება

  console.log(usersArray);
  userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

// TODO: დაასრულე
function userActions() {
  const editId = document.querySelectorAll(".editbutton");

  const editmymodal = document.querySelector("#editmymodal");

  const closebutton = document.querySelector(".closebutton");

  closebutton.addEventListener("click", () => {
    editmymodal.classList.remove("active-modal-my");
  });

  editId.forEach((editId) => {
    editId.addEventListener("click", function handleClick(event) {
      editmymodal.classList.add("active-modal-my");

      geteditId = editId.getAttribute("data-user-id");

      getUserFn(geteditId);
    });
  });

  /* Delete Action */
  const deleId = document.querySelectorAll(".deletebutton");

  deleId.forEach((deleId) => {
    deleId.addEventListener("click", function handleClick(event) {
      deleteUserFn(deleId.getAttribute("data-user-id"));
    });
  });

  document
    .getElementById("edituserbutton")
    .addEventListener("click", function () {
      const userObj = {
        id: document.getElementById("user_id1").value,
        first_name: document.getElementById("user_name1").value,
        last_name: document.getElementById("user_surname1").value,
        phone: document.getElementById("user_phone1").value,
        id_number: document.getElementById("user_personal-id1").value,
        email: document.getElementById("user_email1").value,
        zip_code: document.getElementById("user_zip-code1").value,
        gender: document.querySelector("[name='gender1']:checked").value,
      };

      updateUserFn(userObj);
    });

  /*  AND Delete Action*/

  // 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
  // 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
  // 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
  // 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUserFn ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
  // 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUserFn ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია და ფორმის დასაბმითებისას უნდა მოხდეს updateUserFn() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ
}

function getAllUsersFn() {
  fetch("https://borjomi.loremipsum.ge/api/all-users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.users);

      // html-ში გამოტანა მონაცემების
      renderUsers(data.users);
    });
}

function deleteUserFn(id) {
  fetch(`https://borjomi.loremipsum.ge/api/delete-user/${id}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // გვიბრუნებს სტატუსს
      getAllUsersFn(); // შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან უნდა წამოვიღოთ დატა
      // ამიტომ აქ ყველგან დაგვჭირდება უბრალოდ ამ ფუნქციის გამოძახება, რომელიც ხელახლა გადახატავს ინფორმაციას
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUserFn(id) {
  fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      //

      document.getElementById("user_id1").value = data["users"]["id"];
      document.getElementById("user_name1").value = data["users"]["first_name"];
      document.getElementById("user_surname1").value =
        data["users"]["last_name"];
      document.getElementById("user_phone1").value = data["users"]["phone"];
      document.getElementById("user_personal-id1").value =
        data["users"]["id_number"];
      document.getElementById("user_email1").value = data["users"]["email"];
      document.getElementById("user_zip-code1").value =
        data["users"]["zip_code"];

      if (data["users"]["gender"] == "male") {
        document.getElementById("male1").checked = true;
      }

      if (data["users"]["gender"] == "female") {
        document.getElementById("female1").checked = true;
      }

      if (data["users"]["gender"] == "other") {
        document.getElementById("other1").checked = true;
      }

      console.log(data);
      //TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUserFn(userObj) {
  fetch(`https://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
    method: "put",
  });

  // მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
  // TODO დაასრულეთ ფუნქცია
  //  method: "put",  https://borjomi.loremipsum.ge/api/update-user/${userObj.id}
  // TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
}

function createUserFn(user) {
  fetch("https://borjomi.loremipsum.ge/api/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status) {
        form.reset();
        modal.classList.remove("active-modal");

        // შენახვის, ედიტირების და წაშლის შემდეგ ხელახლა გამოგვაქვს ყველა იუზერი
        getAllUsersFn();
      }
    });
}

getAllUsersFn();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userGender = document.querySelector("[name='gender']:checked");
  // console.log(userGender);

  const userData = {
    id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
    first_name: userName.value,
    last_name: userSurname.value,
    phone: userPhone.value,
    id_number: userPersonalId.value,
    email: userEmail.value,
    gender: userGender.value,
    zip_code: userZipCode.value,
  };

  // console.log(JSON.stringify(userData));

  if (true) {
    createUserFn(userData);
  }

  //  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  -->  createUserFn(user);

  // თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
  // TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUserFn(user);
});

function getCountriesData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
      return response.json();
    })
    .then((counties) => {
      console.log(counties);
      // renderCountries();
    });
}
function getCountryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // renderCountries();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getCountryDataAsync(country) {
  // try catch finally
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
}

function syncFn() {
  console.log("start sync function");
}