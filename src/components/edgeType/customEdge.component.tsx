import React, { FC } from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import { ArrowHeadType, Position } from "react-flow-renderer/dist/types";

interface TCustomEdgeProps<T = any, B = any> {
	id: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	sourcePosition: Position;
	targetPosition: Position;
	style: T,
	data: B,
	arrowHeadType: ArrowHeadType,
	markerEndId: string;
}

const CustomEdge: FC<TCustomEdgeProps> = (props: TCustomEdgeProps): JSX.Element => {

	const edgePath = getBezierPath({
		sourceX: props.sourceX,
		sourceY: props.sourceY,
		sourcePosition: props.sourcePosition,
		targetX: props.targetX,
		targetY: props.targetY,
		targetPosition: props.targetPosition
	});
	const markerEnd = getMarkerEnd(props.arrowHeadType, props.markerEndId);

	console.log(edgePath);

	return (
		<>
			<path id={props.id} style={props.style} className="react-flow__edge-path" d={edgePath}
			      markerEnd={markerEnd}/>
			<text>
				<textPath href={`#${props.id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
					<foreignObject href={`#${props.id}`} width="100%" height="100%" startOffset="50%"
					               textAnchor="middle">
						<div data-xmlns="http://www.w3.org/1999/xhtml">
							<button>aaaa</button>
						</div>
					</foreignObject>
					{/*	TODO */}
				</textPath>
			</text>
		</>
	);
}

export default CustomEdge;