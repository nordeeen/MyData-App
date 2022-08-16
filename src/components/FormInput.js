import React, { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";

// resources api
let api = axios.create({ baseURL: "http://localhost:3000" });

const FormInput = () => {
  // state contact
  const [contacts, setContacts] = useState([]);

  // state isUpdate
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  // state formData
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  //===============================//

  // Mengambil Data dari sumber API (GET)
  useEffect(() => {
    api
      .get("/datas")
      .then((res) => {
        setContacts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // handle untuk input form
  const dataChangeHandle = (e) => {
    let dataForm = { ...formData };
    dataForm[e.target.name] = e.target.value;
    setFormData(dataForm);
    console.log(dataForm);
  };

  // handler submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("succes");

    let dataContacts = [...contacts];

    // validasi form input
    if (formData.name === "") {
      return false;
    } else if (formData.phone === "") {
      return false;
    }

    // LOGIC MENGUBAH DATA 1
    if (isUpdate.status === true) {
      dataContacts.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          console.log(`${contact.id} === ${isUpdate.id}`);
          contact.name = formData.name;
          contact.phone = formData.phone;
        }

        // Mengubah Data API (PUT)
        api
          .put(`/datas/${isUpdate.id}`, {
            name: formData.name,
            phone: formData.phone,
          })
          .then(() => {
            console.log("berhasil mengubah data");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      // LOGIC MENAMBAHKAN DATA
      let newData = {
        id: Math.random().toString(),
        name: formData.name,
        phone: formData.phone,
      };
      dataContacts.push(newData);

      // Menambahkan Data ke API (POST)
      api
        .post("/datas", newData)
        .then(() => {
          console.log("berhasil menambahkan data");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setContacts(dataContacts);
    console.log(dataContacts);

    // reset data form & update
    setFormData({ name: "", phone: "" });
    setIsUpdate({ id: null, status: false });
  };

  // LOGIC MENGUBAH DATA 2
  // fungsi untuk handle ketika mengubah data.
  const handleEditData = (id) => {
    let dataforEdit = [...contacts];
    let foundData = dataforEdit.find((contact) => contact.id === id);
    setIsUpdate({ id: id, status: true });
    setFormData({ name: foundData.name, phone: foundData.phone });
  };

  // LOGIC MENGHAPUS DATA
  // fungsi untuk handle ketika mengubah data.
  const handleDeleteData = (id) => {
    let dataforDel = [...contacts];
    let filteredDatas = dataforDel.filter((contact) => contact.id !== id);

    // Menghapus Data API (DELETE)
    api
      .delete(`/datas/${id}`)
      .then(() => {
        console.log("berhasil menghapus data");
      })
      .catch((error) => {
        console.log(error);
      });

    setContacts(filteredDatas);
  };

  return (
    <>
      <div className="w-[30rem] max-w-xs pb-3 mx-auto mt-9">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-center mb-4 font-bold text-2xl">
            My Data Contact
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor=""
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="name"
              placeholder="your name"
              value={formData.name}
              onChange={dataChangeHandle}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor=""
            >
              Number Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
              id="numberphone"
              type="number"
              name="phone"
              placeholder="your number phone"
              value={formData.phone}
              onChange={dataChangeHandle}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              save
            </button>
          </div>
        </form>
      </div>
      <div>
        <List
          data={contacts}
          handleEditData={handleEditData}
          handleDeleteData={handleDeleteData}
        />
      </div>
    </>
  );
};

export default FormInput;
