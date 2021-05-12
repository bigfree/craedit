import { NodeTypesType } from "react-flow-renderer";
import Condition from "./condition.component";
import SyncPoint from "./syncPoint.component";
import Task from "./task.component";

export const nodeTypes: NodeTypesType = {
	syncPoint: SyncPoint,
	task: Task,
	condition: Condition,
};