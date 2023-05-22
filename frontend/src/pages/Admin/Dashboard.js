import React, {useState} from 'react'
import Sidebar from '../../components/sidebar';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/Footer";

import Widget from "../../components/widget/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";


import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import CheckTable from "./components/CheckTable";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "./components/ComplexTable";

import PieChartCard from "./components/PieChartCard";
import DailyTraffic from "./components/DailyTraffic";
import TaskCard from "./components/TaskCard";
import MiniCalendar from "../../components/calendar/MiniCalendar";

const Dashboard = () => {
    const [open, setOpen] = useState(true)
  return (
    <div className="flex h-full w-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
            <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText="test"
              secondary="test"
            />
            </div>
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <div>
                {/* Card widget */}

                <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                  <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"Earnings"}
                    subtitle={"$340.5"}
                  />
                  <Widget
                    icon={<IoDocuments className="h-6 w-6" />}
                    title={"Spend this month"}
                    subtitle={"$642.39"}
                  />
                  <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"Sales"}
                    subtitle={"$574.34"}
                  />
                  <Widget
                    icon={<MdDashboard className="h-6 w-6" />}
                    title={"Your Balance"}
                    subtitle={"$1,000"}
                  />
                  <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"New Tasks"}
                    subtitle={"145"}
                  />
                  <Widget
                    icon={<IoMdHome className="h-6 w-6" />}
                    title={"Total Projects"}
                    subtitle={"$2433"}
                  />
                </div>

                {/* Charts */}

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <TotalSpent />
                  <WeeklyRevenue />
                </div>

                {/* Tables & Charts */}

                <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                  {/* Check Table */}
                  <div>
                    <CheckTable
                      columnsData={columnsDataCheck}
                      tableData={tableDataCheck}
                    />
                  </div>

                  {/* Traffic chart & Pie Chart */}

                  <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <DailyTraffic />
                    <PieChartCard />
                  </div>

                  {/* Complex Table , Task & Calendar */}

                  <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                  />

                  {/* Task chart & Calendar */}

                  <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <TaskCard />
                    <div className="grid grid-cols-1 rounded-[20px]">
                      <MiniCalendar />
                    </div>
                  </div>
                </div>
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

export default Dashboard