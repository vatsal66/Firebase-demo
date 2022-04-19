import './App.css';
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import lottie from 'lottie-web';
import ReactLottie from 'react-lottie';
import animation from "./animation.json";

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const userCollectionRef = collection(db, 'users');

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
  };

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./animation.json')
    })
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const stateBlank = () => {
    setAge('');
    setName('');
  };

  const addNewUser = async () => {
    await addDoc(userCollectionRef, { name: name, age: Number(age) });
    getUsers();
    stateBlank();
  };

  const editUser = async () => {
    const userDocs = doc(db, "users", id);
    const newFields = { name: name, age: Number(age) };

    await updateDoc(userDocs, newFields);
    getUsers();
    stateBlank();
    setIsEdit(false);
  };

  const deleteUser = async (deleteId) => {
    const userDocs = doc(db, "users", deleteId);

    await deleteDoc(userDocs);
    getUsers();
  };

  const editButton = (user) => {
    setName(user.name);
    setAge(user.age);
    setId(user.id);
    setIsEdit(true);
  };

  const buttonStyle = {
    display: 'inline-block',
    margin: '10px auto',
    marginRight: '10px',
    border: 'none',
    color: 'white',
    backgroundColor: '#647DFF',
    borderRadius: '2px',
    fontSize: '15px',
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const clickPlayButton = () => {
    setIsPaused(false);
    setIsStopped(false)
  };

  return (
    <div className="App">
      <section className="App h-screen w-full flex justify-center items-center bg-green-500">
        <div className="w-full max-w-md bg-gray-800" >
          <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="px-4 pb-4">
              <label htmlFor="name" className="text-sm block font-bold  pb-2">Enter Name</label>
              <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " />
            </div>
            <div className="px-4 pb-4">
              <label htmlFor="age" className="text-sm block font-bold pb-2">Enter Age</label>
              <input type="number" name="age" value={age} onChange={(e) => { setAge(e.target.value) }} placeholder="Enter Age" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" />
            </div>
            <div>
              {
                isEdit ?
                  <button onClick={() => editUser()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Edit User
                  </button> :
                  <button onClick={() => addNewUser()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Add new User
                  </button>
              }
            </div>
          </form>
        </div>
      </section>
      <div className="container flex justify-center mx-auto pt-12">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Age
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Edit
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {users.map((user, index) => {
                    return (
                      <tr className="whitespace-nowrap" key={index}>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{user.age}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => editButton(user)} className="px-4 py-1 text-sm text-blue-600 bg-blue-200 hover:bg-blue-500 hover:text-white rounded-full">
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteUser(user.id)} className="px-4 py-1 text-sm text-red-400 bg-red-200 hover:bg-red-500 hover:text-white rounded-full">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div ref={container} />

      <ReactLottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={isStopped}
          isPaused={isPaused}
        />
        <button
          style={buttonStyle}
          onClick={() => setIsStopped(true)}
        >
          Stop
        </button>
        <button
          style={buttonStyle}
          onClick={() => clickPlayButton()}
        >
          Play
        </button>
        <button
          style={buttonStyle}
          onClick={() => setIsPaused(!isPaused)}
        >
          Pause
        </button>
    </div>
  );
}

export default App;