import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ContactList from "./components/ContactList";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
    const users = await getUsers();
    
    return (
        <Sidebar>
            <div className="h-full">
                <ContactList items={users} />
                {children}
            </div>
        </Sidebar>
    );
}
