import React, { useState, useEffect, useRef } from "react";
import {
  PageContainer,
  DogList,
  DogItem,
  DogForm,
  Input,
  RadioInput,
  Button,
  Buttons,
  TabButtons,
  ShelterForm,
} from "./HomeStyle";
import persons from "../persons";

const Home = () => {
  const personsCount = useRef(persons.length);
  const [listOfpersons, setListOfpersons] = useState(persons);
  const [newperson, setNewperson] = useState({
    id: personsCount.current + 1,
    name: "",
    surname: "",
    gender: "",
  });
  const [activeTab, setActiveTab] = useState("list-of-persons");

  const handleChange = (e) => {
    const updateperson = { ...newperson, [e.target.name]: e.target.value };
    setNewperson(updateperson);
  };
  const [planing, setplaning] = useState({
    meters: 0,
    hours: 0,
  });
  const [color, setColor] = useState("gray");
  useEffect(() => {
    console.log("name: " + newperson.name);    
    console.log("surname: " + newperson.surname);    
    console.log("gender: " + newperson.gender);    
    if (activeTab == "list-of-persons") {
      if (newperson.name == "" || newperson.surname == "" || newperson.gender == "") {
        document.getElementById('add_employee').disabled = true;      
      } else {
        document.getElementById('add_employee').disabled = false;
      }
    }
      if (isNaN(planing.meters) || isNaN(planing.hours)) {
        setColor("red");
      return;
    }
    let actualWorkForce = listOfpersons.filter((person) => person.gender == "male").length + (listOfpersons.filter((person) => person.gender == "female").length * 0.5);

    let wantedWorkForce = planing.meters / planing.hours;

    if (wantedWorkForce >= actualWorkForce) {
      setColor("red");

      console.log("metry: " + planing.meters);
      console.log("hodiny: " + planing.hours);
      console.log("pracovní síla: " + actualWorkForce);
      console.log("potřebná síla: " + wantedWorkForce);
    } else {
      setColor("green");
    }

    if (planing.hours === 0 || planing.meters === 0) {
      setColor("red");
    }
  }, [newperson, planing]);
  
  const handleplaning = (e) => {
    const updateplaning = {
      ...planing,
      [e.target.name]: parseInt(e.target.value),
    };

    setplaning(updateplaning);
  };
  const handleAdd = () => {
    console.log(true);            
    
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach((radio) => {
      radio.checked = false;
    });
    setListOfpersons((listOfpersons) => {
      return [...listOfpersons, newperson];
    });
    persons.current++;
    const updateperson = {
      id: persons.current + 1,
      name: "",
      surname: "",
      gender: "",
    };
    setNewperson(updateperson);              
  };
  const handleDelete = (idToDelete) => {
    setListOfpersons(listOfpersons.filter((person) => person.id !== idToDelete));
  };
  return (
    <PageContainer>
      <Buttons>
        <TabButtons
          name="list-of-persons"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-persons")}
        >
          List of employees
        </TabButtons>
        <TabButtons
          name="shelter-Planing"
          data-active={activeTab}
          onClick={() => setActiveTab("shelter-Planing")}
        >
          Task
        </TabButtons>
      </Buttons>
      {activeTab === "list-of-persons" && (
        <>
          <DogList name="personList">
            {listOfpersons.map((person) => {
              return (
                <DogItem key={person.id}>
                  {person.name} {person.surname} - {person.gender}{" "}
                  <button
                    style={{
                      color: "#64766a",
                      fontWeight: "bolder",
                      border: 2 + "px solid #64766a",
                      borderRadius: 50 + "%",
                      height: 25 + "px",
                      width: 25 + "px",
                    }}
                    onClick={() => handleDelete(person.id)}
                  >
                    X
                  </button>
                </DogItem>
              );
            })}
          </DogList>
          <DogForm>
            <Input
              type="text"
              placeholder="name"
              name="name"
              value={newperson.name}
              onChange={handleChange}
            ></Input>
            <Input
              type="text"
              placeholder="surname"
              name="surname"
              value={newperson.surname}
              onChange={handleChange}
            ></Input>
            <label><RadioInput
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
            ></RadioInput>Male</label>
            <label><RadioInput
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
            ></RadioInput>Female</label>
            <Button 
              id="add_employee" 
              onClick={handleAdd}
              >
              Add employee
            </Button>
          </DogForm>
        </>
      )}
      {activeTab === "shelter-Planing" && (
        <>
          <h3>Planing excavation works</h3>
          <p>Male: {listOfpersons.filter((person) => person.gender == "male").length} </p>
          <p>Female: {listOfpersons.filter((person) => person.gender == "female").length}</p>
          <ShelterForm>
            <Input
              type="number"
              min={0}
              placeholder="Enter meters"
              name="meters"
              value={planing.meters}
              onChange={handleplaning}
            ></Input>
            <Input
              type="number"
              min={0}
              placeholder="Enter hours"
              name="hours"
              value={planing.hours}
              onChange={handleplaning}
            ></Input>
            <Button id="planning" style={{ backgroundColor: color }}>
              Work planning
            </Button>
          </ShelterForm>
        </>
      )}
    </PageContainer>
  );
};
export default Home;
