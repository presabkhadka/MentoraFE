import Sidebar from "../../components/Sidebar";

export default function Home(){
    return(
        <div className="h-screen grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-2">
                <Sidebar/>
            </div>
            <div className="col-span-10 p-6">
                here will be the contents
            </div>
        </div>
    )
}