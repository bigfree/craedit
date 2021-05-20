import {FC} from "react";
import {ConnectionLineComponentProps} from "react-flow-renderer/dist/types";

const EdgeType: FC<ConnectionLineComponentProps> = (props: ConnectionLineComponentProps): JSX.Element => {
    return (
        <>
            <g>
                <p>aaa</p>
                <path
                    fill="none"
                    stroke="#222"
                    strokeWidth={1.5}
                    className="animated"
                    d={`M${props.sourceX},${props.sourceY} C ${props.sourceX} ${props.targetY} ${props.sourceX} ${props.targetY} ${props.targetX},${props.targetY}`}
                />
                <circle cx={props.targetX} cy={props.targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5}/>
            </g>
        </>
    )
}

export default EdgeType;