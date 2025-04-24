import { Port } from "./Port";

export interface Component {
    id: string;
    name: string;
    ports: Port[];
}
