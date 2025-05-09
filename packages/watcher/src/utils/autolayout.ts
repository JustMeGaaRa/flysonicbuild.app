import dagre from "npm:@dagrejs/dagre";

const nodeWidth = 150;
const nodeHeight = 50;

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const dagreOptions = {
    rankdir: "LR",
    nodesep: 100,
    edgeSep: 100,
    rankSep: 200,
};

export const withDagreeAutoLayout = (
    reactflow: { nodes: any[]; edges: any[] },
    options = dagreOptions
) => {
    const isHorizontal = options.rankdir === "LR";
    dagreGraph.setGraph(options);

    reactflow.nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    reactflow.edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = reactflow.nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            ...node,
            targetPosition: isHorizontal ? "left" : "top",
            sourcePosition: isHorizontal ? "right" : "bottom",
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges: reactflow.edges };
};
