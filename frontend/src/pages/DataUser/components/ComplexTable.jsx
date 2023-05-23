import CardMenu from "../../../components/card/CardMenu";
import Card from "../../../components/card";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Progress from "../../../components/progress";

const ComplexTable = (props) => {
  const {dataUser} = props;

  console.log(dataUser);

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Data User
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead>
              <tr>
                <th className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    No
                  </p>
                </th>
                <th className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Name
                  </p>
                </th>
                <th className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Status
                  </p>
                </th>
                <th className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Action
                  </p>
                </th>
              </tr>
          </thead>
          <tbody>
            {dataUser.map((user, index)=>(
              <tr key={index}>
                <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {index+1}
                    </p>
                </td>
                <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {user.name}
                    </p>
                </td>
                <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white flex items-center gap-4">
                      <MdCheckCircle />{user.status.name}
                    </p>
                </td>
                <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <Progress width="w-[108px]" value="75.5" />
                </td>
              </tr>
            ))}
              
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
