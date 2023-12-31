import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const StudentCart = () => {
    const [axiosSecure] = useAxiosSecure();
    const [cart, refetch, totalPrice] = useCart();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cart/${id}`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <>
            {
                totalPrice === 0 &&
                <h1 className='text-3xl text-center text-primary dark:text-white shadow-md dark:shadow-white py-5 w-4/5 mx-auto mt-20 font-semibold font-Courgette'>You do not have any class in your cart.</h1>
            }

            <section className={`${totalPrice === 0 && 'hidden'}`}>
                <h1 className='text-3xl text-center text-slate-600 underline dark:text-white py-5 w-4/5 mx-auto mt-4 font-semibold font-Courgette'>
                    &nbsp; My Cart &nbsp;
                </h1>
                <div className="overflow-x-auto m-4">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Class</th>
                                <th>Instructor</th>
                                <th className='lg:pl-20'>Price</th>
                                <th className='flex justify-evenly'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-square rounded-md w-16 h-16">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-medium">{item.instructorName}</span>
                                            <br />
                                            <span className="badge badge-ghost badge-sm p-0">{item.instructorEmail}</span>
                                        </td>
                                        <td className='font-medium text-slate-700 lg:pl-20'>$ {item.price}</td>
                                        <td className='flex justify-evenly'>
                                            <Link to='/dashboard/checkout' state={{ totalPrice: item.price, classId: item.classId, cartId: item._id }}>
                                                <button className="btn btn-outline btn-primary tracking-wide normal-case duration-300">Proceed to Pay</button>
                                            </Link>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-error text-2xl text-white duration-300 bg-[#FF0000]"><FaRegTrashAlt /></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default StudentCart;