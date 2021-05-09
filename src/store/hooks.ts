import { createTypedHooks } from "easy-peasy";
import { IStoreType } from "./types/storeType";

const typedHooks = createTypedHooks<IStoreType>();

export const useStoreAction = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;