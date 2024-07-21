import getContacts from "../actions/getContacts";
import Sidebar from "../components/sidebar/Sidebar";
import ContactList from "./components/ContactList";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
    const contacts = await getContacts();
    
    return (
        <Sidebar>
            <div className="h-full">
                <ContactList items={contacts} />
                {children}
            </div>
        </Sidebar>
    );
}
