import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { SERVER_URL } from "./constants/Constants";

const connection = new HubConnectionBuilder().withUrl(SERVER_URL).build();

export default connection;
