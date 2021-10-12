import { createStore } from "easy-peasy";
import { IStoreType } from "../types/storeType";
import { nodesModel } from "./nodesModel";

export const storeModel = createStore<IStoreType>({
	nodes: nodesModel,
}, {
	devTools: true,
	name: 'CRAEdit store',
});