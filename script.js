let state = {
    people: [
        {
            id: 1,
            name: "James King",
            position: "President and CEO",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0001",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0001",
                smsName: "SMS",
                smsNumber: "781-000-0001",
                emailName: "Email",
                emailAddress: "jking@fakemail.com"
            }
        },
        {
            id: 2,
            name: "Julia Taylor",
            position: "VP of Marketing",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0002",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0002",
                smsName: "SMS",
                smsNumber: "781-000-0002",
                emailName: "Email",
                emailAddress: "jtaylor@fakemail.com"
            }
        },
        {
            id: 3,
            name: "Eugne Lee",
            position: "CFO",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0003",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0003",
                smsName: "SMS",
                smsNumber: "781-000-0003",
                emailName: "Email",
                emailAddress: "elee@fakemail.com"
            }
        },
        {
            id: 4,
            name: "John Williams",
            position: "VP of Enginering",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0004",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0004",
                smsName: "SMS",
                smsNumber: "781-000-0004",
                emailName: "Email",
                emailAddress: "jwilliams@fakemail.com"
            }
        },
        {
            id: 5,
            name: "Ray Moore",
            position: "VP of Sales",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0005",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0005",
                smsName: "SMS",
                smsNumber: "781-000-0005",
                emailName: "Email",
                emailAddress: "rmoore@fakemail.com"
            }
        },
        {
            id: 6,
            name: "Paul Jones",
            position: "QA Manager",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0006",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0006",
                smsName: "SMS",
                smsNumber: "781-000-0006",
                emailName: "Email",
                emailAddress: "pjones@fakemail.com"
            }
        },
        {
            id: 7,
            name: "Alex",
            position: "Boss",
            details: {
                officeName: "Call Office",
                officeNumber: "781-000-0006",
                mobileName: "Call Mobile",
                mobileNumber: "617-000-0006",
                smsName: "SMS",
                smsNumber: "781-000-0006",
                emailName: "Email",
                emailAddress: "pjones@fakemail.com"
            }
        },
    ],
    currentId: 0,
    editState: {
        personId: null,
        personName: "",
        personPosition: "",
        show: false,
    },
    search: {
        filter: "",
        show: false,
    }
};

const inputClick = () => {
    const newSearch = {show: !state.search.show, filter: ""};
    state = Object.assign({}, state, {search: newSearch});
    render(state);
};

const handleClick = ev => {
    const newCurrentId = ev.parentElement.id === state.currentId ? 0 : ev.parentElement.id;

    state = Object.assign({}, state, {currentId: newCurrentId});
    render(state);
};

const handleEdit = ev => {
    const newEditState = {
        show: true,
        personId: ev.parentElement.parentElement.id,
        personName: ev.parentElement.parentElement.children[0].innerHTML.trim(),
        personPosition: ev.parentElement.parentElement.children[1].innerHTML.trim()
    }

    state = Object.assign({}, state, {editState: newEditState});
    render(state);
};

const inputChange = ev => {
    const newSearch = {filter: ev.value, show: state.search.show}

    state = Object.assign({}, state, {search: newSearch});
    render(state);
};

const handleDelete = ev => {
    const idToDelete = +ev.parentElement.parentElement.id;
    if (state.currentId === idToDelete) {
        state.currentId = 0
    }
    const newPeople = state.people.filter(p => p.id !== idToDelete);

    state = Object.assign({}, state, {people: newPeople});
    render(state);
};

const editSave = ev => {
    const currentId = ev.parentElement.id;
    const person = state.people.find(p => p.id === +currentId);

    person.name = ev.parentElement.children[0].value;
    person.position = ev.parentElement.children[1].value;

    const newEditState = Object.assign({}, state.editState, {
        show: false,
        personId: null,
        personName: '',
        personPosition: ''
    });

    state = Object.assign({}, state, {editState: newEditState});

    render(state);
};

const Header = () => {
    return (`<div>
              <p class = "title">Employee Directory</p>  
    </div>`);
};

const HeaderEmp = () => {
    return (`<div>
           <p class = "title">Employee</p>
    </div>`);
};

const SearchBar = () => {
    const value = state.search.filter
    return (`<figure id="logo-box" onclick=inputClick()>
              <img  class = "search-logo" src="image/search.png" alt=""/>
             </figure>
      ${state.search.show ? `<input type="search" value="${value}" autofocus onblur=inputChange(this)>` : ``}
    `);
};

const EditBnt = () => {
    return (`<button class="edit-btn" onclick=handleEdit(this)>Edit</button>`);
};

const Edit = editState => {
    const {personName, personPosition, personId, show} = editState;
    return show ? (`
            <form action="" id=${personId}>
                <input type="text" value="${personName}"/>
                <input type="text" value="${personPosition}"/>
                <button onclick=editSave(this) type="button">Save</button>
            </form>
    `) : ``;
};

const DeleteX = () => {
    return (`<button type="button" id="x-btn" onclick=handleDelete(this)>X</button>`)
};

const EmployeeList = people => {
    const filter = state.search.filter;
    return (
        `<ul>
            ${people
            .filter(p => !filter || p.name.toLowerCase().includes(filter.toLowerCase()))
            .map(p =>
                `<li class="employee-list" id="${p.id}">
                           <span onclick=handleClick(this) class="name-span">
                               ${p.name}
                           </span>                               
                           <span class="positioin-span"> 
                                ${p.position}
                           </span>
                           <span class="buttons-span">
                               ${EditBnt()} 
                               ${DeleteX()}
                            </span>
                        </li>`).join('')}
        </ul>`
    )
};

const EmployeeDetails = id => {
    const detailsList = state.people.find(p => +p.id === +id);
    if (id && detailsList) {
        return (
            `<ul>
                ${Object.keys(detailsList.details).map(d => (
                `<li class="employee-data">${detailsList.details[d]}</li>`
            )).join('')}
            </ul>`
        )
    } else {
        return ''
    }
};


const App = state => {
    return (
        `<div class="app">
      <div class="homePage">
          ${Header()}
          ${SearchBar(state.search)}
          ${Edit(state.editState)}
          ${EmployeeList(state.people)}
      </div>
      <div class="employeePage">
          ${HeaderEmp()}
          ${EmployeeDetails(state.currentId)}
      </div>
    </div>`
    );
};

const render = state => (document.getElementById("root").innerHTML = App(state));

render(state);
