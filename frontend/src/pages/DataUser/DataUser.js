import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import ComplexTable from "./components/ComplexTable";
import Footer from "../../components/footer/Footer";
import axios from 'axios';

const DataUser = () => {
    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const response = await axios.get(`http://localhost:5000/users/10&1`);
        setUsers(response.data.rows);
    }

    useEffect(()=>{
        getUsers()
    },[]);

    return (
        <div className="flex h-full w-full">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
                    <div className="h-full">
                        <Navbar 
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"Horizon UI Tailwind React"}
                            brandText="users"
                        />
                    </div>
                    <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                        <div>
                            {/* Complex Table , Task & Calendar */}
                            <ComplexTable
                                dataUser={users}
                            />
                        </div>
                    </div>
                    <div className="p-3">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DataUser