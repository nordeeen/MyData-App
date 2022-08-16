import React from "react";

const List = ({ data, handleEditData, handleDeleteData }) => {
  return (
    <>
      <div className="w-[30rem] max-w-xs pb-3 mx-auto">
        {data.map((contact, index) => {
          // list data contacts
          return (
            <div
              key={index}
              className="border-4 border-solid	py-1 px-3 border-blue-300 rounded-sm"
            >
              <div className="flex w-full justify-between">
                <h5 className="mb-1 font-bold text-lg">{contact.name}</h5>
                <div>
                  <button
                    onClick={() => handleEditData(contact.id)}
                    className="text-sm mr-3 text-blue-600 underline hover:bg-purple-500 hover:text-[#ffff]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteData(contact.id)}
                    className="text-sm text-blue-600 underline hover:bg-red-500 hover:text-[#ffff]"
                  >
                    Del
                  </button>
                </div>
              </div>
              <h5 className="mb-1 text-sm font-semibold">{contact.phone}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default List;
