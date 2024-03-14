import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../index.css';

function EditUser() {
    const [user, setUser] = useState({ U_Firstname: '', U_Lastname: '', U_Gender: '', U_Birthday: '' }); // ปรับปรุงให้เก็บข้อมูลเป็น object
    const navigate = useNavigate();
    useEffect(() => {
        Axios.post("http://localhost:5001/getUser", {
            UID: sessionStorage.getItem("editID")
        })
            .then((response) => {
                setUser(response.data[0]); // อัปเดต state ด้วยข้อมูลที่ได้
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // อัปเดตข้อมูลใน state ตามการเปลี่ยนแปลงของ input
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5001/updateUser', {
            ...user, // This spread operator passes all user fields
            UID: sessionStorage.getItem("editID") // Ensure you're sending the UID to the server
        })
        .then((response) => {
            console.log(response.status)
            if(response.status==200){
                alert("Update Success")
                navigate('/manage');
            }
            // console.log('User updated successfully:', response);
            // 
            // Handle success, perhaps redirect or display a success message
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            // Handle error, display error message to user
        });
    };
    

    return (
        
        <div>
            <div className='text-4xl font-extrabold text-center my-3'>Edit Info</div>
            <div className='flex justify-center items-start min-h-screen '>
            <div className='bg-white w-5/6 rounded-3xl p-8 '>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label>Firstname</label>
                        <input type="text" name="U_Firstname" value={user.U_Firstname} onChange={handleInputChange} className='w-full mt-2' />
                    </div>
                    <div>
                        <label>Lastname</label>
                        <input type="text" name="U_Lastname" value={user.U_Lastname} onChange={handleInputChange} className='w-full mt-2' />
                    </div>
                    <div>
                        <label>Gender</label>
                        <select name="U_Gender" value={user.U_Gender} onChange={handleInputChange} className='w-full mt-2 border-2'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Birthday</label>
                        <input type="date" name="U_Birthday" value={user.U_Birthday} onChange={handleInputChange} className='w-full mt-2 border-2' />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Save Changes</button>
                </form>
            </div>
        </div>
        </div>
        


    );
}

export default EditUser;
