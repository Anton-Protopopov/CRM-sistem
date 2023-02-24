import { createClientHeader } from "./creatHeader.js";
import { createClientSection } from "./createClientsSection.js";
import { getCliens } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClients.js";
import { searchClients } from "./searchClients.js";

const createApp = async () => {
    const header = createClientHeader();
    const clientSection = createClientSection();
    document.body.append(header, clientSection.main);
    const preloader = document.querySelector('.preloader');

    try {
        const clients = await getCliens();
        searchClients(clients);

        for (const client of clients) {
            document.querySelector('.clients__tbody').append(createClientItem(client));
        }
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => preloader.remove(), 1500);
        
    }

}

createApp()
document.addEventListener('DOMContentLoaded', () => sortTable())
